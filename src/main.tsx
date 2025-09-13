import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import { AuthProvider } from './context/AuthContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/*" element={<App />} />
					  <Route path="/login" element={<Auth />} />
					  <Route path="/register" element={<Auth />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>
);
