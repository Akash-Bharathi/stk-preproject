function MovieCard({ movie, addToWishlist, wishlist }) {
  const isAdded = wishlist.some(
    (item) => item.imdbID === movie.imdbID
  );

  return (
    <div className="movie-card">
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450"
        }
        alt={movie.Title}
      />

      <h3>{movie.Title}</h3>

      <p>{movie.Year}</p>

      <button
        className={isAdded ? "added-btn" : "wishlist-btn"}
        onClick={() => addToWishlist(movie)}
        disabled={isAdded}
      >
        {isAdded ? "Added to Wishlist ✓" : "Add to Wishlist"}
      </button>
    </div>
  );
}

export default MovieCard;