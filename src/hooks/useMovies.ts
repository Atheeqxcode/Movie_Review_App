import { useState, useEffect } from "react";

export interface Movie {
  id: string;
  title: string;
  poster: string;
  genre: string;
  year: number;
  description: string;
  rating?: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  rating: number;
  text: string;
  author: string;
  date: string;
}

// Sample data for demo
const sampleMovies: Movie[] = [
  {
    id: "1",
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    genre: "Sci-Fi",
    year: 2010,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    rating: 4.5,
    reviews: [
      {
        id: "1",
        rating: 5,
        text: "Mind-bending masterpiece! Christopher Nolan at his finest.",
        author: "Movie Buff",
        date: "2023-01-15"
      },
      {
        id: "2", 
        rating: 4,
        text: "Complex but rewarding. Amazing cinematography and sound design.",
        author: "Cinema Lover",
        date: "2023-02-10"
      }
    ]
  },
  {
    id: "2",
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    genre: "Action",
    year: 2008,
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    rating: 4.8,
    reviews: [
      {
        id: "3",
        rating: 5,
        text: "Heath Ledger's Joker is iconic. This film redefined superhero movies.",
        author: "Comic Fan",
        date: "2023-01-20"
      }
    ]
  },
  {
    id: "3",
    title: "Pulp Fiction",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    genre: "Crime",
    year: 1994,
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    rating: 4.6,
    reviews: []
  }
];

// LocalStorage key
const STORAGE_KEY = 'movie-review-hub-movies';

// Load movies from localStorage
const loadMoviesFromStorage = (): Movie[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : sampleMovies;
  } catch {
    return sampleMovies;
  }
};

// Save movies to localStorage
const saveMoviesToStorage = (movies: Movie[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  } catch (error) {
    console.error('Failed to save movies to localStorage:', error);
  }
};

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load movies from localStorage on component mount
    setTimeout(() => {
      const loadedMovies = loadMoviesFromStorage();
      setMovies(loadedMovies);
      setLoading(false);
    }, 500);
  }, []);

  // Save to localStorage whenever movies change
  useEffect(() => {
    if (!loading) {
      saveMoviesToStorage(movies);
    }
  }, [movies, loading]);

  const addMovie = (movieData: Omit<Movie, 'id' | 'reviews'>) => {
    const newMovie: Movie = {
      ...movieData,
      id: Date.now().toString(),
      reviews: []
    };
    setMovies(prev => [...prev, newMovie]);
  };

  const updateMovie = (id: string, movieData: Omit<Movie, 'id' | 'reviews'>) => {
    setMovies(prev => prev.map(movie => 
      movie.id === id 
        ? { ...movie, ...movieData }
        : movie
    ));
  };

  const deleteMovie = (id: string) => {
    setMovies(prev => prev.filter(movie => movie.id !== id));
  };

  const getMovie = (id: string) => {
    return movies.find(movie => movie.id === id);
  };

  const addReview = (movieId: string, review: Omit<Review, 'id'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString()
    };
    
    setMovies(prev => prev.map(movie => 
      movie.id === movieId 
        ? { 
            ...movie, 
            reviews: [...movie.reviews, newReview],
            rating: calculateAverageRating([...movie.reviews, newReview])
          }
        : movie
    ));
  };

  const calculateAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  return {
    movies,
    loading,
    addMovie,
    updateMovie,
    deleteMovie,
    getMovie,
    addReview
  };
}