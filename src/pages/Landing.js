import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h2>
            Personal <span>relationship</span> manager
          </h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
            ea at deleniti corporis, quaerat eligendi. Qui nesciunt aliquid
            illum, at doloremque, sint explicabo distinctio, aut illo ipsum
            dolorem vel sapiente?
          </p>
          <Link to={'/register'} className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing
