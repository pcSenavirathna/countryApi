import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import mainbg from '../assets/mnbg.jpg';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [popularCountries, setPopularCountries] = useState([]);
  const isAuthenticated = !!localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => {
        const sortedCountries = res.data.sort((a, b) => b.population - a.population);
        setCountries(res.data);
        setFiltered(res.data);
        setPopularCountries(sortedCountries.slice(0, 10));
      })
      .catch((err) => {
        console.error('Error fetching countries:', err);
      });
  }, []);

  useEffect(() => {
    const scrollContainer = document.querySelector('.horizontal-scroll');
    let scrollAmount = 0;

    const autoScroll = () => {
      if (scrollContainer) {
        scrollAmount += 2; // Adjust scroll speed
        scrollContainer.scrollLeft = scrollAmount;

        if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollAmount = 0; // Reset scroll
        }
      }
    };

    const interval = setInterval(autoScroll, 50); // Adjust interval speed
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [popularCountries]);

  const handleSearch = (query) => {
    if (query) {
      axios
        .get(`https://restcountries.com/v3.1/name/${query}`)
        .then((res) => setFiltered(res.data))
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            setFiltered([]);
          } else {
            console.error('Error searching countries:', err);
          }
        });
    } else {
      setFiltered(countries);
    }
  };

  const handleFilter = (region) => {
    if (region === 'All') return setFiltered(countries);
    axios
      .get(`https://restcountries.com/v3.1/region/${region}`)
      .then((res) => setFiltered(res.data))
      .catch((err) => {
        console.error('Error filtering countries:', err);
      });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded shadow"
     style={{
            backgroundImage: `url(${mainbg})`,
          }}
    >

      {/* Horizontal Scrolling Section */}
      <div className="horizontal-scroll overflow-x-auto whitespace-nowrap mb-6 no-scrollbar">
        <div className="flex space-x-4">
          {popularCountries.map((country) => (
            <div
              key={country.cca3}
              className="inline-block bg-white dark:bg-gray-800 border-[2px] dark:border-gray-700 text-white dark:text-white p-4 rounded shadow hover:shadow-lg transition-transform transform hover:scale-105"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                minWidth: '200px',
              }}
            >
              <img
                src={country.flags.svg}
                alt={country.name.common}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-2">{country.name.common}</h3>
              <p className="text-sm text-white dark:text-white">
                Population: {country.population.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter Section */}
      <SearchBar onSearch={handleSearch} />
      <Filter onFilter={handleFilter} />

      {/* Country Grid */}
      <div className="grid grid-cols-1 cursor-pointer sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filtered.map((c) => (
          <CountryCard
            key={c.cca3}
            country={c}
            isAuthenticated={isAuthenticated}
            userId={userId}
          />
        ))}
      </div>

      {/* Favorites Section */}
      {/* <div>
        <h2 className="text-2xl font-bold mb-4">Favorite Countries</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              isAuthenticated={isAuthenticated}
              userId={userId}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
}
