import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn: false,
  account: {username: "undefined"}
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload
    },
    setAccount: (state, action) => {
      state.account = action.payload
    },
  },
})

export const { setLoggedIn, setAccount } = accountSlice.actions

export default accountSlice.reducer