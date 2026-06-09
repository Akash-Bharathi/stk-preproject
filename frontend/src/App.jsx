import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { addFavorite, getFavorites, deleteFavorite, getRecommendations } from "./services/ombdapi";
import MovieCard from "./components/MovieCard";
import MovieSkeleton from "./components/MovieSkeleton";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

import {
  useAuth
} from "./context/AuthContext";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] =
    useState(false);
  const {
    isAuthenticated,
    login,
    logout
  } = useAuth();
  const [error, setError] = useState("");

  const randomMovies = [
    "Batman",
    "Avengers",
    "Interstellar",
    "Titanic",
    "Joker",
    "Frozen",
    "Avatar",
    "Matrix",
    "Gladiator",
    "Harry Potter",
  ];

  // 
  const fetchMovies = async (title) => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/movies/search?title=${encodeURIComponent(title)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search.slice(0, 10));
      } else {
        setMovies([]);
      }

    } catch (error) {

      console.error(
        "Error fetching movies:",
        error
      );

      setMovies([]);

    } finally {

      setLoading(false);
    }
  };
  
  // Homepage random movies
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (
      token &&
      token !== "null" &&
      token !== "undefined"
    ) {

      login(token);

      loadFavorites();

      loadRecommendations();
    }


    const random =
      randomMovies[Math.floor(Math.random() * randomMovies.length)];

    fetchMovies(random);
  }, []);

  const loadFavorites = async () => {

    try {

      setError("");

      const data = await getFavorites();

      setFavorites(
        Array.isArray(data) ? data : []
      );

    } catch (error) {

      if (error.message === "Unauthorized") {

        handleLogout();
      }

      if (error.message === "Unauthorized") {
        // already handled logout above; don't show an error message
        return;
      }

      console.error("Failed to load favorites:", error);
      setFavorites([]);
      setError(error?.message || "Failed to load favorites");
    }
  };
  const loadRecommendations =
    async () => {

      try {

        const data =
          await getRecommendations();

        setRecommendations(
          data.recommended_movies || []
        );

      } catch (error) {

        console.error(
          "Failed to load recommendations:",
          error
        );
      }
    };

  const removeFavorite = async (movie) => {
    const movieId = movie.movie_id ?? movie.imdbID ?? movie.movie_id;

    try {
      setError("");

      await deleteFavorite(movieId);

      setFavorites((prev) => prev.filter((f) => (f.movie_id ?? f.imdbID) !== movieId));

      setWishlist((prev) => prev.filter((w) => w.imdbID !== movieId));

    } catch (error) {
      if (error.message === "Unauthorized") {
        handleLogout();
      }

      console.error("Failed to remove favorite:", error);

      setError("Failed to remove favorite");
    }
  };
  const toggleFavorite = async (movie) => {

    const isFavorite = favorites.some(
      (fav) => fav.movie_id === movie.imdbID
    );

    if (isFavorite) {

      await removeFavorite(movie);

    } else {

      await addToWishlist(movie);
    }
  };
  const handleLoginSuccess = (token) => {

    login(token);

    loadFavorites();
  };

  const handleLogout = () => {

    logout();

    setFavorites([]);

    setWishlist([]);
  };

  const handleHome = () => {
    setSearchTerm("");
    loadRecommendations();
  };

  // Search movies
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      const random =
        randomMovies[Math.floor(Math.random() * randomMovies.length)];

      fetchMovies(random);
    } else {
      fetchMovies(searchTerm);
    }
  };
  useEffect(() => {

    const delaySearch =
      setTimeout(() => {

        if (
          searchTerm.trim() === ""
        ) {

          const random =
            randomMovies[
            Math.floor(
              Math.random() *
              randomMovies.length
            )
            ];

          fetchMovies(random);
          loadRecommendations();
        } else {

          fetchMovies(searchTerm);
          setRecommendations([]);
        }

      }, 500);

    return () =>
      clearTimeout(delaySearch);

  }, [searchTerm]);

  // Add wishlist
  const addToWishlist = async (movie) => {

    const exists = wishlist.find(
      (item) => item.imdbID === movie.imdbID
    );

    if (exists) {
      return;
    }

    try {

      setError("");

      await addFavorite(movie);

      setWishlist([
        ...wishlist,
        movie
      ]);

      await loadFavorites();
      await loadRecommendations();

    } catch (error) {

      if (error.message === "Unauthorized") {

        handleLogout();
      }

      console.error(
        "Failed to add favorite:",
        error
      );

      setError("Failed to add favorite");
    }
  };

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Login
                onLoginSuccess={handleLoginSuccess}
              />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Register />
            )
          }
        />

        <Route
          path="/"
          element={

            <ProtectedRoute>

              <div className={darkMode ? "app dark" : "app light"}>
                <NavBar
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  logout={handleLogout}
                  onHome={handleHome}
                  userName={localStorage
                    .getItem("email")
                    ?.split("@")[0]}
                  favoriteCount={favorites.length}
                />

                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search Movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <button onClick={handleSearch}>Search</button>
                </div>
                {/* RECOMMENDED FOR YOU */}

                {searchTerm.trim() === "" && recommendations.length > 0 ? (

                  <div
                    style={{
                      padding: "1rem 1rem"
                    }}
                  >

                    <h2
                      style={{
                        color: "white",
                        marginBottom: "1rem"
                      }}
                    >
                      Recommended For You
                    </h2>

                    <div className="movie-container">

                      {recommendations.map((movie, index) => (
                        <MovieCard
                          key={movie.imdbID || movie.movie_id || index}
                          movie={movie}
                          toggleFavorite={toggleFavorite}
                          favorites={favorites}
                        />
                      ))}

                    </div>

                  </div>

                ) : searchTerm.trim() === "" ? (

                  <div
                    style={{
                      textAlign: "center",
                      color: "white",
                      marginTop: "1rem"
                    }}
                  >

                    Start searching and adding favorites to get personalized recommendations.

                  </div>

                ) : null}

                {loading && (
                  <h2
                    style={{
                      color: "white",
                      textAlign: "center"
                    }}
                  >
                    Loading movies...
                  </h2>
                )}

                {error && (
                  <h2
                    style={{
                      color: "red",
                      textAlign: "center"
                    }}
                  >
                    {error}
                  </h2>
                )}
                {searchTerm.trim() === "" && (
                  <h2
                        style={{
                          color: "white",
                          marginBottom: "1rem"
                        }}
                      >
                        Home
                      </h2>
                )}

                <div className="movie-container">

                  {loading ? (

                    Array.from({ length: 10 }).map(
                      (_, index) => (

                        <MovieSkeleton
                          key={index}
                        />
                      )
                    )

                  ) : (

                    movies.map((movie) => (

                      <MovieCard
                        key={movie.imdbID}
                        movie={movie}
                        toggleFavorite={toggleFavorite}
                        favorites={favorites}
                      />
                    ))

                  )}

                </div>
              </div>

            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <div className={darkMode ? "app dark" : "app light"}>
                <NavBar
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  logout={handleLogout}
                  onHome={handleHome}
                  userName={localStorage
                    .getItem("email")
                    ?.split("@")[0]}
                  favoriteCount={favorites.length}
                />
                <Favorites />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/movie/:imdbID"
          element={
            <ProtectedRoute>
              <div className={darkMode ? "app dark" : "app light"}>
                <NavBar
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  logout={handleLogout}
                  onHome={handleHome}
                  userName={localStorage
                    .getItem("email")
                    ?.split("@")[0]}
                  favoriteCount={favorites.length}
                />

                <MovieDetails onView={loadRecommendations} />
              </div>
            </ProtectedRoute>
          }
        />

      </Routes>


    </BrowserRouter>
  );
}

export default App;
