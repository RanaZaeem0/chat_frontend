import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import api from "../api/api";
import miscSlice from "./misc";
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [api.reducerPath]: api.reducer,
    [miscSlice.name]: miscSlice.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware],
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;

export default store;
