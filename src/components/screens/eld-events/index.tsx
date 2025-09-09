import { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  IconButton,
  InputLabel,
  FormControl,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";

const EldEventsContent = () => {
  const [searchVehicleId, setSearchVehicleId] = useState("");
  const [eventType, setEventType] = useState("All");

  const handleReset = () => {
    setSearchVehicleId("");
    setEventType("All");
  };

  const mockData = [
    {
      vehicleId: "V1234",
      unidentifiedEvents: 5,
      unidentifiedTime: "1h 25m",
    },
    {
      vehicleId: "V5678",
      unidentifiedEvents: 2,
      unidentifiedTime: "35m",
    },
    {
      vehicleId: "V9101",
      unidentifiedEvents: 8,
      unidentifiedTime: "3h 10m",
    },
  ];

  const filteredData = mockData.filter((item) =>
    item.vehicleId.toLowerCase().includes(searchVehicleId.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: "#121a26", minHeight: "100vh", color: "#fff" }}>
      {/* Filter Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 3,
          py: 2,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <TextField
            placeholder="Search by Vehicle ID"
            variant="outlined"
            size="small"
            value={searchVehicleId}
            onChange={(e) => setSearchVehicleId(e.target.value)}
            InputProps={{
              style: { color: "#fff" },
            }}
            sx={{
              bgcolor: "#1b2638",
              input: { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#2e3c4d" },
                "&:hover fieldset": { borderColor: "#3f4d61" },
                "&.Mui-focused fieldset": { borderColor: "#1669f2" },
              },
            }}
          />

          <Box
            sx={{
              bgcolor: "#1b2638",
              px: 2,
              py: 1,
              borderRadius: 1,
              minHeight: 40,
              display: "flex",
              alignItems: "center",
              border: "1px solid #2e3c4d",
            }}
          >
            <Typography sx={{ fontSize: 14, color: "#fff" }}>
              Sep 02, 2025 – Sep 09, 2025
            </Typography>
          </Box>

          <FormControl
            size="small"
            variant="outlined"
            sx={{ minWidth: 140, bgcolor: "#1b2638" }}
          >
            <InputLabel sx={{ color: "#687182" }}>Event Type</InputLabel>
            <Select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              label="Event Type"
              sx={{
                color: "#fff",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2e3c4d",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3f4d61",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1669f2",
                },
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Type1">Type 1</MenuItem>
              <MenuItem value="Type2">Type 2</MenuItem>
              <MenuItem value="Type3">Type 3</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box>
          <IconButton
            onClick={handleReset}
            sx={{ color: "#4a525e", bgcolor: "transparent", p: 1 }}
          >
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#121a26",
          boxShadow: "none",
          px: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                VEHICLE ID
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
              >
                UNIDENTIFIED EVENTS
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
              >
                UNIDENTIFIED TIME
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{
                  "&:hover": { backgroundColor: "#1b2638" },
                }}
              >
                <TableCell sx={{ color: "#cfd8dc" }}>{row.vehicleId}</TableCell>
                <TableCell sx={{ color: "#cfd8dc", textAlign: "center" }}>
                  {row.unidentifiedEvents}
                </TableCell>
                <TableCell sx={{ color: "#cfd8dc", textAlign: "center" }}>
                  {row.unidentifiedTime}
                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  sx={{ textAlign: "center", color: "#888", py: 3 }}
                >
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EldEventsContent;
