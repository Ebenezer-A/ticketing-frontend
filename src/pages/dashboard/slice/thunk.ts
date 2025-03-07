import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../utils/api";

interface updateProps {
  id: string;
  status: string;
}

interface createProps {
  title: string;
  description: string;
  status: string;
}

export const getTickets = createAsyncThunk(
  "ticket/getTickets",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${API_URL}/ticket/get`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data.tickets;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch tickets");
    }
  }
);

export const getTicket = createAsyncThunk(
  "ticket/getTicket",
  async (id: string, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${API_URL}/ticket/get/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch ticket");
    }
  }
);

export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (
    { title, description, status = "Open" }: createProps,
    { rejectWithValue }
  ) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${API_URL}/ticket/add`,
        {
          title,
          description,
          status,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create ticket");
    }
  }
);

export const updateTicket = createAsyncThunk(
  "ticket/updateTicket",
  async ({ id, status }: updateProps, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${API_URL}/ticket/update/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update ticket");
    }
  }
);
