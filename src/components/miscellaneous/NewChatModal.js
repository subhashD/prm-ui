import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserBadgeItem from '../userAvatar/UserBadgeItem'
import UserListItem from '../userAvatar/UserListItem'
import {
  addNewChat,
  accessPersonalChat,
  createGroupChat,
} from '../../features/chats/chatsSlice'
import {
  searchUser,
  emptyUserSearchResults,
} from '../../features/user/userSlice'

const NewChatModal = ({ children, isGroupChat }) => {
  const { userSearchResults } = useSelector((store) => store.user)
  const { chats, fetchAgain } = useSelector((store) => store.chats)
  const dispatch = useDispatch()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupChatName, setGroupChatName] = useState()
  const [selectedUsers, setSelectedUsers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if (isOpen) {
      closeModal()
    }
  }, [fetchAgain]) // is this changes and modal is open close it to render my chats again

  const closeModal = () => {
    dispatch(emptyUserSearchResults())
    setSelectedUsers([])
    setSearch('')
    onClose()
  }
  const handleGroup = (userToAdd) => {
    const userExists = selectedUsers.find((sel) => sel.id === userToAdd.id)
    if (userExists) {
      toast({
        title: 'User already added',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      return
    }

    setSelectedUsers([...selectedUsers, userToAdd])
  }

  const handleClick = (userToAdd) => {
    dispatch(accessPersonalChat(userToAdd.id))
    closeModal()
  }

  const handleSearch = async (query) => {
    if (!query) {
      return
    }
    setSearch(query)
    try {
      dispatch(searchUser(search))
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Search Results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      })
    }
  }

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel.id !== delUser.id))
  }

  const handleSubmit = async () => {
    if ((isGroupChat && !groupChatName) || !selectedUsers) {
      toast({
        title: 'Please fill the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      return
    }

    try {
      dispatch(
        createGroupChat({
          groupName: groupChatName,
          users: selectedUsers.map((u) => u.id),
        })
      )
    } catch (error) {
      toast({
        title: 'Failed to Create the Chat!',
        description: error.response.data,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
    }
  }

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal
        closeOnOverlayClick={false}
        onClose={() => closeModal()}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize='35px'
            fontFamily='Work sans'
            d='flex'
            justifyContent='center'
          >
            {isGroupChat ? 'Create Group Chat' : 'Start Personal Chat'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d='flex' flexDir='column' alignItems='center'>
            {isGroupChat && (
              <FormControl>
                <Input
                  placeholder='Chat Name'
                  mb={3}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
              </FormControl>
            )}

            <FormControl>
              <Input
                placeholder='Search User eg: John, Piyush, Jane'
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w='100%' d='flex' flexWrap='wrap'>
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u.id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              // <ChatLoading />
              <div>Loading...</div>
            ) : (
              userSearchResults
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user.id}
                    user={user}
                    handleFunction={() =>
                      isGroupChat ? handleGroup(user) : handleClick(user)
                    }
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            {isGroupChat && (
              <Button onClick={handleSubmit} colorScheme='blue'>
                Create Chat
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewChatModal
