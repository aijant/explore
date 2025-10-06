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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Menu,
  MenuItem as DropdownItem,
  Avatar,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import AppleIcon from "@mui/icons-material/Apple";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import toast from "react-hot-toast";
import AddDriverDialog from "./AddDriverDialog";
import {
  useGetDriverQuery,
  useCreateDriverMutation,
  useUpdateDriverMutation,
} from "@store/services/driver.service";

const AdminContent = () => {
  const [search, setSearch] = useState("");
  const [driverStatusFilter, setDriverStatusFilter] = useState("Active");
  const [specialDutyFilter, setSpecialDutyFilter] = useState("All Drivers");
  const [dialogOpen, setDialogOpen] = useState(false);
   const [editMode, setEditMode] = useState(false);
  const [editDriver, setEditDriver] = useState<any | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDriver, setSelectedDriver] = useState<any | null>(null);
  const openMenu = Boolean(anchorEl);

  const { data: driversData, refetch } = useGetDriverQuery({});
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
      setDialogOpen(true);
      handleMenuClose();
    }
  };

  const handleAdd = () => {
    setEditDriver(null);
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

  const drivers = driversData?.data || [];

  const filteredDrivers = drivers.filter((driver: any) => {
    const matchesSearch =
      driver.name?.toLowerCase().includes(search.toLowerCase()) ||
      driver.email?.toLowerCase().includes(search.toLowerCase()) ||
      driver.vehicle?.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
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
          placeholder="Search by Driver Name, Vehicle, Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 350, bgcolor: "#1e2630", borderRadius: 1 }}
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
          <IconButton sx={{ color: "white" }} onClick={() => refetch()}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ bgcolor: "#1e2630" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                DRIVER
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                EMAIL
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                STATUS
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDrivers.map((driver: any) => (
              <TableRow key={driver.uuid}>
                <TableCell sx={{ color: "white" }}>{driver.name}</TableCell>
                <TableCell sx={{ color: "white" }}>{driver.email}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {driver.status || "Active"}
                </TableCell>
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

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { bgcolor: "#1e2630", color: "white", border: "1px solid #333" },
        }}
      >
        <DropdownItem onClick={handleEdit}>Edit</DropdownItem>
        <DropdownItem onClick={handleMenuClose}>View Documents</DropdownItem>
      </Menu>

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
