import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/user/user";

const store = configureStore({
  reducer: {
    user: authReducer,
  },
});

export default store;
