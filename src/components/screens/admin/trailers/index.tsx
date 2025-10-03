import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem as MenuOption,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddTrailersDialog from "./AddTrailersDialog";
import toast from "react-hot-toast";

import {
  useGetTrailersQuery,
  useCreateTrailerMutation,
  useUpdateTrailerMutation,
} from "@store/services/trailers.service";

interface Trailer {
  trailerId: string;
  type?: string;
  make?: string;
  year?: number;
  vin?: string;
  plates?: string;
  ownership?: string;
  suspension?: string;
  gpsSn?: string;
  groups?: string;
  documents?: any[];
  status?: boolean;
  uuid?: string;
}

const TrailersContent = () => {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState<Trailer | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const { data, refetch } = useGetTrailersQuery({
    trailerId: "TRL",
    page: 0,
    size: 50,
    status: true,
  });

  const allTrailers = Array.isArray(data?.content) ? data.content : [];
  const [createTrailer] = useCreateTrailerMutation();
  const [updateTrailer] = useUpdateTrailerMutation();

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    trailer: Trailer
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTrailer(trailer);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleEdit = () => {
    if (selectedTrailer) {
      setEditMode(true);
      setDialogOpen(true);
    }
    handleMenuClose();
  };

  const handleDeactivate = () => {
    handleMenuClose();
  };

  const handleAddTrailer = async (data: any) => {
    try {
      const formData = new FormData();
      const trailerPayload = {
        trailerId: data.trailer.trailerId,
        type: data.trailer.type,
        year: Number(data.trailer.year),
        make: data.trailer.make,
        vin: data.trailer.vin,
        licensePlateNumber: data.trailer.licensePlateNumber,
        ownership: data.trailer.ownership,
        suspension: data.trailer.suspension,
        company: data.trailer.company,
        fleetRequestedDistance: Number(data.trailer.fleetRequestedDistance),
        status: Boolean(data.trailer.status),
      };

      formData.append("trailer", JSON.stringify(trailerPayload));
      if (Array.isArray(data.documents)) {
        data.documents.forEach((doc: any) => {
          if (doc.file instanceof File) {
            formData.append("documentName", doc.documentName);
            formData.append("customName", doc.customName || "");
            formData.append(
              "expirationDate",
              new Date(doc.expirationDate).toISOString()
            );
            formData.append("file", doc.file, doc.file.name);
          }
        });
      }

      if (editMode && selectedTrailer) {
        await updateTrailer({
          uuid: selectedTrailer.uuid!,
          body: formData,
        }).unwrap();
        toast.success("Trailer updated!");
      } else {
        await createTrailer(formData).unwrap();
        toast.success("Trailer successfully saved!");
      }

      setDialogOpen(false);
      setEditMode(false);
      setSelectedTrailer(null);
      refetch();
    } catch (err: any) {
      console.error("Trailer save error", err);
      toast.error("Error saving trailer!");
    }
  };

  const handleExportCSV = () => {
    const csvHeaders = [
      "Trailer ID",
      "Type",
      "Make",
      "Year",
      "VIN",
      "Plates",
      "Ownership",
      "Suspension",
      "GPS S/N",
      "Groups",
      "Documents Count",
      "Status",
    ];

    const csvRows = allTrailers.map((t: Trailer) => [
      t.trailerId,
      t.type,
      t.make,
      t.year,
      t.vin,
      t.licensePlateNumber,
      t.ownership,
      t.suspension,
      t.gpsSn,
      t.groups,
      t.documents?.length ?? 0,
      t.status ? "Active" : "Inactive",
    ]);

    const csvContent = [csvHeaders, ...csvRows]
      .map((row) => row.map((val) => `"${val ?? ""}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `trailers_export_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const filteredTrailers = allTrailers.filter((t: Trailer) =>
    String(t.trailerId).toLowerCase().includes(search.toLowerCase())
  );

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
          placeholder="Search by Trailer ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 350, bgcolor: "#1e2630", borderRadius: 1 }}
          InputProps={{ style: { color: "white" } }}
        />

        <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setDialogOpen(true);
              setEditMode(false);
              setSelectedTrailer(null);
            }}
            sx={{
              color: "#1669f2",
              borderColor: "#1669f2",
              textTransform: "none",
              fontWeight: 600,
              fontSize: 13,
              minWidth: 110,
              "&:hover": { bgcolor: "#1669f230", borderColor: "#1669f2" },
            }}
          >
            + Add Trailer
          </Button>

          <Button
            variant="outlined"
            onClick={handleExportCSV}
            sx={{
              color: "#1669f2",
              borderColor: "#1669f2",
              textTransform: "none",
              fontWeight: 600,
              fontSize: 13,
              minWidth: 110,
              "&:hover": { bgcolor: "#1669f230", borderColor: "#1669f2" },
            }}
          >
            Export CSV
          </Button>

          <IconButton sx={{ color: "white" }} onClick={() => refetch()}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ bgcolor: "#1e2630" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {[
                "TRAILER ID ↑",
                "TYPE",
                "MAKE",
                "YEAR",
                "VIN",
                "PLATES",
                "OWNERSHIP",
                "SUSPENSION",
                "GPS S/N",
                "GROUPS",
                "DOCUMENTS",
                "STATUS",
                "",
              ].map((header, i) => (
                <TableCell key={i} sx={{ color: "white", fontWeight: "bold" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTrailers.map((t) => (
              <TableRow key={t.trailerId}>
                <TableCell sx={{ color: "white" }}>{t.trailerId}</TableCell>
                <TableCell sx={{ color: "white" }}>{t.type}</TableCell>
                <TableCell sx={{ color: "white" }}>{t.make}</TableCell>
                <TableCell sx={{ color: "white" }}>{t.year}</TableCell>
                <TableCell sx={{ color: "white" }}>{t.vin}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {t.licensePlateNumber}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{t.ownership}</TableCell>
                <TableCell sx={{ color: "white" }}>{t.suspension}</TableCell>
                <TableCell sx={{ color: "white" }}>{t.gpsSn}</TableCell>
                <TableCell sx={{ color: "white" }}>{t.groups}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {t.documents?.length ?? ""}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {t.status ? "Active" : "Inactive"}
                </TableCell>
                <TableCell>
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={(e) => handleMenuOpen(e, t)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredTrailers.length === 0 && (
              <TableRow>
                <TableCell colSpan={13} align="center" sx={{ color: "white" }}>
                  No trailers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Row Menu */}
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
        <MenuOption onClick={handleEdit}>Edit</MenuOption>
        <MenuOption onClick={handleDeactivate}>Deactivate</MenuOption>
      </Menu>

      {/* Add/Edit Dialog */}
      <AddTrailersDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditMode(false);
          setSelectedTrailer(null);
        }}
        onConfirm={handleAddTrailer}
        initialData={editMode ? selectedTrailer : null}
      />
    </Box>
  );
};

export default TrailersContent;
