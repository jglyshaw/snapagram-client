import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter'
import postReducer from './posts'
import accountReducer from './account'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postReducer,
    account: accountReducer
  },
})