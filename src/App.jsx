import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Movies from "./admin/Movies";
import Users from "./admin/Users";
import MovieDetails from "./components/movie/MovieDetails";
// import Reviews from "./admin/Reviews";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthContext } from "./context/AuthContext";
import PrivateAdminRoute from "./components/common/PrivateAdminRoute";
import UserMovie from "./pages/UserMovie";
import Popular from "./pages/Popular";
import Watchlist from "./pages/WatchList";

const App = () => {
  const { currentUser } = useContext(AuthContext); // get logged-in user

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="movie/:id" element={<MovieDetails />} />
          <Route path="/movies" element={<UserMovie/>}/>
          <Route path="/popular" element={<Popular/>}/>
          <Route path="/watchlist" element={<Watchlist/>}/>
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute user={currentUser}>
              <AdminLayout />
            </PrivateAdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="movies" element={<Movies />} />

          <Route path="users" element={<Users />} />
          {/* <Route path="reviews" element={<Reviews />} /> */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
