import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { MovieInput } from './components/MovieInput';
import { MovieList } from './components/MovieList';
import { Login } from './components/Login';
import { checkAuth, logout } from './authSlice';
import { fetchMovies } from './movieSlice';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMovies());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    // Applied Tailwind classes for overall page layout and background
    <div className="min-h-screen bg-gray-100 p-4 font-sans antialiased">
      {isAuthenticated ? (
        <>
          <button 
            onClick={handleLogout} 
            className="fixed top-4 right-4 py-2 px-4 bg-red-600 text-white rounded-md shadow-lg hover:bg-red-700 transition-colors duration-200 z-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
          >
            Logout
          </button>
          {/* Container for the main movie app content */}
          <div className="container mx-auto p-6 bg-black rounded-xl shadow-2xl mt-16 max-w-2xl">
            <MovieInput />
            <MovieList />
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;