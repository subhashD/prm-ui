import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import contactSlice from './features/contact/contactSlice'
import contactsSlice from './features/contacts/contactsSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    contact: contactSlice,
    contacts: contactsSlice,
  },
})
