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
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useGetVehiclesQuery } from "@store/services/vehicles.service";
import {
  FuelType,
  UsState,
  DocumentName,
} from "@store/models/enums/general.enums";

interface Vehicle {
  vehicleId: string;
  vin: string;
  year: string;
  make: string;
  model: string;
  color: string;
  fuelType: string;
  licenseIssuingState: string;
  licensePlateNumber: string;
  company: string;
}

 // DOCUMENTS
  interface VehicleDocument {
    documentName: DocumentName | "";
    customName: string;
    expirationDate: string;
    file: File | null;
  }


const AddVehicleDialog = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
}) => {
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
  const [documentName, setDocumentName] = useState<DocumentName | "">("");
  const [customName, setCustomName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [file, setFile] = useState<any>(null);

  const handleDocumentDialogOpen = () => {
    setDocumentDialogOpen(true);
  };

  const handleDocumentDialogClose = () => {
    setDocumentDialogOpen(false);
    resetDocumentForm();
  };

  const resetDocumentForm = () => {
    setDocumentName("");
    setCustomName("");
    setExpirationDate("");
    setFile(null);
  };

  const handleDialogClose = () => {
    setDocuments([]);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setVehicleId("");
    setVin("");
    setYear("");
    setMake("");
    setModel("");
    setColor("");
    setFuelType("");
    setLicenseState("");
    setLicensePlate("");
    setCompany("");
    setCompanyOwned(true);

    setEldSn("");
    setGpsDevices("");
    setTabletSn("");
    setCameraSn("");
    setDvirForm("");

    setFleetDistance("default");
    setCustomValue("");

    setDocuments([]);
    setErrors({});
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

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

  const [eldSn, setEldSn] = useState("");
  const [gpsDevices, setGpsDevices] = useState("");
  const [tabletSn, setTabletSn] = useState("");
  const [cameraSn, setCameraSn] = useState("");
  const [dvirForm, setDvirForm] = useState("");

  const [fleetDistance, setFleetDistance] = useState<"default" | "custom">(
    "default"
  );
  const [customValue, setCustomValue] = useState("");

  const [errors, setErrors] = useState<any>({});

  const { data: AllVehicles = [] } = useGetVehiclesQuery({});

  console.log("AllVehicles0000", AllVehicles);

  const vehicleOptions: Vehicle[] = AllVehicles.content || [];

  const vehicleIdOptions = vehicleOptions.map(
    (vehicle: any) => vehicle.vehicleId
  );
  const vinOptions = vehicleOptions.map((vehicle: any) => vehicle.vin);
  const yearOptions = vehicleOptions.map((vehicle: any) => vehicle.year);
  const makeOptions = vehicleOptions.map((vehicle: any) => vehicle.make);
  const modelOptions = vehicleOptions.map((vehicle: any) => vehicle.model);
  const colorOptions = vehicleOptions.map((vehicle: any) => vehicle.color);
  const fuelTypeOptions = Object.values(FuelType);
  const licenseStateOptions = Object.values(UsState);
  const licensePlateOptions = vehicleOptions.map(
    (vehicle: any) => vehicle.licensePlateNumber
  );
  const companyOptions = vehicleOptions.map((vehicle: any) => vehicle.company);

  const validate = () => {
    const newErrors: any = {};
    if (!vehicleId) newErrors.vehicleId = "Vehicle ID is required";
    if (!vin) newErrors.vin = "VIN is required";
    if (!fuelType) newErrors.fuelType = "Fuel type is required";
    if (!company) newErrors.company = "Company is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  const [documents, setDocuments] = useState<VehicleDocument[]>([]);

  const handleDocumentSubmit = () => {
    const newDoc: VehicleDocument = {
      documentName,
      customName,
      expirationDate,
      file,
    };
      setDocuments((prev) => [...prev, newDoc]);
      resetDocumentForm()
    console.log("Document Data:", newDoc);
    setDocumentDialogOpen(false);
  };

  const handleRemoveDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
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
      documents, // full list of docs
    };
    onConfirm(data);
    resetForm();
  };

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
    <Dialog open={open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
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
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>Vehicle ID</InputLabel>
          <Select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            {vehicleIdOptions?.map((id) => (
              <MenuItem key={id} value={id}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* VIN */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>VIN</InputLabel>
          <Select
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            {vinOptions.map((vinOption) => (
              <MenuItem key={vinOption} value={vinOption}>
                {vinOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Year */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>Year</InputLabel>
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            {yearOptions.map((yearOption) => (
              <MenuItem key={yearOption} value={yearOption}>
                {yearOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Make */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>Make</InputLabel>
          <Select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            {makeOptions.map((makeOption) => (
              <MenuItem key={makeOption} value={makeOption}>
                {makeOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Model */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>Model</InputLabel>
          <Select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            {modelOptions.map((modelOption) => (
              <MenuItem key={modelOption} value={modelOption}>
                {modelOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Color */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>Color</InputLabel>
          <Select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            {colorOptions.map((colorOption) => (
              <MenuItem key={colorOption} value={colorOption}>
                {colorOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Fuel Type */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>Fuel Type</InputLabel>
          <Select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            {fuelTypeOptions.map((fuelOption) => (
              <MenuItem key={fuelOption} value={fuelOption}>
                {fuelOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* License State */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>License State</InputLabel>
          <Select
            value={licenseState}
            onChange={(e) => setLicenseState(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            {licenseStateOptions.map((stateOption) => (
              <MenuItem key={stateOption} value={stateOption}>
                {stateOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* License Plate */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>License Plate</InputLabel>
          <Select
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            {licensePlateOptions.map((plateOption) => (
              <MenuItem key={plateOption} value={plateOption}>
                {plateOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Company */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>Company</InputLabel>
          <Select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            {companyOptions.map((companyOption) => (
              <MenuItem key={companyOption} value={companyOption}>
                {companyOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Company Owned */}
        <FormControlLabel
          control={
            <Switch
              checked={companyOwned}
              onChange={() => setCompanyOwned(!companyOwned)}
            />
          }
          label="Company Owned"
          sx={{ color: "white", mb: 2 }}
        />

        {/* ================= ELD ================= */}
        <Typography
          variant="subtitle2"
          sx={{
            mt: 2,
            mb: 2,
            color: "#888",
            fontSize: 12,
            fontWeight: "bold",
          }}
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
            <MenuItem value="No ELD device">No ELD device</MenuItem>
          </Select>
        </FormControl>

        {/* ================= GPS ================= */}
        <Typography
          variant="subtitle2"
          sx={{
            mt: 2,
            mb: 2,
            color: "#888",
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          GPS TRACKING
        </Typography>

        <FormControl fullWidth>
          <InputLabel sx={{ color: "white" }}>GPS S/N</InputLabel>
          <Select
            value={gpsDevices}
            onChange={(e) => setGpsDevices(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            <MenuItem value="No GPS device">No GPS device</MenuItem>
          </Select>
        </FormControl>

        {/* ================= TABLET ================= */}
        <Typography
          variant="subtitle2"
          sx={{
            mt: 2,
            mb: 2,
            color: "#888",
            fontSize: 12,
            fontWeight: "bold",
          }}
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
            <MenuItem value="TBL001">No Tablet device</MenuItem>
          </Select>
        </FormControl>

        {/* ================= CAMERA ================= */}
        <Typography
          variant="subtitle2"
          sx={{
            mt: 2,
            mb: 2,
            color: "#888",
            fontSize: 12,
            fontWeight: "bold",
          }}
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
            <MenuItem value="No Camera device">No Camera device</MenuItem>
          </Select>
        </FormControl>

        {/* ================= DVIR FORM ================= */}
        <Typography
          variant="subtitle2"
          sx={{
            mt: 2,
            mb: 2,
            color: "#888",
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          DVIR FORM
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.dvirForm}>
          <InputLabel sx={{ color: "white" }}>DVIR Form</InputLabel>
          <Select
            value={dvirForm}
            onChange={(e) => setDvirForm(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            <MenuItem value="Default">Default</MenuItem>
          </Select>
        </FormControl>

        {/* ================= REPORTS ================= */}
        <Typography
          variant="subtitle2"
          sx={{
            mt: 2,
            mb: 2,
            color: "#888",
            fontSize: 12,
            fontWeight: "bold",
          }}
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
          sx={{
            mt: 2,
            mb: 2,
            color: "#888",
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          DOCUMENTS
        </Typography>

        {/* Show added documents */}
        {documents.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            {documents.map((doc, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  marginBottom: 8,
                  border: "1px solid #2a3442",
                  borderRadius: 8,
                  background: "#1e2630",
                }}
              >
                <Typography sx={{ color: "white" }}>
                  {doc.customName || doc.documentName}
                  {doc.expirationDate && `(exp: ${doc.expirationDate})`}
                </Typography>
                <Button
                  size="small"
                  sx={{ color: "#f44336", textTransform: "none" }}
                  onClick={() => handleRemoveDocument(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}

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
          onClick={handleDocumentDialogOpen}
        >
          Add Document
        </Button>

        <Dialog
          open={documentDialogOpen}
          onClose={handleDocumentDialogClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle
            sx={{ fontWeight: "bold", bgcolor: "#121a26", color: "white" }}
          >
            Add Document
          </DialogTitle>
          <DialogContent sx={{ bgcolor: "#121a26", color: "white" }}>
            {/* Document Name */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: "white" }}>Document Name</InputLabel>
              <Select
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                sx={{ bgcolor: "#1e2630", color: "white" }}
              >
                {Object.values(DocumentName).map((docName) => (
                  <MenuItem key={docName} value={docName}>
                    {docName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* Custom Name */}
            <TextField
              label="Custom Name"
              required
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{ sx: { color: "white" } }}
              inputProps={{
                style: { color: "white", backgroundColor: "#1e2630" },
              }}
            />
            {/* Expiration Date */}
            <TextField
              label="Expiration Date"
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{ sx: { color: "white" } }}
              inputProps={{
                style: { color: "white", backgroundColor: "#1e2630" },
              }}
            />
            {/* File Upload */}
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </DialogContent>
          <DialogActions sx={{ bgcolor: "#121a26" }}>
            <Button onClick={handleDocumentDialogClose} sx={{ color: "#777" }}>
              Cancel
            </Button>
            <Button
              onClick={handleDocumentSubmit}
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
      </DialogContent>

      <DialogActions sx={{ bgcolor: "#121a26" }}>
        <Button onClick={handleDialogClose} sx={{ color: "#777" }}>
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
