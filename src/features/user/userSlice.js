import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  addStaticDataToLocalStorage,
} from '../../utils/localStorage'
import { getCountries } from '../country/countrySlice'
import { getGenders } from '../gender/genderSlice'

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
  userSearchResults: [],
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/register', user)
      return resp.data
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/login', user)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/user/profile')
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

export const searchUser = createAsyncThunk(
  'user/searchUser',
  async (search, thunkAPI) => {
    try {
      const resp = await customFetch.get(`/user/users?search=${search}`)
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    emptyUserSearchResults: (state) => {
      state.userSearchResults = []
    },
    logoutUser: (state, { payload }) => {
      state.user = null
      state.isSidebarOpen = false
      removeUserFromLocalStorage()
      if (payload) {
        toast.success(payload)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { code, message } = payload
        state.isLoading = false
        state.user = true
        toast.success(`${message}`)
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { data } = payload
        const { user, access_token, refresh_token } = data
        user.access_token = access_token
        user.refresh_token = refresh_token

        state.isLoading = false
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`Welcome ${user.firstname}`)

        // const genders = useDispatch(getGenders())
        // var countries = getCountries()
        // addStaticDataToLocalStorage()
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.isLoading = false
        state.user = user

        addUserToLocalStorage(user)
        toast.success('User Updated')
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(searchUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchUser.fulfilled, (state, { payload }) => {
        state.userSearchResults = payload.data
        state.isLoading = false
      })
      .addCase(searchUser.rejected, (state, { payload }) => {
        state.isLoading = false
        // toast.error(payload)
      })
  },
})

export const { toggleSidebar, logoutUser, emptyUserSearchResults } =
  userSlice.actions

export default userSlice.reducer
