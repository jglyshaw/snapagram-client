import { configureStore } from '@reduxjs/toolkit'
import snackReducer from './snack'
import postReducer from './posts'

export const store = configureStore({
  reducer: {
    postReducer,
    snackReducer
  },
})