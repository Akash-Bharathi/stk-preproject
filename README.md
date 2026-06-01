## Movie Details Page

### Overview

Implemented a dedicated Movie Details page that allows users to view complete information about a selected movie.

### Features Implemented

* Navigation from movie cards to a dedicated details page
* Dynamic route using IMDb ID
* Fetches movie information from the OMDB API
* Protected route support
* Responsive UI for desktop and mobile devices

### Information Displayed

* Movie Poster
* Movie Title
* Release Year
* Genre
* Plot Summary
* IMDb Rating

### Technical Implementation

#### Frontend

* React Router dynamic route:

  * `/movie/:imdbID`
* Created `MovieDetails.jsx`
* Added navigation from `MovieCard.jsx`
* Added loading state while fetching movie data

#### API Integration

Movie details are fetched using the OMDB API through the backend endpoint:

`GET /movies/{imdb_id}`

Example:

`GET /movies/tt0372784`

#### User Flow

1. User searches for a movie
2. User clicks the movie card
3. Application navigates to the Movie Details page
4. Movie information is fetched using the IMDb ID
5. Detailed movie information is displayed
<img width="1920" height="913" alt="Screenshot 2026-06-01 at 18-00-10 movieappwithapi" src="https://github.com/user-attachments/assets/6b6adaca-50d8-46b7-ac9a-8e2d5fe3f7de" />
<img width="1920" height="913" alt="Screenshot 2026-06-01 at 17-55-25 movieappwithapi" src="https://github.com/user-attachments/assets/1bc7b85b-2ff7-43cc-a8f2-04b3fb654fb9" />
