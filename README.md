SQLite Integration and Backend CRUD Implementation:

This project is a full-stack Movie Recommendation Application developed using React for the frontend and FastAPI for the backend.

Initially, the application directly fetched movie data from the OMDb API in the frontend. The project was later upgraded into a proper backend-integrated application by introducing a FastAPI server with SQLite database integration.

The backend was structured using separate folders for routes, models, schemas, services, database, and utility functions to maintain clean architecture and reusable code practices.

Key backend features implemented include:

JWT-based user authentication
Password hashing using bcrypt
SQLite database integration with SQLAlchemy
CRUD operations for favorite movies
Protected APIs using token authentication
OMDb API integration through backend services
Proper request and response validation using Pydantic
Error handling for invalid login, duplicate favorites, invalid tokens, and missing movies

Frontend improvements include:

Integration with live FastAPI APIs
Wishlist/favorites functionality
Dynamic movie search
Random movie homepage
Dark and light theme toggle
Responsive movie card layout
Loading and error state handling
Automatic UI updates after CRUD operations

<img width="1919" height="913" alt="Screenshot 2026-05-25 at 17-58-50 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/5ea43331-612b-4917-b917-977ba978c154" />
<img width="1919" height="913" alt="Screenshot 2026-05-25 at 17-58-58 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/1fe749b2-ac96-4af4-aada-43d9a892e49a" />
<img width="1919" height="913" alt="Screenshot 2026-05-25 at 17-59-06 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/7c3f2841-704b-4733-bfa2-bdb875f90d09" />
<img width="1919" height="913" alt="Screenshot 2026-05-25 at 17-59-21 " src="https://github.com/user-attachments/assets/6226677e-e380-4a50-b9ce-fac57afc5529" />
<img width="1920" height="913" alt="Screenshot 2026-05-25 at 17-59-26 movieappwithapi" src="https://github.com/user-attachments/assets/b92d81a2-69ec-4541-b4ea-46bf845904d7" />
<img width="1920" height="913" alt="Screenshot 2026-05-25 at 17-59-43 movieappwithapi" src="https://github.com/user-attachments/assets/8632c4a3-fdb7-4013-a4a8-5f56866d1d84" />
<img width="1920" height="913" alt="Screenshot 2026-05-25 at 01-05-05 movieappwithapi" src="https://github.com/user-attachments/assets/3bccf917-153a-4ca8-8b80-3b99c1d0b2a0" />
<img width="1724" height="809" alt="Screenshot 2026-05-25 175739" src="https://github.com/user-attachments/assets/3dba5794-43e2-4dbd-99d7-f1c7269a29f6" />
