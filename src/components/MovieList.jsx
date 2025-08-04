import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Import the new async thunks
import { removeMovieFromDb } from "../movieSlice";
import { MovieEdit } from "../modals/MovieEdit";

export const MovieList = () => {
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(null);

  const handleRemoveMovie = (id) => {
    // Dispatch the removeMovieFromDb thunk with the movie ID
    dispatch(removeMovieFromDb(id));
  };

  const handleEditMovie = (movie) => {
    setMovieToEdit(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMovieToEdit(null);
  };

  return (
    <div>
      <h1>Movie List</h1>
      {movies.map((movie) => (
        <div key={movie.id}>
          {movie.name}
          <button onClick={() => handleRemoveMovie(movie.id)}>
            Delete Movie
          </button>
          <button onClick={() => handleEditMovie(movie)}>Edit Movie</button>
        </div>
      ))}

      {isModalOpen && movieToEdit && (
        <MovieEdit
          movie={movieToEdit}
          onClose={handleCloseModal}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};