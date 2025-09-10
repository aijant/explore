import React, { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import { Refresh, Download } from "@mui/icons-material";

interface Asset {
  vehicleId: string;
  drivers: string;
  location: string;
  vin: string;
  eldSn: string;
  gpsSn: string;
  tabletSn: string;
  cameraSn: string;
  engineHours: string;
  odometer: string;
}

const dummyAssets: Asset[] = [
  {
    vehicleId: "007",
    drivers: "",
    location: "3AKJHHDRXPSUJ1478",
    vin: "3AKJHHDRXPSUJ1478",
    eldSn: "",
    gpsSn: "",
    tabletSn: "",
    cameraSn: "500211",
    engineHours: "",
    odometer: "",
  },
  {
    vehicleId: "008",
    drivers: "Test Test +1",
    location: "1FUJGLDR7GLGW6979",
    vin: "1FUJGLDR7GLGW6979",
    eldSn: "",
    gpsSn: "",
    tabletSn: "",
    cameraSn: "200195",
    engineHours: "",
    odometer: "",
  },
];

const AssetsContent: React.FC = () => {
  const [searchVehicleId, setSearchVehicleId] = useState("");
  const [searchVin, setSearchVin] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");

  const filteredAssets = dummyAssets.filter(
    (asset) =>
      asset.vehicleId.includes(searchVehicleId) &&
      asset.vin.toLowerCase().includes(searchVin.toLowerCase())
  );

  return (
    <Box
      sx={{
        bgcolor: "#121a26",
        color: "white",
        height: "100vh",
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            variant="filled"
            size="small"
            placeholder="Search by Vehicle ID, ELD S/N or GPS S/N"
            value={searchVehicleId}
            onChange={(e) => setSearchVehicleId(e.target.value)}
            sx={{
              bgcolor: "#1b2638",
              input: { color: "white" },
              flex: 1,
              minWidth: 250,
              "& .MuiFilledInput-root": { bgcolor: "#1b2638" },
              "& .MuiInputBase-input::placeholder": {
                color: "#687182",
                opacity: 1,
              },
            }}
            InputProps={{ disableUnderline: true }}
          />
          <TextField
            variant="filled"
            size="small"
            placeholder="Search by VIN"
            value={searchVin}
            onChange={(e) => setSearchVin(e.target.value)}
            sx={{
              bgcolor: "#1b2638",
              input: { color: "white" },
              flex: 1,
              minWidth: 250,
              "& .MuiFilledInput-root": { bgcolor: "#1b2638" },
              "& .MuiInputBase-input::placeholder": {
                color: "#687182",
                opacity: 1,
              },
            }}
            InputProps={{ disableUnderline: true }}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl
            variant="filled"
            size="small"
            sx={{ minWidth: 150, bgcolor: "#1b2638" }}
          >
            <InputLabel sx={{ color: "#687182" }}>Filter by Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ color: "white" }}
              disableUnderline
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
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
            Export
          </Button>
          <IconButton sx={{ color: "#687182" }}>
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ bgcolor: "#121a26" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                "VEHICLE ID",
                "DRIVERS",
                "LOCATION",
                "VIN",
                "ELD S/N",
                "GPS S/N",
                "TABLET S/N",
                "CAMERA S/N",
                "ENGINE HOURS",
                "ODOMETER",
              ].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: 12,
                    borderBottom: "1px solid #34425a",
                    bgcolor: "#121a26",
                    whiteSpace: "nowrap",
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssets.map((asset, i) => (
              <TableRow
                key={i}
                hover
                sx={{ borderBottom: "1px solid #34425a", cursor: "default" }}
              >
                <TableCell
                  sx={{ fontWeight: "600", fontSize: 14, color: "#fff" }}
                >
                  {asset.vehicleId}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 14,
                    color: asset.drivers ? "#4a90e2" : "#fff",
                    cursor: asset.drivers ? "pointer" : "default",
                  }}
                >
                  {asset.drivers}
                </TableCell>
                <TableCell sx={{ fontSize: 14, color: "#fff" }}>
                  {asset.location}
                </TableCell>
                <TableCell sx={{ fontSize: 14, color: "#fff" }}>
                  {asset.vin}
                </TableCell>
                <TableCell sx={{ fontSize: 14, color: "#fff" }}>
                  {asset.eldSn}
                </TableCell>
                <TableCell sx={{ fontSize: 14, color: "#fff" }}>
                  {asset.gpsSn}
                </TableCell>
                <TableCell sx={{ fontSize: 14, color: "#fff" }}>
                  {asset.tabletSn}
                </TableCell>
                <TableCell sx={{ fontSize: 14, color: "#fff" }}>
                  {asset.cameraSn}
                </TableCell>
                <TableCell sx={{ fontSize: 14, color: "#fff" }}>
                  {asset.engineHours}
                </TableCell>
                <TableCell sx={{ fontSize: 14, color: "#fff" }}>
                  {asset.odometer}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AssetsContent;
