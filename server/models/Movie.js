import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  description: String,
  reviews: [String],
});

export default mongoose.model('Movie', MovieSchema);
