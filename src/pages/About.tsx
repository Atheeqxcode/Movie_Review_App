import { Film, Star, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/ui/navbar";

export default function About() {
  const features = [
    {
      icon: Film,
      title: "Movie Management",
      description: "Easily add, edit, and organize your movie collection with detailed information including posters, genres, and descriptions."
    },
    {
      icon: Star,
      title: "Review System",
      description: "Rate and review movies with a 5-star rating system. Share your thoughts and read what others think."
    },
    {
      icon: Users,
      title: "Community Reviews",
      description: "Build a community of movie enthusiasts by allowing multiple users to review each movie."
    },
    {
      icon: Zap,
      title: "Fast & Responsive",
      description: "Built with modern React technology for a smooth, fast, and responsive user experience."
    }
  ];

  return (
    <div className="min-h-screen bg-cinema-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <Film className="h-16 w-16 text-cinema-purple mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-foreground mb-4">
                About Movie Review Hub
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your ultimate destination for discovering, organizing, and reviewing movies. 
                Built by movie lovers, for movie lovers.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-gradient-card border-cinema-purple/20 hover:border-cinema-purple/50 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-cinema-purple/20 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-cinema-purple" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Mission Statement */}
          <Card className="bg-gradient-hero border-cinema-purple/30">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-foreground/90 max-w-2xl mx-auto">
                To create the perfect platform where movie enthusiasts can curate their personal collections, 
                discover new films, and share their passion through detailed reviews and ratings. 
                Every great movie deserves to be celebrated and every opinion matters.
              </p>
            </CardContent>
          </Card>

          {/* Tech Stack */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">Built With</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {["React", "TypeScript", "Tailwind CSS", "Lucide Icons", "Radix UI"].map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-2 bg-cinema-purple/20 text-cinema-purple rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}