import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeMovieFromDb } from "../movieSlice";
import { MovieEdit } from "../modals/MovieEdit";

export const MovieList = () => {
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(null);

  const handleRemoveMovie = (id) => {
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
      <h1 className="text-3xl font-extrabold text-gray-200 mb-6 text-center">Movie List</h1>
      <div className="space-y-4">
        {movies.length === 0 ? (
          <p className="text-gray-600 text-center">No movies added yet.</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <span className="text-lg font-medium text-gray-800">{movie.name}</span>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleRemoveMovie(movie.id)}
                  className="py-2 px-4 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditMovie(movie)}
                  className="py-2 px-4 bg-yellow-500 text-white rounded-md shadow-sm hover:bg-yellow-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

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