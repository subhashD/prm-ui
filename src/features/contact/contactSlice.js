import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import { logoutUser } from '../user/userSlice'
import {
  showLoading,
  hideLoading,
  getContacts,
} from '../contacts/contactsSlice'

const initialState = {
  isLoading: false,
  isEditing: false,
  editContactId: '',
  firstname: '',
  middlename: '',
  lastname: '',
  nickname: '',
  description: '',
  gender: '',
  is_birthdate_known: false,
  birthdate_day: null,
  birthdate_month: null,
  birthdate_year: null,
  birthdate_is_age_based: false,
  birthdate_age: null,
  is_deceased: false,
  is_deceased_date_known: false,
  deceased_date_day: null,
  deceased_date_month: null,
  deceased_date_year: null,
  deceased_date_is_age_based: false,
  deceased_age: null,
}

export const createContact = createAsyncThunk(
  'contact/createContact',
  async (contact, thunkAPI) => {
    try {
      const resp = await customFetch.post('/contacts/create', contact)
      thunkAPI.dispatch(clearValues())
      return resp.data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser('Unauthorized! Logging Out...'))
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
      }
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const resp = await customFetch.delete(`/contacts/${contactId}`)
      thunkAPI.dispatch(getContacts())
      return resp.data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser('Unauthorized! Logging Out...'))
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
      }
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    clearValues: () => {
      return {
        ...initialState,
      }
    },
    setEditContact: (state, { payload }) => {
      const newContact = { ...state, isEditing: true, ...payload }
      return newContact
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.isLoading = true
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(createContact.fulfilled, (state, { payload }) => {
        const { message } = payload
        state.isLoading = false
        toast.success(`${message}`)
      })
      .addCase(createContact.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export const { handleChange, clearValues, setEditContact } =
  contactSlice.actions
export default contactSlice.reducer
