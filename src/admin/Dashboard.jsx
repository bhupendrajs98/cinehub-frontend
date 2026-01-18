// src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
  Alert,
} from "@mui/material";
import { getDashboardStats } from "../api/adminApi"; // Proper path

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    movies: 0,
    reviews: 0,
    activeSessions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getDashboardStats();
      setStats({
        users: data.users || 0,
        movies: data.movies || 0,
        reviews: data.reviews || 0,
        activeSessions: data.activeSessions || 0,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard stats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading)
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

  if (error)
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
        gap={2}
      >
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={fetchStats}>
          Retry
        </Button>
      </Box>
    );

  const cards = [
    { label: "Total Users", value: stats.users, color: "#1976d2" },
    { label: "Total Movies", value: stats.movies, color: "#388e3c" },
    { label: "Total Reviews", value: stats.reviews, color: "#f57c00" },
    { label: "Active Sessions", value: stats.activeSessions, color: "#d32f2f" },
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
      <Typography variant="h4" mb={4} fontWeight="bold" textAlign="center">
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {cards.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                boxShadow: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                  borderTop: `5px solid ${item.color}`,
                },
              }}
            >
              <Typography
                variant="subtitle1"
                color="text.secondary"
                fontWeight="medium"
              >
                {item.label}
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                mt={1}
                color={item.color}
              >
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Refresh Button */}
      <Box mt={5} textAlign="center">
        <Button variant="contained" color="primary" onClick={fetchStats}>
          Refresh Stats
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
