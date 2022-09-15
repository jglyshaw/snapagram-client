import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setAccount } = accountSlice.actions

export default accountSlice.reducer