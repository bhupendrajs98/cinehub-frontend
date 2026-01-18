import { Box, TextField, MenuItem, Button } from "@mui/material";

const MovieFilter = ({
  search,
  genre,
  rating,
  onSearchChange,
  onGenreChange,
  onRatingChange,
  onReset,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        mb: 3,
        alignItems: "center",
      }}
    >
      <TextField
        label="Search movie"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
      />

      <TextField
        select
        label="Genre"
        value={genre}
        onChange={(e) => onGenreChange(e.target.value)}
        size="small"
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Action">Action</MenuItem>
        <MenuItem value="Drama">Drama</MenuItem>
        <MenuItem value="Comedy">Comedy</MenuItem>
        <MenuItem value="Horror">Horror</MenuItem>
        <MenuItem value="Romance">Romance</MenuItem>
      </TextField>

      <TextField
        select
        label="Min Rating"
        value={rating}
        onChange={(e) => onRatingChange(e.target.value)}
        size="small"
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value={9}>9+</MenuItem>
        <MenuItem value={8}>8+</MenuItem>
        <MenuItem value={7}>7+</MenuItem>
        <MenuItem value={6}>6+</MenuItem>
      </TextField>

      <Button
        variant="outlined"
        color="error"
        onClick={onReset}
      >
        Reset
      </Button>
    </Box>
  );
};

export default MovieFilter;
