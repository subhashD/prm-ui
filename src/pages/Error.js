import notFound from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={notFound} alt='Not Found' />
        <h3>ohh! Page not found</h3>
        <p>We can't seem to find page you are looking for</p>
        <Link to={'/'}>Back Home</Link>
      </div>
    </Wrapper>
  )
}

export default Error
