
# Movie Review App

A full-stack movie review application built with modern web technologies.
(Screenshots Attached below)

<img width="1871" height="844" alt="image" src="https://github.com/user-attachments/assets/ef36d8dd-5791-41d2-b16a-bf7aa77ce6ed" />

<img width="1881" height="912" alt="image" src="https://github.com/user-attachments/assets/9646a483-e6db-4dc9-8958-ea6352fa6f28" />

<img width="1867" height="1221" alt="image" src="https://github.com/user-attachments/assets/287cf3a9-118c-4a58-a749-0546e33d3858" />

<img width="1879" height="820" alt="image" src="https://github.com/user-attachments/assets/50a6a97b-9a8a-4e25-a1aa-ec12ec37ec60" />

<img width="1879" height="820" alt="image" src="https://github.com/user-attachments/assets/2d36d06c-78ea-46df-af24-7f3f531c154b" />



## Tech Stack

### Frontend

- React (with Vite)
- TypeScript
- Tailwind CSS
- Radix UI
- React Router
- TanStack Query

### Backend

- Node.js
- Express
- MongoDB (with Mongoose)
- JWT Authentication
- bcryptjs
- RESTful API

### Other

- Shadcn UI
- Lucide Icons
- PostCSS
- dotenv

## Features

- User authentication (register/login/logout)
- Add, edit, delete movies
- Rate movies (5-star system)
- Write and save reviews per user
- View movie details
- User profile with details
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Atheeqxcode/Movie_Review_App.git
   cd Movie_Review_App/scene-story
   ```

2. Install dependencies:

   ```sh
   npm install
   cd server
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in `server/` with:

     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. Seed the database (optional):

   ```sh
   node server/seedMovies.js
   ```

### Running Locally

- Start the backend:

  ```sh
  cd server
  npm start
  ```

- Start the frontend:

  ```sh
  cd ..
  npm run dev
  ```

- Visit [http://localhost:5173](http://localhost:5173)

### Deployment

- **Frontend:** Deploy on Vercel, Netlify, or any static host supporting Vite.
- **Backend:** Deploy on Render, Heroku, or any Node.js server host. Set environment variables for production.
- **MongoDB:** Use MongoDB Atlas for cloud database.

## Scripts

- `npm run dev` — Start frontend in development mode
- `npm run build` — Build frontend for production
- `npm start` (in `server/`) — Start backend server

## Folder Structure

- `src/` — Frontend source code
- `server/` — Backend source code
- `public/` — Static assets

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

## License

MIT
