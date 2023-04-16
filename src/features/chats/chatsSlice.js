import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import { logoutUser } from '../user/userSlice'

const initialState = {
  isLoading: false,
  chats: [],
  selectedChat: false,
  fetchAgain: Date.now(),
  totalChats: 0,
  numOfPages: 1,
  page: 1,
}

export const fetchChats = createAsyncThunk(
  'chats/fetchChats',
  async (_, thunkAPI) => {
    let url = `/chat`

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

export const accessPersonalChat = createAsyncThunk(
  'chats/accessPersonalChat',
  async (userId, thunkAPI) => {
    let url = `/chat/personal`

    try {
      const resp = await customFetch.post(url, { userId: userId })
      return resp.data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser('Unauthorized! Logging Out...'))
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const createGroupChat = createAsyncThunk(
  'chats/createGroupChat',
  async (chatData, thunkAPI) => {
    let url = `/chat/group`

    try {
      const resp = await customFetch.post(url, chatData)
      return resp.data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser('Unauthorized! Logging Out...'))
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const renameGroupChat = createAsyncThunk(
  'chats/renameGroupChat',
  async ({ chatId, chatName }, thunkAPI) => {
    let url = `/chat/group/${chatId}`

    try {
      const resp = await customFetch.patch(url, { chatName })
      return resp.data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser('Unauthorized! Logging Out...'))
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const removeUserFromGroup = createAsyncThunk(
  'chats/removeUserFromGroup',
  async ({ chatId, userId }, thunkAPI) => {
    let url = `/chat/group/${chatId}/remove`

    try {
      const resp = await customFetch.post(url, { userId })
      return resp.data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser('Unauthorized! Logging Out...'))
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const addUserToGroup = createAsyncThunk(
  'chats/addUserToGroup',
  async ({ chatId, userId }, thunkAPI) => {
    let url = `/chat/group/${chatId}/add`

    try {
      const resp = await customFetch.post(url, { userId })
      return resp.data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser('Unauthorized! Logging Out...'))
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const leaveFromGroup = createAsyncThunk(
  'chats/leaveFromGroup',
  async ({ chatId, userId }, thunkAPI) => {
    let url = `/chat/group/${chatId}/leave`

    try {
      const resp = await customFetch.delete(url)
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
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
    setSelectedChat: (state, { payload }) => {
      state.selectedChat = payload
    },
    addNewChat: (state, { payload }) => {
      state.chats.unshift(payload)
    },
    setFetchAgain: (state, { payload }) => {
      state.fetchAgain = Date.now()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchChats.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.chats = payload.data
      })
      .addCase(fetchChats.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(accessPersonalChat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(accessPersonalChat.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.fetchAgain = Date.now()
        state.selectedChat = payload.data
      })
      .addCase(accessPersonalChat.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(createGroupChat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGroupChat.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.fetchAgain = Date.now()
        state.selectedChat = payload.data
        toast.success('New Group Chat Created!')
      })
      .addCase(createGroupChat.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(renameGroupChat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(renameGroupChat.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.fetchAgain = Date.now()
        state.selectedChat = payload.data
        toast.success('Group Chat Renamed!')
      })
      .addCase(renameGroupChat.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(removeUserFromGroup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeUserFromGroup.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.fetchAgain = Date.now()
        state.selectedChat = payload.data
      })
      .addCase(removeUserFromGroup.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(leaveFromGroup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(leaveFromGroup.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.fetchAgain = Date.now()
        state.selectedChat = false
      })
      .addCase(leaveFromGroup.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(addUserToGroup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addUserToGroup.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.fetchAgain = Date.now()
        state.selectedChat = payload.data
      })
      .addCase(addUserToGroup.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export const {
  showLoading,
  hideLoading,
  setSelectedChat,
  setFetchAgain,
  addNewChat,
} = chatsSlice.actions

export default chatsSlice.reducer
