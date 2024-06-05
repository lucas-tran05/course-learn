import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
    logout: { 
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {

    //login slice
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.currentUser = action.payload;
      state.login.isFetching = false;
      state.login.error = false;
    },
    loginFailure: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },

    //register slice
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailure: (state) => {
      state.register.isFetching = false;
      state.register.success = false;
      state.register.error = true;
    },

    //logout
    logoutStart: (state) => {
      state.login.isFetching = true;
    },

    logoutSuccess: (state) => {
      state.login.currentUser = null;
      state.login.isFetching = false;
      state.login.error = false;
      state.login.success = true;
    },

    logoutFailure: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    }

  }
});


export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;

export default authSlice.reducer