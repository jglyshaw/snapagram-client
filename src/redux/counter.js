import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
  userPosts: null,
  currentID: 12
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.value = action.payload
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload
    },
    setCurrentID: (state, action) => {
      state.currentID = action.payload
    },
  },
})

export const { setPosts, setCurrentID, setUserPosts } = postSlice.actions

export default postSlice.reducer