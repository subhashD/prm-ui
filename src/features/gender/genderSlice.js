import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import { logoutUser } from '../user/userSlice'

const initialState = {
  isLoading: false,
  genders: [],
}

export const getGenders = createAsyncThunk(
  'gender/getGenders',
  async (_, thunkAPI) => {
    let url = `/genders`

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

const genderSlice = createSlice({
  name: 'gender',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGenders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGenders.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.genders = payload.data
      })
      .addCase(getGenders.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export default genderSlice.reducer
