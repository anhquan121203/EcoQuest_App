import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  avatar: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user || null;
      state.avatar = action.payload.avatar || null;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.avatar = null;
    },
    setUser(state, action) {
      state.user = action.payload.user;
      if (action.payload.avatar) {
        state.avatar = action.payload.avatar;
      }
    },
    
  },
});


export const { login, logout, setUser } = authSlice.actions;
export default authSlice;
