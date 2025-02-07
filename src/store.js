import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice'; // Add your auth slice here
import movieReducer from './slices/movieSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    movies: movieReducer,
  },
});
