
//src\movieSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    movies: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// Define async thunks for API calls
const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await axios.get('http://localhost:3000/api/movies');
    return response.data;
});

const addNewMovie = createAsyncThunk('movies/addNewMovie', async (movieName) => {
    const response = await axios.post('http://localhost:3000/api/movies', { name: movieName });
    return response.data;
});

const removeMovieFromDb = createAsyncThunk('movies/removeMovieFromDb', async (movieId) => {
    await axios.delete(`http://localhost:3000/api/movies/${movieId}`);
    return movieId;
});

const editMovieInDb = createAsyncThunk('movies/editMovieInDb', async ({ id, newName }) => {
    const response = await axios.put(`http://localhost:3000/api/movies/${id}`, { name: newName });
    return response.data;
});

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {}, // No synchronous reducers needed now
    extraReducers: (builder) => {
        builder
            // Handle fetching movies
            .addCase(fetchMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Handle adding a new movie
            .addCase(addNewMovie.fulfilled, (state, action) => {
                state.movies.push(action.payload);
            })
            // Handle removing a movie
            .addCase(removeMovieFromDb.fulfilled, (state, action) => {
                state.movies = state.movies.filter(
                    (movie) => movie.id !== action.payload
                );
            })
            // Handle editing a movie
            .addCase(editMovieInDb.fulfilled, (state, action) => {
                const { id, name } = action.payload;
                const existingMovie = state.movies.find(movie => movie.id === id);
                if (existingMovie) {
                    existingMovie.name = name;
                }
            });
    },
});

// We only export the async thunks now
export { fetchMovies, addNewMovie, removeMovieFromDb, editMovieInDb };
export default movieSlice.reducer;