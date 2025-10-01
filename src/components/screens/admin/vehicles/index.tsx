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
  Button,
  IconButton,
  Menu,
  MenuItem as MenuOption,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddVehicleDialog from "./AddVehicleDialog";
import toast from "react-hot-toast";

import {
  useCreateVehiclesMutation,
  useUpdateVehicleMutation,
  useGetVehiclesQuery,
} from "@store/services/vehicles.service";

// Define Vehicle interface to use for typing
interface Vehicle {
  vehicleId: string;
  licensePlateNumber?: string;
  eldSn?: string;
  gpsSn?: string;
  tabletSn?: string;
  cameraSn?: string;
  groups?: string;
  documents?: any[];
  status?: boolean;
  uuid?: string;
}

const VehiclesContent = () => {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const { data: data = [], refetch } = useGetVehiclesQuery({});
  const AllVehicles = Array.isArray(data?.content) ? data.content : [];
  const [createVehicles] = useCreateVehiclesMutation();
  const [updateVehicle] = useUpdateVehicleMutation();

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    vehicle: Vehicle
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedVehicle(vehicle);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleEdit = () => {
    if (selectedVehicle) {
      setEditMode(true);
      setDialogOpen(true);
    }
    handleMenuClose();
  };

  const handleDeactivate = () => handleMenuClose();

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

      if (editMode && selectedVehicle) {
        await updateVehicle({
          uuid: selectedVehicle.uuid!,
          body: formData,
        }).unwrap();
        toast.success("Vehicle updated!");
      } else {
        await createVehicles(formData).unwrap();
        toast.success("Vehicle successfully saved!");
      }

      setDialogOpen(false);
      setEditMode(false);
      setSelectedVehicle(null);
      refetch();
    } catch (err: any) {
      toast.error("Error saving vehicle!");
    }
  };

  const filteredVehicles = AllVehicles.filter((vehicle: Vehicle) =>
    String(vehicle.vehicleId).toLowerCase().includes(search.toLowerCase())
  );

  const handleExportCSV = () => {
    const csvHeaders = [
      "Vehicle ID",
      "License Plate",
      "ELD S/N",
      "GPS S/N",
      "Tablet S/N",
      "Camera S/N",
      "Groups",
      "Documents Count",
      "Status",
    ];

    const csvRows = filteredVehicles.map((v: Vehicle) => [
      v.vehicleId ?? "",
      v.licensePlateNumber ?? "",
      v.eldSn ?? "",
      v.gpsSn ?? "",
      v.tabletSn ?? "",
      v.cameraSn ?? "",
      v.groups ?? "",
      v.documents?.length ?? 0,
      v.status ? "Active" : "Inactive",
    ]);

    const csvContent = [csvHeaders, ...csvRows]
      .map((row: string[]) =>
        row.map((val: string | number) => `"${val}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vehicles_export_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
          placeholder="Search by Vehicle ID"
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
              setSelectedVehicle(null);
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
            + Add Vehicle
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
        <Table sx={{ minWidth: 900 }} size="small" aria-label="vehicles table">
          <TableHead>
            <TableRow>
              {[
                "VEHICLE ID ↑",
                "LICENSE PLATE",
                "ELD S/N ↑",
                "GPS S/N",
                "TABLET S/N",
                "CAMERA S/N",
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
            {filteredVehicles.map((vehicle: Vehicle) => (
              <TableRow key={vehicle.vehicleId}>
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
                  {vehicle.documents?.length || ""}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {vehicle.status ? "Active" : "Inactive"}
                </TableCell>
                <TableCell>
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={(e) => handleMenuOpen(e, vehicle)}
                  >
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

      {/* Context Menu */}
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
        <MenuOption onClick={handleEdit}>Edit</MenuOption>
        <MenuOption onClick={handleDeactivate}>Deactivate</MenuOption>
      </Menu>

      {/* Add/Edit Dialog */}
      <AddVehicleDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditMode(false);
          setSelectedVehicle(null);
        }}
        onConfirm={handleAddVehicle}
        initialData={editMode ? selectedVehicle : null}
      />
    </Box>
  );
};

export default VehiclesContent;
