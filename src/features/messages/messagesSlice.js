import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import { logoutUser } from '../user/userSlice'

const initialState = {
  isLoading: false,
  messages: [],
}

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (chatId, thunkAPI) => {
    let url = `/chat/${chatId}/message`

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

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ chatId, content, webSocket }, thunkAPI) => {
    let url = `/chat/${chatId}/message`

    try {
      const resp = await customFetch.post(url, { content })
      return resp.data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser('Unauthorized! Logging Out...'))
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      const isFound = state.messages.find((m) => m.id === payload.id)
      if (!isFound) state.messages = [...state.messages, payload]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true
        state.messages = []
      })
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.messages = payload.data
      })
      .addCase(fetchMessages.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendMessage.fulfilled, (state, { meta, payload }) => {
        state.isLoading = false
        const { webSocket } = meta.arg
        webSocket.emit('new-message', payload.data)
        if (payload.data) state.messages = [...state.messages, payload.data]
      })
      .addCase(sendMessage.rejected, (state, { payload }) => {
        state.isLoading = false
      })
  },
})

export const { setMessages } = chatsSlice.actions

export default chatsSlice.reducer
