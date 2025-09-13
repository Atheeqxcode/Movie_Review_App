import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "@/components/ui/movie-card";
import { SearchFilters } from "@/components/ui/search-filters";
import { MovieForm } from "@/components/ui/movie-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useMovies, type Movie } from "@/hooks/useMovies";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../context/AuthContext";

export function MovieGrid() {
  const navigate = useNavigate();
  const { movies, loading, addMovie, updateMovie, deleteMovie } = useMovies();
  const { toast } = useToast();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | undefined>();
  const [movieToDelete, setMovieToDelete] = useState<string | null>(null);

  // ratings & reviews
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});
  const [activeReviews, setActiveReviews] = useState<Record<string, string>>({});

  // Fetch user ratings on mount
  useEffect(() => {
    const fetchRatings = async () => {
      if (user) {
        const res = await fetch(`/api/reviews/user/${user._id}`);
        const data = await res.json();
        const ratings: Record<string, number> = {};
        data.forEach((review: any) => {
          ratings[review.movieId] = review.rating;
        });
        setUserRatings(ratings);
      }
    };
    fetchRatings();
  }, [user]);

  // Filter movies based on search and genre
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "All Genres" || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleAddMovie = () => {
    setEditingMovie(undefined);
    setIsFormOpen(true);
  };

  const handleEditMovie = (id: string) => {
    const movie = movies.find((m) => m.id === id);
    setEditingMovie(movie);
    setIsFormOpen(true);
  };

  const handleDeleteMovie = () => {
    if (movieToDelete) {
      deleteMovie(movieToDelete);
      setMovieToDelete(null);
      toast({
        title: "Movie deleted successfully!",
        description: "The movie has been removed from your collection.",
      });
    }
  };

  const handleSaveMovie = (movieData: Omit<Movie, "id" | "reviews">) => {
    if (editingMovie) {
      updateMovie(editingMovie.id, movieData);
      toast({
        title: "Movie updated successfully!",
        description: "The movie has been successfully updated.",
      });
    } else {
      addMovie(movieData);
      toast({
        title: "Movie added successfully!",
        description: "The movie has been successfully added.",
      });
    }
  };

  const handleViewMovie = (id: string) => {
    navigate(`/movie/${id}`);
  };

  // ⭐ Rating handler
  const handleRate = (movieId: string, rating: number) => {
    setUserRatings((prev) => ({ ...prev, [movieId]: rating }));
  };

  // ✍ Review handlers
  const handleReviewChange = (movieId: string, value: string) => {
    setActiveReviews((prev) => ({ ...prev, [movieId]: value }));
  };

  const handleReviewSubmit = async (movieId: string) => {
    const user = window.localStorage.getItem("user") && JSON.parse(window.localStorage.getItem("user")!);
    if (!user) return;

    const review = {
      userId: user._id,
      movieId,
      rating: userRatings[movieId] || 0,
      text: activeReviews[movieId] || "",
      timestamp: new Date().toISOString(),
    };

    await fetch(`/api/reviews/${movieId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });

    setActiveReviews((prev) => ({ ...prev, [movieId]: "" }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cinema-purple"></div>
      </div>
    );
  }

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
            Movie Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of movies, add your favorites, and share your reviews.
          </p>
        </div>

        <SearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          onAddMovie={handleAddMovie}
        />

        {filteredMovies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              {searchQuery || selectedGenre !== "All Genres"
                ? "No movies found matching your criteria."
                : "No movies in your collection yet."}
            </p>
            <button
              onClick={handleAddMovie}
              className="text-cinema-purple hover:text-cinema-blue transition-colors"
            >
              Add your first movie →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="animate-fade-in">
                <MovieCard
                  {...movie}
                  onEdit={handleEditMovie}
                  onDelete={(id) => setMovieToDelete(id)}
                  onView={handleViewMovie}
                  userRating={userRatings[movie.id] || 0}   // each movie has its own rating
                  onRate={(rating: number) => handleRate(movie.id, rating)}
                  isActive={true} // always allow rating
                />
                <div className="mt-4">
                  <input
                    type="text"
                    value={activeReviews[movie.id] || ""}
                    onChange={(e) => handleReviewChange(movie.id, e.target.value)}
                    placeholder="Write your review..."
                    className="w-full p-2 rounded border border-cinema-purple text-black"
                  />
                  <button
                    className="mt-2 px-4 py-2 bg-cinema-purple text-white rounded"
                    onClick={() => handleReviewSubmit(movie.id)}
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <MovieForm
          movie={editingMovie}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveMovie}
        />

        <AlertDialog open={!!movieToDelete} onOpenChange={() => setMovieToDelete(null)}>
          <AlertDialogContent className="bg-cinema-dark border-cinema-purple/30">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Movie</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this movie? This action cannot be undone and will remove all associated reviews.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteMovie}
                className="bg-destructive hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
}
