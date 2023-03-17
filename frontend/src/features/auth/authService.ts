import { IUserLogin, IUserSignUp, IUserForgotPassword } from '@/types'
import axios from 'axios'
// const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL
const AUTH_API_URL = "http://localhost:4000/"



const signup = async (userData: IUserSignUp) => {
    const response = await axios.post(`${AUTH_API_URL + 'auth/signup'}`, userData)

    console.log('response', response.data.message)
    return response.data.message
}

const login = async (userData: IUserLogin) => {
    const { data } = await axios.post(`${AUTH_API_URL + 'auth/login'}`, userData)

   
    if (data.token) {
        localStorage.setItem('authToken', JSON.stringify(data))
    }
    console.log('response', data.token)
    return data
}

const requestPasswordReset = async (userData: IUserForgotPassword) => {
    const response = await axios.post(`${AUTH_API_URL + 'auth/forgotpassword'}`, userData)

    console.log('response', response.data.message)
    return response.data.message
}

// const login = async (userData) => {
//     const { data } = await axios.post(`${AUTH_API_URL + 'login'}`, userData)

//     if (data.verified === false) {
//         return data.message
//     }

//     if (data.token) {
//         localStorage.setItem('authToken', JSON.stringify(data))
//     }
//     return data
// }

// const resendOTP = async (id, userData) => {
//     const { data } = await axios.post(`${AUTH_API_URL + `resend-otp/${id}`}`, userData)

//     return data
// }


// const verify2FA = async (id, userData) => {
//     const { data } = await axios.post(`${AUTH_API_URL + `verify2FA/${id}`}`, userData)

//     if (data.success === true) {
//         localStorage.setItem('authToken', JSON.stringify(data.token))
//     }
//     return data
// }


const logout = () => {
    localStorage.removeItem('authToken')
}

const authService = {
    signup,
    login,
    requestPasswordReset,
    logout,
}
export default authService
