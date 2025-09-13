import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Review } from "@/hooks/useMovies";

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (review: Omit<Review, 'id'>) => void;
}

export function ReviewForm({ isOpen, onClose, onSave }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    rating: 0,
    text: "",
    author: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author || !formData.text || formData.rating === 0) return;
    
    onSave({
      ...formData,
      date: new Date().toISOString().split('T')[0]
    });
    
    onClose();
    setFormData({ rating: 0, text: "", author: "" });
  };

  const handleStarClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cinema-dark border-cinema-purple/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-cinema-purple">Add Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Rating *</Label>
            <div className="flex space-x-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  className="p-1 transition-colors"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= formData.rating
                        ? "fill-cinema-gold text-cinema-gold"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="author">Your Name *</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              placeholder="Enter your name"
              className="bg-cinema-darker/50 border-cinema-purple/30"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="text">Review *</Label>
            <Textarea
              id="text"
              value={formData.text}
              onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
              placeholder="Write your review..."
              className="bg-cinema-darker/50 border-cinema-purple/30 resize-none"
              rows={4}
              required
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="cinema" className="flex-1">
              Add Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}