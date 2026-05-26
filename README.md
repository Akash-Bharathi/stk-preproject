🎬 Movie Recommendation App

A full-stack Movie Recommendation Application built using React.js, FastAPI, and SQLite.
The application allows users to search movies using the OMDb API, register/login securely using JWT authentication, and maintain a personalized favorites/watchlist system.

Features Implemented:
- Authentication System
- User Registration
- User Login
- JWT Token Authentication
- Persistent Login using localStorage
- Protected Routes
- Logout Functionality
- Password Hashing using bcrypt
Movie Features:
- Search Movies from OMDb API
- Movie Details Fetching
- Random Home Screen Movies
- Debounced Search
- Responsive Movie Grid
- Dark / Light Theme Toggle
- Favorites / Watchlist
- Add Movies to Favorites
- Remove Movies from Favorites
- Personalized Favorites per User
- Favorites Stored in SQLite Database

UI / UX Improvements:
- Responsive Design
- Mobile Friendly Layout
- Toast Notifications
- Loading Spinner
- Personalized Navbar
- Empty State Handling
- Reusable Components
- Clean Folder Structure
Tech Stack:
- Frontend
- - React.js
- - React Router DOM
- - Context API
- - React Hot Toast
- Backend
- - FastAPI
- - SQLAlchemy
- - SQLite
- - Pydantic
- - JWT Authentication
- - Passlib / bcrypt
- API
- - OMDb API
📂 Project Structure
movie-recommendation-app/

├── backend/
│   ├── app/
│   │   ├── database/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── routes/
│   │   └── App.jsx
│
└── README.md
🔑 Authentication Flow
Register

Users can create an account using:

Email
Password

Passwords are securely hashed before storing in the database.

Login

After successful login:

JWT token is generated
Token stored in localStorage
Protected routes become accessible

The following routes are protected:

Home Page
Favorites Page

Unauthenticated users are redirected to Login.

🗄️ Database Implementation

SQLite database is used for storing:

Users
Favorite Movies

Implemented CRUD operations:

Create Favorite
Read Favorites
Delete Favorite
User Authentication Storage
Backend APIs
- Authentication APIs
- Method	Endpoint
- POST	/register
- POST	/login
- Movie APIs
- Method	Endpoint
- GET	/movies/search?title=batman
- GET	/movies/{imdb_id}
- Favorites APIs
- Method	Endpoint
- POST	/favorites
- GET	/favorites
- DELETE	/favorites/{movie_id}
Frontend + Backend Integration:

The React frontend communicates with the FastAPI backend for:

Authentication
Favorites Management
Movie Searching
Movie Data Fetching

All favorites functionality is connected to live backend APIs.


Run Frontend :

cd frontend
npm install
npm run dev

Run Backend :

cd backend
uvicorn app.main:app --reload

<img width="1920" height="913" alt="Screenshot 2026-05-24 at 20-43-57 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/1667c149-c5b1-4289-9ff4-e58a69646f33" />
<img width="1919" height="863" alt="Screenshot 2026-05-24 at 21-14-46 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/d32dc90c-5e9e-43e8-a351-910ab836dd40" />
<img width="1919" height="863" alt="Screenshot 2026-05-24 at 21-18-30 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/384f998e-f6cd-4772-86fa-467fc14bc174" />
<img width="1920" height="913" alt="Screenshot 2026-05-24 at 20-42-19 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/b312be21-99b8-4703-a04f-91685b970520" />
<img width="1920" height="913" alt="Screenshot 2026-05-26 at 18-08-00 movieappwithapi" src="https://github.com/user-attachments/assets/9a451466-3be6-4ed5-9527-38e3fe5cf784" />
<img width="1920" height="913" alt="Screenshot 2026-05-26 at 18-08-10 movieappwithapi" src="https://github.com/user-attachments/assets/4875d9fa-c7c4-44fd-bd78-67584382a647" />
<img width="1920" height="913" alt="Screenshot 2026-05-26 at 18-08-18 movieappwithapi" src="https://github.com/user-attachments/assets/297e7e72-7e1c-4d06-9587-2f8949afec46" />
<img width="1920" height="913" alt="Screenshot 2026-05-26 at 18-11-23 movieappwithapi" src="https://github.com/user-attachments/assets/825baea5-c972-434e-95cd-1adb083181fd" />
<img width="1920" height="913" alt="Screenshot 2026-05-26 at 18-17-53 movieappwithapi" src="https://github.com/user-attachments/assets/02769459-850f-4ac3-8462-65b0153f9f74" />
<img width="1920" height="913" alt="Screenshot 2026-05-26 at 18-31-54 movieappwithapi" src="https://github.com/user-attachments/assets/c4417638-01c1-4e4f-9304-48a75c607a4a" />
