import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import MovieIcon from "@mui/icons-material/Movie";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/* ================= WATCHLIST HELPERS ================= */
const STORAGE_KEY = "watchlist";

const getWatchlist = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const saveWatchlist = (list) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    const exists = getWatchlist().some((m) => m._id === movie._id);
    setInWatchlist(exists);
  }, [movie._id]);

  const toggleWatchlist = (e) => {
    e.stopPropagation(); //  CARD CLICK PREVENT (IMPORTANT)

    let list = getWatchlist();
    if (inWatchlist) {
      list = list.filter((m) => m._id !== movie._id);
    } else {
      list.push(movie);
    }

    saveWatchlist(list);
    setInWatchlist(!inWatchlist);
  };

  const releaseYear = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : movie.releaseYear || "N/A";

  const poster =
    movie.poster ||
    movie.posterUrl ||
    movie.image ||
    movie.thumbnail ||
    "";

  return (
    <Card
      onClick={() => navigate(`/movie/${movie._id}`)} //  ORIGINAL LOGIC SAFE
      sx={{
        width: 230,
        borderRadius: 3,
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.35s ease",
        boxShadow: 4,
        "&:hover": {
          transform: "translateY(-6px) scale(1.04)",
          boxShadow: 12,
        },
      }}
    >
      {/* ❤️ WATCHLIST ICON */}
      <Tooltip
        title={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      >
        <IconButton
          onClick={toggleWatchlist}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 5,
            bgcolor: "rgba(0,0,0,0.65)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.85)" },
          }}
        >
          {inWatchlist ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon sx={{ color: "#fff" }} />
          )}
        </IconButton>
      </Tooltip>

      {/* 🎬 POSTER */}
      {poster ? (
        <CardMedia
          component="img"
          height="330"
          image={poster}
          alt={movie.title}
          sx={{ objectFit: "cover" }}
        />
      ) : (
        <Box
          sx={{
            height: 330,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.200",
          }}
        >
          <MovieIcon sx={{ fontSize: 90, color: "grey.500" }} />
        </Box>
      )}

      {/* 🌑 GRADIENT OVERLAY */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75), transparent 60%)",
        }}
      />

      {/* 📄 CONTENT */}
      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          color: "#fff",
          width: "100%",
        }}
      >
        <Typography variant="h6" fontWeight="bold" noWrap>
          {movie.title}
        </Typography>

        {/* Genres */}
        <Stack direction="row" spacing={0.5} mt={0.5} flexWrap="wrap">
          {movie.genre?.slice(0, 2).map((g, i) => (
            <Chip
              key={i}
              label={g}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "#fff",
                fontSize: 11,
              }}
            />
          ))}
        </Stack>

        {/* Rating + Year */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <StarIcon sx={{ color: "gold", fontSize: 18 }} />
            <Typography variant="body2" fontWeight="bold">
              {movie.rating ? movie.rating.toFixed(1) : "N/A"}
            </Typography>
          </Box>

          <Typography variant="caption" sx={{ opacity: 0.85 }}>
            {releaseYear}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
