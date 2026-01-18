import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  Stack,
} from "@mui/material";

import {
  getAllMovies,
  addMovie,
  deleteMovie,
  updateMovie, // ⬅ ADD THIS
} from "../api/movieApi";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null); // ⬅ EDIT MODE

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    releaseYear: "",
    rating: "",
    poster: "",
  });

  // 🔹 Load movies
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await getAllMovies();
      setMovies(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // 🔹 Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Add / Update Movie
  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateMovie(editingId, formData);
        alert(" Movie updated");
      } else {
        await addMovie(formData);
        alert(" Movie added");
      }

      setFormData({
        title: "",
        description: "",
        genre: "",
        releaseYear: "",
        rating: "",
        poster: "",
      });
      setEditingId(null);
      fetchMovies();
    } catch (error) {
      console.error(error);
      alert(" Action failed");
    }
  };

  // 🔹 Delete movie
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this movie?")) return;
    await deleteMovie(id);
    fetchMovies();
  };

  // 🔹 Edit movie
  const handleEdit = (movie) => {
    setEditingId(movie._id);
    setFormData({
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      releaseYear: movie.releaseYear,
      rating: movie.rating,
      poster: movie.poster,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        🎬 Manage Movies
      </Typography>

      {/* ADD / EDIT FORM */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            {editingId ? "Edit Movie" : "Add New Movie"}
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Genre" name="genre" value={formData.genre} onChange={handleChange} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField fullWidth label="Release Year" name="releaseYear" value={formData.releaseYear} onChange={handleChange} />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField fullWidth label="Rating" name="rating" value={formData.rating} onChange={handleChange} />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField fullWidth label="Poster URL" name="poster" value={formData.poster} onChange={handleChange} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button variant="contained" onClick={handleSubmit}>
                {editingId ? "Update Movie" : "Add Movie"}
              </Button>

              {editingId && (
                <Button sx={{ ml: 2 }} onClick={() => setEditingId(null)}>
                  Cancel
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* MOVIE LIST */}
      <Typography variant="h6" mb={2}>
        All Movies
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={2}>
          {movies.map((movie) => (
            <Grid key={movie._id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2">
                    {movie.genre} • {movie.releaseYear}
                  </Typography>

                  {/*  EDIT + DELETE SAME LINE */}
                  <Stack direction="row" spacing={1} mt={1}>
                    <Button size="small" variant="outlined" onClick={() => handleEdit(movie)}>
                      Edit
                    </Button>

                    <Button size="small" color="error" onClick={() => handleDelete(movie._id)}>
                      Delete
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Movies;
