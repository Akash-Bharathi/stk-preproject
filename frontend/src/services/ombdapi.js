
// const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

// export const fetchMovies = async (searchTerm, page = 1) => {
//   const response = await fetch(
//     `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${page}`
//   );

//   const data = await response.json();

//   return data;
// };

// export const fetchMovieDetails = async (id) => {
//   const response = await fetch(
//     `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
//   );

//   const data = await response.json();

//   return data;
// };

const BASE_URL = "http://127.0.0.1:8000";

export const login = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Login failed");
  }

  return data;
};

export const searchMovies = async (title) => {
  const response = await fetch(
    `${BASE_URL}/movies/search?title=${title}`
  );

  return response.json();
};

export const getMovieDetails = async (imdbID) => {
  const response = await fetch(
    `${BASE_URL}/movies/${imdbID}`
  );

  return response.json();
};

export const addFavorite = async (movie) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      movie_id: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
    }),
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Unauthorized. Please log in again.");
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Failed to add favorite");
  }

  return data;
};

export const getFavorites = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/favorites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    console.error("Failed to fetch favorites:", response.status, response.statusText);
    return [];
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export const deleteFavorite = async (movieId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/favorites/${movieId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Unauthorized");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.detail || "Failed to delete favorite");
  }

  return data;
};
