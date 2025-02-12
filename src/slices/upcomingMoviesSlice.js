import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://imdb236.p.rapidapi.com/imdb/india/upcoming';
const API_OPTIONS = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'c5473e93c1mshe56ac2d8cb1a5fcp17b25cjsn74df0c5f6994',
    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
  }
};

export const fetchUpcomingMovies = createAsyncThunk('movies/fetchUpcoming', async () => {
  const response = await fetch(API_URL, API_OPTIONS);
  if (!response.ok) {
    throw new Error('Failed to fetch upcoming movies');
  }
  const data = await response.json();
  return data;
});

const upcomingMoviesSlice = createSlice({
  name: 'upcomingMovies',
  initialState: {
    movies: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default upcomingMoviesSlice.reducer;
