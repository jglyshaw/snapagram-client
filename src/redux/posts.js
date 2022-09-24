import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
  userPosts: null,
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
  },
})

export const { setPosts, setUserPosts } = postSlice.actions

export default postSlice.reducer