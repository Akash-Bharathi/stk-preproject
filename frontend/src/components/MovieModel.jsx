const MovieModal = ({ movie, closeModal }) => {
  if (!movie) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={closeModal}>
          X
        </button>

        <img src={movie.Poster} alt={movie.Title} />

        <h2>{movie.Title}</h2>

        <p><strong>Genre:</strong> {movie.Genre}</p>

        <p><strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}</p>

        <p>{movie.Plot}</p>
      </div>
    </div>
  );
};

export default MovieModal;