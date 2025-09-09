import React from "react";
import { Box, Typography, Button } from "@mui/material";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";

const DispatchContent: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "#121a26",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#ffffff",
        px: 2,
        textAlign: "center",
      }}
    >
      <Box maxWidth={500}>
        <HeadsetMicIcon sx={{ fontSize: 80, color: "#ffffff", mb: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Unlock Dispatch
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#b0bec5", mb: 4, lineHeight: 1.7 }}
        >
          Manage truck routes faster with our instant notification system
          directly from the driver's mobile when they are on the pickup or done
          with the delivery. Organize the upcoming loads and have full insight
          into the ongoing ones. By unlocking Dispatch, you will have full
          control over the load status making sure that the delivery is done on
          time. If you want to purchase Dispatch feature, please contact your
          Xplore ELD representative.
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
          Learn More
        </Button>
      </Box>
    </Box>
  );
};

export default DispatchContent;
