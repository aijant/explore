import React, { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  IconButton,
  InputLabel,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Button,
} from "@mui/material";
import { Refresh, Add } from "@mui/icons-material";

const GeofenceContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [geofenceType, setGeofenceType] = useState("All");

  const handleReset = () => {
    setSearchTerm("");
    setGeofenceType("All");
  };

  const mockGeofences = [
    { name: "Warehouse A", type: "Polygon" },
    { name: "Depot B", type: "Circle" },
    { name: "Region C", type: "Rectangle" },
  ];

  const filteredGeofences = mockGeofences.filter((g) => {
    const matchesSearch = g.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = geofenceType === "All" || g.type === geofenceType;
    return matchesSearch && matchesType;
  });

  return (
    <Box sx={{ bgcolor: "#121a26", minHeight: "100vh", color: "#fff", p: 3 }}>
      {/* Filter Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 3,
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {/* Search Input */}
          <TextField
            placeholder="Search by Geofence Name"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

          {/* Geofence Type Filter */}
          <FormControl
            size="small"
            variant="outlined"
            sx={{ minWidth: 160, bgcolor: "#1b2638" }}
          >
            <InputLabel sx={{ color: "#687182" }}>Geofence Type</InputLabel>
            <Select
              value={geofenceType}
              onChange={(e) => setGeofenceType(e.target.value)}
              label="Geofence Type"
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
              <MenuItem value="Polygon">Polygon</MenuItem>
              <MenuItem value="Circle">Circle</MenuItem>
              <MenuItem value="Rectangle">Rectangle</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Actions: Add + Refresh */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Add />}
            sx={{
              color: "#1669f2",
              borderColor: "#1669f2",
              textTransform: "none",
              fontWeight: 600,
              fontSize: 13,
              minWidth: 110,
              "&:hover": {
                bgcolor: "#1669f230",
                borderColor: "#1669f2",
              },
            }}
          >
            Add Geofence
          </Button>
          <IconButton
            onClick={handleReset}
            sx={{ color: "#4a525e", bgcolor: "transparent" }}
          >
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      {/* Geofence Table */}
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#121a26",
          boxShadow: "none",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                GEOFENCE NAME
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                TYPE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGeofences.map((geofence, index) => (
              <TableRow
                key={index}
                sx={{ "&:hover": { backgroundColor: "#1b2638" } }}
              >
                <TableCell sx={{ color: "#cfd8dc" }}>{geofence.name}</TableCell>
                <TableCell sx={{ color: "#cfd8dc" }}>{geofence.type}</TableCell>
              </TableRow>
            ))}
            {filteredGeofences.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{ textAlign: "center", color: "#888", py: 3 }}
                >
                  No geofences found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GeofenceContent;
