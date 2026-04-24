import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getStoredUser, loginUser, logoutUser } from '@/services/auth-service'

const storedUser = getStoredUser()

const initialState = {
  user: storedUser,
  isAuthenticated: Boolean(storedUser),
  isLoading: false,
  error: null,
}

export const login = createAsyncThunk('auth/login', async (credentials) => {
  return loginUser(credentials)
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      logoutUser()
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
        state.isLoading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null
        state.isAuthenticated = false
        state.isLoading = false
        state.error = action.error.message
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
