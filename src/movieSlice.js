import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    movies: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// Function to get the JWT token from localStorage
const getToken = () => {
    return localStorage.getItem('token');
};

// Define async thunks for API calls
const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await axios.get('http://localhost:3000/api/movies');
    return response.data;
});

const addNewMovie = createAsyncThunk('movies/addNewMovie', async (movieName, { rejectWithValue }) => {
    try {
        const token = getToken();
        const response = await axios.post(
            'http://localhost:3000/api/movies',
            { name: movieName },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // <-- ADDED THIS LINE
                },
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || error.message);
    }
});

const removeMovieFromDb = createAsyncThunk('movies/removeMovieFromDb', async (movieId, { rejectWithValue }) => {
    try {
        const token = getToken();
        await axios.delete(
            `http://localhost:3000/api/movies/${movieId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // <-- ADDED THIS LINE
                },
            }
        );
        return movieId;
    } catch (error) {
        return rejectWithValue(error.response.data.message || error.message);
    }
});

const editMovieInDb = createAsyncThunk('movies/editMovieInDb', async ({ id, newName }, { rejectWithValue }) => {
    try {
        const token = getToken();
        const response = await axios.put(
            `http://localhost:3000/api/movies/${id}`,
            { name: newName },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // <-- ADDED THIS LINE
                },
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || error.message);
    }
});

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetching movies
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
            // Adding a new movie
            .addCase(addNewMovie.fulfilled, (state, action) => {
                state.movies.push(action.payload);
            })
            .addCase(addNewMovie.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message; // <-- ADDED THIS
                console.error("Error adding movie:", action.payload); // Debug log
            })
            // Removing a movie
            .addCase(removeMovieFromDb.fulfilled, (state, action) => {
                state.movies = state.movies.filter(
                    (movie) => movie.id !== action.payload
                );
            })
            .addCase(removeMovieFromDb.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message; // <-- ADDED THIS
                console.error("Error removing movie:", action.payload); // Debug log
            })
            // Editing a movie
            .addCase(editMovieInDb.fulfilled, (state, action) => {
                const { id, name } = action.payload;
                const existingMovie = state.movies.find(movie => movie.id === id);
                if (existingMovie) {
                    existingMovie.name = name;
                }
            })
            .addCase(editMovieInDb.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message; // <-- ADDED THIS
                console.error("Error editing movie:", action.payload); // Debug log
            });
    },
});

export { fetchMovies, addNewMovie, removeMovieFromDb, editMovieInDb };
export default movieSlice.reducer;