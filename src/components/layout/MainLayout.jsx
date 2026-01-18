import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar at top */}
      <Navbar />

      {/* Main content grows and leaves space for footer */}
      <Box sx={{ flex: 1, pb: "80px" }}> {/* adjust pb to footer height */}
        <Outlet />
      </Box>

      {/* Fixed footer */}
      <Footer
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 1300, // ensures footer is on top
        }}
      />
    </Box>
  );
};

export default MainLayout;
