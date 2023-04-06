import { IToken } from '@/types'
import axios from 'axios'
import { toast } from 'react-toastify'

const PRIVATE_API_URL = 'http://localhost:4000/private/' //local
const toastOptions = {
  autoClose: 2000,
  hideProgressBar: true,
};



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


const createNewBoard = async (boardData: unknown, token: IToken, router: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.post(PRIVATE_API_URL + `create-board`, boardData, config)

  const boardId = data?._id
  router.push(`/user/board/${boardId}`)

  toast.success(data?.message, toastOptions);
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
  toast.success(data?.message, toastOptions);
  return data
}

// delete board
const deleteBoard = async (id: string, token: IToken, router: any, user: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.delete(PRIVATE_API_URL + `delete-board/${id}`, config)
  if (data) {
    router.push('/user/dashboard')
  }

  // router.push(`${user?.boards[0]?._id}`)
  // if (user?.boards?.length > 1) {
  //   router.push('/user/dashboard')
  //   router.replace(`/user/board/${user.boards[0]._id}`)
  // } else {
  //   // Redirect the user to a different page if there are no boards left
  //   router.push('/user/dashboard')
  // }

  toast.success(data?.message, toastOptions);
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
  toast.success(data?.message, toastOptions);
  return data
}

// edit Task
const editTask = async (nodeId: any, taskData: unknown, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.patch(PRIVATE_API_URL + `update-note/${nodeId}`, taskData, config)
  toast.success(data?.message, toastOptions);
  return data
}

// delete Task
const deleteTask = async (boardId: any, noteId: any, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.delete(PRIVATE_API_URL + `deleteNote/${boardId}/${noteId}`, config)
  toast.success(data?.message, toastOptions);
  return data
}




const userService = {
  getBoard,
  createNewBoard,
  editBoard,
  deleteBoard,

  addTask,
  editTask,
  deleteTask

}
export default userService