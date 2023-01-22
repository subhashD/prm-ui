import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import Logo from './Logo'
import { useState } from 'react'
import { toggleSidebar, logoutUser } from './../features/user/userSlice'
import { clearValues } from '../features/contact/contactSlice'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {
  const { user } = useSelector((store) => store.user)
  const [showLogout, setShowLogout] = useState(false)
  const dispatch = useDispatch()

  const toggle = () => {
    dispatch(toggleSidebar())
    dispatch(clearValues())
  }

  const logout = () => {
    dispatch(logoutUser('Loggin out...'))
  }
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button type='button' className='dropdown-btn' onClick={logout}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
