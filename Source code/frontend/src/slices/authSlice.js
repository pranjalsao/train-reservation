
import { createSlice } from '@reduxjs/toolkit';

// create an auth slice to maintain the user signin status
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // user is not logged in
    status: false,
  },
  reducers: {
    signin: (state, action) => {
      // the user is now signed in
      state.status = true

      sessionStorage['token'] = "Bearer " + action.payload['jwt']
      sessionStorage['id'] = action.payload['userId']
      sessionStorage['role'] = action.payload['role']

    },
    signout: (state, action) => {
      // the user is signed out
      state.status = false

      // remove the user token and name from sessionStorage
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('id')
      sessionStorage.removeItem('role')
    },
  },
})

// export the reducer for authSlice
export default authSlice.reducer

// export the actions
export const { signin, signout } = authSlice.actions
