import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './user/usersSlice'

export const store = configureStore({
  reducer: {
    users: usersSlice
  },
})