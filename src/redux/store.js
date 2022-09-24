import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter'
import snackReducer from './snack'
import postReducer from './posts'

export const store = configureStore({
  reducer: {
    counterReducer,
    postReducer,
    snackReducer
  },
})