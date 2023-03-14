// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { getYearsBetween } from 'utils/helpers'
// import usersService from './usersService'

// const initialState = {
//   allUsers: [],
//   filteredUsers: [],
//   user: {},
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: '' as any,

// }

// // Get all users
// export const getAllUsers = createAsyncThunk(
//   'users',
//   async (_, thunkAPI) => {
//     try {
//       return await usersService.getAllUsers()
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

// // Get user by id
// export const getUserById = createAsyncThunk(
//   'users/:id',
//   async (id: any, thunkAPI,) => {
//     try {
//       return await usersService.getUserById(id)
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

// export const usersSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {
//     resetUsers: (state) => initialState,
//     getAllUsers: (state, action) => {
//       state.allUsers = action.payload.data
//     },
//     filterByOrgName: (state, action) => {
//       state.filteredUsers = state.allUsers.filter((user: any) =>
//         user.orgName.toLowerCase().includes(action.payload.toLocaleLowerCase())
//       );
//     },
//     filterByUsername: (state, action) => {
//       state.filteredUsers = state.allUsers.filter((user: any) =>
//         user.userName.toLowerCase().includes(action.payload.toLocaleLowerCase())
//       );
//     },
//     filterByEmail: (state, action) => {
//       state.filteredUsers = state.allUsers.filter((user: any) =>
//         user.email.toLowerCase().includes(action.payload.toLocaleLowerCase())
//       );
//     },
//     filterByDateJoined: (state, action) => {
//       state.filteredUsers = state.allUsers.filter((user: any) =>
//         new Date(user.createdAt).toLocaleDateString() === (new Date(action.payload).toLocaleDateString())
//       );
//     },
//     filterByPhoneNumber: (state, action) => {
//       state.filteredUsers = state.allUsers.filter((user: any) =>
//         user.phoneNumber.includes(action.payload.replace(/[- )(]/g, ''))
//       );
//     },
//     filterByActiveStatus: (state, action) => {
//       state.filteredUsers = state.allUsers.filter((user: any) =>
//         getYearsBetween(user.createdAt, user.lastActiveDate) <= (40))
//     },
//     filterByPendingStatus: (state, action) => {
//       state.filteredUsers = state.allUsers.filter((user: any) =>
//         getYearsBetween(user.createdAt, user.lastActiveDate) > (40) && getYearsBetween(user.createdAt, user.lastActiveDate) <= (60))
//     },
//     filterByInactveStatus: (state, action) => {
//       state.filteredUsers = state.allUsers.filter((user: any) =>
//         getYearsBetween(user.createdAt, user.lastActiveDate) > (60) && getYearsBetween(user.createdAt, user.lastActiveDate) <= (90))
//     },
//     filterByBlacklistStatus: (state, action) => {
//       state.filteredUsers = state.allUsers.filter((user: any) =>
//         getYearsBetween(user.createdAt, user.lastActiveDate) > (90))
//     },
//   },


//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllUsers.pending, (state: any) => {
//         state.isLoading = true
//       })
//       .addCase(getAllUsers.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.isSuccess = true
//         state.allUsers = action.payload.data
//         state.filteredUsers = action.payload.data
//       })
//       .addCase(getAllUsers.rejected, (state, action) => {
//         state.isLoading = false
//         state.isError = true
//         state.message = action.payload
//       })
//       .addCase(getUserById.pending, (state: any) => {
//         state.isLoading = true
//       })
//       .addCase(getUserById.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.isSuccess = true
//         state.user = action.payload.data
//       })
//       .addCase(getUserById.rejected, (state, action) => {
//         state.isLoading = false
//         state.isError = true
//         state.message = action.payload
//       })

//   },
// }
// )

// export const {
//   resetUsers,
//   filterByUsername,
//   filterByEmail,
//   filterByDateJoined,
//   filterByPhoneNumber,
//   filterByOrgName,
//   filterByActiveStatus,
//   filterByPendingStatus,
//   filterByInactveStatus,
//   filterByBlacklistStatus
// } = usersSlice.actions
// export default usersSlice.reducer