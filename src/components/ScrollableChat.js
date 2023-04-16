import { Avatar } from '@chakra-ui/avatar'
import { Tooltip } from '@chakra-ui/tooltip'
import ScrollableFeed from 'react-scrollable-feed'
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from '../helpers/ChatHelper'
import { useSelector, useDispatch } from 'react-redux'

const ScrollableChat = ({ messages }) => {
  const { user } = useSelector((store) => store.user)
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: 'flex' }} key={m.id}>
            {(isSameSender(messages, m, i, user.id) ||
              isLastMessage(messages, i, user.id)) && (
              <Tooltip
                label={m.sender.fullname}
                placement='bottom-start'
                hasArrow
              >
                <Avatar
                  mt='7px'
                  mr={1}
                  size='sm'
                  cursor='pointer'
                  name={m.sender.fullname}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender.id === user.id ? '#BEE3F8' : '#B9F5D0'
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user.id),
                marginTop: isSameUser(messages, m, i, user.id) ? 3 : 10,
                borderRadius: '20px',
                padding: '5px 15px',
                maxWidth: '75%',
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
