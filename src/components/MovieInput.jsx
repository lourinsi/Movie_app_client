import { useState } from "react";
import { addNewMovie } from "../movieSlice";
import { useDispatch } from "react-redux";

export const MovieInput = () => {
    const [newMovie, setNewMovie] = useState("");
    const dispatch = useDispatch();

    const handleAddMovie = () => {
        if (newMovie.trim()) {
            dispatch(addNewMovie(newMovie));
            setNewMovie("");
        }
    };

    return (
        <div className="flex space-x-3 mb-6">
            <input
                type="text"
                placeholder="Add a new movie"
                value={newMovie}
                onChange={(e) => setNewMovie(e.target.value)}
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleAddMovie}
                className="py-3 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
                Add Movie
            </button>
        </div>
    );
};