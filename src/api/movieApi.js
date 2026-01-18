// src/api/movieApi.js
import axiosInstance from "./axiosInstance.js";

/**
 * Public routes
 */

// Get all movies
export const getAllMovies = async () => {
  const response = await axiosInstance.get("/movies");
  return response.data;
};

// Get single movie by ID
export const getMovieById = async (movieId) => {
  const response = await axiosInstance.get(`/movies/${movieId}`);
  return response.data;
};

// Search movies → /api/movies/search?q=batman
export const searchMovies = async (query) => {
  const response = await axiosInstance.get(`/movies/search?q=${encodeURIComponent(query)}`);
  return response.data;
};

// Filter & sort → /api/movies/filter?genre=Action&sort=rating
export const filterMovies = async (filters) => {
  // filters = { genre: 'Action', sort: 'rating' }
  const params = new URLSearchParams(filters).toString();
  const response = await axiosInstance.get(`/movies/filter?${params}`);
  return response.data;
};

/**
 * Admin routes (protected)
 */

// Add movie
export const addMovie = async (movieData) => {
  const response = await axiosInstance.post("/movies", movieData);
  return response.data;
};

// Update movie
export const updateMovie = async (movieId, movieData) => {
  const response = await axiosInstance.put(`/movies/${movieId}`, movieData);
  return response.data;
};

// Delete movie
export const deleteMovie = async (movieId) => {
  const response = await axiosInstance.delete(`/movies/${movieId}`);
  return response.data;
};
