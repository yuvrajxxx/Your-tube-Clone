const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/current', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

module.exports = router;
