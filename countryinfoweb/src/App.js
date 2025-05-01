import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/home';
import CountryDetails from './pages/CountryDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FavCountry from './pages/FavCountry';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('authToken') 
  );
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const handleLogin = (token, username) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
    setIsAuthenticated(true);
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username'); 
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Router>
        <Navbar
          isAuthenticated={isAuthenticated}
          username={username}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/country/:code"
            element={<CountryDetails />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
          />
          <Route path='/favcountry' element={<FavCountry />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
