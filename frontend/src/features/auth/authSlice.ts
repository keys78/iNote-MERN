import { IUser, IUserLogin, IUserSignUp, IUserForgotPassword } from '@/types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'



// Perform localStorage action
const user = "any"
// const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('authToken'))


type User = {
    username: string,
    email: string
};

export type Auth = {
    token: string | null,
    user: User | null,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: {} | string | null;
};


const initialState: Auth = {
    // token: localStorage.getItem('token'),
    token: '',
    user: null,
    isError: false,
    isSuccess: true,
    isLoading: false,
    message: '',
};

// signup user
export const signupUser = createAsyncThunk(
    'auth/signup',
    async (user: IUserSignUp, thunkAPI) => {
        try {
            return await authService.signup(user)
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

// login user
export const loginUser = createAsyncThunk(
    'auth/login',
    async (user: IUserLogin, thunkAPI) => {
        try {
            return await authService.login(user)
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

// requestPasswordReset
export const requestPasswordReset = createAsyncThunk(
    'auth/forgot_password',
    async (user: IUserForgotPassword, thunkAPI) => {
        try {
            return await authService.requestPasswordReset(user)
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




export const logout = createAsyncThunk('auth/logout', () => {
    authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = false
                state.token = action.payload
                state.message = action.payload
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload || "Something went wrong";
                state.user = null
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.message = action.payload
                state.token = action.payload.token
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload || "Something went wrong";
                state.user = null
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer