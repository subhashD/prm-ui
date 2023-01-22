import { FormRow, FormRowSelect } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {
  handleChange,
  clearValues,
  createContact,
} from '../../features/contact/contactSlice'

const AddContact = () => {
  const {
    isLoading,
    isEditing,
    editContactId,
    firstname,
    middlename,
    lastname,
    nickname,
    description,
    gender,
    is_birthdate_known,
    birthdate_day,
    birthdate_month,
    birthdate_year,
    birthdate_is_age_based,
    birthdate_age,
    is_deceased,
    is_deceased_date_known,
    deceased_date_day,
    deceased_date_month,
    deceased_date_year,
    deceased_date_is_age_based,
    deceased_age,
  } = useSelector((store) => {
    console.log(store)
    return store.contact
  })
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    // if (!firstname || !gender) {
    //   toast.error('Please Fill Out required Fields')
    //   return
    // }

    dispatch(createContact({ firstname, middlename, lastname }))
  }
  const handleContactInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(handleChange({ name, value }))
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>{isEditing ? 'edit contact' : 'add contact'}</h3>

        <div className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            name='firstname'
            value={firstname}
            handleChange={handleContactInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='middlename'
            value={middlename}
            handleChange={handleContactInput}
          />
          {/* location */}
          <FormRow
            type='text'
            labelText='lastname'
            name='lastname'
            value={lastname}
            handleChange={handleContactInput}
          />
          {/* gender status */}
          <FormRowSelect
            name='gender'
            value={gender}
            handleChange={handleContactInput}
            list={[]}
          />

          {/* birth related data */}

          {/* btn container */}
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddContact
