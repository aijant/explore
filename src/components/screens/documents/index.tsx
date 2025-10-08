import { useEffect, useState } from "react";
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
import { useGetVehiclesQuery } from "@store/services/vehicles.service";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {
  useCreateDocumentMutation,
  documentsApi,
} from "@store/services/documents.service"; 
import store  from "@store/index"; 
import toast from "react-hot-toast";
import AddDocumentDialog from "./AddDocumentDialog";

const DocumentsContent = () => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [vehicleFilter, setVehicleFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [documentsData, setDocumentsData] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loadingDocs, setLoadingDocs] = useState(false);

  const { data: vehiclesData = [] } = useGetVehiclesQuery({});
  const AllVehicles = Array.isArray(vehiclesData?.content)
    ? vehiclesData.content
    : [];

  const [createDocument] = useCreateDocumentMutation();

  //Fetch documents for each vehicle UUID individually (parallel)
  useEffect(() => {
    const fetchAllDocuments = async () => {
      if (AllVehicles.length === 0) return;

      setLoadingDocs(true);
      try {
        const promises = AllVehicles.map((v: any) =>
          store
            .dispatch(documentsApi.endpoints.getDocuments.initiate(v.uuid))
            .unwrap()
            .catch((err: any) => {
              console.error(`Error fetching documents for ${v.uuid}:`, err);
              return { content: [] };
            })
        );

        const results = await Promise.all(promises);
        const allDocs = results.flatMap((r: any) => r?.content || []);
        setDocumentsData(allDocs);
      } catch (err) {
        console.error("Error fetching all documents:", err);
      } finally {
        setLoadingDocs(false);
      }
    };

    fetchAllDocuments();
  }, [AllVehicles]);

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
      setDialogOpen(false);
    } catch (err: any) {
      toast.error("Error saving document!");
      console.error(err);
    }
  };

  const handleRefresh = () => {
    setFromDate(null);
    setToDate(null);
    setVehicleFilter("All");
    setTypeFilter("All");
    // Refetch all
    const fetchAgain = async () => {
      setDocumentsData([]);
      const promises = AllVehicles.map((v: any) =>
        store
          .dispatch(documentsApi.endpoints.getDocuments.initiate(v.uuid))
          .unwrap()
          .catch(() => ({ content: [] }))
      );
      const results = await Promise.all(promises);
      setDocumentsData(results.flatMap((r: any) => r?.content || []));
    };
    fetchAgain();
  };

  const filteredDocs = documentsData
    ?.filter((doc: any) =>
      typeFilter === "All" ? true : doc.type === typeFilter
    )
    ?.filter((doc: any) =>
      vehicleFilter === "All" ? true : doc.vehicle === vehicleFilter
    )
    ?.filter((doc: any) => {
      const docDate = new Date(doc.date).setHours(0, 0, 0, 0);
      const from = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : null;
      const to = toDate ? new Date(toDate).setHours(23, 59, 59, 999) : null;
      if (from && to) return docDate >= from && docDate <= to;
      if (from) return docDate >= from;
      if (to) return docDate <= to;
      return true;
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

            <IconButton
              sx={{ color: "white", mb: "14px" }}
              onClick={handleRefresh}
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
              {loadingDocs ? (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ color: "white" }}>
                    Loading documents...
                  </TableCell>
                </TableRow>
              ) : filteredDocs.length > 0 ? (
                filteredDocs.map((doc: any) => (
                  <TableRow key={doc.id}>
                    <TableCell sx={{ color: "white" }}>
                      {new Date(doc.date).toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {DocumentType[doc.type as keyof typeof DocumentType] ||
                        doc.type}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {doc?.userUuid
                        ? AllVehicles.find((v: any) => v.uuid === doc.userUuid)
                            ?.vehicleId || "Unassigned"
                        : "Unassigned"}
                    </TableCell>
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
                ))
              ) : (
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
