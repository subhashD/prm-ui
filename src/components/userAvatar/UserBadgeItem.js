import { CloseIcon } from '@chakra-ui/icons'
import { Badge } from '@chakra-ui/layout'

const UserBadgeItem = ({ user, admins, handleFunction }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius='lg'
      m={1}
      mb={2}
      variant='solid'
      fontSize={'10px'}
      colorScheme='purple'
      cursor='pointer'
      key={user.id}
      onClick={handleFunction}
    >
      {user.fullname}
      {admins.includes(user.id) && <span bg={'green'}>(Admin)</span>}
      <CloseIcon pl={1} />
    </Badge>
  )
}

export default UserBadgeItem
