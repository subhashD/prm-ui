import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Wrapper from '../assets/wrappers/RegisterPage'
import { Logo } from '../components'
import FormRow from '../components/FormRow'

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const [values, setValues] = useState(initialState)
  // redux toolkit and useNavigate later

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { email, password } = values
    if (!email || !password) {
      toast.error('Please Fill Out All Fields')
      return
    } else {
      console.log('Submitting..')
    }
  }

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>

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

        <button type='submit' className='btn btn-block'>
          submit
        </button>

        <p>
          {'Not a member? '}
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  )
}

export default Login
