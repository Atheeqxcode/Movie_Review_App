import { Star, Edit, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent } from "./card";

interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  genre: string;
  year: number;
  rating?: number;
  description: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  userRating?: number;
  onRate?: (rating: number) => void;
  isActive?: boolean;
}

export function MovieCard({
  id,
  title,
  poster,
  genre,
  year,
  rating,
  description,
  onEdit,
  onDelete,
  onView,
  userRating = 0,
  onRate,
  isActive = false,
}: MovieCardProps) {

  return (
    <Card className="group bg-gradient-card border-cinema-purple/20 hover:border-cinema-purple/50 transition-all duration-300 hover:shadow-cinema cursor-pointer overflow-hidden transform hover:scale-110">
      <div className="relative overflow-hidden">
        <img
          src={poster}
          alt={title}
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
          onClick={() => onView?.(id)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-2">
          <Button variant="cinema" size="sm" onClick={() => onEdit?.(id)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete?.(id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        {rating > 0 && (
          <div className="absolute top-4 left-4">
            <Badge variant="cinema" className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-cinema-gold text-cinema-gold" />
              {rating.toFixed(1)}
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 
            className="font-bold text-lg text-foreground group-hover:text-cinema-purple transition-colors line-clamp-1 cursor-pointer"
            onClick={() => onView?.(id)}
          >
            {title}
          </h3>
          <span className="text-sm text-muted-foreground ml-2">{year}</span>
        </div>
        <Badge variant="outline" className="mb-3 border-cinema-blue/50 text-cinema-blue">
          {genre}
        </Badge>
        <div className="flex gap-1 mb-2">
          {[1,2,3,4,5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 cursor-pointer ${isActive && userRating > 0 && star <= userRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
              onClick={() => isActive && onRate?.(star)}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
    </Card>
  );
}