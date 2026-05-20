import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

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

  // Fetch movies
  const fetchMovies = async (title) => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`
    );

    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search.slice(0, 10));
    } else {
      setMovies([]);
    }
  };

  // Homepage random movies
  useEffect(() => {
    const random =
      randomMovies[Math.floor(Math.random() * randomMovies.length)];

    fetchMovies(random);
  }, []);

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
  const addToWishlist = (movie) => {
    const exists = wishlist.find(
      (item) => item.imdbID === movie.imdbID
    );

    if (!exists) {
      setWishlist([...wishlist, movie]);
    }
  };

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

