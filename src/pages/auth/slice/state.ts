import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userLogin, userSignup } from "./thunk";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  isLoading: boolean;
  user: User;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  user: {
    id: "",
    name: "",
    email: "",
    role: "",
  },
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(userLogin.rejected, (state) => {
        state.isLoading = false;
      }),
      builder
        .addCase(userSignup.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(userSignup.fulfilled, (state) => {
          state.isLoading = false;
        })
        .addCase(userSignup.rejected, (state) => {
          state.isLoading = false;
        });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
