import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter'
import accountReducer from './account'
import postReducer from './posts'

export const store = configureStore({
  reducer: {
    counterReducer,
    postReducer,
    accountReducer,
  },
})