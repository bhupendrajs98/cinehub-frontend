import { Box, Typography, Container, IconButton, Divider } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#020617",
        color: "#94a3b8",
        mt: 6,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* 🔹 Top section */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
          }}
        >
          {/* Logo */}
          <Box display="flex" alignItems="center" gap={1}>
            <MovieIcon sx={{ color: "#facc15" }} />
            <Typography
              variant="h6"
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              Cinehub
            </Typography>
          </Box>

          {/* Social icons */}
          <Box>
            <IconButton sx={iconStyle}>
              <GitHubIcon />
            </IconButton>
            <IconButton sx={iconStyle}>
              <LinkedInIcon />
            </IconButton>
            <IconButton sx={iconStyle}>
              <InstagramIcon />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: "#1e293b" }} />

        {/* 🔹 Bottom section */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Cinehub. All rights reserved.
          </Typography>

          <Typography variant="body2">
            Built with ❤️ using React & MUI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const iconStyle = {
  color: "#94a3b8",
  "&:hover": {
    color: "#facc15",
  },
};

export default Footer;
