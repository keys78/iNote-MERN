import { Auth } from '@/features/auth/authSlice';
import { IToken, IUser } from '@/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import boardService from './boardService';


const storedToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
const token2 = storedToken ? JSON.parse(storedToken) : '';



interface IBoard {
  board: any,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  message:any;
}

const initialState: IBoard = {
  board: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


// get board
export const getBoard = createAsyncThunk<{}, { id: string | string[] | undefined; }>(
  'get-board',
  async ({ id }, thunkAPI) => {
    const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
    try {
      return await boardService.getBoard(id, token)
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.error) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
);



// create board
export const createNewBoard = createAsyncThunk<{}, void>(
  'create-board',
  async (boardData, thunkAPI) => {
    const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
    try {
      return await boardService.createNewBoard(boardData, token)
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.error) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// delete board
export const deleteBoard = createAsyncThunk<any, string>(
  'delete-board',
  async (id, thunkAPI) => {
    const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
    try {
      await boardService.deleteBoard(id, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.error) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
);



export const privateSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    resetUser: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoard.pending as any, (state) => {
        state.isLoading = true
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.board = action.payload
      })
      .addCase(getBoard.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        switch (action.type) {
          case 'SET_MESSAGE': {
            state.message = action.payload as string
            return state
          }
        }
      })
      .addCase(deleteBoard.pending, (state) => {
        state.isLoading = true
      })
      // .addCase(deleteBoard.fulfilled, (state, { payload, payload: { message } }) => {
      //   state.isLoading = false
      //   state.isSuccess = true
      //   state.board = state?.board.filter((board: any) => board._id !== payload._id )
      //   state.message = message ?? 'unable to delete board'
      // })
      
      
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        if(Array.isArray(state.board)) {
          state.board = state.board.filter((board: any) => board._id !== action?.payload?._id )
        }
        state.message = action?.payload?.message! || 'unable to delete board'
      })
      // .addCase(deleteBoard.fulfilled, (state, action) => {
      //   state.isLoading = false
      //   state.isSuccess = true
      //   if (action.payload && action.payload._id) {
      //     state.board = state.board.filter((board: any) => board._id !== action.payload._id )
      //     state.message = action.payload.message || 'unable to delete board'
      //   } else {
      //     state.message = 'unable to delete board'
      //   }
      // })
      
      
      .addCase(deleteBoard.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload|| 'unable to delete board'
      })
  },
})

export const { resetUser } = privateSlice.actions
export default privateSlice.reducer

