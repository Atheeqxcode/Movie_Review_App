import express from 'express';
import Review from '../models/Review.js';
import Movie from '../models/Movie.js';
const router = express.Router();

// Get reviews for a movie
router.get('/:movieId', async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId }).populate('user', 'username profilePicture');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a review to a movie
router.post('/:movieId', async (req, res) => {
  try {
    const { userId, rating, text } = req.body;
    const review = new Review({ user: userId, movie: req.params.movieId, rating, text });
    await review.save();
    // Update average rating
    const reviews = await Review.find({ movie: req.params.movieId });
    const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    await Movie.findByIdAndUpdate(req.params.movieId, { averageRating: avg });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
