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
  MenuItem as DropdownItem,
  Chip,
  Typography,
  Stack,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PhoneIcon from "@mui/icons-material/Phone";
import AppleIcon from "@mui/icons-material/Apple";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DownloadIcon from "@mui/icons-material/Download";
import toast from "react-hot-toast";

import AddDriverDialog from "./AddDriverDialog";
import {
  useGetDriverQuery,
  useCreateDriverMutation,
  useUpdateDriverMutation,
} from "@store/services/driver.service";
import {
  useGetVehiclesQuery,
} from "@store/services/vehicles.service";

const AdminContent = () => {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editDriver, setEditDriver] = useState<any | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDriver, setSelectedDriver] = useState<any | null>(null);
  const openMenu = Boolean(anchorEl);

  const { data: driversData, refetch } = useGetDriverQuery({
    status: "",
    name: "",
    email: "",
    allowYardMove: "",
    allowPersonalConveyance: "",
    page: "",
    size: "",
  });

  const { data: data = [] } = useGetVehiclesQuery({});
  const AllVehicles = Array.isArray(data?.content) ? data.content : [];

  const [createDriver] = useCreateDriverMutation();
  const [updateDriver] = useUpdateDriverMutation();

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    driver: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedDriver(driver);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleEdit = () => {
    if (selectedDriver) {
      setEditDriver(selectedDriver);
      setEditMode(true);
      setDialogOpen(true);
      handleMenuClose();
    }
  };

  const handleAdd = () => {
    setEditDriver(null);
    setEditMode(false);
    setDialogOpen(true);
  };

  const handleConfirm = async (formData: any) => {
    try {
      const data = new FormData();
      const driverPayload = {
        name: formData.driver?.name || "",
        surname: formData.driver?.surname || "",
        dateOfBirth: formData.driver?.dateOfBirth || "",
        driverId: formData.driver?.driverId || "",
        address: formData.driver?.address || "",
        driverType: formData.driver?.driverType || "CompanyDriver",
        email: formData.driver?.email || "",
        phone: formData.driver?.phone || "",
        licenseIssuingState: formData.driver?.licenseIssuingState || "",
        licenseNumber: formData.driver?.licenseNumber || "",
        status: formData.driver?.status ?? true,
        exemptFromEld: formData.driver?.exemptFromEld ?? false,
        allowYardMove: formData.driver?.allowYardMove ?? false,
        allowPersonalConveyance:
          formData.driver?.allowPersonalConveyance ?? false,
        allowManualDriveTime: formData.driver?.allowManualDriveTime ?? false,
        forbidCertifyIfMissing:
          formData.driver?.forbidCertifyIfMissing ?? false,
        pairedSplitSleeper: formData.driver?.pairedSplitSleeper ?? false,
        enhanceViolationSound: formData.driver?.enhanceViolationSound ?? false,
        requireDriverSignature:
          formData.driver?.requireDriverSignature ?? false,
        keepTrailer: formData.driver?.keepTrailer ?? false,
        keepShippingDocs: formData.driver?.keepShippingDocs ?? false,
        cycleRule: formData.driver?.cycleRule || "USA_70_8",
        break30MinException: formData.driver?.break30MinException ?? false,
        reset24h: formData.driver?.reset24h ?? false,
      };

      data.append("driver", JSON.stringify(driverPayload));

      if (Array.isArray(formData.documents)) {
        formData.documents.forEach((doc: any) => {
          if (doc.file instanceof File) {
            data.append("documentName", doc.documentName);
            data.append("customName", doc.customName || "");
            data.append(
              "expirationDate",
              new Date(doc.expirationDate).toISOString()
            );
            data.append("file", doc.file, doc.file.name);
          }
        });
      }

      if (editMode && editDriver?.uuid) {
        await updateDriver({ uuid: editDriver.uuid, body: data }).unwrap();
        toast.success("Driver updated!");
      } else {
        await createDriver(data).unwrap();
        toast.success("Driver created!");
      }

      setDialogOpen(false);
      setEditMode(false);
      setEditDriver(null);
      refetch();
    } catch (err: any) {
      console.error("Driver save error:", err);
      toast.error("Error saving driver!");
    }
  };

  const drivers = driversData?.content || [];

  const filteredDrivers = drivers.filter((driver: any) => {
    const searchValue = search.toLowerCase();
    return (
      driver.name?.toLowerCase().includes(searchValue) ||
      driver.email?.toLowerCase().includes(searchValue) 
    );
  });

  const handleExportCSV = () => {
    if (!filteredDrivers.length) {
      toast.error("No data to export!");
      return;
    }

    const excludeKeys = ["uuid", "vehicleUuid", "companyUuid", "appUserId"];
    const headers = Object.keys(filteredDrivers[0]).filter(
      (key) => !excludeKeys.includes(key)
    );

    const rows = filteredDrivers.map((driver: any) =>
      headers.map((key) => {
        const value = driver[key];
        if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
        if (value === null || value === undefined) return "";
        if (typeof value === "object") return JSON.stringify(value);
        return String(value).replace(/,/g, ";");
      })
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "drivers_export.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Exported to CSV!");
  };
  return (
    <Box sx={{ p: 3, bgcolor: "#121a26", color: "white", minHeight: "100vh" }}>
      {/* Top filters */}
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
          placeholder="Search by Driver Name, Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: 350,
            bgcolor: "#1e2630",
            borderRadius: 1,
            input: { color: "white" },
          }}
          InputProps={{ style: { color: "white" } }}
        />

        <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            onClick={handleAdd}
            sx={{
              color: "#1669f2",
              borderColor: "#1669f2",
              textTransform: "none",
              fontWeight: 600,
              fontSize: 13,
              minWidth: 110,
            }}
          >
            + Add Driver
          </Button>

          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExportCSV}
            sx={{
              color: "#1669f2",
              borderColor: "#1669f2",
              textTransform: "none",
              fontWeight: 600,
              fontSize: 13,
              minWidth: 110,
            }}
          >
            Export CSV
          </Button>

          <IconButton sx={{ color: "white" }} onClick={() => refetch()}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Driver Table */}
      <TableContainer
        component={Paper}
        sx={{ bgcolor: "#1e2630", borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "DRIVER",
                "VEHICLE",
                "EMAIL",
                "PHONE",
                "GROUPS",
                "SETTINGS",
                "CYCLE",
                "DOCUMENTS",
                "MOBILE APP",
                "CREATED ON",
                "STATUS",
                "",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 13,
                    borderBottom: "1px solid #2c3440",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredDrivers.map((driver: any) => (
              <TableRow
                key={driver.uuid}
                sx={{
                  "&:hover": { bgcolor: "#263040" },
                  borderBottom: "1px solid #2c3440",
                }}
              >
                {/* DRIVER */}
                <TableCell sx={{ color: "white" }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <FiberManualRecordIcon
                      sx={{
                        color: driver.status ? "#00e676" : "#f44336",
                        fontSize: 12,
                      }}
                    />
                    <Box>
                      <Typography fontWeight={600}>{driver.name}</Typography>
                      <Typography variant="body2" color="#9ea7b5">
                        {driver.surname}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>

                {/* VEHICLE */}
                <TableCell sx={{ color: "#9ea7b5" }}>
                  {driver?.vehicleUuid
                    ? AllVehicles.find((v) => v.uuid === driver.vehicleUuid)
                        ?.vehicleId || "Unassigned"
                    : "Unassigned"}
                </TableCell>

                {/* EMAIL */}
                <TableCell sx={{ color: "#9ea7b5" }}>
                  {driver.email || "-"}
                </TableCell>

                {/* PHONE */}
                <TableCell sx={{ color: "#9ea7b5" }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <PhoneIcon fontSize="small" />
                    {driver.phone || "-"}
                  </Stack>
                </TableCell>

                {/* GROUPS */}
                <TableCell sx={{ color: "#9ea7b5" }}>
                  {driver.group || "Unassigned"}
                </TableCell>

                {/* SETTINGS */}
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {driver.allowPersonalConveyance && (
                      <Chip
                        label="PC"
                        size="small"
                        sx={{
                          bgcolor: "#2b3647",
                          color: "white",
                          fontWeight: 600,
                          borderRadius: "6px",
                        }}
                      />
                    )}
                    {driver.allowYardMove && (
                      <Chip
                        label="YM"
                        size="small"
                        sx={{
                          bgcolor: "#2b3647",
                          color: "white",
                          fontWeight: 600,
                          borderRadius: "6px",
                        }}
                      />
                    )}
                  </Stack>
                </TableCell>

                {/* CYCLE */}
                <TableCell sx={{ color: "#9ea7b5" }}>
                  {driver.cycleRule === "USA_70_8"
                    ? "USA 70 hour/8 day"
                    : driver.cycleRule}
                </TableCell>

                {/* DOCUMENTS */}
                <TableCell sx={{ color: "#9ea7b5" }}>
                  {driver.documents?.length || ""}
                </TableCell>

                {/* MOBILE APP */}
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <AppleIcon sx={{ color: "#9ea7b5", fontSize: 18 }} />
                    <Typography color="#9ea7b5" fontSize={13}>
                      {driver.appVersion || "3.26.3"}
                    </Typography>
                  </Stack>
                </TableCell>

                {/* CREATED ON */}
                <TableCell sx={{ color: "#9ea7b5" }}>
                  {driver.createdAt
                    ? new Date(driver.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "-"}
                </TableCell>

                {/* STATUS */}
                <TableCell sx={{ color: "white" }}>
                  {driver.status ? "Active" : "Inactive"}
                </TableCell>

                {/* ACTIONS */}
                <TableCell>
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={(e) => handleMenuOpen(e, driver)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ACTIONS MENU */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { bgcolor: "#1e2630", color: "white", border: "1px solid #333" },
        }}
      >
        <DropdownItem onClick={handleEdit}>Edit</DropdownItem>
      </Menu>

      {/* ADD / EDIT DIALOG */}
      <AddDriverDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirm}
        initialData={editDriver}
      />
    </Box>
  );
};

export default AdminContent;
