import { IToken } from '@/types'
import axios from 'axios'

const PRIVATE_API_URL = 'http://localhost:4000/' //local
// const PRIVATE_API_URL = 'https://arctic-travels-api.cyclic.app/private/'


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



export {
    getUser
}