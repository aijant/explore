import React, { useState } from "react";
import {
  Info as InfoIcon,
  Refresh as RefreshIcon,
  WarningAmber as WarningAmberIcon,
  Speed as SpeedIcon,
  DirectionsCar as DirectionsCarIcon,
  Smartphone as SmartphoneIcon,
  SmokingRooms as SmokingRoomsIcon,
  Bedtime as BedtimeIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  IconButton,
  Box,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import "./SafetyContent.css";

const vehiclesList = ["007", "008", "0716"];

const Badge = ({ color }: { color: "orange" | "red" | "yellow" }) => (
  <div className={`badge ${color}`}>
    <WarningAmberIcon fontSize="small" />
  </div>
);

const AlertCard = ({
  title,
  icon,
  badgeColor,
  aiTag = false,
  isBig = false,
}: {
  title: string;
  icon: React.ReactNode;
  badgeColor: "orange" | "red" | "yellow";
  aiTag?: boolean;
  isBig?: boolean;
}) => {
  const classNames = isBig ? "alert-card big" : "alert-card";

  return (
    <div className={classNames}>
      <Badge color={badgeColor} />
      <div className="alert-icon">{icon}</div>
      <div className="alert-title">{title}</div>
      <div className="alert-subtext">Alerts</div>
      <div className="alert-value">-</div>
      {aiTag && <div className="ai-tag">AI</div>}
    </div>
  );
};

const SafetyContent = () => {
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>(["all"]);

  const handleVehicleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    if (value.includes("all")) {
      setSelectedVehicles(["all"]);
    } else {
      setSelectedVehicles(value.filter((v) => v !== "all"));
    }
  };

  return (
    <div className="safety-wrapper">
      <Box
        className="filters"
        sx={{ justifyContent: "space-between", flexWrap: "wrap" }}
      >
        <Box
          className="filter-left"
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="vehicle-filter-label" sx={{ color: "#94a3b8" }}>
              Filter by Vehicles
            </InputLabel>
            <Select
              labelId="vehicle-filter-label"
              id="vehicle-filter"
              multiple
              value={selectedVehicles}
              onChange={handleVehicleChange}
              label="Filter by Vehicles"
              renderValue={(selected) =>
                (selected as string[]).includes("all")
                  ? "All"
                  : (selected as string[]).join(", ")
              }
              sx={{
                color: "white",
                bgcolor: "#1e2a3a",
                ".MuiOutlinedInput-notchedOutline": { borderColor: "#1e2a3a" },
                ".MuiSvgIcon-root": { color: "white" },
                maxHeight: 40,
              }}
            >
              <MenuItem value="all">
                <Checkbox checked={selectedVehicles.includes("all")} />
                <ListItemText primary="All" />
              </MenuItem>
              {vehiclesList.map((vehicle) => (
                <MenuItem
                  key={vehicle}
                  value={vehicle}
                  sx={{
                    color: vehicle === "0716" ? "red" : "inherit",
                  }}
                >
                  <Checkbox checked={selectedVehicles.includes(vehicle)} />
                  <ListItemText primary={vehicle} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            size="small"
            label="Filter by Date"
            value="Sep 01, 2025 - Sep 09, 2025"
            InputProps={{
              readOnly: true,
              sx: {
                bgcolor: "#1e2a3a",
                color: "white",
                "& .MuiInputBase-input": { color: "white" },
              },
            }}
            sx={{ minWidth: 220 }}
          />
        </Box>

        <Box
          className="filter-right"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <IconButton aria-label="Refresh" sx={{ color: "#94a3b8" }}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      <div className="no-data">You don’t have any data to display.</div>

      <div className="card-summary-grid">
        <div className="summary-card">
          <div className="card-label">
            Total Alerts <InfoIcon fontSize="small" className="info-icon" />
          </div>
          <div className="card-value">-</div>
        </div>
        <div className="summary-card">
          <div className="card-label">Most Frequent Alert</div>
          <div className="card-value">-</div>
        </div>
        <div className="summary-card">
          <div className="card-label">Most Alerted Vehicle</div>
          <div className="card-value">-</div>
        </div>
      </div>

      <div className="section-container">
        <div className="section">
          <div className="section-title">Road Risk Factors</div>
          <div className="alert-grid road-risk-grid">
            <AlertCard
              title="Hard Acceleration"
              icon={<SpeedIcon />}
              badgeColor="orange"
            />
            <AlertCard
              title="Hard Brake"
              icon={<SpeedIcon />}
              badgeColor="orange"
            />
            <AlertCard
              title="Forward Collision Warning"
              icon={<WarningAmberIcon />}
              badgeColor="red"
              aiTag
            />
            <AlertCard
              title="Tailgating"
              icon={<DirectionsCarIcon />}
              badgeColor="orange"
              isBig
              aiTag
            />
          </div>
        </div>

        <div className="section">
          <div className="section-title">Driver Behavior</div>
          <div className="alert-grid driver-behavior-grid">
            <AlertCard
              title="Phone Usage"
              icon={<SmartphoneIcon />}
              badgeColor="orange"
            />
            <AlertCard
              title="Smoking"
              icon={<SmokingRoomsIcon />}
              badgeColor="orange"
            />
            <AlertCard
              title="Yawning"
              icon={<BedtimeIcon />}
              badgeColor="orange"
            />
            <AlertCard
              title="Distracted Driving"
              icon={<VisibilityIcon />}
              badgeColor="yellow"
              isBig
              aiTag
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyContent;
