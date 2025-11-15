# VTECH — Vite + React (JSX) Full Project

A complete full-stack application with Vite + React frontend and Express + MongoDB backend.

## Features

- **Frontend**: Vite + React (JSX) with Tailwind CSS
- **Backend**: Express.js with MongoDB
- **Authentication**: User and Admin roles with JWT
- **Admin Features**: Upload and manage landing page background image
- **Pages**: Get Started, Auth, Home, About, Products, Branches, Contact, Admin Panel

## Project Structure

```
vtech-project/
├── backend/
│   ├── uploads/          # uploaded images (created at runtime)
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── .env              # Environment variables
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/   # React components
    │   ├── pages/        # Page components
    │   ├── utils/        # API utilities
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.cjs
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas connection string)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd vtech-project/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - The `.env` file is already created with default values
   - Update `MONGO_URI` if your MongoDB is not running on `localhost:27017`
   - Change `JWT_SECRET` to a secure random string

4. Start the backend server:
   ```bash
   npm start
   ```
   
   The server will run on `http://localhost:5000` (or the PORT specified in `.env`)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd vtech-project/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   The frontend will run on `http://localhost:5173` (Vite default port)

## Usage

1. **Start MongoDB**: Ensure MongoDB is running on your system or update the `MONGO_URI` in `backend/.env`

2. **Start Backend**: Run `npm start` in the `backend` directory

3. **Start Frontend**: Run `npm run dev` in the `frontend` directory

4. **Access the Application**: Open `http://localhost:5173` in your browser

5. **Create Admin Account**: 
   - Click "Get Started" on the landing page
   - After the 2-second loader, you'll be redirected to the Auth page
   - Switch to "Sign up" mode
   - Select "Admin" role and create an account
   - Login with your admin credentials

6. **Upload Background**: 
   - Login as admin and navigate to `/admin`
   - Upload an image to set the landing page background

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/admin/background` - Get current background image
- `POST /api/admin/background` - Upload new background (admin only)
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `GET /api/branches` - Get all branches
- `POST /api/branches` - Create branch
- `POST /api/contact` - Submit contact form

## Notes

- The authentication system is simplified for this scaffold. For production, add JWT middleware to protect admin routes.
- You can create an admin user by signing up with `role: 'admin'` or directly in MongoDB.
- Background images are stored in `backend/uploads/` and served from `/uploads/...`
- Replace placeholder content with real product images and branch map URLs (Google Maps links).

## Development

- **Backend**: Uses Express with MongoDB for data persistence
- **Frontend**: Vite for fast development, React Router for navigation, Tailwind for styling
- **Authentication**: JWT tokens stored in localStorage

## Production Build

To build the frontend for production:

```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/` directory.

## License

ISC

