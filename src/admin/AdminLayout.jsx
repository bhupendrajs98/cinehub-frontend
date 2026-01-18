import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  Divider,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  Movie,
  People,
  Logout,
} from "@mui/icons-material";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 260;
const collapsedWidth = 80;

const menuItems = [
  { label: "Dashboard", icon: <Dashboard />, path: "/admin/dashboard" },
  { label: "Movies", icon: <Movie />, path: "/admin/movies" },
  { label: "Users", icon: <People />, path: "/admin/users" },
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  //  Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // agar token alag store kiya ho

    navigate("/login", { replace: true });
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* ===== Logo ===== */}
      <Toolbar
        sx={{
          justifyContent: collapsed ? "center" : "space-between",
        }}
      >
        {!collapsed && (
          <Typography fontWeight="bold" fontSize={18}>
            CineHub
          </Typography>
        )}
        <IconButton onClick={() => setCollapsed(!collapsed)}>
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Divider />

      {/* ===== Menu Items ===== */}
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Tooltip
              key={item.label}
              title={collapsed ? item.label : ""}
              placement="right"
            >
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  my: 0.5,
                  borderRadius: 2,
                  background: active
                    ? "linear-gradient(135deg, #667eea, #764ba2)"
                    : "transparent",
                  color: active ? "#fff" : "inherit",
                  "&:hover": {
                    background: active
                      ? "linear-gradient(135deg, #667eea, #764ba2)"
                      : "rgba(0,0,0,0.04)",
                  },
                }}
              >
                <Box sx={{ minWidth: 40 }}>{item.icon}</Box>
                {!collapsed && <ListItemText primary={item.label} />}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      <Divider sx={{ mt: "auto" }} />

      {/* ===== Logout ===== */}
      <List sx={{ px: 1 }}>
        <ListItemButton
          sx={{
            borderRadius: 2,
            color: "error.main",
            "&:hover": {
              background: "rgba(255,0,0,0.08)",
            },
          }}
          onClick={handleLogout}
        >
          <Box sx={{ minWidth: 40 }}>
            <Logout />
          </Box>
          {!collapsed && <ListItemText primary="Logout" />}
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* ================= TOP BAR ================= */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.75)",
          color: "#000",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography fontWeight="bold">Admin Dashboard</Typography>
          <Avatar sx={{ bgcolor: "#667eea" }}>A</Avatar>
        </Toolbar>
      </AppBar>

      {/* ================= SIDEBAR ================= */}
      <Drawer
        variant="permanent"
        sx={{
          width: collapsed ? collapsedWidth : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: collapsed ? collapsedWidth : drawerWidth,
            transition: "width 0.3s",
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* ================= MAIN CONTENT ================= */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          background: "#f7f8fc",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
