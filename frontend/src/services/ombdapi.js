const BASE_URL = "http://127.0.0.1:8000";

const getErrorMessage = (data, fallback) => {
  if (!data) return fallback;
  if (typeof data === "string") return data;
  if (data.detail) {
    if (typeof data.detail === "string") return data.detail;
    if (typeof data.detail === "object") {
      return data.detail.message || data.detail.error || JSON.stringify(data.detail);
    }
  }
  if (data.message) return data.message;
  return fallback;
};


// ---------------- TOKEN ----------------

const getAuthHeaders = () => {

  const token =
    localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};


// ---------------- LOGIN ----------------

export const login = async ({
  email,
  password
}) => {

  const response = await fetch(
    `${BASE_URL}/login`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      getErrorMessage(data, "Login failed")
    );
  }

  return data;
};


// ---------------- REGISTER ----------------

export const register = async ({
  email,
  password
}) => {

  const response = await fetch(
    `${BASE_URL}/register`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      getErrorMessage(data, "Registration failed")
    );
  }

  return data;
};


// ---------------- SEARCH MOVIES ----------------

export const searchMovies = async (
  title
) => {

  const response = await fetch(
    `${BASE_URL}/movies/search?title=${title}`
  );

  return response.json();
};


// ---------------- MOVIE DETAILS ----------------

export const getMovieDetails =
  async (imdbID) => {

    const response = await fetch(
      `${BASE_URL}/movies/${imdbID}`
    );

    return response.json();
  };


// ---------------- ADD FAVORITE ----------------

export const addFavorite =
  async (movie) => {

    const response = await fetch(
      `${BASE_URL}/favorites`,
      {
        method: "POST",

        headers:
          getAuthHeaders(),

        body: JSON.stringify({
          movie_id: movie.imdbID,
          title: movie.Title,
          poster: movie.Poster,
        }),
      }
    );

    if (response.status === 401) {

      localStorage.removeItem(
        "token"
      );

      throw new Error(
        "Unauthorized"
      );
    }

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.detail ||
        "Failed to add favorite"
      );
    }

    return data;
  };


// ---------------- GET FAVORITES ----------------

export const getFavorites =
  async () => {

    const response = await fetch(
      `${BASE_URL}/favorites`,
      {
        headers:
          getAuthHeaders(),
      }
    );

    if (response.status === 401) {

      localStorage.removeItem(
        "token"
      );

      throw new Error(
        "Unauthorized"
      );
    }

    const data =
      await response.json();

    return Array.isArray(data)
      ? data
      : [];
  };


// ---------------- DELETE FAVORITE ----------------

export const deleteFavorite =
  async (movieId) => {

    const response = await fetch(
      `${BASE_URL}/favorites/${movieId}`,
      {
        method: "DELETE",

        headers:
          getAuthHeaders(),
      }
    );

    if (response.status === 401) {

      localStorage.removeItem(
        "token"
      );

      throw new Error(
        "Unauthorized"
      );
    }

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.detail ||
        "Failed to delete favorite"
      );
    }

    return data;
  };