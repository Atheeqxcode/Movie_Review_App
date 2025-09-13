import { Search, Filter, Plus } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  onAddMovie: () => void;
}

const genres = [
  "All Genres",
  "Action",
  "Adventure", 
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "War",
  "Western"
];

export function SearchFilters({
  searchQuery,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  onAddMovie,
}: SearchFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/50 backdrop-blur-sm border border-cinema-purple/20 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-cinema-darker/50 border-cinema-purple/30 focus:border-cinema-purple"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-muted-foreground h-4 w-4" />
          <Select value={selectedGenre} onValueChange={onGenreChange}>
            <SelectTrigger className="w-48 bg-cinema-darker/50 border-cinema-purple/30">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button variant="cinema" onClick={onAddMovie} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Add Movie
      </Button>
    </div>
  );
}