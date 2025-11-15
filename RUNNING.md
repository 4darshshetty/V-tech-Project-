# VTECH — Run Guide

Follow these steps to install dependencies and run both the backend API and the frontend app.

Prerequisites
- Node.js (LTS recommended)
- MongoDB running locally or a MongoDB Atlas connection string

Environment Variables
- Backend: edit d:\vtech\vtech-project\backend\.env
  - MONGO_URI=mongodb://localhost:27017/vtech (or your Atlas URI)
  - JWT_SECRET=replace_with_a_secure_string
  - PORT=5000 (optional; defaults to 5000)
- Frontend: d:\vtech\vtech-project\frontend\.env (optional)
  - VITE_API_BASE=http://localhost:5000/api

Backend — Install and Run
1) Open a terminal in the backend directory:
   cd d:\vtech\vtech-project\backend
2) Install packages:
   npm install
   (This installs: express, mongoose, dotenv, cors, bcrypt, jsonwebtoken, multer, etc. — as defined in package.json)
3) Start the API server:
   npm start
   (Alternately: npm run dev)
4) API will be available at:
   http://localhost:5000/api

Troubleshooting (EADDRINUSE: port 5000 already in use)
- If you see an error like:
  Error: listen EADDRINUSE: address already in use :::5000
- It means another process is using port 5000.
- Fix options:
  a) Stop the running process that uses port 5000 (Windows example):
     netstat -ano | findstr :5000
     taskkill /PID <PID_SHOWN_ABOVE> /F
  b) Or change PORT in backend .env to a different port (e.g., 5001), then restart:
     PORT=5001
     npm start
  c) Ensure the frontend .env VITE_API_BASE matches the backend port, e.g., http://localhost:5001/api

Optional — Seed Admin User
1) In the backend directory:
   node seedAdmin.js
2) Default credentials printed in the terminal (admin@vtech.com / admin123). Change after first login.

Frontend — Install and Run
1) Open another terminal in the frontend directory:
   cd d:\vtech\vtech-project\frontend
2) Install packages:
   npm install
   (This installs: react, react-dom, react-router-dom, axios, vite, tailwindcss, postcss, autoprefixer — as defined in package.json)
3) Start the dev server:
   npm run dev
4) Open the app in your browser:
   http://localhost:5173/

Notes
- Make sure the backend is running before using the app, so images (e.g., /uploads/default-hero.png) and API endpoints load correctly.
- If you changed the backend PORT, update VITE_API_BASE in the frontend .env accordingly.
- Use separate terminals for backend and frontend.