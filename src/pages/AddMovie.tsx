import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovieForm } from "@/components/ui/movie-form";
import { useMovies } from "@/hooks/useMovies";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/ui/navbar";

export default function AddMovie() {
  const navigate = useNavigate();
  const { addMovie } = useMovies();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(true);

  const handleAddMovie = (movieData: any) => {
    addMovie(movieData);
    toast({
      title: "Movie added successfully!",
      description: "The movie has been added to your collection.",
    });
    navigate("/movies");
  };

  const handleClose = () => {
    setShowForm(false);
    navigate("/movies");
  };

  return (
    <div className="min-h-screen bg-cinema-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate("/movies")} 
          variant="outline" 
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Movies
        </Button>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Add New Movie</h1>
            <p className="text-muted-foreground">
              Fill in the details below to add a new movie to your collection.
            </p>
          </div>
        </div>
      </div>

      <MovieForm
        isOpen={showForm}
        onClose={handleClose}
        onSave={handleAddMovie}
      />
    </div>
  );
}