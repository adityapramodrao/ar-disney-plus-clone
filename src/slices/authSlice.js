import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  status: 'idle',
  error: null,
};

// Async thunk for login using fetch
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userCredentials.username,
          password: userCredentials.password,
          expiresInMins: 1, // optional
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      return data; // Assuming response contains token and user data
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token; // Assuming the response has 'token'
        state.user = action.payload.user;   // Assuming the response has 'user'
        localStorage.setItem('token', action.payload.token); // Persist token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectUserName  = (state) => state.user.firstName;
export const selectUserEmail  = (state) => state.user.lastName;
export const selectUserImage  = (state) => state.user.image;
export default authSlice;
