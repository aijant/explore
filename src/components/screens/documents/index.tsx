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
import { DocumentType } from "@store/models/enums/general.enums";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import {
  useGetDocumentsQuery,
  useCreateDocumentMutation,
} from "@store/services/documents.service";

import toast from "react-hot-toast";
import AddDocumentDialog from "./AddDocumentDialog";

const DocumentsContent = () => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [vehicleFilter, setVehicleFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [userUuid, setUserUuid] = useState<string | null>(null);

  const {
    data: documentsData = [],
    refetch,
    isFetching,
  } = useGetDocumentsQuery(
    userUuid ? userUuid : "21e7be79-b551-45c3-946b-1631622bc799"
  );

  const [createDocument] = useCreateDocumentMutation();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddDocument = async (docData: any) => {
    try {
      const formData = new FormData();
      formData.append("userUuid", docData.userUuid);
      formData.append("type", docData.type);
      const formattedDate = new Date(docData.date).toISOString().split("T")[0];
      formData.append("date", formattedDate);
      formData.append("reference", docData.reference);
      formData.append("notes", docData.notes || "");

      if (docData.fileUrl instanceof File) {
        formData.append("file", docData.fileUrl);
      } else {
        throw new Error("Invalid file format: must be File object");
      }

      await createDocument(formData).unwrap();
      toast.success("Document successfully saved!");

      setUserUuid(docData.userUuid); // Triggers fetch
      setDialogOpen(false);
    } catch (err: any) {
      toast.error("Error saving document!");
      console.error(err);
    }
  };

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
          <span>Filter by Date Range:</span>

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
                  svg: { color: "white" },
                },
              },
            }}
          />

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
                  svg: { color: "white" },
                },
              },
            }}
          />

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
              <MenuItem value="TRK-200">TRK-200</MenuItem>
            </Select>
          </FormControl>

          {/* Type Filter */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel sx={{ color: "white", fontSize: "12px" }}>
              Filter by Type
            </InputLabel>
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              sx={{ bgcolor: "#1e2630", color: "white" }}
              MenuProps={{
                PaperProps: { sx: { bgcolor: "#1e2630", color: "white" } },
              }}
            >
              <MenuItem value="All">All</MenuItem>
              {Object.entries(DocumentType).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Action Buttons */}
          <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
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

            <Button
              variant="outlined"
              sx={{
                color: "#1669f2",
                borderColor: "#1669f2",
                textTransform: "none",
                fontWeight: 600,
                fontSize: 13,
                minWidth: 110,
                height: 38,
                "&:hover": {
                  bgcolor: "#1669f230",
                  borderColor: "#1669f2",
                },
              }}
            >
              Export
            </Button>

            <IconButton
              sx={{ color: "white", mb: "14px" }}
              onClick={() => refetch()}
              disabled={!userUuid}
            >
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
                  "TYPE",
                  "VEHICLE",
                  "REFERENCE",
                  "NOTE",
                  "DOCUMENTS",
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
              {documentsData?.content
                ?.filter((doc: any) =>
                  typeFilter === "All" ? true : doc.type === typeFilter
                )
                ?.filter((doc: any) =>
                  vehicleFilter === "All" ? true : doc.vehicle === vehicleFilter
                )
                ?.filter((doc: any) => {
                  // ✅ фильтр по диапазону дат
                  const docDate = new Date(doc.date).setHours(0, 0, 0, 0);
                  const from = fromDate
                    ? new Date(fromDate).setHours(0, 0, 0, 0)
                    : null;
                  const to = toDate
                    ? new Date(toDate).setHours(23, 59, 59, 999)
                    : null;

                  if (from && to) return docDate >= from && docDate <= to;
                  if (from) return docDate >= from;
                  if (to) return docDate <= to;
                  return true;
                })
                .map((doc: any) => (
                  <TableRow key={doc.id}>
                    <TableCell sx={{ color: "white" }}>
                      {new Date(doc.date).toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {DocumentType[doc.type as keyof typeof DocumentType] ||
                        doc.type}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>{doc.vehicle}</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {doc.reference}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {doc.notes || "-"}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Document">
                        <DescriptionIcon
                          sx={{ color: "white", cursor: "pointer" }}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <IconButton sx={{ color: "white" }}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

              {documentsData?.content?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ color: "white" }}>
                    {isFetching
                      ? "Loading documents..."
                      : "No documents found."}
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
