import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CountryCard({ country, isAuthenticated, userId }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const SERVER_URL = process.env.REACT_APP_SERVER_URL;
        const response = await axios.get(`${SERVER_URL}/api/favorites/${userId}`);
        const favoriteCountries = response.data;

        const isFav = favoriteCountries.some((fav) => fav.cca3 === country.cca3);
        setIsFavorite(isFav);
      } catch (err) {
        console.error('Error fetching favorites:', err);
      }
    };

    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [isAuthenticated, userId, country.cca3]);

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const SERVER_URL = process.env.REACT_APP_SERVER_URL;
      const response = await axios.post(`${SERVER_URL}/api/favorites/toggle`, {
        userId,
        country: {
          cca3: country.cca3,
          name: country.name.common,
          flag: country.flags.svg || '', // Fallback to an empty string if undefined
          population: country.population,
          region: country.region,
        },
      });

      console.log(response.data.message);
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  return (
    <div
      className="bg-indigo-200 dark:bg-gray-800 border-[2px] dark:border-gray-700 text-black dark:text-white p-4 rounded shadow hover:shadow-2xl transition-all transform hover:-translate-y-2 relative"
      onClick={() => navigate(`/country/${country.cca3}`)}
    >
      {/* Flag */}
      <div className="overflow-hidden rounded">
        <img
          src={country.flags?.svg || 'https://via.placeholder.com/150'}
          alt={country.name?.common || 'Country flag'} 
          className="w-full h-40 object-cover rounded transform transition-transform duration-300 hover:scale-110"
        />
      </div>
      <h2 className="text-xl font-bold mt-2">{country.name?.common || 'Unknown Country'}</h2>
      <p>
        <strong>Capital:</strong>{country.capital?.[0] || 'N/A'}
      </p>
      <p>
        <strong>Population:</strong> {country.population?.toLocaleString() || 'N/A'}
      </p>
      <p>
        <strong>Region:</strong> {country.region || 'N/A'}
      </p>
      {/* Heart Icon */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleFavoriteClick();
        }}
        className={`absolute bottom-4 right-4 cursor-pointer text-2xl flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md bg-white/30 border border-white/50 shadow-lg ${isFavorite ? 'text-red-500' : 'text-gray-400'} transition-colors hover:bg-white/50 hover:scale-110`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
