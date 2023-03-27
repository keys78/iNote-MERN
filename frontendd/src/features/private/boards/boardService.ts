import { IToken } from '@/types'
import axios, { AxiosRequestConfig } from 'axios'

const PRIVATE_API_URL = 'http://localhost:4000/private/' //local


// Get board
const getBoard = async (id:any, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const {data} = await axios.get(PRIVATE_API_URL + `get-board/${id}`, config)
  return data
}

// create board
const createNewBoard = async (boardData: unknown, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const {data} = await axios.post(PRIVATE_API_URL + `create-board`, boardData, config)
  return data
}


// add column
const addNewColumn = async (id:any, columnData: unknown, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const {data} = await axios.post(PRIVATE_API_URL + `add-column/${id}`, columnData, config)
  return data
}

// add column
const deleteColumn = async (id:any, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const {data} = await axios.delete(PRIVATE_API_URL + `delete-column/${id}`, config)
  return data
}




const userService =  {
    getBoard,
    createNewBoard,
    addNewColumn,
    deleteColumn
}

export default userService