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
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token && token !== "null" && token !== "undefined") {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
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

export const searchMovies = async (title) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/movies/search?title=${encodeURIComponent(title)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 401 || response.status === 403) {
    throw new Error("Please login again");
  }

  return response.json();
};


// ---------------- MOVIE DETAILS ----------------
export const getMovieDetails =
  async (imdbID) => {

    const token =
      localStorage.getItem("token");

    try {

      const response =
        await fetch(
          `${BASE_URL}/movies/${imdbID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      if (
        response.status === 401 ||
        response.status === 403
      ) {

        throw new Error(
          "Unauthorized"
        );
      }

      const text =
        await response.text();

      try {

        return text
          ? JSON.parse(text)
          : null;

      } catch (e) {

        return text;
      }

    } catch (e) {

      throw new Error(
        `Network error: Unable to reach ${BASE_URL}`
      );
    }
  };
// ---------------- ADD FAVORITE ----------------

export const addFavorite =
  async (movie) => {
  console.log(movie);
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

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      data = text;
    }

    if (!response.ok) {
      throw new Error(
        getErrorMessage(data, "Failed to add favorite")
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
    ).catch(() => {
      throw new Error(`Network error: Unable to reach ${BASE_URL}`);
    });

    if (response.status === 401) {

      localStorage.removeItem(
        "token"
      );

      throw new Error(
        "Unauthorized"
      );
    }

    const text = await response.text();

    if (!text) return [];

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return [];
    }

    if (!response.ok) {
      throw new Error(
        getErrorMessage(data, "Failed to fetch favorites")
      );
    }

    return Array.isArray(data) ? data : [];
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
    ).catch(() => {
      throw new Error(`Network error: Unable to reach ${BASE_URL}`);
    });

    if (response.status === 401) {

      localStorage.removeItem(
        "token"
      );

      throw new Error(
        "Unauthorized"
      );
    }

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      data = text;
    }

    if (!response.ok) {
      throw new Error(
        getErrorMessage(data, "Failed to delete favorite")
      );
    }

    return data;
  };

export const getRecommendations =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await fetch(
        `${BASE_URL}/recommendations`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    if (
      response.status === 401 ||
      response.status === 403
    ) {

      throw new Error(
        "Unauthorized"
      );
    }

    return response.json();
  };