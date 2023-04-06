import { IToken, IUserForgotPassword } from '@/types'
import axios from 'axios'
import { toast } from 'react-toastify'

const PRIVATE_API_URL = 'http://localhost:4000/private/' //local


// Get user
const getUser = async (token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.get(PRIVATE_API_URL + 'user', config)
  return data
}

const changePassword = async (changePasswordData: IUserForgotPassword, userId: any, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(PRIVATE_API_URL + `changepassword/${userId}`, changePasswordData, config)

  toast.success(response.data.message as string, { autoClose: 1000 });
  console.log('response', response)
  return response
}



const userService = {
  getUser,
  changePassword
}

export default userService