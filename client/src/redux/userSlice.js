import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users:{
      allUsers: null,
      isFetching: false,
      error: false,
    },
    deleteUser: {
      deleteUser: null,
      isFetching: false,
      success: false,
      error: false,
    }
  },
  reducers: {
    getUsersStart: (state) => {
      state.users.isFetching = true;
    },

    getUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
      state.users.error = false;
    },

    getUsersFailure: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },

    deleteUserStart: (state) => {
      state.users.isFetching = true;
    },

    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.deleteUser = action.payload;
      state.users.error = false;
      state.users.success = true;
    },

    deleteUserFailure: (state) => {
      state.users.isFetching = false;
      state.users.error = true; 
      state.users.success = false;
    }
  }
})

export const {getUsersStart, getUsersSuccess, getUsersFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure} = userSlice.actions;
export default userSlice.reducer