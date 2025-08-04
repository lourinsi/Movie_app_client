import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../authSlice';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const authStatus = useSelector((state) => state.auth.status);
    const error = useSelector((state) => state.auth.error);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
    };

    return (
      <div className="p-8 border border-gray-300 rounded-lg max-w-xs mx-auto my-12 bg-white shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
          <form onSubmit={handleLogin} className="space-y-5">
              <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username:</label>
                  <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
              </div>
              <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
                  <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
              </div>
              <button 
                type="submit" 
                className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                disabled={authStatus === 'loading'}
              >
                  {authStatus === 'loading' ? 'Logging In...' : 'Login'}
              </button>
          </form>
          {error && <p className="text-red-600 text-sm mt-4 text-center font-medium">{error}</p>}
      </div>
    );
};