import { useEffect, useState } from "react";
import { getAllMovies } from "../api/movieApi";
import {
  Typography,
  CircularProgress,
  Box,
  Grid,
} from "@mui/material";
import MovieCard from "../components/movie/MovieCard";

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        if (Array.isArray(data)) {
          // ⭐ FILTER: rating >= 8
          const popularMovies = data
            .filter((movie) => movie.rating >= 8)
            // 🔥 Optional: rating ke hisaab se sort (high → low)
            .sort((a, b) => b.rating - a.rating);

          setMovies(popularMovies);
        } else {
          setMovies([]);
        }
      })
      .catch(() => setError("Failed to fetch popular movies"))
      .finally(() => setLoading(false));
  }, []);

  // ⏳ Loading
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  // 😶 Empty
  if (movies.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Typography variant="h6">
          No popular movies found (Rating 8+).
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, py: { xs: 3, md: 5 } }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        ⭐ Popular Movies (8+ Rating)
      </Typography>

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item key={movie._id} xs={12} sm={6} md={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Popular;
