import { useNavigate } from "react-router-dom";
function MovieCard({
  movie,
  toggleFavorite,
  favorites
}) {
  const navigate = useNavigate();
  const isAdded =
    favorites.some(
      (item) =>
        item.movie_id ===
        movie.imdbID
    );

  return (

    <div className="movie-card">

      <button
        className="favorite-heart"
        onClick={() => toggleFavorite(movie)}
      >
        {isAdded ? "❤️" : "♡"}
      </button>
      {/* MOVIE POSTER */}
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450"
        }
        alt={movie.Title}
        onClick={() => navigate(`/movie/${movie.imdbID}`)}
        style={{ cursor: "pointer" }}
      />

      <div className="info">
        <h3
          onClick={() => navigate(`/movie/${movie.imdbID}`)}
          style={{ cursor: "pointer" }}
        >
          {movie.Title}
        </h3>
        <p>{movie.Year}</p>
        <button
          className="primary-btn"
          onClick={() => navigate(`/movie/${movie.imdbID}`)}
        >
          View Details
        </button>
        {/* Add to Wishlist Button */}
        {/* <button
          className="favorite-heart"
          onClick={() => addToWishlist(movie)}
        >
          {isAdded ? "❤️" : "🤍"}
        </button> */}
      </div>

    </div>
  );
}

export default MovieCard;