import React from "react";
import { Box, Typography, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const TruckStopLogo: React.FC = () => (
  <Box sx={{ position: "relative", width: 80, height: 100 }}>
    <LocationOnIcon sx={{ fontSize: 80, color: "#fff" }} />
    <Box
      component="svg"
      viewBox="0 0 24 24"
      sx={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 24,
        height: 40,
        fill: "#121a26",
      }}
    >
      <rect x="9" y="3" width="6" height="18" rx={1} />
      <rect x="10.5" y="5" width="3" height="14" rx={0.5} fill="white" />
    </Box>
  </Box>
);

const LoadsContent: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "#121a26",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#ffffff",
        px: 2,
        textAlign: "center",
      }}
    >
      <TruckStopLogo />

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 3 }}>
        This page is available only to the <strong>TruckStop</strong> users.
      </Typography>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#1669f2",
          textTransform: "none",
          fontWeight: 600,
          px: 4,
          "&:hover": {
            backgroundColor: "#144fc7",
          },
        }}
      >
        Request to Join
      </Button>
    </Box>
  );
};

export default LoadsContent;
