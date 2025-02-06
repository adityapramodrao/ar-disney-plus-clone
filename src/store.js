import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice'; // Add your auth slice here

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
