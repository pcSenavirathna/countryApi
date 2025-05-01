import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgimg from '../assets/logbg.jpg'; 

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      await axios.post(`${serverUrl}/api/users/signup`, {
        username,
        email,
        password,
        rePassword,
      });
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-900"
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
        <h1 className="text-3xl font-bold text-center text-white dark:text-white mb-6">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white dark:text-white mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white dark:text-white mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white dark:text-white mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white dark:text-white mb-1">
              Re-enter Password
            </label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Re-enter your password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition font-semibold"
          >
            Signup
          </button>
        </form>
        <p className="text-center text-white dark:text-white mt-4">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-green-500 hover:underline dark:text-green-500 font-bold"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}