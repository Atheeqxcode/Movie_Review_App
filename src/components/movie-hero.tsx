import { Film, Star, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/cinema-hero.jpg";

interface MovieHeroProps {
  onGetStarted: () => void;
}

export function MovieHero({ onGetStarted }: MovieHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Cinema Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-dark/90 via-cinema-dark/70 to-cinema-dark/90" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Film className="h-16 w-16 text-cinema-gold animate-float" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
            Movie Review Hub
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover, review, and share your favorite movies with the ultimate cinematic experience platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              variant="cinema" 
              size="lg" 
              onClick={onGetStarted}
              className="text-lg px-8 py-6 h-auto"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 h-auto border-cinema-purple/50 hover:border-cinema-purple"
            >
              Browse Movies
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-cinema-gold" />
              </div>
              <div className="text-2xl font-bold text-cinema-gold">10K+</div>
              <div className="text-sm text-foreground/60">Reviews</div>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-center mb-2">
                <Film className="h-8 w-8 text-cinema-purple" />
              </div>
              <div className="text-2xl font-bold text-cinema-purple">5K+</div>
              <div className="text-sm text-foreground/60">Movies</div>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-cinema-blue" />
              </div>
              <div className="text-2xl font-bold text-cinema-blue">50K+</div>
              <div className="text-sm text-foreground/60">Users</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cinema-purple/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cinema-purple rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}