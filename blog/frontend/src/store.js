import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/user";
import blogReducer from "./features/blog/blog";

const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
  },
});

export default store;
