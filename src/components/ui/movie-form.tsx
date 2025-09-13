import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";

interface Movie {
  id: string;
  title: string;
  poster: string;
  genre: string;
  year: number;
  description: string;
}

interface MovieFormProps {
  movie?: Movie;
  isOpen: boolean;
  onClose: () => void;
  onSave: (movie: Omit<Movie, 'id'>) => void;
}

const genres = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary",
  "Drama", "Family", "Fantasy", "Horror", "Mystery", "Romance", 
  "Sci-Fi", "Thriller", "War", "Western"
];

export function MovieForm({ movie, isOpen, onClose, onSave }: MovieFormProps) {
  const [formData, setFormData] = useState({
    title: movie?.title || "",
    poster: movie?.poster || "",
    genre: movie?.genre || "",
    year: movie?.year || new Date().getFullYear(),
    description: movie?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.genre) return;
    
    onSave(formData);
    onClose();
    
    // Reset form
    setFormData({
      title: "",
      poster: "",
      genre: "",
      year: new Date().getFullYear(),
      description: "",
    });
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cinema-dark border-cinema-purple/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-cinema-purple">
            {movie ? "Edit Movie" : "Add New Movie"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter movie title"
              className="bg-cinema-darker/50 border-cinema-purple/30"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="poster">Poster Image URL</Label>
            <Input
              id="poster"
              value={formData.poster}
              onChange={(e) => handleChange("poster", e.target.value)}
              placeholder="https://example.com/poster.jpg"
              className="bg-cinema-darker/50 border-cinema-purple/30"
            />
          </div>
          
          <div>
            <Label htmlFor="genre">Genre *</Label>
            <Select value={formData.genre} onValueChange={(value) => handleChange("genre", value)}>
              <SelectTrigger className="bg-cinema-darker/50 border-cinema-purple/30">
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
          
          <div>
            <Label htmlFor="year">Release Year</Label>
            <Input
              id="year"
              type="number"
              value={formData.year}
              onChange={(e) => handleChange("year", parseInt(e.target.value))}
              min="1900"
              max={new Date().getFullYear() + 5}
              className="bg-cinema-darker/50 border-cinema-purple/30"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter movie description"
              className="bg-cinema-darker/50 border-cinema-purple/30 resize-none"
              rows={3}
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="cinema" className="flex-1">
              {movie ? "Update" : "Add"} Movie
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}