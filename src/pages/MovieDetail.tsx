import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Edit, Trash2, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewForm } from "@/components/ui/review-form";
import { MovieForm } from "@/components/ui/movie-form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useMovies } from "@/hooks/useMovies";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/ui/navbar";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMovie, addReview, updateMovie, deleteMovie } = useMovies();
  const { toast } = useToast();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  
  const movie = id ? getMovie(id) : null;
  const [aiLoading, setAiLoading] = useState(false);
  const [aiConsensus, setAiConsensus] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState("");
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-cinema-dark">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Movie not found</h1>
            <Button onClick={() => navigate("/movies")} variant="cinema">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Movies
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddReview = (reviewData: any) => {
    addReview(movie.id, reviewData);
    toast({
      title: "Review added successfully!",
      description: "Your review has been saved.",
    });
  };

  const handleEditMovie = (movieData: any) => {
    updateMovie(movie.id, movieData);
    toast({
      title: "Movie updated successfully!",
      description: "The movie details have been saved.",
    });
  };

  const handleDeleteMovie = () => {
    deleteMovie(movie.id);
    toast({
      title: "Movie deleted successfully!",
      description: "The movie has been removed from your collection.",
    });
    navigate("/movies");
  };

  return (
    <div className="min-h-screen bg-cinema-dark">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="cinema"
          className="mb-4"
          disabled={aiLoading}
          onClick={async () => {
            setAiLoading(true);
            try {
              const consensusRes = await fetch("/api/ai/summarize-reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reviews: movie.reviews.map(r => r.text) })
              });
              const consensusData = await consensusRes.json();
              setAiConsensus(consensusData.consensus);
              const suggRes = await fetch("/api/ai/suggest-movies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ genre: movie.genre })
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
        {aiConsensus && (
          <div className="mt-2 p-4 bg-cinema-darker rounded">
            <strong>AI Review Consensus:</strong> {aiConsensus}
          </div>
        )}
        {aiSuggestions && (
          <div className="mt-2 p-4 bg-cinema-darker rounded">
            <strong>AI Suggestions:</strong> {aiSuggestions}
          </div>
        )}
      </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Info */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-card border-cinema-purple/20">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  {movie.rating && movie.rating > 0 && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="cinema" className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-cinema-gold text-cinema-gold" />
                        {movie.rating.toFixed(1)}
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-foreground mb-2">{movie.title}</h1>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{movie.year}</span>
                        <Badge variant="outline" className="border-cinema-blue/50 text-cinema-blue">
                          {movie.genre}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{movie.description}</p>
                  
                  <div className="flex gap-2">
                    <Button onClick={() => setShowEditForm(true)} variant="cinema" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-cinema-dark border-cinema-purple/30">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Movie</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{movie.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteMovie} className="bg-destructive hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Reviews ({movie.reviews.length})
              </h2>
              <Button onClick={() => setShowReviewForm(true)} variant="cinema">
                <Plus className="h-4 w-4 mr-2" />
                Add Review
              </Button>
            </div>

            <div className="space-y-4">
              {movie.reviews.length === 0 ? (
                <Card className="bg-gradient-card border-cinema-purple/20">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No reviews yet. Be the first to review this movie!</p>
                  </CardContent>
                </Card>
              ) : (
                movie.reviews.map((review) => (
                  <Card key={review.id} className="bg-gradient-card border-cinema-purple/20">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground">{review.author}</span>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-cinema-gold text-cinema-gold"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <p className="text-foreground">{review.text}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <ReviewForm
        isOpen={showReviewForm}
        onClose={() => setShowReviewForm(false)}
        onSave={handleAddReview}
      />

      {showEditForm && (
        <MovieForm
          movie={movie}
          isOpen={showEditForm}
          onClose={() => setShowEditForm(false)}
          onSave={handleEditMovie}
        />
      )}
    </div>
  );
}