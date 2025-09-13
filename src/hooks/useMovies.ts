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



export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch movies from backend API
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const addMovie = async (movieData: Omit<Movie, 'id' | 'reviews'>) => {
    try {
      const res = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData)
      });
      const newMovie = await res.json();
      setMovies(prev => [...prev, newMovie]);
    } catch (err) {
      // handle error
    }
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