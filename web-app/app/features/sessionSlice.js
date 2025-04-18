import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customer: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload.customer;
    },
    clearAccessToken: (state) => {
      state.customer = null;
    },
  },
});

export const { setCustomer, clearCustomer } = sessionSlice.actions;

export default sessionSlice.reducer;