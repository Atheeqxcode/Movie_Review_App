import express from 'express';
import Movie from '../models/Movie.js';
const router = express.Router();

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new movie
router.post('/', async (req, res) => {
  try {
    const movie = new Movie({ ...req.body, reviews: [] });
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
