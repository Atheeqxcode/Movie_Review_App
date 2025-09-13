import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  text: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Review', ReviewSchema);
