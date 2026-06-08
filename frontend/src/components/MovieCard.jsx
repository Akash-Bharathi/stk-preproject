import { useNavigate } from "react-router-dom";
function MovieCard({
  movie,
  toggleFavorite,
  favorites
}) {
  const navigate = useNavigate();
  const movieId = movie.imdbID || movie.movie_id;
  const title = movie.Title || movie.title || "Untitled";
  const year = movie.Year || movie.year || "";
  const poster = movie.Poster || movie.poster || "https://via.placeholder.com/300x450";
  const isAdded = movieId && favorites.some(
    (item) =>
      item.movie_id === movieId ||
      item.imdbID === movieId
  );

  const canFavorite = Boolean(movieId);

  const handleNavigate = () => {
    if (movieId) {
      navigate(`/movie/${movieId}`);
    }
  };

  return (
    <div className="movie-card">
      <button
        className="favorite-heart"
        onClick={() => canFavorite && toggleFavorite(movie)}
        disabled={!canFavorite}
        style={{ cursor: canFavorite ? "pointer" : "not-allowed" }}
      >
        {isAdded ? "❤️" : "♡"}
      </button>
      <img
        src={poster !== "N/A" ? poster : "https://via.placeholder.com/300x450"}
        alt={title}
        onClick={handleNavigate}
        style={{ cursor: movieId ? "pointer" : "default" }}
      />

      <div className="info">
        <h3
          onClick={handleNavigate}
          style={{ cursor: movieId ? "pointer" : "default" }}
        >
          {title}
        </h3>

        {year && <p>{year}</p>}

        {movie.reason && (
          <small style={{ color: "#aaa", display: "block", marginBottom: "0.5rem" }}>
            {movie.reason}
          </small>
        )}

        <button
          className="primary-btn"
          onClick={handleNavigate}
          disabled={!movieId}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default MovieCard;