// src/pages/Movies.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllMovies, searchMovies } from "../api/movieApi";
import { Typography, CircularProgress, Box, Grid } from "@mui/material";
import MovieCard from "../components/movie/MovieCard";

const IMDB_TRAILER_URL =
  "https://www.imdb.com/video/imdb/vi2850801689/imdb/embed";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [params] = useSearchParams();
  const query = params.get("q");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = query
          ? await searchMovies(query)
          : await getAllMovies();

        setMovies(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" minHeight="60vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (movies.length === 0) {
    return (
      <Box display="flex" justifyContent="center" minHeight="60vh">
        <Typography>
          {query ? "No movies found." : "No movies available."}
        </Typography>
      </Box>
    );
  }

  const heroMovie = !query ? movies[0] : null;

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, py: { xs: 3, sm: 4, md: 6 } }}>

      {/* ================= HERO SECTION ================= */}
      {heroMovie && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            mb: 6,
          }}
        >
          {/* Poster */}
          <Box
            sx={{
              width: { xs: "100%", md: 260 },
              height: 380,
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: "#000",
            }}
          >
            <img
              src={heroMovie.poster}
              alt={heroMovie.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* IMDB Trailer */}
          <Box
            sx={{
              flex: 1,
              height: 380,
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: "#000",
            }}
          >
            <iframe
              src={IMDB_TRAILER_URL}
              title="IMDB Trailer"
              width="100%"
              height="100%"
              style={{ border: "none" }}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </Box>
        </Box>
      )}

      {/* ================= SEARCH TITLE ================= */}
      {query && (
        <Typography variant="h5" fontWeight="bold" mb={4}>
          Search results for "{query}"
        </Typography>
      )}

      {/* ================= ALL MOVIES ================= */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        {query ? "Results" : "All Movies"}
      </Typography>

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item key={movie._id} xs={12} sm={6} md={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {/* ================= CTA ================= */}
      {!query && (
        <Box
          sx={{
            mt: 8,
            backgroundColor: "#020617",
            color: "#fff",
            p: 6,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Discover More Movies & Features!
          </Typography>
          <Typography maxWidth={800} mx="auto" lineHeight={1.8}>
            Create watchlists, track movies, and explore content across
            theatres and streaming platforms.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Movies;
