import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API URL
const API_URL = "https://api.themoviedb.org/3/discover/movie?api_key=f43ec82a5f24fe6190891894b7436c7a";

// Async Thunk for fetching movies
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      return data.results; // Extract movie list from API response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  movies: [],
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

// Movie slice
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
