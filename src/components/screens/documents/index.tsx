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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  IconButton,
  Tooltip,
  TextField,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DescriptionIcon from "@mui/icons-material/Description";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useGetDocumentsQuery } from "@store/services/documents.service";
import AddDocumentDialog from "./AddDocumentDialog";
// Sample documents
const docs = [
  {
    id: 1,
    createdAt: new Date("2025-09-17T22:42:00"),
    uploadedBy: "Mira Scott",
    type: "Scale Ticket",
    vehicle: "008",
    reference: "7777777",
    note: "",
    company: "Kench trucking llc",
  },
  {
    id: 2,
    createdAt: new Date("2025-09-17T04:08:00"),
    uploadedBy: "Mira Scott",
    type: "Other",
    vehicle: "008",
    reference: "gggg",
    note: "jjj",
    company: "Kench trucking llc",
  },
];

const DocumentsContent = () => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [vehicleFilter, setVehicleFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleAddDocument = (docData: any) => {
    console.log("Add document data:", docData);
    setDialogOpen(false);
    // TODO: Send docData to API
  };

  const { data: allDocuments = [] } = useGetDocumentsQuery({
    fromDate: fromDate?.toISOString(),
    toDate: toDate?.toISOString(),
    type: typeFilter !== "All" ? typeFilter : undefined,
    vehicle: vehicleFilter !== "All" ? vehicleFilter : undefined,
  });

  console.log("allDocuments", allDocuments);

  const filteredDocs = docs.filter((d) => {
    const matchesVehicle =
      vehicleFilter === "All" || d.vehicle === vehicleFilter;
    const matchesType = typeFilter === "All" || d.type === typeFilter;
    const matchesDate =
      (!fromDate || d.createdAt >= fromDate) &&
      (!toDate || d.createdAt <= toDate);
    return matchesVehicle && matchesType && matchesDate;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{ p: 3, bgcolor: "#121a26", color: "white", minHeight: "100vh" }}
      >
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
          <>
            <span>Filter by Date: </span>
            {/* From Date Picker */}
            <DesktopDatePicker
              label="From"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              enableAccessibleFieldDOMStructure={false}
              slots={{ textField: TextField }}
              slotProps={{
                textField: {
                  size: "small",
                  sx: {
                    bgcolor: "#1e2630",
                    borderRadius: 1,
                    input: { color: "white" },
                    label: { color: "white" },
                    svg: { color: "white" }, // ⬅️ Make calendar icon white
                  },
                },
              }}
            />

            {/* To Date Picker */}
            <DesktopDatePicker
              label="To"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
              enableAccessibleFieldDOMStructure={false}
              slots={{ textField: TextField }}
              slotProps={{
                textField: {
                  size: "small",
                  sx: {
                    bgcolor: "#1e2630",
                    borderRadius: 1,
                    input: { color: "white" },
                    label: { color: "white" },
                    svg: { color: "white" }, // ⬅️ Make calendar icon white
                  },
                },
              }}
            />
          </>

          {/* Vehicle Filter */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel sx={{ color: "white", fontSize: "12px" }}>
              Filter by Vehicle
            </InputLabel>
            <Select
              value={vehicleFilter}
              label="Filter by Vehicle"
              onChange={(e) => setVehicleFilter(e.target.value)}
              sx={{ bgcolor: "#1e2630", color: "white" }}
              MenuProps={{
                PaperProps: { sx: { bgcolor: "#1e2630", color: "white" } },
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="008">008</MenuItem>
            </Select>
          </FormControl>

          {/* Type Filter */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel sx={{ color: "white", fontSize: "12px" }}>
              Filter by Type
            </InputLabel>
            <Select
              value={typeFilter}
              label="Filter by Type"
              onChange={(e) => setTypeFilter(e.target.value)}
              sx={{ bgcolor: "#1e2630", color: "white" }}
              MenuProps={{
                PaperProps: { sx: { bgcolor: "#1e2630", color: "white" } },
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Scale Ticket">Scale Ticket</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          {/* Action Buttons */}
          <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
            <>
              <Button
                variant="outlined"
                onClick={() => setDialogOpen(true)}
                sx={{
                  color: "#1669f2",
                  borderColor: "#1669f2",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: 13,
                  minWidth: 110,
                  mb: 2,
                  "&:hover": {
                    bgcolor: "#1669f230",
                    borderColor: "#1669f2",
                  },
                }}
              >
                + Add Document
              </Button>

              <AddDocumentDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={handleAddDocument}
              />
            </>
            <Button
              variant="outlined"
              sx={{
                color: "#1669f2",
                borderColor: "#1669f2",
                textTransform: "none",
                fontWeight: 600,
                fontSize: 13,
                minWidth: 110,
                height: 35,
                "&:hover": {
                  bgcolor: "#1669f230",
                  borderColor: "#1669f2",
                },
              }}
            >
              Export
            </Button>
            <IconButton sx={{ color: "white", mb:'14px' }}>
              <RefreshIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} sx={{ bgcolor: "#1e2630" }}>
          <Table sx={{ minWidth: 900 }} size="small">
            <TableHead>
              <TableRow>
                {[
                  "CREATED AT ↑",
                  "UPLOADED BY",
                  "TYPE",
                  "VEHICLE",
                  "REFERENCE",
                  "NOTE",
                  "DOCUMENTS",
                  "COMPANY",
                  "",
                ].map((head) => (
                  <TableCell
                    key={head}
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDocs.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell sx={{ color: "white" }}>
                    {doc.createdAt.toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {doc.uploadedBy}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>{doc.type}</TableCell>
                  <TableCell sx={{ color: "white" }}>{doc.vehicle}</TableCell>
                  <TableCell sx={{ color: "white" }}>{doc.reference}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {doc.note || "-"}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View Document">
                      <DescriptionIcon
                        sx={{ color: "white", cursor: "pointer" }}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>{doc.company}</TableCell>
                  <TableCell>
                    <IconButton sx={{ color: "white" }}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {filteredDocs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ color: "white" }}>
                    No documents found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </LocalizationProvider>
  );
};

export default DocumentsContent;
