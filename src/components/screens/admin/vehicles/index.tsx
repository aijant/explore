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
  IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddVehicleDialog from "./AddVehicleDialog";
import toast from "react-hot-toast";

import {
  useCreateVehiclesMutation,
  useGetVehiclesQuery,
} from "@store/services/vehicles.service";

const VehiclesContent = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Get all vehicles from API
  const { data: data = [], refetch } = useGetVehiclesQuery({});
  const AllVehicles = Array.isArray(data?.content) ? data.content : [];

  console.log("AllVehicles", AllVehicles);
  const [createVehicles] = useCreateVehiclesMutation();

  const handleAddVehicle = async (data: any) => {
    try {
      const formData = new FormData();

      const vehiclePayload = {
        vehicleId: data.vehicleId,
        vin: data.vin,
        year: Number(data.year),
        make: data.make,
        model: data.model,
        color: data.color,
        fuelType: data.fuelType,
        fleetRequestedDistance:
          data.fleetDistance === "custom" ? Number(data.customValue) : 500,
        licenseIssuingState: data.licenseState,
        licensePlateNumber: data.licensePlate,
        company: data.company,
        companyOwned: Boolean(data.companyOwned),
        status: data.status ?? true,
      };

      formData.append("vehicle", JSON.stringify(vehiclePayload));

      if (Array.isArray(data.documents)) {
        data.documents.forEach((doc: any) => {
          formData.append("documentName", doc.documentName);
          formData.append("customName", doc.customName || "");
          formData.append(
            "expirationDate",
            new Date(doc.expirationDate).toISOString()
          );
          if (doc.file) {
            formData.append("file", doc.file, doc.file.name);
          }
        });
      }

      await createVehicles(formData).unwrap();

      toast.success("Vehicle successfully saved!");
      setDialogOpen(false);

      // REFRESH VEHICLES DATA
      refetch();
    } catch (err: any) {
      toast.error("Error saving vehicle!");
    }
  };

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
              "&:hover": { bgcolor: "#1669f230", borderColor: "#1669f2" },
            }}
          >
            + Add Vehicle
          </Button>

          <AddVehicleDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onConfirm={handleAddVehicle}
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
              "&:hover": { bgcolor: "#1669f230", borderColor: "#1669f2" },
            }}
          >
            Export
          </Button>

          <IconButton sx={{ color: "white" }} onClick={() => refetch()}>
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
            {AllVehicles.map((vehicle: any) => (
              <TableRow
                key={vehicle.vehicleId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ color: "white" }}>
                  {vehicle.vehicleId}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {vehicle.licensePlateNumber}
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
                  {vehicle.documents?.length || 0}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {vehicle.status ? "Active" : "Inactive"}
                </TableCell>
                <TableCell>
                  <IconButton sx={{ color: "white" }}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {AllVehicles.length === 0 && (
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
