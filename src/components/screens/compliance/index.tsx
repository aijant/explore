import React, { useState } from "react";
import {
  Box,
  Typography,
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
  TablePagination,
} from "@mui/material";
import { Refresh, Download } from "@mui/icons-material";

interface DriverLog {
  driver: string;
  hoursOfServiceViolations: string;
  formMannerErrors: string;
  lastSync: string;
}

const dummyData: DriverLog[] = [
  {
    driver: "Test 1",
    hoursOfServiceViolations: "No Violations",
    formMannerErrors: "Driver Signature +2",
    lastSync: "35 mins ago",
  },
  {
    driver: "Test 2",
    hoursOfServiceViolations: "No Violations",
    formMannerErrors: "Driver Signature +2",
    lastSync: "10 mins ago",
  },
  {
    driver: "Test 3",
    hoursOfServiceViolations: "No Violations",
    formMannerErrors: "Driver Signature +2",
    lastSync: "45 mins ago",
  },
  {
    driver: "Test 4",
    hoursOfServiceViolations: "No Violations",
    formMannerErrors: "Driver Signature +2",
    lastSync: "25 mins ago",
  },
];

const ComplianceContent: React.FC = () => {
  const [searchName, setSearchName] = useState("");
  const [dateFrom, setDateFrom] = useState("2025-09-01");
  const [dateTo, setDateTo] = useState("2025-09-08");
  const [logFilter, setLogFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = dummyData.filter((log) =>
    log.driver.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <Box
      sx={{
        bgcolor: "#121a26",
        color: "white",
        height: "100vh",
        p: 3,
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: "600", letterSpacing: "0.04em" }}
      >
        Compliance - Logs
      </Typography>

      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          mb: 1,
          alignItems: "center",
        }}
      >
        <TextField
          variant="filled"
          size="small"
          placeholder="Search by Driver Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          sx={{
            bgcolor: "#1b2638",
            input: { color: "white" },
            width: 250,
            "& .MuiFilledInput-root": {
              bgcolor: "#1b2638",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#687182",
              opacity: 1,
            },
          }}
          InputProps={{ disableUnderline: true }}
        />

        <Typography
          sx={{ fontSize: 12, fontWeight: "500", whiteSpace: "nowrap" }}
        >
          Filter by Date
        </Typography>

        <TextField
          variant="filled"
          size="small"
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          sx={{
            bgcolor: "#1b2638",
            input: { color: "white" },
            width: 140,
            "& .MuiFilledInput-root": { bgcolor: "#1b2638" },
          }}
          InputProps={{ disableUnderline: true }}
        />

        <Typography
          sx={{ fontSize: 12, fontWeight: "500", whiteSpace: "nowrap" }}
        >
          to
        </Typography>

        <TextField
          variant="filled"
          size="small"
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          sx={{
            bgcolor: "#1b2638",
            input: { color: "white" },
            width: 140,
            "& .MuiFilledInput-root": { bgcolor: "#1b2638" },
          }}
          InputProps={{ disableUnderline: true }}
        />

        <FormControl
          variant="filled"
          size="small"
          sx={{ minWidth: 120, bgcolor: "#1b2638" }}
        >
          <InputLabel sx={{ color: "#687182" }}>Filter by Logs</InputLabel>
          <Select
            value={logFilter}
            onChange={(e) => setLogFilter(e.target.value)}
            sx={{ color: "white" }}
            disableUnderline
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Errors">Errors</MenuItem>
            <MenuItem value="Warnings">Warnings</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          variant="filled"
          size="small"
          sx={{ minWidth: 120, bgcolor: "#1b2638" }}
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
          variant="contained"
          color="primary"
          startIcon={<Download />}
          sx={{
            textTransform: "uppercase",
            fontWeight: "700",
            fontSize: 12,
            px: 2,
            height: 36,
          }}
        >
          Download
        </Button>

        <IconButton sx={{ color: "#687182" }}>
          <Refresh />
        </IconButton>
      </Box>

      {/* Table */}
      <Table sx={{ bgcolor: "#1f2a3a" }}>
        <TableHead>
          <TableRow>
            {[
              "DRIVER",
              "HOURS OF SERVICE VIOLATIONS",
              "FORM & MANNER ERRORS",
              "LAST SYNC",
            ].map((head) => (
              <TableCell
                key={head}
                sx={{
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: 12,
                  borderBottom: "1px solid #34425a",
                }}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, i) => (
              <TableRow
                key={i}
                hover
                sx={{ borderBottom: "1px solid #34425a" }}
              >
                <TableCell
                  sx={{ fontWeight: "600", fontSize: 14, color: "#fff" }}
                >
                  {row.driver}
                </TableCell>
                <TableCell sx={{ fontSize: 14, color: "#fff" }}>
                  {row.hoursOfServiceViolations}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 14,
                    color: "red",
                    cursor: "pointer",
                  }}
                >
                  {row.formMannerErrors}
                </TableCell>
                <TableCell sx={{ fontSize: 14, color: "#fff" }}>
                  {row.lastSync}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <TablePagination
        sx={{
          color: "#687182",
          ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
            {
              color: "#687182",
            },
          bgcolor: "#1f2a3a",
        }}
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) =>
          setRowsPerPage(parseInt(e.target.value, 10))
        }
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default ComplianceContent;
