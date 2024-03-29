import { IUserLogin, IUserSignUp, IUserForgotPassword } from '@/types'
import errorHandler from '@/utils/errorHandler';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'



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
    token: '',
    user: null,
    isError: false,
    isSuccess: true,
    isLoading: false,
    message: '',
};

// signup user
export const signupUser = createAsyncThunk<any, any>(
    'auth/signup',
    async (user: IUserSignUp, thunkAPI) => {
        try {
            return await authService.signup(user)
        } catch (error: any) {
            errorHandler(error, thunkAPI)
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
            errorHandler(error, thunkAPI)
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
            errorHandler(error, thunkAPI)
        }
    }
)

// requestPasswordReset
export const resetPassword = createAsyncThunk<any, any>(
    'auth/reset-password',
    async ({ resetPasswordData, resetToken }, thunkAPI) => {
        try {
            return await authService.resetPassword(resetPasswordData, resetToken)
        } catch (error: any) {
            errorHandler(error, thunkAPI)
        }
    }
)


// verify email
export const verifyEmail = createAsyncThunk<any, any>(
    'auth/verify-email',
    async ({ id, verifyToken }, thunkAPI) => {
        try {
            return await authService.verifyEmail(id, verifyToken)
        } catch (error: any) {
            errorHandler(error, thunkAPI)
        }
    }
)

// accept pair invite
export const acceptPairInvite = createAsyncThunk<any, any>(
    'private/accept-pair',
    async ({ pairToken, id }, thunkAPI) => {
        try {
            return await authService.acceptPairInvite(pairToken, id)
        } catch (error: any) {
            errorHandler(error, thunkAPI)
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
                state.token = action.payload?.token
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload || "Something went wrong";
                state.user = null
            })
            .addCase(requestPasswordReset.pending, (state) => {
                state.isLoading = true
            })
            .addCase(requestPasswordReset.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
            })
            .addCase(requestPasswordReset.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload || "Something went wrong";
                state.user = null
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload || "Something went wrong";
                state.user = null
            })
            .addCase(verifyEmail.pending, (state) => {
                state.isLoading = true
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
                state.isError = false

            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload || "Something went wrong";
                state.user = null
            })
            .addCase(acceptPairInvite.pending, (state) => {
                state.isLoading = true
            })
            .addCase(acceptPairInvite.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
                state.isError = false

            })
            .addCase(acceptPairInvite.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload || "Something went wrong";
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer