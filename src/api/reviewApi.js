// src/api/reviewApi.js
import axiosInstance from "./axiosInstance";

/**
 * Add review for a movie (Protected)
 * movieId = string
 * reviewData = { rating, comment }
 */
export const addReview = async (movieId, reviewData) => {
  const response = await axiosInstance.post(`/reviews/${movieId}`, reviewData);
  return response.data;
};

/**
 * Get all reviews for a movie (Public)
 * movieId = string
 */
export const getReviewsByMovie = async (movieId) => {
  const response = await axiosInstance.get(`/reviews/${movieId}`);
  return response.data;
};

/**
 * Delete a review (Admin Only)
 * reviewId = string
 */
export const deleteReview = async (reviewId) => {
  const response = await axiosInstance.delete(`/reviews/${reviewId}`);
  return response.data;
};
