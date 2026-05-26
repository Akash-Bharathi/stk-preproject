import {
  useEffect,
  useState
} from "react";
import toast from "react-hot-toast";
import {
  getFavorites,
  deleteFavorite
} from "../services/ombdapi";
import Loader from "../components/Loader";

function Favorites() {

  const [favorites, setFavorites] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // LOAD FAVORITES
  const loadFavorites = async () => {

    try {

      setLoading(true);

      setError("");

      const data =
        await getFavorites();

      setFavorites(data);

    } catch (err) {

      setError(
        "Failed to load favorites"
      );

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

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",

          gap: "1.5rem",
        }}
      >

        {favorites.map((movie) => (

          <div
            key={movie.movie_id}

            style={{
              background:
                "rgba(255,255,255,0.08)",

              padding: "1rem",

              borderRadius: "10px",
            }}
          >

            <img
              src={movie.poster}
              alt={movie.title}

              style={{
                width: "100%",

                borderRadius: "8px",

                marginBottom: "1rem",
              }}
            />

            <h3
              style={{
                color: "white",
              }}
            >
              {movie.title}
            </h3>

            <button
              onClick={() =>
                removeFavorite(
                  movie.movie_id
                )
              }

              style={{
                marginTop: "1rem",

                width: "100%",

                padding: "0.7rem",

                border: "none",

                borderRadius: "6px",

                cursor: "pointer",
              }}
            >
              Remove
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;