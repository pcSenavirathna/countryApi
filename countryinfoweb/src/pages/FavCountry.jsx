import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FavCountryCard from '../components/favCountrycard';

const FavCountry = () => {
  const [favorites, setFavorites] = useState([]);
  const isAuthenticated = !!localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				const serverUrl = process.env.REACT_APP_SERVER_URL;
				const response = await axios.get(`${serverUrl}/api/favorites/${userId}`);
				console.log('Fetched favorites:', response.data); // Log the data structure
				setFavorites(response.data);
			} catch (err) {
				console.error('Error fetching favorite countries:', err);
			}
		};

		if (isAuthenticated) {
			fetchFavorites();
		}

	}, [isAuthenticated, userId]);

	if (!isAuthenticated) {
		return (
			<div className="p-6 text-center text-red-500">
				<h2 className="text-2xl font-bold">Please log in to view your favorite countries.</h2>
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
					  name: { common: country.name }, // Map `name` to `name.common`
					  capital: Array.isArray(country.capital) ? country.capital : [country.capital], // Ensure `capital` is an array
					  flags: { svg: country.flag }, // Map `flag` to `flags.svg`
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