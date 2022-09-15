import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: 0,
}

export const postSlice = createSlice({
  name: 'currentPost',
  initialState,
  reducers: {
    setCurrentPost: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setCurrentPost } = postSlice.actions

export default postSlice.reducer