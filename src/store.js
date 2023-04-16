import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import contactSlice from './features/contact/contactSlice'
import contactsSlice from './features/contacts/contactsSlice'
import chatsSlice from './features/chats/chatsSlice'
import messagesSlice from './features/messages/messagesSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    contact: contactSlice,
    contacts: contactsSlice,
    chats: chatsSlice,
    messages: messagesSlice,
  },
})
