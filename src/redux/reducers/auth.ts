import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  avatar: {
    public_id: string;
    url: string;
  };
  _id: string;
  name: string;
  bio: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  loader: boolean;
  isAdmin: boolean;
}

const initialState: AuthState = {
  user: null,
  loader: true,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExited: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExited: (state) => {
      state.user = null;
      state.loader = false;
    },
  },
});

export default authSlice;

export const { userExited, userNotExited } = authSlice.actions;
