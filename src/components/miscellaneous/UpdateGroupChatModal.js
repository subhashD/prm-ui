import { ViewIcon } from '@chakra-ui/icons'
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
  IconButton,
  Spinner,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserBadgeItem from '../userAvatar/UserBadgeItem'
import UserListItem from '../userAvatar/UserListItem'
import {
  renameGroupChat,
  removeUserFromGroup,
  addUserToGroup,
  leaveFromGroup,
} from '../../features/chats/chatsSlice'
import {
  searchUser,
  emptyUserSearchResults,
} from '../../features/user/userSlice'

const UpdateGroupChatModal = ({ fetchMessages }) => {
  const dispatch = useDispatch()
  const { userSearchResults } = useSelector((store) => store.user)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupChatName, setGroupChatName] = useState()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [renameloading, setRenameLoading] = useState(false)
  const toast = useToast()

  const { selectedChat, fetchAgain } = useSelector((store) => store.chats)
  const { user } = useSelector((store) => store.user)

  useEffect(() => {
    if (isOpen) {
      closeModal()
    }
  }, [fetchAgain]) // is this changes and modal is open close it to render my chats again

  const closeModal = () => {
    dispatch(emptyUserSearchResults())
    setSearch('')
    onClose()
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

  const handleRename = async () => {
    if (!groupChatName) return

    try {
      dispatch(
        renameGroupChat({ chatId: selectedChat.id, chatName: groupChatName })
      )
      setRenameLoading(false)
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setRenameLoading(false)
    }
    setGroupChatName('')
  }

  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((u) => u.id === userToAdd.id)) {
      toast({
        title: 'User Already in group!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      return
    }

    if (!selectedChat.groupAdmins.includes(user.id)) {
      toast({
        title: 'Only admins can add someone!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      return
    }

    try {
      dispatch(
        addUserToGroup({
          chatId: selectedChat.id,
          userId: userToAdd.id,
        })
      )
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setLoading(false)
    }
    setGroupChatName('')
  }

  const handleRemove = async (userToRemove) => {
    if (
      userToRemove.id === user.id ||
      !selectedChat.groupAdmins.includes(user.id)
    ) {
      toast({
        title: 'Only admins can remove someone!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      return
    }

    try {
      dispatch(
        removeUserFromGroup({
          chatId: selectedChat.id,
          userId: userToRemove.id,
        })
      )
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setLoading(false)
    }
    setGroupChatName('')
  }

  const handleLeaveGroup = async (userToRemove) => {
    try {
      dispatch(
        leaveFromGroup({
          chatId: selectedChat.id,
          userId: userToRemove.id,
        })
      )
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
    }
    setGroupChatName('')
  }

  return (
    <>
      <IconButton
        display={{ base: 'flex' }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize='35px'
            fontFamily='Work sans'
            display='flex'
            justifyContent='center'
          >
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody display='flex' flexDir='column' alignItems='center'>
            <Box w='100%' display='flex' flexWrap='wrap' pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u.id}
                  user={u}
                  admins={selectedChat.groupAdmins}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display='flex'>
              <Input
                placeholder='Chat Name'
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant='solid'
                colorScheme='teal'
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder='Add User to group'
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size='lg' />
            ) : (
              userSearchResults?.map((user) => (
                <UserListItem
                  key={user.id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleLeaveGroup(user)} colorScheme='red'>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal
