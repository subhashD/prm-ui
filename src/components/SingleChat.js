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
import { fetchMessages, sendMessage } from '../features/messages/messagesSlice'
import { getPartnerUser } from '../helpers/ChatHelper'
import UpdateGroupChatModal from '../components/miscellaneous/UpdateGroupChatModal'
import ProfileModal from '../components/miscellaneous/ProfileModal'
import ScrollableChat from './ScrollableChat'

const SingleChat = () => {
  const dispatch = useDispatch()
  const { selectedChat } = useSelector((store) => store.chats)
  const { isLoading, messages } = useSelector((store) => store.messages)
  const [newMessage, setNewMessage] = useState('')
  const { user } = useSelector((store) => store.user)

  useEffect(() => {
    setNewMessage('')
    if (selectedChat) dispatch(fetchMessages(selectedChat.id))
  }, [selectedChat])

  const sendMessageHandler = (event) => {
    // this is to send message
    if (event.key !== 'Enter' || !newMessage) {
      return
    }
    dispatch(sendMessage({ chatId: selectedChat.id, content: newMessage }))
    setNewMessage('')
  }

  const typingHandler = (e) => {
    // this is to send message)
    setNewMessage(e.target.value)
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
