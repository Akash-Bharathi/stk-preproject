
Implemented a personalized Movie Recommendation System that suggests movies based on user activity within the application. Recommendations are generated using user favorites, search history, and previously viewed movies.

## Features Implemented

### Backend

#### Recommendation API

* Created `GET /recommendations` endpoint.
* Returns personalized movie recommendations with recommendation reasons.

#### Recommendation Service

* Built a dedicated recommendation service responsible for:

  * Analyzing user activity.
  * Identifying preferred genres and interests.
  * Generating relevant movie recommendations.
  * Preventing duplicate recommendations.

#### Database Updates

Added support for:

* User Favorites
* Search History
* Recently Viewed Movies
* User Preferences

#### Sample Response

```json
{
  "recommended_movies": [
    {
      "title": "The Dark Knight",
      "genre": "Action",
      "reason": "Based on your search history"
    }
  ]
}
```

### Frontend

#### Recommended For You Section

* Added a new **"Recommended For You"** section on the Home Page.
* Displays movie cards consistent with the existing movie listing UI.

#### Recommendation Reasons

Each recommendation includes a reason such as:

* Based on your favorites
* Based on your recent searches
* Similar to movies you viewed

#### Dynamic Updates

Recommendations automatically refresh when:

* A movie is added to favorites
* A movie search is performed
* A movie detail page is viewed

#### Empty State

Displays:

> "Start searching and adding favorites to get personalized recommendations."

### Bonus Features Implemented

* Recommendation scoring
* Trending movie recommendations
* Refresh recommendations button
* Movie carousel

## Recommendation Logic

1. Collect user favorites, search history, and viewed movies.
2. Identify frequently occurring genres and categories.
3. Find similar movies based on user interests.
4. Rank recommendations using a recommendation score.
5. Remove duplicates and previously recommended items.
6. Return personalized recommendations with explanation reasons.


<img width="1920" height="913" alt="Screenshot 2026-06-09 at 12-46-43 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/47af0c52-29fc-474a-b2be-3eb9841f5b27" />
<img width="1292" height="728" alt="Screenshot 2026-06-09 125038" src="https://github.com/user-attachments/assets/347a9247-c111-4e6c-b0a1-a57dbce68a66" />
<img width="1289" height="729" alt="Screenshot 2026-06-09 125015" src="https://github.com/user-attachments/assets/6a0ca438-68b8-4c40-b058-73a375148878" />
<img width="1920" height="913" alt="Screenshot 2026-06-09 at 12-21-01 movieappwithapi" src="https://github.com/user-attachments/assets/7416d391-f221-4106-b218-27424232b358" />
<img width="1920" height="913" alt="Screenshot 2026-06-09 at 12-41-48 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/26e26c7a-26aa-4d99-a7fc-d2f3610189af" />
<img width="1920" height="913" alt="Screenshot 2026-06-09 at 12-46-31 FastAPI - Swagger UI" src="https://github.com/user-attachments/assets/fcc72ac1-bc81-4ee8-be52-5fd377b89598" />
