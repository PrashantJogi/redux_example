import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./Slice/postSlice"
import usersReducer, { apiSlice } from "./Slice/userSlice"
import notificationReducer from "./Slice/notificationSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
