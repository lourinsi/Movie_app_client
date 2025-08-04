// src\components\MovieInput.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewMovie } from "../movieSlice"; // Import the new async thunk

export const MovieInput = () => {
    const [newMovie, setNewMovie] = useState("");
    const dispatch = useDispatch();

    const handleAddMovie = () => {
        if (newMovie.trim()) {
            // Dispatch the addNewMovie thunk with the movie name
            dispatch(addNewMovie(newMovie));
            setNewMovie("");
        }
    };

    return (
        <>
            <input onChange={(e) => setNewMovie(e.target.value)} value={newMovie}/>
            <button onClick={handleAddMovie}>Add Movie</button>
        </>
    );
};