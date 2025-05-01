import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgimg from '../assets/logbg.jpg';

export default function Login({ onLogin }) {
  const [identifier, setIdentifier] = useState(''); // Can be username or email
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const response = await axios.post(`${serverUrl}/api/users/login`, {
        identifier,
        password,
      });

      const { data } = response;


      localStorage.setItem('authToken', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('userId', data._id);


      onLogin(data.token, data.username);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message); // Display server error message
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgimg})`,
      }}
    >
      <div
        className="max-w-md w-full p-8 rounded-lg shadow-lg"
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <h1 className="text-3xl font-bold text-center text-white dark:white mb-6">
          Welcome Back!
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white dark:text-white mb-1">
              Username or Email
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter your username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white dark:text-white mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition font-semibold"
          >
            Login
          </button>
        </form>
        <p className="text-center text-white dark:text-white mt-4">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-green-500 font-bold hover:underline dark:text-green-500"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}