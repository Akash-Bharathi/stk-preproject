import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/ombdapi";

function MovieDetails({ onView }) {
    const { imdbID } = useParams();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                const data = await getMovieDetails(imdbID);
                setMovie(data);
                if (onView) {
                    onView();
                }
            } catch (err) {
                setError("Failed to load movie details");
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [imdbID, onView]);

    if (loading) {
        return (
            <div className="movie-details-loading">
                <div>Loading movie details...</div>
            </div>
        );
    }

    if (error) {
        return <div className="movie-details-error">{error}</div>;
    }

    if (!movie) {
        return null;
    }

    return (
        <div className="movie-details-container">
            {/* Left 30%: The Poster */}
            <div className="movie-poster-section">
                <img
                    src={
                        movie.Poster !== "N/A"
                            ? movie.Poster
                            : "https://via.placeholder.com/600x900"
                    }
                    alt={movie.Title}
                    className="full-poster"
                />
                {/* This div creates the soft gaze/fade effect */}
                <div className="soft-fade"></div>
            </div>

            {/* Right 70%: The Information */}
            <div className="movie-info-section">
                <h1 className="movie-title">{movie.Title}</h1>

                <p className="detail-text">
                    <strong>Year:</strong> {movie.Year}
                </p>

                <p className="detail-text">
                    <strong>Genre:</strong> {movie.Genre}
                </p>

                <p className="detail-text">
                    <strong>IMDb Rating:</strong> {movie.imdbRating}
                </p>

                <p className="detail-text" style={{ marginTop: "20px" }}>
                    <strong>Plot:</strong>
                </p>

                <p className="detail-text plot-text">{movie.Plot}</p>
            </div>
        </div>
    );
}

export default MovieDetails;