import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../utils/api";

export interface loginProp {
  email: string;
  password: string;
}

export interface signupProp {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async ({ email, password }: loginProp, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const userSignup = createAsyncThunk(
  "auth/userSignup",
  async ({ name, email, role, password }: signupProp, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/user/signup`, {
        name,
        email,
        role,
        password,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Signup failed");
    }
  }
);
