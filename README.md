# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/8a749202-5119-4006-a545-133656036dc9

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/8a749202-5119-4006-a545-133656036dc9) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/8a749202-5119-4006-a545-133656036dc9) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# Movie Review App

A full-stack movie review application built with modern web technologies.

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
