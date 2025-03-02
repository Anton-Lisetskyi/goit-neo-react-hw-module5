import axios from "axios";

const imageBaseUrl = "https://image.tmdb.org/t/p/w500/";

const baseUrl = "https://api.themoviedb.org/3";
// const apiKey = "fdee17a2aa717d98d83af9cab63c3380";

const headers = {
  accept: "application/json",
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZGVlMTdhMmFhNzE3ZDk4ZDgzYWY5Y2FiNjNjMzM4MCIsIm5iZiI6MTc0MDkyNjM5OS4wNzksInN1YiI6IjY3YzQ2ZGJmYWI0ZGEwYjBkNWI0YTUxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S69-vIwyBW0sUyo_U_pf1jBlFNsEWQIKdgVSsXY00nw`,
};

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers,
});

export const fetchTrendingMovies = async () => {
  const response = await axiosInstance.get("/trending/movie/day", {
    params: { language: "ua" },
  });
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axiosInstance.get("/search/movie", {
    params: { query, language: "ua" },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}`, {
    params: { language: "ua" },
  });
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/credits`, {
    params: { language: "ua" },
  });
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/reviews`, {
    params: { language: "ua" },
  });
  return response.data.results;
};

export const getImageUrl = (path) => {
  if (!path) {
    throw new Error("???");
  }

  return `${imageBaseUrl}${path}`;
};
