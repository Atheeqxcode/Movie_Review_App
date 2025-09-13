import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Movie } from '../hooks/useMovies';

interface WatchlistItem {
  movie: Movie;
}

export default function Profile() {
  const { user, logout } = useAuth();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`/api/watchlist/${user._id}`)
        .then(res => res.json())
        .then(data => {
          setWatchlist(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to see your profile.</div>;

  return (
    <div className="min-h-screen bg-cinema-dark text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        <div className="mb-8">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <h2 className="text-2xl font-bold mb-4">My Watchlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map(item => (
            <div key={item.movie.id} className="bg-cinema-darker p-4 rounded">
              <img src={item.movie.poster} alt={item.movie.title} className="w-full h-64 object-cover rounded mb-4" />
              <h3 className="font-bold">{item.movie.title}</h3>
            </div>
          ))}
        </div>
        {/* User Profile Details */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-cinema-purple flex items-center justify-center text-3xl font-bold text-white mb-4">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="text-lg font-semibold text-foreground mb-1">{user?.username}</div>
          <div className="text-sm text-muted-foreground mb-2">{user?.email}</div>
        </div>
        {/* Logout Button */}
        <div className="mt-8 flex flex-col items-center">
          <Button variant="destructive" onClick={logout} className="mt-4 w-full">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
