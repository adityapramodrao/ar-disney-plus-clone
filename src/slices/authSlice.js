import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Load stored user and token from localStorage
const storedUser = JSON.parse(localStorage.getItem('user')) || null;
const storedToken = localStorage.getItem('token') || null;

// Define the initial state
const initialState = {
  token: storedToken,
  user: storedUser,
  status: 'idle',
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userCredentials.username,
          password: userCredentials.password,
          expiresInMins: 5, // Increase session time
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      return data; // API returns { accessToken, refreshToken, user }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk for refreshing token
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const refreshToken = getState().auth.user?.refreshToken;
      if (!refreshToken) throw new Error('No refresh token available');

      const response = await fetch('https://dummyjson.com/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      return data; // API returns new accessToken
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.accessToken;
        state.user = action.payload; // Save full user data
        localStorage.setItem('token', action.payload.accessToken);
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        localStorage.setItem('token', action.payload.accessToken);
      })
      .addCase(refreshToken.rejected, (state) => {
        state.token = null;
        state.user = null;
        localStorage.clear();
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
