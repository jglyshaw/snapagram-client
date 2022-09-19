import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
  currentID: 12
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.value = action.payload
    },
    setCurrentID: (state, action) => {
      state.currentID = action.payload
    },
  },
})

export const { setPosts, setCurrentID } = postSlice.actions

export default postSlice.reducer