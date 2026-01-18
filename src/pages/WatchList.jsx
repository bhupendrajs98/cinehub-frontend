import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import MovieCard from "../components/movie/MovieCard";
import { getWatchlist } from "../utils/watchlistUtils";

const Watchlist = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(getWatchlist());
  }, []);

  if (movies.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Typography variant="h6">
          Your watchlist is empty ❤️
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 4, py: 5 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        ❤️ My Watchlist
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

export default Watchlist;
