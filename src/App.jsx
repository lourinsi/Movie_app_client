import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { MovieInput } from './components/MovieInput';
import { MovieList } from './components/MovieList';
import { Login } from './components/Login'; // Import the new Login component
import { checkAuth, logout } from './authslice'; // Import auth actions
import { fetchMovies } from './movieSlice'; // Import movie thunk

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Check for an existing token on app load and fetch movies if authenticated
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Fetch movies only if the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMovies());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout} style={{ position: 'fixed', top: '10px', right: '10px' }}>
            Logout
          </button>
          <MovieInput />
          <MovieList />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;