import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  access_token: null,
  refresh_token: null,
  avatar: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.user = action.payload.user || null;
      state.avatar = action.payload.avatar || null;

      AsyncStorage.setItem("access_token", action.payload.access_token);
      AsyncStorage.setItem("refresh_token", action.payload.refresh_token);
    },

    logout(state) {
      state.isLoggedIn = false;
      state.access_token = null;
      state.refresh_token = null;
      state.user = null;
      state.avatar = null;

      AsyncStorage.removeItem("access_token");
      AsyncStorage.removeItem("refresh_token");
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
