import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Wrapper from '../assets/wrappers/RegisterPage'
import { Logo } from '../components'
import FormRow from '../components/FormRow'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser } from '../features/user/userSlice'

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
  isMember: true,
}

const Register = () => {
  const dispatch = useDispatch()
  const { isLoading, user } = useSelector((store) => store.user)

  const [values, setValues] = useState(initialState)
  // redux toolkit and useNavigate later

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { firstname, lastname, email, password, confirmPassword } = values
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      toast.error('Please Fill Out All Fields')
      return
    } else if (password !== confirmPassword) {
      toast.error('Password and confirm password doesn`t match!!')
      return
    } else {
      dispatch(registerUser({ firstname, lastname, email, password }))
    }
  }

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>Register</h3>

        {/* firstname field */}
        <FormRow
          type='text'
          name='firstname'
          value={values.firstname}
          handleChange={handleChange}
        />

        {/* lastname field */}
        <FormRow
          type='text'
          name='lastname'
          value={values.lastname}
          handleChange={handleChange}
        />

        {/* email field */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />

        {/* password field */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />

        {/* confirmPassword field */}
        <FormRow
          type='password'
          name='confirmPassword'
          value={values.confirmPassword}
          handleChange={handleChange}
          labelText='confirm Password'
        />

        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>

        <p>
          {'Already a member? '}
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
