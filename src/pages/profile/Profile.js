import Wrapper from '../../assets/wrappers/DashboardFormPage'
import FormRow from '../../components/FormRow'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { updateUser } from '../../features/user/userSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const { isLoading, user } = useSelector((store) => store.user)
  const [userData, setUserData] = useState({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { firstname, lastname, email } = userData

    if (!firstname || !email || !lastname) {
      toast.error('Please Fill Out All Fields')
      return
    }

    dispatch(updateUser({ firstname, email, lastname }))
  }

  return (
    <Wrapper>
      <form action='' className='form' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className='form-center'>
          <FormRow
            type='text'
            name='firstname'
            labelText='First Name'
            value={userData.firstname}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='lastname'
            labelText='Last Name'
            value={userData.lastname}
            handleChange={handleChange}
          />
          <FormRow
            type='email'
            name='email'
            labelText='Email'
            value={userData.email}
            handleChange={handleChange}
          />

          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile
