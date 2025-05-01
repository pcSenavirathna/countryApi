import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Map from '../components/Map';
import 'leaflet/dist/leaflet.css';
import mainbg from '../assets/mnbg.jpg';

export default function CountryDetails() {
	const { code } = useParams();
	const navigate = useNavigate();
	const [country, setCountry] = useState(null);
	const [isFavorite, setIsFavorite] = useState(false);
	const isAuthenticated = !!localStorage.getItem('authToken');
	const userId = localStorage.getItem('userId');

	useEffect(() => {
		axios
			.get(`https://restcountries.com/v3.1/alpha/${code}`)
			.then((res) => {
				setCountry(res.data[0]);

				// Check if the country is already in favorites
				if (isAuthenticated) {
					axios
						.get(`http://localhost:5000/api/favorites/${userId}`)
						.then((response) => {
							const favoriteCountries = response.data;
							const isFav = favoriteCountries.some((fav) => fav.cca3 === res.data[0].cca3);
							setIsFavorite(isFav);
						})
						.catch((err) => console.error('Error fetching favorites:', err));
				}
			})
			.catch((err) => console.error('Error fetching country details:', err));
	}, [code, isAuthenticated, userId]);

	const handleFavoriteClick = async () => {
		if (!isAuthenticated) {
			navigate('/login');
			return;
		}

		try {
			const response = await axios.post('http://localhost:5000/api/favorites/toggle', {
				userId,
				country: {
					cca3: country.cca3,
					name: country.name.common,
					flag: country.flags.svg || '',
					population: country.population,
					region: country.region,
					capital: country.capital || [],
				},
			});

			console.log(response.data.message);
			setIsFavorite(!isFavorite);
		} catch (err) {
			console.error('Error toggling favorite:', err);
		}
	};

	if (!country) return <p className="p-4 text-center text-gray-500">Loading country details...</p>;

	// Extract additional details
	const currencies = country.currencies
		? Object.values(country.currencies)
			.map((currency) => `${currency.name} (${currency.symbol})`)
			.join(', ')
		: 'N/A';

	const demonym = country.demonyms?.eng?.m || 'N/A'; // How a citizen is called
	const callingCode = country.idd?.root
		? `${country.idd.root}${country.idd.suffixes?.[0] || ''}`
		: 'N/A'; // Calling code
	const translations = country.translations
		? Object.values(country.translations)
			.map((translation) => translation.common)
			.join(', ')
		: 'N/A'; // Translation names

	return (
		<div
			className="p-6 mx-auto rounded-lg shadow-lg bg-white dark:bg-gray-800"
			style={{
				backgroundImage: `url(${mainbg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backdropFilter: 'blur(10px)',
				WebkitBackdropFilter: 'blur(10px)',
				border: '1px solid rgba(255, 255, 255, 0.2)',
				boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
			}}
		>
			{/* Country Flag */}
			<div className="flex justify-center mb-6">
				<div className="overflow-hidden rounded shadow-lg hover:scale-110 transition-transform duration-300">
					<img
						src={country.flags.svg}
						alt={`${country.name.common} flag`}
						className="w-100 h-60 object-contain"
					/>
				</div>
			</div>

			<h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
				<div className="mt-6 flex justify-center">
					<button
						onClick={handleFavoriteClick}
						className={`text-2xl px-6 py-3 rounded-full shadow-lg transition ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'
							}`}
					>
						{isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
					</button>
				</div>
			</h1>
			{/* Country Details and Map */}
			<div className="flex flex-col lg:flex-row gap-6">
				{/* Details Section */}
				<div className="flex-1 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
					<h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
						{country.name.common}
					</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-900 dark:text-white">
						<p className="text-lg">
							<strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
						</p>
						<p className="text-lg">
							<strong>Region:</strong> {country.region}
						</p>
						<p className="text-lg">
							<strong>Subregion:</strong> {country.subregion || 'N/A'}
						</p>
						<p className="text-lg">
							<strong>Population:</strong> {country.population.toLocaleString()}
						</p>
						<p className="text-lg">
							<strong>Languages:</strong> {Object.values(country.languages || {}).join(', ') || 'N/A'}
						</p>
						<p className="text-lg">
							<strong>Currency:</strong> {currencies}
						</p>
						<p className="text-lg">
							<strong>Calling Code:</strong> {callingCode}
						</p>
						<p className="text-lg">
							<strong>Demonym:</strong> {demonym}
						</p>
						<p className="text-lg">
							<strong>Translations:</strong> {translations}
						</p>
						<p className="text-lg">
							<strong>Area:</strong> {country.area.toLocaleString()} km²
						</p>
					</div>
				</div>

				{/* Map Section */}
				<div className="flex-1 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
					<h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
						Location on Map
					</h2>
					<div className="rounded-lg overflow-hidden shadow-lg">
						<Map lat={country.latlng[0]} lng={country.latlng[1]} />
					</div>
				</div>
			</div>
		</div>
	);
}
