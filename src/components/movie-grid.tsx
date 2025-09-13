import { useState } from "react";
import { MovieCard } from "@/components/ui/movie-card";
import { SearchFilters } from "@/components/ui/search-filters";
import { MovieForm } from "@/components/ui/movie-form";
import { useMovies, type Movie } from "@/hooks/useMovies";
import { toast } from "@/hooks/use-toast";

export function MovieGrid() {
  const { movies, loading, addMovie, updateMovie, deleteMovie } = useMovies();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | undefined>();

  // Filter movies based on search and genre
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "All Genres" || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleAddMovie = () => {
    setEditingMovie(undefined);
    setIsFormOpen(true);
  };

  const handleEditMovie = (id: string) => {
    const movie = movies.find(m => m.id === id);
    setEditingMovie(movie);
    setIsFormOpen(true);
  };

  const handleDeleteMovie = (id: string) => {
    deleteMovie(id);
    toast({
      title: "Movie deleted",
      description: "The movie has been successfully removed.",
    });
  };

  const handleSaveMovie = (movieData: Omit<Movie, 'id' | 'reviews'>) => {
    if (editingMovie) {
      updateMovie(editingMovie.id, movieData);
      toast({
        title: "Movie updated",
        description: "The movie has been successfully updated.",
      });
    } else {
      addMovie(movieData);
      toast({
        title: "Movie added",
        description: "The movie has been successfully added.",
      });
    }
  };

  const handleViewMovie = (id: string) => {
    // This would navigate to movie detail page in a real app
    toast({
      title: "View Movie",
      description: "Movie detail view would open here.",
    });
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
                  onDelete={handleDeleteMovie}
                  onView={handleViewMovie}
                />
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
      </div>
    </section>
  );
}