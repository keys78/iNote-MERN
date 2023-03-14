import { IUser } from '@/types'
import axios from 'axios'
// const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL
const AUTH_API_URL = "http://localhost:4000/"



// const getAllUsers = async () => {
//     const config = {
//         headers: {
//             "Content-Type": "application/json",
//         },
//     }
//     const response = await axios.get(`${AUTH_API_URL + 'users'}`, config)
//     return response
// }
// const getUserById = async (id: any) => {
//     const config = {
//         headers: {
//             "Content-Type": "application/json",
//         },
//     }
//     const response = await axios.get(`${AUTH_API_URL + `users/${id}`}`, config)
//     return response
// }



const signup = async (userData: IUser) => {
    const response = await axios.post(`${AUTH_API_URL + 'auth/signup'}`, userData)

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
    // login,
    logout,
}
export default authService
