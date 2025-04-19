import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customer: null,
  selectedEmployee: null,
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
    setSelectedEmployee: (state, action) => {
      console.log('Setting selected employee:', action.payload.selectedEmployee);
      state.selectedEmployee = action.payload.selectedEmployee;
    },
  },
});

export const { setCustomer, clearCustomer, setSelectedEmployee } = sessionSlice.actions;

export default sessionSlice.reducer;