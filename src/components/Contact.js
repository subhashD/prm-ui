import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Contact'
import { useDispatch } from 'react-redux'
import ContactInfo from './ContactInfo'
import { deleteContact, setEditContact } from '../features/contact/contactSlice'
const Job = (contact) => {
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{contact.firstname.charAt(0)}</div>
        <div className='info'>
          <h5>{contact.firstname}</h5>
          <p>{contact.lastname}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <ContactInfo icon={<FaLocationArrow />} text={contact.birthdate} />
          <ContactInfo
            icon={<FaCalendarAlt />}
            text={contact.last_consulted_at}
          />
          <ContactInfo icon={<FaBriefcase />} text={contact.nickname} />
          <div className={`status ${contact.genderTitle}`}>
            {contact.genderTitle}
          </div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/contacts/edit'
              className='btn edit-btn'
              onClick={() => {
                dispatch(
                  setEditContact({
                    editContactId: contact.id,
                    ...contact,
                  })
                )
              }}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => {
                dispatch(deleteContact(contact.id))
              }}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job
