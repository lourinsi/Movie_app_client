import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    token: null,
    isAuthenticated: false,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

// Async thunk for user login
export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:3000/api/login', { username, password });
        
        // Store the token in localStorage
        localStorage.setItem('token', response.data.accessToken);

        // Return the token
        return response.data.accessToken;

    } catch (error) {
        if (error.response && error.response.data.error) {
            return rejectWithValue(error.response.data.error);
        }
        return rejectWithValue(error.message);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Reducer to check for a token in localStorage on app load
        checkAuth: (state) => {
            const token = localStorage.getItem('token');
            if (token) {
                state.token = token;
                state.isAuthenticated = true;
            } else {
                state.token = null;
                state.isAuthenticated = false;
            }
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.token = null;
                state.isAuthenticated = false;
            });
    },
});

export const { checkAuth, logout } = authSlice.actions;
export default authSlice.reducer;