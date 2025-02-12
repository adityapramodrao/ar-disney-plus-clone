import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://imdb236.p.rapidapi.com/imdb/top-box-office';
const API_OPTIONS = {
  method: 'GET',
	headers: {
		'x-rapidapi-key': 'c5473e93c1mshe56ac2d8cb1a5fcp17b25cjsn74df0c5f6994',
		'x-rapidapi-host': 'imdb236.p.rapidapi.com'
	}
};

export const fetchmostPopularUs = createAsyncThunk('movies/fetchmostPopularUs', async () => {
  const response = await fetch(API_URL, API_OPTIONS);
  if (!response.ok) {
    throw new Error('Failed to fetch upcoming movies');
  }
  const data = await response.json();
  return data;
});

const mostPopularUsSlice = createSlice({
  name: 'mostPopularUs',
  initialState: {
    movies: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchmostPopularUs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchmostPopularUs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchmostPopularUs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default mostPopularUsSlice.reducer;
