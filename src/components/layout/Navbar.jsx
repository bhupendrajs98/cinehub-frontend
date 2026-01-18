import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MovieIcon from "@mui/icons-material/Movie";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  // 🔄 Sync user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  // 🔍 Search handler
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Always redirect to movies page with query
    if (value.trim()) {
      navigate(`/movies?q=${encodeURIComponent(value)}`);
    } else {
      navigate(location.pathname); // empty → no filter
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#0f172a" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* 🔹 Logo */}
        <Box display="flex" alignItems="center" gap={1}>
          <MovieIcon sx={{ color: "#facc15" }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "#fff", fontWeight: "bold" }}
          >
            Cinehub
          </Typography>
        </Box>

        {/* 🔍 SEARCH BAR */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#1e293b",
            px: 2,
            py: 0.5,
            borderRadius: 2,
            width: "40%",
          }}
        >
          <SearchIcon sx={{ color: "#94a3b8" }} />
          <InputBase
            placeholder="Search movies..."
            value={search}
            onChange={handleSearch}
            sx={{ ml: 1, color: "#fff", width: "100%" }}
          />
        </Box>

        {/* 🔹 LINKS */}
        <Box display="flex" gap={2} alignItems="center">
          <Button component={Link} to="/movies" sx={navBtn}>
            Movies
          </Button>
          <Button component={Link} to="/popular" sx={navBtn}>
            Popular
          </Button>
          <Button component={Link} to="/top-rated" sx={navBtn}>
            Top Rated
          </Button>
          <Button component={Link} to="/watchlist" sx={navBtn}>
            Watchlist
          </Button>

          {user ? (
            <Button
              onClick={handleLogout}
              variant="contained"
              sx={{
                backgroundColor: "#ef4444",
                "&:hover": { backgroundColor: "#dc2626" },
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button component={Link} to="/login" variant="contained" sx={authBtn}>
                Login
              </Button>
              <Button component={Link} to="/register" variant="contained" sx={authBtn}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const navBtn = {
  color: "#e5e7eb",
  textTransform: "none",
  "&:hover": { color: "#facc15" },
};

const authBtn = {
  backgroundColor: "#facc15",
  color: "#000",
  fontWeight: "bold",
  "&:hover": { backgroundColor: "#eab308" },
};

export default Navbar;
