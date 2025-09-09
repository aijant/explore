import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const LocationContent: React.FC = () => {
  const [tab, setTab] = useState("Vehicles ELD");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date("2025-09-08"));

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const handleDateChange = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === "next" ? 1 : -1));
    setSelectedDate(newDate);
  };

  return (
    <Box
      sx={{
        bgcolor: "#121a26",
        color: "white",
        height: "100vh",
        p: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <ButtonGroup variant="contained" sx={{ gap: 1 }}>
        {["Vehicles ELD", "Vehicles GPS", "Trailers GPS"].map((label) => (
          <Button
            key={label}
            onClick={() => setTab(label)}
            color={tab === label ? "primary" : "inherit"}
            sx={{
              textTransform: "none",
              fontWeight: tab === label ? "700" : "400",
              bgcolor: tab === label ? "#1669f2" : "transparent",
              "&:hover": {
                bgcolor: tab === label ? "#144fc7" : "#2a374f",
              },
            }}
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <FormControl
          variant="filled"
          size="small"
          sx={{ minWidth: 180, bgcolor: "#1b2638" }}
        >
          <InputLabel sx={{ color: "#687182" }}>Select Vehicle</InputLabel>
          <Select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            sx={{ color: "white" }}
            disableUnderline
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Vehicle 1">Vehicle 1</MenuItem>
            <MenuItem value="Vehicle 2">Vehicle 2</MenuItem>
            <MenuItem value="Vehicle 3">Vehicle 3</MenuItem>
          </Select>
        </FormControl>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#1b2638",
            px: 2,
            py: 0.5,
            borderRadius: 1,
            userSelect: "none",
            minHeight: 48
          }}
        >
          <IconButton
            onClick={() => handleDateChange("prev")}
            sx={{ color: "#687182", p: 0.5 }}
            size="small"
          >
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <Typography
            sx={{
              mx: 1,
              fontWeight: "600",
              fontSize: 14,
              color: "white",
              minWidth: 110,
              textAlign: "center",
            }}
          >
            {formattedDate}
          </Typography>
          <IconButton
            onClick={() => handleDateChange("next")}
            sx={{ color: "#687182", p: 0.5 }}
            size="small"
          >
            <ArrowForwardIos fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default LocationContent;
