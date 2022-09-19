import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn: false,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.loggedIn = action.payload
    },
  },
})

export const { setAccount } = accountSlice.actions

export default accountSlice.reducer