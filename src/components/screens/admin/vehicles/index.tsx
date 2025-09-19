import { useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  IconButton
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useGetVehiclesQuery } from "@store/services/vehicles.service";

// Sample vehicle data
const vehicles = [
  {
    id: "007",
    licensePlate: "IL-SPG515369",
    eldSn: "500211",
    gpsSn: "",
    tabletSn: "",
    cameraSn: "500211",
    groups: "Unassigned",
    documents: "",
    status: "Active",
  },
  {
    id: "008",
    licensePlate: "IL-P1247706",
    eldSn: "200195",
    gpsSn: "",
    tabletSn: "",
    cameraSn: "200195",
    groups: "Unassigned",
    documents: "",
    status: "Active",
  },
];

const VehiclesContent = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");

    const { data: AllVehicles = [] } = useGetVehiclesQuery({});
  
    console.log("AllVehicles", AllVehicles);
  

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.id.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.eldSn.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.gpsSn.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || vehicle.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ p: 3, bgcolor: "#121a26", color: "white" }}>
      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          mb: 4,
          alignItems: "center",
        }}
      >
        <TextField
          size="small"
          placeholder="Search by Vehicle ID, ELD S/N or GPS S/N"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 350, bgcolor: "#1e2630", borderRadius: 1 }}
          InputProps={{ style: { color: "white" } }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: "white", fontSize: "12px" }}>
            Filter by Status
          </InputLabel>
          <Select
            value={statusFilter}
            label="Filter by Status"
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ bgcolor: "#1e2630", color: "white" }}
            MenuProps={{
              PaperProps: { sx: { bgcolor: "#1e2630", color: "white" } },
            }}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
            <MenuItem value="All">All</MenuItem>
          </Select>
        </FormControl>

        {/* Buttons */}
        <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
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
            + Add Vehicle
          </Button>
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
          <IconButton sx={{ color: "white" }}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ bgcolor: "#1e2630" }}>
        <Table sx={{ minWidth: 900 }} size="small" aria-label="vehicles table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                VEHICLE ID ↑
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                LICENSE PLATE
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                ELD S/N ↑
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                GPS S/N
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                TABLET S/N
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                CAMERA S/N
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                GROUPS
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                DOCUMENTS
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                STATUS
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVehicles.map((vehicle) => (
              <TableRow
                key={vehicle.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ color: "white" }}>{vehicle.id}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {vehicle.licensePlate}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{vehicle.eldSn}</TableCell>
                <TableCell sx={{ color: "white" }}>{vehicle.gpsSn}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {vehicle.tabletSn}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {vehicle.cameraSn}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{vehicle.groups}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {vehicle.documents}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{vehicle.status}</TableCell>
                <TableCell>
                  <IconButton sx={{ color: "white" }}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {filteredVehicles.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ color: "white" }}>
                  No vehicles found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default VehiclesContent;
