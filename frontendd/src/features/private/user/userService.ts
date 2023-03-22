import { IToken } from '@/types'
import axios from 'axios'

const PRIVATE_API_URL = 'http://localhost:4000/private/' //local


// Get user
const getUser = async (token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const {data} = await axios.get(PRIVATE_API_URL + 'user', config)
  return data
}



const userService =  {
    getUser
}

export default userService