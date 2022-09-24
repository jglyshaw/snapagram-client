import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
  showSnack: false
}

export const snackSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setText: (state, action) => {
      state.value = action.payload
      state.showSnack = true
    },
    setShow: (state, action) => {
      state.showSnack = action.payload
    },
  },
})

export const { setText, setShow } = snackSlice.actions

export default snackSlice.reducer