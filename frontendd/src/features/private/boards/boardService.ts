import { IToken } from '@/types'
import axios, { AxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'

const PRIVATE_API_URL = 'http://localhost:4000/private/' //local


// Get board
const getBoard = async (id: any, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.get(PRIVATE_API_URL + `get-board/${id}`, config)
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
  const { data } = await axios.post(PRIVATE_API_URL + `create-board`, boardData, config)
  return data
}

// create board
const editBoard = async (id: any, boardData: unknown, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.patch(PRIVATE_API_URL + `edit-board/${id}`, boardData, config)
  toast.success(data?.message)
  return data
}

// delete board
const deleteBoard = async (id: string, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.delete(PRIVATE_API_URL + `delete-board/${id}`, config)
  return data
}

// add Task
const addTask = async (boardId: any, taskData: unknown, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.post(PRIVATE_API_URL + `create-note/${boardId}`, taskData, config)
  toast.success(data?.message)
  return data
}




const userService = {
  getBoard,
  createNewBoard,
  editBoard,
  deleteBoard,
  
  addTask

}
export default userService