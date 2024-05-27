import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    registerMessage: null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.registerMessage = null;
    },
    register(state, action) {
      state.registerMessage = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    setUserPhoto(state, action) {
      state.user.profilePhoto = action.payload;
    },
    setUpdateUsername(state, action) {
      state.user.username = action.payload.username;
    },
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authReducer, authActions };
