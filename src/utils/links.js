import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats, MdChat } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

const links = [
  {
    id: 1,
    text: 'Home',
    path: '/',
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: 'Contacts',
    path: '/contacts',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'Add Contact',
    path: '/contacts/create',
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: 'Chats',
    path: '/chats',
    icon: <MdChat />,
  },
  {
    id: 5,
    text: 'Profile',
    path: '/profile',
    icon: <ImProfile />,
  },
]

export default links
