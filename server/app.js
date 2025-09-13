import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import aiRoutes from './routes/ai.js';
import moviesRoutes from './routes/movies.js';

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(cors());

app.use('/api/ai', aiRoutes);
app.use('/api/movies', moviesRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
