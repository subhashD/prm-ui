import { Box } from '@chakra-ui/layout'
import MyChats from '../../components/MyChats'
import ChatBox from '../../components/ChatBox'

const Chats = () => {
  return (
    <>
      <Box
        display={'flex'}
        justifyContent='space-between'
        width={'100%'}
        height={'85vh'}
        padding={'10px'}
      >
        <MyChats />
        <ChatBox />
      </Box>
    </>
  )
}

export default Chats
