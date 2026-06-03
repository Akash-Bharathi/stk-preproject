1. Search History Tracking

Whenever an authenticated user searches for a movie:

Stores user ID
Stores search keyword
Stores search timestamp automatically

Search Flow
User searches movie
        ↓
GET /movies/search
        ↓
save_search_history()
        ↓
Record stored in search_history table

2. Search History API Endpoint:
   
GET /history
Description

Returns the latest 10 searches performed by the authenticated user.

Response Example
[
  {
    "id": 12,
    "keyword": "Batman",
    "searched_at": "2026-06-04T10:20:00",
    "user_id": 1
  },
  {
    "id": 11,
    "keyword": "Interstellar",
    "searched_at": "2026-06-04T09:10:00",
    "user_id": 1
  }
]
Features
Authenticated access only
Sorted by newest searches first
Limited to latest 10 searches

3. Dashboard Statistics API Endpoint
GET /dashboard
Description

Returns dashboard statistics for the authenticated user.

Response Example
{
  "total_favorites": 5,
  "total_searches": 18,
  "recent_searches": [
    "Batman",
    "Avatar",
    "Interstellar"
  ]
}
Statistics Included
Total favorite movies
Total movie searches
Latest 3 search keywords

4. Database Relationships
User Relationships

A user can have:

Multiple favorites
Multiple reviews
Multiple search history records
Relationship Structure
users
 ├── favorites
 ├── reviews
 └── search_history
SQLAlchemy Relationships
favorites = relationship(
    "Favorite",
    back_populates="user"
)

search_history = relationship(
    "SearchHistory",
    back_populates="user"
)

reviews = relationship(
    "Review",
    back_populates="user"
)
5. Authentication

Protected endpoints:

GET /history
GET /dashboard
GET /movies/search


Files Added
app/models/search_history.py

app/routes/history.py
app/routes/dashboard.py

app/services/history_service.py
app/services/dashboard_service.py

app/schemas/history_schema.py

Files Updated
app/models/user.py

app/routes/movies.py

app/main.py

<img width="1920" height="913" alt="Screenshot 2026-06-03 at 14-36-31 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/a1d7586f-194e-4202-a145-c00a598ea2fc" />
<img width="1920" height="913" alt="Screenshot 2026-06-03 at 14-36-50 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/be51736c-83b9-4150-bc79-f49ed8202b60" />
<img width="1920" height="913" alt="Screenshot 2026-06-03 at 14-37-00 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/318e06bc-a2aa-4153-b987-5197ed95d4d8" />
<img width="1476" height="879" alt="Screenshot 2026-06-03 143746" src="https://github.com/user-attachments/assets/86dad4c2-3ac9-4389-90c9-5611353440f3" />
