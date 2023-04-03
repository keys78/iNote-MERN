import { IUserLogin, IUserSignUp, IUserForgotPassword } from '@/types'
import axios from 'axios'
import { toast } from 'react-toastify'
// const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL
const AUTH_API_URL = "http://localhost:4000/"



const signup = async (userData: IUserSignUp) => {
    const response = await axios.post(`${AUTH_API_URL + 'auth/signup'}`, userData)

    toast.success(response?.data?.message as string, { autoClose: false });
    return response
}

const login = async (userData: IUserLogin) => {
    const { data } = await axios.post(`${AUTH_API_URL + 'auth/login'}`, userData)

   
    if (data?.token) {
        localStorage.setItem('authToken', JSON.stringify(data.token))
    }
    return data
}

const requestPasswordReset = async (userData: IUserForgotPassword) => {
    const response = await axios.post(`${AUTH_API_URL + 'auth/forgotpassword'}`, userData)

    toast.success(response?.data?.data as string, { autoClose: false });
    return response?.data?.message
}


const resetPassword = async (resetPasswordData: IUserForgotPassword, resetToken: any) => {
    const response = await axios.put(`${AUTH_API_URL + `auth/reset-password/${resetToken}`}`, resetPasswordData)
    
    toast.success(response.data.message as string, { autoClose: false });
    console.log('response', response?.data?.message)
    return response?.data?.message
}

const changePassword = async (changePasswordData: IUserForgotPassword, userId: any) => {
    const response = await axios.put(`${AUTH_API_URL + `auth/changepassword/${userId}`}`, changePasswordData)

    toast.success(response.data.message as string, { autoClose: false });
    console.log('response', response?.data?.message)
    return response?.data?.message
}


const logout = () => {
    localStorage.removeItem('authToken')
}

const authService = {
    signup,
    login,
    requestPasswordReset,
    resetPassword,
    changePassword,
    logout,
}
export default authService
