import {
  useEffect,
  useState
} from "react";
import toast from "react-hot-toast";
import {
  getFavorites,
  deleteFavorite
} from "../services/ombdapi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Favorites() {

  const [favorites, setFavorites] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  // LOAD FAVORITES
  const loadFavorites = async () => {

    try {

      setLoading(true);

      setError("");

      const data =
        await getFavorites();

      setFavorites(data);

    } catch (err) {

      console.error("Failed to load favorites:", err);
      if (err?.message === "Unauthorized") {
        // log user out and redirect to login
        try {
          logout();
        } catch (e) { }
        navigate("/login");
        return;
      }

      setError(err?.message || "Failed to load favorites");

    } finally {

      setLoading(false);
    }
  };

  // DELETE FAVORITE
  const removeFavorite =
    async (movieId) => {

      try {

        await deleteFavorite(
          movieId
        );
        toast.success(
          "Favorite removed"
        );
        setFavorites((prev) =>
          prev.filter(
            (movie) =>
              movie.movie_id !==
              movieId
          )
        );

      } catch (err) {

        setError(
          "Failed to remove favorite"
        );
        toast.error(
          "Failed to remove favorite"
        );
      }
    };

  // ON PAGE LOAD
  useEffect(() => {

    loadFavorites();

  }, []);

  // LOADING
  if (loading) {

    return <Loader />;
  }

  // ERROR
  if (error) {

    return (
      <h2
        style={{
          color: "red",
          textAlign: "center",
        }}
      >
        {error}
      </h2>
    );
  }

  // EMPTY STATE
  if (favorites.length === 0) {

    return (
      <h2
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        No favorites added yet
      </h2>
    );
  }

  return (

    <div
      style={{
        padding: "2rem",
      }}
    >

      <h1
        style={{
          color: "white",
          marginBottom: "2rem",
        }}
      >
        My Favorites
      </h1>

      <div className="movie-container">
        {favorites.map((movie) => (
          <div key={movie.movie_id} className="movie-card">
            <img
              src={movie.poster || "https://via.placeholder.com/300x450"}
              alt={movie.title}
            />

            <div className="info">
              <h3>{movie.title}</h3>
              <p>{movie.year || ""}</p>
              <button
                className="primary-btn danger-btn"
                onClick={() => removeFavorite(movie.movie_id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;