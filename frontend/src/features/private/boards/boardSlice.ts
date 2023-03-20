import { Auth } from '@/features/auth/authSlice';
// import { IToken, IUser } from '@/types';
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
// import userService from './boardService';


// const storedToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
// const token2 = storedToken ? JSON.parse(storedToken) : '';

// type User = {
//   username: string,
//   email: string
// };

// interface IUserState {
//   user: User | null,
//   isError: boolean,
//   isSuccess: boolean,
//   isLoading: boolean,
//   message: {} | string | null;
// }

// const initialState: IUserState = {
//   user: null,
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: '',
// }


// // Get user
// export const getBoard = createAsyncThunk<User, void>(
//   'user',
//   async (_, thunkAPI) => {
//     const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
//     try {
//       return await userService.getBoard(token)
//     } catch (error: any) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )




// export const privateSlice = createSlice({
//   name: 'board',
//   initialState,
//   reducers: {
//     resetUser: (state) => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getBoard.pending as any, (state) => {
//         state.isLoading = true
//       })
//       .addCase(getBoard.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.isSuccess = true
//         state.user = action.payload
//       })
//       .addCase(getBoard.rejected, (state, action) => {
//         state.isLoading = false
//         state.isError = true
//         switch (action.type) {
//           case 'SET_MESSAGE': {
//             state.message = action.payload as string
//             return state
//           }
//           // other cases...
//         }
//       })

//   },
// })

// export const { resetUser } = privateSlice.actions
// export default privateSlice.reducer

