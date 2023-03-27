import authReducer from '@/features/auth/authSlice'
import boardReducer from '@/features/private/boards/boardSlice'
import userReducer from '@/features/private/user/userSlice'
import { configureStore } from '@reduxjs/toolkit'



export const store = configureStore({
  reducer: {
        auth: authReducer,
        user: userReducer,
        board: boardReducer
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

