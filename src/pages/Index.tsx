import { useState } from "react";
import { MovieHero } from "@/components/movie-hero";
import { MovieGrid } from "@/components/movie-grid";

const Index = () => {
  const [showMovies, setShowMovies] = useState(false);

  const handleGetStarted = () => {
    setShowMovies(true);
    // Smooth scroll to movies section
    setTimeout(() => {
      const moviesSection = document.getElementById('movies-section');
      moviesSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-cinema-dark">
      <MovieHero onGetStarted={handleGetStarted} />
      
      {showMovies && (
        <div id="movies-section" className="bg-gradient-to-b from-cinema-dark to-cinema-darker">
          <MovieGrid />
        </div>
      )}
    </div>
  );
};

export default Index;
