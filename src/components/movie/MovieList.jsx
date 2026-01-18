import { Grid, Box, Typography } from "@mui/material";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, onMovieClick }) => {
  if (!movies?.length) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        No movies found 🎬
      </Typography>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item key={movie._id}>
            <MovieCard
              movie={movie}
              onClick={() => onMovieClick(movie._id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieList;
