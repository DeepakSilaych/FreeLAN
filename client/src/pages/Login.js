import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userType, setUserType] = useState('client');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleTabChange = (type) => {
    setUserType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/user/login/', {
        username: username,
        password: password,
        role: userType,
      });
      console.log(response.data);
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('username', username);
      localStorage.setItem('role', userType);
      navigate('/');

    } catch (error) {
      setError('Invalid credentials or role');
      console.error(error); 
    };
  }

  return (
    <div className="flex justify-center items-center w-full h-screen dark:bg-slate-700">
      <div className="w-full max-w-sm py-10 pb-20 mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <h2 className="text-3xl p-1 text-center text-gray-800 font-semibold border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:text-white dark:shadow-md">
              FreeLAN
            </h2>
          </div>

          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Welcome Back
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center mt-6">
              <div
                className={`px-4 py-2 mr-2 text-sm font-medium pointer ${
                  userType === 'client'
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 hover:border-b-2 hover:border-blue-500'
                }`}
                onClick={() => handleTabChange('client')}
              >
                Client
              </div>
              <div
                className={`px-4 py-2 text-sm font-medium pointer ${
                  userType === 'developer'
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 hover:border-b-2 hover:border-blue-500'
                }`}
                onClick={() => handleTabChange('developer')}
              >
                Developer
              </div>
            </div>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 dark:text-white placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Username"
                aria-label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 dark:text-white placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-red-500 mt-2 text-sm text-center">{error}</div>
            )}

            <div className="flex items-center justify-between mt-4">
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
              >
                Forget Password?
              </a>

              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default Login;