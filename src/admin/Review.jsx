import React, { useEffect, useState } from "react";
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton, CircularProgress, Paper } from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/admin/reviews")
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/admin/reviews/${id}`)
      .then(() => setReviews((prev) => prev.filter((r) => r._id !== id)))
      .catch((err) => console.error(err));
  };

  if (loading) return <CircularProgress />;

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Reviews</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Movie</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review._id}>
              <TableCell>{review.user.name}</TableCell>
              <TableCell>{review.movie.title}</TableCell>
              <TableCell>{review.rating}</TableCell>
              <TableCell>{review.comment}</TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => handleDelete(review._id)}><Delete /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Reviews;
