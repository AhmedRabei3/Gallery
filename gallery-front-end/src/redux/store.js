import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReduser } from "./slices/profileSlice";
import { imagesReduser } from "./slices/imageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReduser,
    images : imagesReduser,
  },
});

export default store;
