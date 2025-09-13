import express from 'express';
import Watchlist from '../models/Watchlist.js';
const router = express.Router();

// Get user's watchlist
router.get('/:userId', async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ user: req.params.userId }).populate('movie');
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add movie to watchlist
router.post('/:userId', async (req, res) => {
  try {
    const { movieId } = req.body;
    const entry = new Watchlist({ user: req.params.userId, movie: movieId });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove movie from watchlist
router.delete('/:userId/:movieId', async (req, res) => {
  try {
    await Watchlist.findOneAndDelete({ user: req.params.userId, movie: req.params.movieId });
    res.json({ message: 'Removed from watchlist' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
