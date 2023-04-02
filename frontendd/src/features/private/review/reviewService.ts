import { IToken } from '@/types'
import axios from 'axios'
import { toast } from 'react-toastify'

const PRIVATE_API_URL = 'http://localhost:4000/private/' //local
const toastOptions = {
  autoClose: 2000,
  hideProgressBar: true,
};



// Get review
const getAllReviews = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const { data } = await axios.get(PRIVATE_API_URL + `get-all-reviews`, config)
  return data
}

// create review
const postReview = async (reviewData: unknown, userId:any, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.post(PRIVATE_API_URL + `post-review/${userId}`, reviewData, config)

  toast.success(data?.message, toastOptions);
  return data
}

// create review
const editReview = async (id: any, reviewData: unknown, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.patch(PRIVATE_API_URL + `edit-review/${id}`, reviewData, config)
  toast.success(data?.message, toastOptions);
  return data
}




const reviewService = {
  getAllReviews,
  postReview,
  editReview,
 
}
export default reviewService;