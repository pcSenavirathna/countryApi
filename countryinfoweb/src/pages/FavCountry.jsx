import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FavCountryCard from '../components/favCountrycard';

const FavCountry = () => {
  const [favorites, setFavorites] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const authToken = localStorage.getItem('authToken');
		const storedUserId = localStorage.getItem('userId');
		if (authToken && storedUserId) {
			setIsAuthenticated(true);
			setUserId(storedUserId);
		} else {
			setIsAuthenticated(false);
		}
	}, []); 

	useEffect(() => {
		const fetchFavorites = async () => {
			const SERVER_URL = process.env.REACT_APP_SERVER_URL;
			try {
				setIsLoading(true);
				const response = await axios.get(`${SERVER_URL}/api/favorites/${userId}`);
				console.log('Fetched favorites:', response.data);
				setFavorites(response.data);
			} catch (err) {
				console.error('Error fetching favorite countries:', err);
			} finally {
				setIsLoading(false);
			}
		};

		if (isAuthenticated && userId) {
			fetchFavorites();
		}
	}, [isAuthenticated, userId]); // Trigger fetch when isAuthenticated or userId changes

	if (!isAuthenticated) {
		return (
			<div className="p-6 text-center text-red-500">
				<h2 className="text-2xl font-bold">Please log in to view your favorite countries.</h2>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="p-6 text-center text-gray-500">
				<h2 className="text-xl font-bold">Loading your favorite countries...</h2>
			</div>
		);
	}

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Favorite Countries</h2>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">You have not added any favorite countries yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((country) => (
			  <FavCountryCard
              key={country.cca3}
				  country={{
					  ...country,
					  name: { common: country.name },
					  capital: Array.isArray(country.capital) ? country.capital : [country.capital],
					  flags: { svg: country.flag },
				  }}
              isAuthenticated={isAuthenticated}
              userId={userId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavCountry;