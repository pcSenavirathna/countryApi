const mongoose = require('mongoose');

const favoriteCountrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  countries: [
    {
      cca3: { type: String, required: true },
      name: { type: String, required: true },
      flag: { type: String, required: true },
      population: { type: Number, required: true },
      region: { type: String, required: true },
		  capital: { type: [String], required: true }, // Ensure `capital` is an array
    },
  ],
});

module.exports = mongoose.model('FavoriteCountry', favoriteCountrySchema);