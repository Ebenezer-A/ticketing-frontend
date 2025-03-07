import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTicket, getTicket, getTickets, updateTicket } from "./thunk";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface ticketState {
  isLoading: boolean;
  tickets: Ticket[];
  ticket: Ticket;
}

const initialState: ticketState = {
  isLoading: false,
  tickets: [],
  ticket: {
    id: "",
    title: "",
    description: "",
    status: "",
  },
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getTickets.fulfilled,
        (state, action: PayloadAction<Ticket[]>) => {
          state.isLoading = true;
          state.tickets = action.payload;
        }
      )
      .addCase(getTickets.rejected, (state) => {
        state.isLoading = false;
      }),
      builder
        .addCase(createTicket.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createTicket.fulfilled, (state) => {
          state.isLoading = true;
        })
        .addCase(createTicket.rejected, (state) => {
          state.isLoading = false;
        }),
      builder
        .addCase(updateTicket.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateTicket.fulfilled, (state) => {
          state.isLoading = true;
        })
        .addCase(updateTicket.rejected, (state) => {
          state.isLoading = false;
        }),
      builder
        .addCase(getTicket.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(
          getTicket.fulfilled,
          (state, action: PayloadAction<Ticket>) => {
            state.isLoading = true;
            state.ticket = action.payload;
          }
        )
        .addCase(getTicket.rejected, (state) => {
          state.isLoading = false;
        });
  },
});

export const {} = ticketSlice.actions;
export default ticketSlice.reducer;
