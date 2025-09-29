import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Switch,
  FormControlLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const AddVehicleDialog = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
}) => {
  // GENERAL
  const [vehicleId, setVehicleId] = useState("");
  const [vin, setVin] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [licenseState, setLicenseState] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [company, setCompany] = useState("");
  const [companyOwned, setCompanyOwned] = useState(true);

  // DEVICES
  const [eldSn, setEldSn] = useState("");
  const [gpsDevices, setGpsDevices] = useState<string[]>([""]);
  const [tabletSn, setTabletSn] = useState("");
  const [cameraSn, setCameraSn] = useState("");
  const [dvirForm, setDvirForm] = useState("");

  // REPORTS
  const [fleetDistance, setFleetDistance] = useState<"default" | "custom">(
    "default"
  );
  const [customValue, setCustomValue] = useState("");

  // DOCUMENTS
  const [documents, setDocuments] = useState<string[]>([]);

  // ERRORS
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};
    if (!vehicleId) newErrors.vehicleId = "Vehicle ID is required";
    if (!vin) newErrors.vin = "VIN is required";
    if (!fuelType) newErrors.fuelType = "Fuel type is required";
    if (!company) newErrors.company = "Company is required";
    if (!dvirForm) newErrors.dvirForm = "DVIR form is required";
    if (fleetDistance === "custom" && !customValue)
      newErrors.customValue = "Custom value required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const data = {
      vehicleId,
      vin,
      year,
      make,
      model,
      color,
      fuelType,
      licenseState,
      licensePlate,
      company,
      companyOwned,
      eldSn,
      gpsDevices,
      tabletSn,
      cameraSn,
      dvirForm,
      fleetDistance,
      customValue,
      documents,
    };
    onConfirm(data);
  };

  const handleGpsChange = (index: number, value: string) => {
    const updated = [...gpsDevices];
    updated[index] = value;
    setGpsDevices(updated);
  };

  const addGpsDevice = () => setGpsDevices([...gpsDevices, ""]);
  const removeGpsDevice = (index: number) =>
    setGpsDevices(gpsDevices.filter((_, i) => i !== index));

  const selectMenuProps = {
    PaperProps: {
      sx: {
        bgcolor: "#1e2630",
        color: "white",
        "& .MuiMenuItem-root": {
          color: "white",
          "&:hover": { backgroundColor: "#2a3442" },
        },
      },
    },
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{ fontWeight: "bold", bgcolor: "#121a26", color: "white" }}
      >
        Add Vehicle
      </DialogTitle>

      <DialogContent dividers sx={{ bgcolor: "#121a26", color: "white" }}>
        {/* ================= GENERAL ================= */}
        <Typography
          variant="subtitle2"
          sx={{ mb: 2, color: "#888", fontSize: 12, fontWeight: "bold" }}
        >
          GENERAL
        </Typography>

        {/* Vehicle ID */}
        <TextField
          label="Vehicle ID"
          required
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          error={!!errors.vehicleId}
          helperText={errors.vehicleId}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ sx: { color: "white" } }}
          inputProps={{
            style: { color: "white", backgroundColor: "#1e2630" },
          }}
        />

        {/* VIN */}
        <TextField
          label="VIN"
          required
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          error={!!errors.vin}
          helperText={errors.vin}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ sx: { color: "white" } }}
          inputProps={{
            style: { color: "white", backgroundColor: "#1e2630" },
          }}
        />

        {/* Year */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>Year</InputLabel>
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            MenuProps={selectMenuProps}
            input={<OutlinedInput label="Year" />}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            {[2025, 2024, 2023, 2022].map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Make */}
        <TextField
          label="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ sx: { color: "white" } }}
          inputProps={{
            style: { color: "white", backgroundColor: "#1e2630" },
          }}
        />

        {/* Model */}
        <TextField
          label="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ sx: { color: "white" } }}
          inputProps={{
            style: { color: "white", backgroundColor: "#1e2630" },
          }}
        />

        {/* Color */}
        <TextField
          label="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ sx: { color: "white" } }}
          inputProps={{
            style: { color: "white", backgroundColor: "#1e2630" },
          }}
        />

        {/* Fuel Type */}
        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.fuelType}>
          <InputLabel sx={{ color: "white" }} required>
            Fuel Type
          </InputLabel>
          <Select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            <MenuItem value="Diesel">Diesel</MenuItem>
            <MenuItem value="Gasoline">Gasoline</MenuItem>
            <MenuItem value="Electric">Electric</MenuItem>
          </Select>
          {errors.fuelType && (
            <Typography color="error" sx={{ fontSize: 12, mt: 0.5 }}>
              {errors.fuelType}
            </Typography>
          )}
        </FormControl>

        {/* License State */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>License Issuing State</InputLabel>
          <Select
            value={licenseState}
            onChange={(e) => setLicenseState(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            <MenuItem value="CA">CA</MenuItem>
            <MenuItem value="TX">TX</MenuItem>
            <MenuItem value="NY">NY</MenuItem>
          </Select>
        </FormControl>

        {/* License Plate */}
        <TextField
          label="License Plate Number"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ sx: { color: "white" } }}
          inputProps={{
            style: { color: "white", backgroundColor: "#1e2630" },
          }}
        />

        {/* Company */}
        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.company}>
          <InputLabel sx={{ color: "white" }} required>
            Company
          </InputLabel>
          <Select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            <MenuItem value="Kench trucking llc">Kench trucking llc</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          {errors.company && (
            <Typography color="error" sx={{ fontSize: 12, mt: 0.5 }}>
              {errors.company}
            </Typography>
          )}
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={companyOwned}
              onChange={(e) => setCompanyOwned(e.target.checked)}
            />
          }
          label="Company Owned"
          sx={{ color: "white", mb: 2 }}
        />

        {/* ================= ELD ================= */}
        <Typography
          variant="subtitle2"
          sx={{ mt: 2, mb: 2, color: "#888", fontSize: 12, fontWeight: "bold" }}
        >
          ELECTRONIC LOGGING DEVICE
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>ELD S/N</InputLabel>
          <Select
            value={eldSn}
            onChange={(e) => setEldSn(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            <MenuItem value="ELD001">ELD001</MenuItem>
            <MenuItem value="ELD002">ELD002</MenuItem>
          </Select>
        </FormControl>

        {/* ================= GPS ================= */}
        <Typography
          variant="subtitle2"
          sx={{ mt: 2, mb: 2, color: "#888", fontSize: 12, fontWeight: "bold" }}
        >
          GPS TRACKING
        </Typography>
        {gpsDevices.map((gps, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel sx={{ color: "white" }}>GPS S/N</InputLabel>
              <Select
                value={gps}
                onChange={(e) => handleGpsChange(index, e.target.value)}
                MenuProps={selectMenuProps}
                sx={{ bgcolor: "#1e2630", color: "white" }}
              >
                <MenuItem value="GPS001">GPS001</MenuItem>
                <MenuItem value="GPS002">GPS002</MenuItem>
              </Select>
            </FormControl>
            {index > 0 && (
              <IconButton
                onClick={() => removeGpsDevice(index)}
                sx={{ color: "white" }}
              >
                <Remove />
              </IconButton>
            )}
          </div>
        ))}
        <Button onClick={addGpsDevice} sx={{ color: "#1669f2", mb: 2 }}>
          + Add GPS Device
        </Button>

        {/* ================= TABLET ================= */}
        <Typography
          variant="subtitle2"
          sx={{ mt: 2, mb: 2, color: "#888", fontSize: 12, fontWeight: "bold" }}
        >
          TABLET
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>Tablet S/N</InputLabel>
          <Select
            value={tabletSn}
            onChange={(e) => setTabletSn(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            <MenuItem value="TBL001">TBL001</MenuItem>
            <MenuItem value="TBL002">TBL002</MenuItem>
          </Select>
        </FormControl>

        {/* ================= CAMERA ================= */}
        <Typography
          variant="subtitle2"
          sx={{ mt: 2, mb: 2, color: "#888", fontSize: 12, fontWeight: "bold" }}
        >
          CAMERA
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>Camera S/N</InputLabel>
          <Select
            value={cameraSn}
            onChange={(e) => setCameraSn(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            <MenuItem value="CAM001">CAM001</MenuItem>
            <MenuItem value="CAM002">CAM002</MenuItem>
          </Select>
        </FormControl>

        {/* ================= DVIR FORM ================= */}
        <Typography
          variant="subtitle2"
          sx={{ mt: 2, mb: 2, color: "#888", fontSize: 12, fontWeight: "bold" }}
        >
          DVIR FORM
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.dvirForm}>
          <InputLabel sx={{ color: "white" }} required>
            DVIR Form
          </InputLabel>
          <Select
            value={dvirForm}
            onChange={(e) => setDvirForm(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            <MenuItem value="Default">Default</MenuItem>
            <MenuItem value="Custom">Custom</MenuItem>
          </Select>
          {errors.dvirForm && (
            <Typography color="error" sx={{ fontSize: 12, mt: 0.5 }}>
              {errors.dvirForm}
            </Typography>
          )}
        </FormControl>

        {/* ================= REPORTS ================= */}
        <Typography
          variant="subtitle2"
          sx={{ mt: 2, mb: 2, color: "#888", fontSize: 12, fontWeight: "bold" }}
        >
          REPORTS
        </Typography>
        <Typography sx={{ fontSize: 13, mb: 1, color: "#bbb" }}>
          Fleet Requested Distance
        </Typography>
        <FormControl sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={fleetDistance === "default"}
                onChange={() => setFleetDistance("default")}
              />
            }
            label={
              <Typography sx={{ color: "white", fontSize: 14 }}>
                Company’s default value (500 mi)
              </Typography>
            }
          />
          <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
            <Switch
              checked={fleetDistance === "custom"}
              onChange={() => setFleetDistance("custom")}
            />
            <TextField
              label="Custom value"
              type="number"
              required={fleetDistance === "custom"}
              disabled={fleetDistance !== "custom"}
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              error={!!errors.customValue}
              helperText={errors.customValue}
              sx={{ ml: 2, flex: 1 }}
              InputLabelProps={{ sx: { color: "white" } }}
              inputProps={{
                style: { color: "white", backgroundColor: "#1e2630" },
              }}
            />
          </div>
        </FormControl>

        {/* ================= DOCUMENTS ================= */}
        <Typography
          variant="subtitle2"
          sx={{ mt: 2, mb: 2, color: "#888", fontSize: 12, fontWeight: "bold" }}
        >
          DOCUMENTS
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          sx={{
            borderColor: "#1669f2",
            color: "#1669f2",
            textTransform: "none",
            "&:hover": {
              borderColor: "#1669f2",
              backgroundColor: "rgba(22,105,242,0.1)",
            },
          }}
          onClick={() => setDocuments([...documents, "New document"])}
        >
          Add Document
        </Button>
      </DialogContent>

      <DialogActions sx={{ bgcolor: "#121a26" }}>
        <Button onClick={onClose} sx={{ color: "#777" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bgcolor: "#1669f2",
            "&:hover": { bgcolor: "#1669f2" },
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddVehicleDialog;
