const FavoriteCountry = require('../models/FavoriteCountry');
const mongoose = require('mongoose');

// Add or Remove Favorite Country
const toggleFavoriteCountry = async (req, res) => {
  const { userId, country } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    let favoriteDoc = await FavoriteCountry.findOne({ userId });

    if (!favoriteDoc) {
      // If no document exists, create a new one with the country
      favoriteDoc = new FavoriteCountry({ userId, countries: [country] });
      await favoriteDoc.save();
      return res.status(201).json({ message: 'Country added to favorites', favorites: favoriteDoc.countries });
    }

    // Check if the country is already in the favorites
    const existingCountryIndex = favoriteDoc.countries.findIndex((fav) => fav.cca3 === country.cca3);

    if (existingCountryIndex !== -1) {
      // Remove the country from the favorites
      favoriteDoc.countries.splice(existingCountryIndex, 1);
      await favoriteDoc.save();
      return res.status(200).json({ message: 'Country removed from favorites', favorites: favoriteDoc.countries });
    }

    // Add the country to the favorites
    favoriteDoc.countries.push(country);
    await favoriteDoc.save();
    res.status(201).json({ message: 'Country added to favorites', favorites: favoriteDoc.countries });
  } catch (err) {
    console.error('Error toggling favorite country:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getFavoriteCountries = async (req, res) => {
  const { userId } = req.params;

  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const favoriteDoc = await FavoriteCountry.findOne({ userId });
    if (!favoriteDoc) {
      return res.status(200).json([]);
    }
    res.status(200).json(favoriteDoc.countries);
  } catch (err) {
    console.error('Error fetching favorite countries:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { toggleFavoriteCountry, getFavoriteCountries };