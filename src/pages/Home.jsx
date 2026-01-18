// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { getAllMovies } from "../api/movieApi";
import { Typography, CircularProgress, Box, Grid } from "@mui/material";
import MovieCard from "../components/movie/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to fetch movies"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error" variant="h6">{error}</Typography>
      </Box>
    );

  if (movies.length === 0)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography variant="h6">No movies available.</Typography>
      </Box>
    );

  const heroMovie = movies[0]; // Hero movie

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, py: { xs: 3, sm: 4, md: 6 } }}>

      {/* ================= HERO SECTION: Poster + Trailer ================= */}
      {heroMovie && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 2, md: 3 },
            mb: 6,
          }}
        >
          {/* Left: Poster */}
          <Box
            sx={{
              flex: 1,
              borderRadius: 2,
              overflow: "hidden",
              minHeight: { xs: 180, md: 350 },
              maxHeight: { xs: 220, md: 400 },
              backgroundColor: "#000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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

          {/* Right: Trailer */}
          <Box
            sx={{
              flex: 1,
              borderRadius: 2,
              overflow: "hidden",
              minHeight: { xs: 180, md: 350 },
              maxHeight: { xs: 220, md: 400 },
              backgroundColor: "#000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <video
              src="https://imdb-video.media-imdb.com/vi2850801689/1434659607842-pgv4ql-1751785217412.mp4?Expires=1768760064&Signature=VAKUwCWwn17WuAu2ogR6zEb~JGDnUZmcN2dGgpFpIKXVoEJnUCD0A70Zjr2EGB8eJuX9JOImPyvrT8PJ3O5odu-R1zQAVs~bQQKTUXRij5q-cbEtkKnY12Gx2C3PB~g22PhuA8uAlZh0RZuE-RxqaEbvQ8PObfxMRfzaH2iuqw7RuMbkddiKQeynuypWn4uo8VIF5SqKFRObLbRyrwxPED85oL8hcxCfdbGf2CPLpZvGqrdZSKpk~JBGUu-Cj-ZrK41dmPscUG9ijWGRJ2fq0PRu1JgL64csSXiLS71BUmABUFI1bAdtAFqsq0Rz11phW81mTVI-oqtRzQeqoDLJPQ__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
              controls
              autoPlay
              muted
              loop
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Box>
      )}

      {/* ================= HORIZONTAL SCROLLABLE TRAILERS ================= */}
      <Box mb={6}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Trailers & Featured
        </Typography>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 2,
            py: 2,
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {movies.map((movie) => (
            <Box
              key={movie._id}
              sx={{
                minWidth: 250,
                flexShrink: 0,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: 3 },
              }}
            >
              <MovieCard movie={movie} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* ================= ALL MOVIES GRID ================= */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        All Movies
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {movies.map((movie) => (
          <Grid item key={movie._id} xs={12} sm={6} md={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {/* ================= CTA / FEATURES ================= */}
      <Box
        sx={{
          mt: { xs: 5, md: 8 },
          backgroundColor: "#020617",
          color: "#fff",
          p: { xs: 3, sm: 4, md: 6 },
          borderRadius: 2,
          textAlign: { xs: "left", md: "center" },
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Discover More Movies & Exciting Features!
        </Typography>
        <Typography
          variant="body1"
          color="inherit"
          lineHeight={1.8}
          maxWidth={800}
          mx={{ xs: 0, md: "auto" }}
        >
          Create and manage your own personalized watchlists, track what you've
          seen, and effortlessly find your next favorite movie or show—whether
          it's in theatres, on TV, or streaming on popular platforms.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
