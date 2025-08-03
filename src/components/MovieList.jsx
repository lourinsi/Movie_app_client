import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeMovie } from "../movieSlice";
import { MovieEdit } from "../modals/MovieEdit";

export const MovieList = () => {
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(null);

  const handleRemoveMovie = (id) => {
    dispatch(removeMovie(id));
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
          // Pass the dispatch function to the modal
          dispatch={dispatch} 
        />
      )}
    </div>
  );
};