import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [], // Aquí se guardarán los tickets
};

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTicket: (state, action) => {
      state.tickets.push(action.payload);
    },
    // Opcional: puedes agregar eliminar, actualizar, etc.
    removeTicket: (state, action) => {
      state.tickets = state.tickets.filter(
        (ticket, index) => index !== action.payload
      );
    },
  },
});

export const { addTicket, removeTicket } = ticketsSlice.actions;

export default ticketsSlice.reducer;
