import mongoose from 'mongoose';
import Movie from './models/Movie.js';
import dotenv from 'dotenv';
dotenv.config();

const moviesData = [
  // Action
  { title: "The Dark Knight", poster: "https://m.media-amazon.com/images/I/51k0qa6q5oL._AC_.jpg", genre: "Action", year: 2008, description: "Batman battles the Joker, a criminal mastermind bringing chaos to Gotham." },
  { title: "Mad Max: Fury Road", poster: "https://m.media-amazon.com/images/I/81AqjKehNLL._AC_SL1500_.jpg", genre: "Action", year: 2015, description: "In a post-apocalyptic wasteland, Max helps a rebel escape a tyrant." },
  { title: "Gladiator", poster: "https://m.media-amazon.com/images/I/51A7xbl5m5L._AC_.jpg", genre: "Action", year: 2000, description: "A betrayed Roman general fights his way to revenge as a gladiator." },
  // ...add 12 more Action movies

  // Sci-Fi
  { title: "Inception", poster: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg", genre: "Sci-Fi", year: 2010, description: "A thief must plant an idea in a target's subconscious." },
  { title: "Interstellar", poster: "https://m.media-amazon.com/images/I/71n58K76EoL._AC_SL1024_.jpg", genre: "Sci-Fi", year: 2014, description: "Explorers travel through a wormhole to save humanity." },
  { title: "The Matrix", poster: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg", genre: "Sci-Fi", year: 1999, description: "A hacker discovers reality is a simulated world." },
  // ...add 12 more Sci-Fi movies

  // Comedy
  { title: "The Hangover", poster: "https://m.media-amazon.com/images/I/81z0PUkOCjL._AC_SL1500_.jpg", genre: "Comedy", year: 2009, description: "A wild bachelor party leads to lost memories in Vegas." },
  { title: "Superbad", poster: "https://m.media-amazon.com/images/I/51bYwZ0AnwL._AC_.jpg", genre: "Comedy", year: 2007, description: "High school friends try to enjoy one last party night." },
  { title: "Step Brothers", poster: "https://m.media-amazon.com/images/I/51yUMdCgkzL._AC_.jpg", genre: "Comedy", year: 2008, description: "Two grown men become reluctant stepbrothers." },
  // ...add 12 more Comedy movies

  // Romance
  { title: "The Notebook", poster: "https://m.media-amazon.com/images/I/51CgLhQz1fL._AC_.jpg", genre: "Romance", year: 2004, description: "A poor man falls in love with a rich woman in the 1940s." },
  { title: "La La Land", poster: "https://m.media-amazon.com/images/I/91iA0S-lX4L._AC_SL1500_.jpg", genre: "Romance", year: 2016, description: "An actress and a musician pursue dreams and love in LA." },
  { title: "Titanic", poster: "https://m.media-amazon.com/images/I/71lF1aGZVhL._AC_SL1024_.jpg", genre: "Romance", year: 1997, description: "A love story unfolds on the ill-fated Titanic ship." },
  // ...add 12 more Romance movies

  // Horror
  { title: "The Conjuring", poster: "https://m.media-amazon.com/images/I/71jvDJJ9WbL._AC_SL1188_.jpg", genre: "Horror", year: 2013, description: "Paranormal investigators help a family terrorized by dark forces." },
  { title: "Get Out", poster: "https://m.media-amazon.com/images/I/81W7bKThreL._AC_SL1500_.jpg", genre: "Horror", year: 2017, description: "A chilling social thriller about a Black man visiting his girlfriend’s family." },
  { title: "A Quiet Place", poster: "https://m.media-amazon.com/images/I/71D3G8nGxiL._AC_SL1024_.jpg", genre: "Horror", year: 2018, description: "A family must live in silence to avoid deadly creatures." },
  // ...add 12 more Horror movies
];

async function seedMovies() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Movie.deleteMany({});
  const moviesToInsert = moviesData.map(m => ({ ...m, reviews: [] }));
  await Movie.insertMany(moviesToInsert);
  console.log('Movies seeded!');
  mongoose.disconnect();
}

seedMovies();
