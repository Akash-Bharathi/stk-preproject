import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import Login from "./pages/Login";
import { addFavorite, getFavorites, deleteFavorite } from "./services/ombdapi";


const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
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

  setLoading(true);

  setError("");

  try {

    const response = await fetch(
      `http://127.0.0.1:8000/movies/search?title=${title}`
    );

    const data = await response.json();

    if (data.Search) {

      setMovies(data.Search.slice(0, 10));

    } else {

      setMovies([]);

      setError("No movies found");
    }

  } catch (error) {

    console.error("Error fetching movies:", error);

    setMovies([]);

    setError("Failed to fetch movies");

  } finally {

    setLoading(false);
  }
};

  // Homepage random movies
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      loadFavorites();
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

    console.error(
      "Failed to load favorites:",
      error
    );

    setFavorites([]);

    setError("Failed to load favorites");
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

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    loadFavorites();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setFavorites([]);
    setWishlist([]);
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

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <div className="top-bar">
        <h1 style={{ color: "white", fontFamily: "Arial, sans-serif" }}>MOVIE APP</h1>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        {isAuthenticated && (
          <button
            className="theme-btn"
            onClick={handleLogout}
            style={{ marginLeft: "1rem" }}
          >
            Logout
          </button>
        )}
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      <h2 style={{ color: "white", fontFamily: "Arial, sans-serif" }}>Wishlist: {wishlist.length}</h2>
      <div style={{ color: "white", fontFamily: "Arial, sans-serif", marginBottom: "1rem" }}>
        Saved favorites loaded from backend: {favorites.length}
        <button
          style={{ marginLeft: "1rem" }}
          onClick={loadFavorites}
        >
          Refresh favorites
        </button>
      </div>

      <div style={{ color: "white", fontFamily: "Arial, sans-serif", marginBottom: "1.5rem" }}>
        <h3>Favorites</h3>
        {!Array.isArray(favorites) || favorites.length === 0 ? (
          <p>No saved favorites found. Click "Add to Wishlist" on a movie to save one.</p>
        ) : (
          <div className="favorites-list" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {favorites.map((movie) => (
              <div
                key={movie.movie_id ?? movie.imdbID}
                className="favorite-card"
                style={{ width: "180px", background: "rgba(255,255,255,0.08)", padding: "0.75rem", borderRadius: "8px" }}
              >
                <img
                  src={movie.poster && movie.poster !== "N/A" ? movie.poster : "https://via.placeholder.com/180x270"}
                  alt={movie.title || movie.Title}
                  style={{ width: "100%", borderRadius: "4px", marginBottom: "0.5rem" }}
                />
                <strong>{movie.title || movie.Title}</strong>
                <p style={{ margin: "0.5rem 0 0", fontSize: "0.9rem" }}>{movie.year || movie.Year || ""}</p>
                <button
                  style={{ marginTop: "0.5rem" }}
                  onClick={() => removeFavorite(movie)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
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

      <div className="movie-container">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

