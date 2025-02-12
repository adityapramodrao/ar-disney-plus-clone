import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice'; // Add your auth slice here
import movieReducer from './slices/movieSlice';
import upcomingMoviesSlice from './slices/upcomingMoviesSlice'
import mostPopularUsSlice from './slices/mostPopularUs'
import TvShowsSlice from './slices/TVShowsSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    movies: movieReducer,
    upcomingMovies: upcomingMoviesSlice,
    mostPopularUs : mostPopularUsSlice,
    TvShows: TvShowsSlice
  },
});
