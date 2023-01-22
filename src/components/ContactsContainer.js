import { useEffect } from 'react'
import Contact from './Contact'
import Wrapper from '../assets/wrappers/ContactsContainer'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './Loading'
import { getContacts } from '../features/contacts/contactsSlice'

const ContactsContainer = () => {
  const { contacts, isLoading } = useSelector((store) => store.contacts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getContacts())
  }, [])

  if (isLoading) {
    return <Loading center />
  }

  if (contacts.length === 0) {
    return (
      <Wrapper>
        <h2>No contacts to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>contacts info</h5>
      <div className='contacts'>
        {contacts.map((contact) => {
          return <Contact key={contact.id} {...contact} />
        })}
      </div>
    </Wrapper>
  )
}

export default ContactsContainer
