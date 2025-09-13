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
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDescription, setAiDescription] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState("");

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
            <Button
              variant="cinema"
              className="mt-4"
              disabled={aiLoading}
              onClick={async () => {
                setAiLoading(true);
                // Example: get title and genre from form (you may need to lift state up)
                const title = ""; // get from form
                const genre = ""; // get from form
                try {
                  const descRes = await fetch("/api/ai/generate-description", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title, genre })
                  });
                  const descData = await descRes.json();
                  setAiDescription(descData.description);
                  const suggRes = await fetch("/api/ai/suggest-movies", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ genre })
                  });
                  const suggData = await suggRes.json();
                  setAiSuggestions(suggData.suggestions);
                } catch (err) {
                  toast({ title: "AI Assist Error", description: String(err) });
                }
                setAiLoading(false);
              }}
            >
              {aiLoading ? "AI Assist..." : "AI Assist"}
            </Button>
            {aiDescription && (
              <div className="mt-4 p-4 bg-cinema-darker rounded">
                <strong>AI Description:</strong> {aiDescription}
              </div>
            )}
            {aiSuggestions && (
              <div className="mt-2 p-4 bg-cinema-darker rounded">
                <strong>AI Suggestions:</strong> {aiSuggestions}
              </div>
            )}
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