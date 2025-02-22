import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://imdb236.p.rapidapi.com/imdb";
const API_OPTIONS = {
  method: 'GET',
	headers: {
		'x-rapidapi-key': 'd4208338admshf8417d0181a9cc7p1ca70djsn993d1b6e26b9',
		'x-rapidapi-host': 'imdb236.p.rapidapi.com'
	}
};

// Fix: Pass movieId as a parameter
export const fetchShowDetails = createAsyncThunk(
  "details/fetchShowDetails",
  async (movieId) => {
    const response = await fetch(`${API_URL}/${movieId}`, API_OPTIONS);
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const result = await response.json();
    console.log(result);
    return result;
  }
);

const DetailsPageSlice = createSlice({
  name: "ShowDetails",
  initialState: {
    details: null, // Fix: Should be null instead of an empty array
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShowDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.details = action.payload; // Fix: Update correct state property
      })
      .addCase(fetchShowDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default DetailsPageSlice.reducer;
