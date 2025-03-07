import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../pages/auth/slice/state.ts";
import ticketReducer from "../pages/dashboard/slice/state.ts";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    ticketReducer: ticketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
