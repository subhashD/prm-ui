import { Box } from '@chakra-ui/layout'
// import SingleChat from './SingleChat'
import { useSelector } from 'react-redux'
import SingleChat from './SingleChat'
const Chatbox = () => {
  const { selectedChat } = useSelector((store) => store.chats)

  return (
    <Box
      display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      alignItems='center'
      flexDir='column'
      p={3}
      bg='#d9e2ec'
      w={{ base: '100%', md: '68%' }}
      borderRadius='lg'
      borderWidth='1px'
      ml={3}
    >
      <SingleChat />
    </Box>
  )
}

export default Chatbox
