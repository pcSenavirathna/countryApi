const express = require('express');
const { toggleFavoriteCountry, getFavoriteCountries } = require('../controllers/favoriteCountryController');
const router = express.Router();

// Toggle Favorite Country
router.post('/toggle', toggleFavoriteCountry);

// Get Favorite Countries
router.get('/:userId', getFavoriteCountries);

module.exports = router;