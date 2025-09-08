import { FC, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SteeringIcon from "@mui/icons-material/SettingsInputAntenna";
import SignalWifiIcon from "@mui/icons-material/SignalWifi4Bar";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { MapContainer, TileLayer } from "react-leaflet";

const DashboardContent: FC = () => {
  const [activeTab, setActiveTab] = useState<"vehicle" | "drivers" | "signal">(
    "vehicle"
  );

  return (
    <div className="flex w-full h-[calc(100vh_-_65px)] bg-[#4a525e] text-white">
      <div className="flex-grow relative">
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <Button variant="contained" color="primary">
            Live Share
          </Button>
        </div>

        <MapContainer
          center={[39.8283, -98.5795]} // Center of the USA
          zoom={5}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
        </MapContainer>
      </div>

      <div className="w-[350px] border-l border-[#ffffff1a] bg-[#121a20] p-[12px] flex flex-col">
        <div className="flex gap-[12px] mb-[12px]">
          <Button
            variant={activeTab === "vehicle" ? "contained" : "outlined"}
            color="primary"
            fullWidth
            startIcon={<DirectionsCarIcon />}
            onClick={() => setActiveTab("vehicle")}
            sx={{
              "& .MuiButton-startIcon": {
                marginRight: "4px",
              },
              fontSize: "12px",
              textTransform: "none",
            }}
          >
            Vehicle
          </Button>
          <Button
            variant={activeTab === "drivers" ? "contained" : "outlined"}
            color="primary"
            fullWidth
            startIcon={<SteeringIcon />}
            onClick={() => setActiveTab("drivers")}
            sx={{
              "& .MuiButton-startIcon": {
                marginRight: "4px",
              },
              fontSize: "12px",
              textTransform: "none",
            }}
          >
            Drivers
          </Button>
          <Button
            variant={activeTab === "signal" ? "contained" : "outlined"}
            color="primary"
            startIcon={<SignalWifiIcon />}
            fullWidth
            onClick={() => setActiveTab("signal")}
            sx={{
              "& .MuiButton-startIcon": {
                marginRight: "4px",
              },
              fontSize: "12px",
              textTransform: "none",
            }}
          >
            Signal
          </Button>
        </div>

        <TextField
          size="small"
          variant="outlined"
          placeholder="Search by Driver, Vehicle ID or Trailer ID"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
            sx: {
              color: "white",
              fontSize: "12px",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#334155" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#64748b",
              },
              "& .MuiInputBase-input": {
                color: "white",
                fontSize: "12px",
              },
            },
          }}
          InputLabelProps={{
            sx: { fontSize: "12px" },
          }}
        />

        <div className="mt-[16px]">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              "& .MuiButton-startIcon": {
                marginRight: "4px",
              },
              fontSize: "12px",
              textTransform: "none",
            }}
          >
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
