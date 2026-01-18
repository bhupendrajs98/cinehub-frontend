import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../../api/movieApi";
import {
  Box,
  Typography,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieById(id).then(setMovie);
  }, [id]);

  if (!movie)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      {/* BACKDROP */}
      <Box
        sx={{
          height: "70vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.9)), url(${movie.backdrop || movie.poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          p: 4,
        }}
      >
        <Box display="flex" gap={4}>
          {/* Poster */}
          <img
            src={movie.poster}
            alt={movie.title}
            style={{
              width: 260,
              borderRadius: 12,
              boxShadow: "0 20px 40px rgba(0,0,0,.6)",
            }}
          />

          {/* Info */}
          <Box color="#fff">
            <Typography variant="h3" fontWeight="bold">
              {movie.title}
            </Typography>

            <Stack direction="row" spacing={1} mt={2}>
              {movie.genre.map((g, i) => (
                <Chip key={i} label={g} color="primary" />
              ))}
            </Stack>

            <Box display="flex" alignItems="center" mt={2} gap={1}>
              <StarIcon sx={{ color: "gold" }} />
              <Typography variant="h6">
                {movie.rating}/10
              </Typography>
            </Box>

            <Typography mt={3} maxWidth={600}>
              {movie.description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MovieDetails;
