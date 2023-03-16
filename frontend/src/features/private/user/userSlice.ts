import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUser } from './userService'

const initialState = {
  user: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// const token2 = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('authToken'))



// Get user
export const getUserById = createAsyncThunk(
    'private/:id',
    async (id: any, thunkAPI,) => {
      try {
        // const token = thunkAPI.getState().auth.user.token || token2
        // return await getUser('dajnjdak')
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )




export const privateSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(getUser.pending, (state) => {
    //     state.isLoading = true
    //   })
    //   .addCase(getUser.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.isSuccess = true
    //     state.user = action.payload
    //   })
    //   .addCase(getUser.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.isError = true
    //     // state.message = action.payload
    //   })
  },
})

export const { resetUser } = privateSlice.actions
export default privateSlice.reducer