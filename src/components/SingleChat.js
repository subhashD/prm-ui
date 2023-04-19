import {
  Box,
  Text,
  IconButton,
  FormControl,
  Input,
  Spinner,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { setSelectedChat } from '../features/chats/chatsSlice'
import {
  fetchMessages,
  sendMessage,
  setMessages,
} from '../features/messages/messagesSlice'
import { getPartnerUser } from '../helpers/ChatHelper'
import UpdateGroupChatModal from '../components/miscellaneous/UpdateGroupChatModal'
import ProfileModal from '../components/miscellaneous/ProfileModal'
import ScrollableChat from './ScrollableChat'
import io from 'socket.io-client'
const SERVER_POINT = 'http://localhost:5000'
var webSocket = null
var currentlySelectedChat = null

const SingleChat = () => {
  const dispatch = useDispatch()
  const { selectedChat } = useSelector((store) => store.chats)
  const { isLoading, messages } = useSelector((store) => store.messages)
  const [newMessage, setNewMessage] = useState('')
  const [socketConnected, setSocketConnected] = useState(false)
  const { user } = useSelector((store) => store.user)
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    webSocket = io(SERVER_POINT)
    webSocket.emit('setup', user)
    webSocket.on('connected', () => {
      setSocketConnected(true)
    })
    webSocket.on('typing', () => setIsTyping(true))
    webSocket.on('stop-typing', () => setIsTyping(false))
  }, [])

  useEffect(() => {
    setNewMessage('')
    if (selectedChat) {
      dispatch(fetchMessages(selectedChat.id))
      currentlySelectedChat = selectedChat
      webSocket.emit('join-chat', selectedChat.id)
    }
  }, [selectedChat])

  useEffect(() => {
    webSocket.on('message-received', (newMessageReceived) => {
      if (
        currentlySelectedChat &&
        currentlySelectedChat.id === newMessageReceived.chat.id
      ) {
        dispatch(setMessages(newMessageReceived))
      } else {
        // give notification here
      }
    })
  }, [])

  const sendMessageHandler = (event) => {
    // this is to send message
    if (event.key !== 'Enter' || !newMessage) {
      return
    }
    webSocket.emit('stop-typing', selectedChat.id)
    dispatch(
      sendMessage({
        chatId: selectedChat.id,
        content: newMessage,
        webSocket: webSocket,
      })
    )

    setNewMessage('')
  }

  const typingHandler = (e) => {
    // this is to send message)
    setNewMessage(e.target.value)

    // typing indicator logic
    if (!socketConnected) return

    if (!typing) {
      setTyping(true)
      webSocket.emit('typing', selectedChat.id)
    }

    const lastTypingTime = new Date().getTime()
    const timeoutLength = 3000
    setTimeout(() => {
      const newTimestamp = new Date().getTime()
      const diff = newTimestamp - lastTypingTime
      if (diff >= timeoutLength && typing) {
        webSocket.emit('stop-typing', selectedChat.id)
        setTyping(false)
      }
    }, timeoutLength)
  }
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: '28px', md: '30px' }}
            pb={3}
            px={2}
            w='100%'
            fontFamily='Work sans'
            display='flex'
            justifyContent={{ base: 'space-between' }}
            alignItems='center'
          >
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              icon={<ArrowBackIcon />}
              onClick={() => dispatch(setSelectedChat(false))}
            />
            {selectedChat.chatName}
            {selectedChat.isGroupChat ? (
              <UpdateGroupChatModal />
            ) : (
              <>
                <ProfileModal user={getPartnerUser(user, selectedChat.users)} />
              </>
            )}
          </Text>
          <Box
            display={'flex'}
            flexDir={'column'}
            justifyContent={'flex-end'}
            p={3}
            bg={'#f8f8f8'}
            width={'100%'}
            height={'100%'}
            borderRadius='lg'
            overflowY={'hidden'}
          >
            {isLoading ? (
              <Spinner
                size='xl'
                w={20}
                h={20}
                alignSelf='center'
                margin='auto'
              />
            ) : (
              <div className='messages'>
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl
              onKeyDown={sendMessageHandler}
              id='first-name'
              isRequired
              mt={3}
            >
              {isTyping && (
                <div className='wave'>
                  <div className='ball'></div>
                  <div className='ball'></div>
                  <div className='ball'></div>
                  <div className='ball'></div>
                </div>
              )}
              <Input
                variant='filled'
                bg='#E0E0E0'
                placeholder='Enter a message..'
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          h={'100%'}
        >
          <Text fontSize={'4x2'} pb={3}>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  )
}

export default SingleChat
