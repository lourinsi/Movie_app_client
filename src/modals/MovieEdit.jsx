import React, { useState } from 'react';
import { editMovieInDb } from '../movieSlice'; // Import the new async thunk

export const MovieEdit = ({ movie, onClose, dispatch }) => {
  const [newName, setNewName] = useState(movie.name);

  const handleSave = () => {
    if (newName.trim() !== '' && newName !== movie.name) {
      // Dispatch the editMovieInDb thunk with the ID and new name
      dispatch(editMovieInDb({ id: movie.id, newName }));
    }
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '30px',
        borderRadius: '8px',
        width: '400px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
        <h2>Edit Movie: {movie.name}</h2>
        
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #555',
            backgroundColor: '#444',
            color: '#fff',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#555',
            color: '#fff',
            cursor: 'pointer',
          }}>
            Cancel
          </button>
          <button onClick={handleSave} style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
          }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};