import React, { useState } from 'react';
import { editMovieInDb } from '../movieSlice';

export const MovieEdit = ({ movie, onClose, dispatch }) => {
  const [newName, setNewName] = useState(movie.name);

  const handleSave = () => {
    if (newName.trim() !== '' && newName !== movie.name) {
      dispatch(editMovieInDb({ id: movie.id, newName }));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[1000]">
      <div className="bg-gray-800 text-white p-8 rounded-xl w-96 shadow-2xl flex flex-col space-y-6 transform scale-100 transition-transform duration-300 ease-out">
        <h2 className="text-2xl font-bold text-center mb-2">Edit Movie: {movie.name}</h2>
        
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="p-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          placeholder="Enter new movie name"
        />

        <div className="flex justify-end space-x-4 mt-4">
          <button 
            onClick={onClose} 
            className="py-2.5 px-5 border-none rounded-lg bg-gray-600 hover:bg-gray-500 text-white cursor-pointer transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="py-2.5 px-5 border-none rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};