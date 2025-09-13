import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (mode === 'login') {
        await login(email, password);
        navigate('/');
      } else {
        await register(username, email, password);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cinema-dark">
      <form onSubmit={handleSubmit} className="bg-cinema-darker p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{mode === 'login' ? 'Sign In' : 'Sign Up'}</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {mode === 'register' && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full mb-4 p-2 rounded border"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 p-2 rounded border"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-6 p-2 rounded border text-black"
          required
        />
        <button type="submit" className="w-full bg-cinema-purple text-white py-2 rounded" disabled={loading}>
          {loading ? (mode === 'login' ? 'Signing in...' : 'Signing up...') : (mode === 'login' ? 'Sign In' : 'Sign Up')}
        </button>
        <div className="mt-4 text-center">
          {mode === 'login' ? (
            <span>Don't have an account? <button type="button" className="text-cinema-purple underline" onClick={() => setMode('register')}>Sign Up</button></span>
          ) : (
            <span>Already have an account? <button type="button" className="text-cinema-purple underline" onClick={() => setMode('login')}>Sign In</button></span>
          )}
        </div>
      </form>
    </div>
  );
}
