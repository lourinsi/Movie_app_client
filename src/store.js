import { configureStore } from '@reduxjs/toolkit' 
import movieReducer from './movieSlice';
import authReducer from './authslice'; // Import the auth reducer

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        auth: authReducer, // Add the auth reducer here
    }
});