import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const initialState = {
  isLoading: false,
  contacts: [],
  totalContacts: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyContacts: [],
  ...initialFiltersState,
}

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (_, thunkAPI) => {
    let url = `/contacts`

    try {
      const resp = await customFetch.get(url)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.contacts = payload.data
      })
      .addCase(getContacts.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export const { showLoading, hideLoading } = contactsSlice.actions

export default contactsSlice.reducer
