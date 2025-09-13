import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MovieHero } from "@/components/movie-hero";
import { Navbar } from "@/components/ui/navbar";
import { useAuth } from "../context/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const getStartedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleGetStarted = () => {
    if (getStartedRef.current) {
      getStartedRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-cinema-dark">
      <Navbar />
      <MovieHero onGetStarted={handleGetStarted} />
      <div ref={getStartedRef} className="pt-32" />
    </div>
  );
};

export default Index;
