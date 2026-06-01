import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieDetails } from "../services/ombdapi";

function MovieDetails() {
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
            } catch (err) {
                setError("Failed to load movie details");
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [imdbID]);

    if (loading) {
        return (
            <div className="movie-details-loading">
                <div className="skeleton-loader">
                    Loading movie details...
                </div>      </div>
        );
    }

    if (error) {
        return (
            <div className="movie-details-error">
                {error}
            </div>
        );
    }

    if (!movie) {
        return null;
    }

    return (
        <div className="movie-details-container">
            <div className="movie-details-card">

                <img
                    src={
                        movie.Poster !== "N/A"
                            ? movie.Poster
                            : "https://via.placeholder.com/300x450"
                    }
                    alt={movie.Title}
                    className="movie-details-poster"
                />

                <div className="movie-details-info">

                    <h1>{movie.Title}</h1>

                    <p>
                        <strong>Year:</strong> {movie.Year}
                    </p>

                    <p>
                        <strong>Genre:</strong> {movie.Genre}
                    </p>

                    <p>
                        <strong>IMDb Rating:</strong> {movie.imdbRating}
                    </p>

                    <p>
                        <strong>Plot:</strong>
                    </p>

                    <p>{movie.Plot}</p>

                </div>

            </div>
        </div>
    );
}

export default MovieDetails;