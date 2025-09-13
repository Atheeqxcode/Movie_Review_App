import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieHero } from "@/components/movie-hero";
import { Navbar } from "@/components/ui/navbar";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/movies");
  };

  return (
    <div className="min-h-screen bg-cinema-dark">
      <Navbar />
      <MovieHero onGetStarted={handleGetStarted} />
    </div>
  );
};

export default Index;
