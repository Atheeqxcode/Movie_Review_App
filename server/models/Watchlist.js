import mongoose from 'mongoose';

const WatchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  dateAdded: { type: Date, default: Date.now },
});

export default mongoose.model('Watchlist', WatchlistSchema);
