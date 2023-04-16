import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchChats, setSelectedChat } from '../features/chats/chatsSlice'
import ChatLoading from './ChatLoading'
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import NewChatModal from './miscellaneous/NewChatModal'

const MyChats = () => {
  const { chats, isLoading, selectedChat, fetchAgain } = useSelector(
    (store) => store.chats
  )
  const { user } = useSelector((store) => store.user)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchChats())
  }, [fetchAgain])

  if (isLoading) {
    return <ChatLoading />
  }
  if (chats.length === 0) {
    return <h6>No chats to display...</h6>
  }
  return (
    <Box
      display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDir={'column'}
      alignItems={'center'}
      padding={3}
      bg={'#d9e2ec'}
      w={{ base: '100%', md: '34%' }}
      borderRadius='lg'
      borderWidth={'px'}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: '28px', md: '30px' }}
        fontFamily={'Work sans'}
        display={'flex'}
        width={'100%'}
        justifyContent={'space-between'}
        alignItems={'align-items'}
      >
        My Chats
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            More
          </MenuButton>
          <MenuList fontSize={'16px'} py={2}>
            <NewChatModal isGroupChat={false}>
              <MenuItem>New Personal chat</MenuItem>
            </NewChatModal>
            <NewChatModal isGroupChat={true}>
              <MenuItem>New Group chat</MenuItem>
            </NewChatModal>
          </MenuList>
        </Menu>
      </Box>
      <Box
        display={'flex'}
        flexDir={'column'}
        p={3}
        bg={'#f8f8f8'}
        width={'100%'}
        height={'100%'}
        borderRadius='lg'
        overflowY={'hidden'}
      >
        {chats ? (
          <Stack overflowY={'scroll'}>
            {chats.map((chat) => (
              <Box
                onClick={() => dispatch(setSelectedChat(chat))}
                cursor={'pointer'}
                background={selectedChat.id === chat.id ? '#3b82f6' : '#E8E8E8'}
                color={selectedChat.id === chat.id ? 'white' : 'black'}
                px={3}
                py={2}
                borderRadius={'lg'}
                key={chat.id}
              >
                <Text>{chat.chatName}</Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  )
}

export default MyChats
