import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  year: { type: Number },
  director: { type: String },
  cast: [{ type: String }],
  description: { type: String },
  poster: { type: String },
  averageRating: { type: Number, default: 0 },
});

export default mongoose.model('Movie', MovieSchema);
