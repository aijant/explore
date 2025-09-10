import { useState } from "react";
import {
  Box,
  Typography,
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
  IconButton,
  Avatar,
  Stack,
  Tooltip,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import AppleIcon from "@mui/icons-material/Apple";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Sample data for drivers
const drivers = [
  {
    id: 1,
    name: "Test Scott",
    vehicle: "008",
    email: "test555@gmail.com",
    phone: true,
    groups: ["PC", "YM"],
    groupsColors: ["#4caf50", "#2196f3"],
    cycle: "USA 70 hour/8 day",
    mobileApp: "3.26.3",
    createdOn: "May 10, 2025",
    status: "Active",
  },
  {
    id: 2,
    name: "Test Test",
    vehicle: "008",
    email: "test6789@gmail.com",
    phone: true,
    groups: ["PC", "YM"],
    groupsColors: ["#4caf50", "#2196f3"],
    cycle: "USA 70 hour/8 day",
    mobileApp: "3.26.3",
    createdOn: "Aug 23, 2024",
    status: "Active",
  },
];

const AdminContent = () => {
  const [search, setSearch] = useState("");
  const [driverStatusFilter, setDriverStatusFilter] = useState("Active");
  const [specialDutyFilter, setSpecialDutyFilter] = useState("All Drivers");

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(search.toLowerCase()) ||
      driver.email.toLowerCase().includes(search.toLowerCase()) ||
      driver.vehicle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      driverStatusFilter === "All" || driver.status === driverStatusFilter;

    const matchesDuty =
      specialDutyFilter === "All Drivers" ||
      specialDutyFilter === "SomeOtherFilter";

    return matchesSearch && matchesStatus && matchesDuty;
  });

  return (
    <Box sx={{ p: 3, bgcolor: "#121a26", color: "white" }}>
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
          placeholder="Search by Driver Name, Vehicle, Email or Phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 350, bgcolor: "#1e2630", borderRadius: 1 }}
          InputProps={{ style: { color: "white" } }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: "white", fontSize: "12px" }}>
            Filter by Driver Status
          </InputLabel>
          <Select
            value={driverStatusFilter}
            label="Filter by Driver Status"
            onChange={(e) => setDriverStatusFilter(e.target.value)}
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
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: "white", fontSize: "12px" }}>
            Filter by Special Duty Status
          </InputLabel>
          <Select
            value={specialDutyFilter}
            label="Filter by Special Duty Status"
            onChange={(e) => setSpecialDutyFilter(e.target.value)}
            sx={{ bgcolor: "#1e2630", color: "white" }}
            MenuProps={{
              PaperProps: { sx: { bgcolor: "#1e2630", color: "white" } },
            }}
          >
            <MenuItem value="All Drivers">All Drivers</MenuItem>
          </Select>
        </FormControl>

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
            + Add Driver
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

      <TableContainer component={Paper} sx={{ bgcolor: "#1e2630" }}>
        <Table sx={{ minWidth: 900 }} size="small" aria-label="drivers table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                DRIVER ↑
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                VEHICLE
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                EMAIL ↑
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                PHONE
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                GROUPS
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                SETTINGS
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                CYCLE
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                DOCUMENTS
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                MOBILE APP
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                CREATED ON
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                STATUS
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                {" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDrivers.map((driver) => (
              <TableRow
                key={driver.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ color: "white" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        bgcolor: "green",
                      }}
                    />
                    {driver.name}
                  </Box>
                </TableCell>
                <TableCell sx={{ color: "white" }}>{driver.vehicle}</TableCell>
                <TableCell sx={{ color: "white" }}>{driver.email}</TableCell>
                <TableCell>
                  {driver.phone && (
                    <Tooltip title="Call Driver">
                      <PhoneIcon sx={{ cursor: "pointer", color: "white" }} />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: "white" }}>Unassigned</Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {driver.groups.map((group, index) => (
                      <Avatar
                        key={group}
                        sx={{
                          width: 24,
                          height: 24,
                          bgcolor: driver.groupsColors[index],
                          fontSize: 12,
                          color: "white",
                        }}
                      >
                        {group}
                      </Avatar>
                    ))}
                  </Stack>
                </TableCell>
                <TableCell sx={{ color: "white" }}>{driver.cycle}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    <AppleIcon /> {driver.mobileApp}
                  </Box>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {driver.createdOn}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{driver.status}</TableCell>
                <TableCell>
                  <IconButton sx={{ color: "white" }}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {filteredDrivers.length === 0 && (
              <TableRow>
                <TableCell colSpan={12} align="center" sx={{ color: "white" }}>
                  No drivers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminContent;
