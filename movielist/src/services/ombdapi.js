
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const fetchMovies = async (searchTerm, page = 1) => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${page}`
  );

  const data = await response.json();

  return data;
};

export const fetchMovieDetails = async (id) => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
  );

  const data = await response.json();

  return data;
};