import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://imdb236.p.rapidapi.com/imdb/most-popular-tv';
const API_OPTIONS = {
  method: 'GET',
	headers: {
		'x-rapidapi-key': 'c5473e93c1mshe56ac2d8cb1a5fcp17b25cjsn74df0c5f6994',
		'x-rapidapi-host': 'imdb236.p.rapidapi.com'
	}
};

export const fetchTvShows = createAsyncThunk('Shows/fetchTvShows', async () => {
  const response = await fetch(API_URL, API_OPTIONS);
  if (!response.ok) {
    throw new Error('Failed to fetch upcoming Shows');
  }
  const data = await response.json();
  return data;
});

const TvShowsSlice = createSlice({
  name: 'TvShows',
  initialState: {
    Shows: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTvShows.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTvShows.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.Shows = action.payload;
      })
      .addCase(fetchTvShows.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default TvShowsSlice.reducer;
