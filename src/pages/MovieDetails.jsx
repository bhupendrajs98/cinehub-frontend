import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { getMovieById } from "../api/movieApi";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
  if (!movie) return <Typography variant="h6" textAlign="center" sx={{ mt: 5 }}>Movie not found!</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>{movie.title}</Typography>
      <Box component="img" src={movie.posterUrl} alt={movie.title} sx={{ width: "100%", maxHeight: 500, objectFit: "cover", borderRadius: 2, mb: 3 }} />
      <Typography variant="body1">{movie.description}</Typography>
    </Container>
  );
};

export default MovieDetails;
