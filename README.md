Movie Recommendation App
<img width="624" height="904" alt="Screenshot 2026-05-25 at 01-04-29 movieappwithapi" src="https://github.com/user-attachments/assets/3605ca48-402d-4dc4-b380-f5c2d8db98df" />
<img width="1920" height="913" alt="Screenshot 2026-05-25 at 01-05-05 movieappwithapi" src="https://github.com/user-attachments/assets/ae5b26ea-ece6-4c6c-99bc-db525fc7aa65" />
<img width="624" height="904" alt="Screenshot 2026-05-25 at 01-05-17 movieappwithapi" src="https://github.com/user-attachments/assets/e7cf1c62-d3fa-4dda-90cd-74c5f1bd98f7" />
<img width="1920" height="913" alt="Screenshot 2026-05-25 at 01-04-00 movieappwithapi" src="https://github.com/user-attachments/assets/c9612739-118a-45f3-83f5-8943abb2922f" />
<img width="1920" height="913" alt="Screenshot 2026-05-25 at 01-04-08 movieappwithapi" src="https://github.com/user-attachments/assets/b05b2194-a47a-4109-a4c9-505db25fc4a9" />

Fast Api:
<img width="1919" height="863" alt="Screenshot 2026-05-24 at 21-14-35 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/523ef00f-b054-4ff0-a28c-b38e538eaef6" />
<img width="1919" height="863" alt="Screenshot 2026-05-24 at 21-14-46 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/a4ea9b4e-0508-4ff3-9ae7-1ef91b3fdeeb" />
<img width="1919" height="863" alt="Screenshot 2026-05-24 at 21-19-35 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/84dc5b51-3b0f-44dc-acba-8a7a43e63981" />
<img width="1920" height="913" alt="Screenshot 2026-05-24 at 20-42-19 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/b7e21e3d-b435-42fa-a946-40b9f96587ec" />
<img width="1920" height="913" alt="Screenshot 2026-05-24 at 20-44-07 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/328a8641-675d-40db-ad3a-6c3c000a6d1e" />





A full-stack Movie Recommendation Application built using React and FastAPI that allows users to search movies, view movie details, manage favorites, and experience authentication-based personalized features.

Features:
  Frontend Features
  Search movies using movie title
  Display random movies on homepage
  Add movies to wishlist/favorites
  Prevent duplicate wishlist additions
  Dark and light theme toggle
  Responsive UI
  5 cards per row on desktop
  2 cards per row on mobile
  Dynamic movie cards
  React-based component architecture
  Backend Features
  FastAPI backend implementation
  SQLite database integration
  JWT authentication
  Password hashing using bcrypt
  Protected favorite routes
  OMDb API integration
  RESTful API structure
  Swagger API documentation
Tech Stack :
  Frontend:
    React.js
    Vite
    JavaScript
    CSS
  Backend :
    FastAPI
    SQLite
    SQLAlchemy
    Pydantic
    JWT Authentication
    Passlib + bcrypt
Project Structure:

movie-recommendation-app/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── styles/
│   │   ├── data/
│   │   └── App.jsx
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── database/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── movies.db
│
└── README.md

Backend APIs:

  Authentication APIs
  Register User
  POST /register
  Login User
  POST /login
  Returns JWT access token.

Movie APIs:

Search Movies
GET /movies/search?title=batman

Get Movie Details
GET /movies/{imdb_id}

Favorites APIs:

Add Favorite
POST /favorites

View Favorites
GET /favorites

Remove Favorite
DELETE /favorites/{movie_id}

Frontend runs on:
  http://localhost:5173
  
Backend Setup
  uvicorn app.main:app --reload

Backend runs on:

http://127.0.0.1:8000
Swagger Documentation

Open:

http://127.0.0.1:8000/docs
Environment Variables
Frontend .env
VITE_OMDB_API_KEY=your_api_key
Authentication Flow
User registers using /register
User logs in using /login
Backend returns JWT token
Token is stored in frontend
Protected APIs use Bearer token authentication
Database

SQLite database stores:

Users
Favorite movies
Error Handling

The backend handles:

Invalid login
Invalid JWT token
Duplicate favorites
Movie not found
Validation errors
Future Improvements
Pagination
Search history
Deployment
Improved UI animations
Persistent wishlist using frontend state management
Genre/category filtering
Movie recommendation algorithm
