import { FC } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SteeringIcon from "@mui/icons-material/SettingsInputAntenna";
import SignalWifiIcon from "@mui/icons-material/SignalWifi4Bar";

const DashboardContent: FC = () => {
  return (
    <div className="flex w-full h-[calc(100vh_-_65px)] bg-[#4a525e] text-white">
      {/* Map Section */}
      <div className="flex-grow relative">
        {/* Top Controls (optional) */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <Button variant="contained" color="primary">
            Live Share
          </Button>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-full">
          {/* Replace this with real Google Maps or Leaflet */}
          <div className="w-full h-full flex justify-center items-center text-gray-400">
            Map Placeholder
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[350px] border-r-1 border-[#ffffff1a] bg-[#121a20] border-gray-700 p-4 flex flex-col gap-4">
        {/* Toggle Buttons */}
        <div className="flex justify-between">
          <Button
            variant="contained"
            color="primary"
            startIcon={<DirectionsCarIcon />}
          >
            Vehicle
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<SteeringIcon />}
          >
            Wheel
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<SignalWifiIcon />}
          >
            Signal
          </Button>
        </div>

        {/* Search Input */}
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search by Driver, Vehicle ID or Trailer ID"
          fullWidth
          InputProps={{
            sx: {
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#334155" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#64748b",
              },
              "& .MuiInputBase-input": { color: "white" },
            },
          }}
        />

        {/* Filter Button */}
        <Button variant="contained" color="secondary">
          Filter
        </Button>
      </div>
    </div>
  );
};

export default DashboardContent;
