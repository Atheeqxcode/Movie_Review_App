import { MovieGrid } from "@/components/movie-grid";
import { Navbar } from "@/components/ui/navbar";

export default function Movies() {
  return (
    <div className="min-h-screen bg-cinema-dark">
      <Navbar />
      <div className="bg-gradient-to-b from-cinema-dark to-cinema-darker">
        <MovieGrid />
      </div>
    </div>
  );
}