import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import { logoutUser } from '../user/userSlice'

const initialState = {
  isLoading: false,
  countries: [],
}

export const getCountries = createAsyncThunk(
  'country/getCountries',
  async (_, thunkAPI) => {
    let url = `/countries`

    try {
      const resp = await customFetch.get(url)
      return resp.data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser('Unauthorized! Logging Out...'))
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const countrySlice = createSlice({
  name: 'country',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCountries.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.countries = payload.data
      })
      .addCase(getCountries.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export default countrySlice.reducer
