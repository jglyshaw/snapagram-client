import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: 0,
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setID: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setID } = postSlice.actions

export default postSlice.reducer