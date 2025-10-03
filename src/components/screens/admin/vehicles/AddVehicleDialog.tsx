import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Typography,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useGetVehicleDocumentQuery } from "@store/services/vehicles.service";
import {
  FuelType,
  UsState,
  DocumentName,
} from "@store/models/enums/general.enums";

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
  initialData,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  initialData?: any;
}) => {
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

  // ====== DEVICE FIELDS ======
  const [eldSn, setEldSn] = useState("");
  const [gpsDevices, setGpsDevices] = useState("");
  const [tabletSn, setTabletSn] = useState("");
  const [cameraSn, setCameraSn] = useState("");
  const [dvirForm, setDvirForm] = useState("");

  // ====== FLEET DISTANCE ======
  const [fleetDistance, setFleetDistance] = useState<"default" | "custom">(
    "default"
  );
  const [customValue, setCustomValue] = useState("");

  // ====== DOCUMENTS ======
  const [documents, setDocuments] = useState<VehicleDocument[]>([]);
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
  const [documentName, setDocumentName] = useState<DocumentName | "">("");
  const [customName, setCustomName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (open && initialData) {
      setVehicleId(initialData.vehicleId || "");
      setVin(initialData.vin || "");
      setYear(initialData.year || "");
      setMake(initialData.make || "");
      setModel(initialData.model || "");
      setColor(initialData.color || "");
      setFuelType(initialData.fuelType || "");
      setLicenseState(initialData.licenseState || "");
      setLicensePlate(initialData.licensePlate || "");
      setCompany(initialData.company || "");
      setCompanyOwned(initialData.companyOwned ?? true);

      setEldSn(initialData.eldSn || "");
      setGpsDevices(initialData.gpsDevices || "");
      setTabletSn(initialData.tabletSn || "");
      setCameraSn(initialData.cameraSn || "");
      setDvirForm(initialData.dvirForm || "");

      setFleetDistance(initialData.fleetDistance || "default");
      setCustomValue(initialData.customValue || "");

      setDocuments(initialData.documents || []);
    }
  }, [open, initialData]);

  const vehicleUuid = initialData?.uuid;
  const { data: documentData } = useGetVehicleDocumentQuery(vehicleUuid, {
    skip: !vehicleUuid,
  });

  useEffect(() => {
    if (documentData && Array.isArray(documentData)) {
      const mappedDocs = documentData.map((doc: any) => ({
        documentName: doc.documentName as DocumentName,
        customName: doc.customName,
        expirationDate: doc.expirationDate,
        file: doc.fileName,
      }));

      setDocuments(mappedDocs);
    }
  }, [documentData]);

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

  const handleDialogClose = () => {
    resetForm();
    onClose();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setFile(event.target.files[0]);
  };

  const handleDocumentDialogOpen = () => setDocumentDialogOpen(true);
  const handleDocumentDialogClose = () => {
    resetDocumentForm();
    setDocumentDialogOpen(false);
  };

  const resetDocumentForm = () => {
    setDocumentName("");
    setCustomName("");
    setExpirationDate("");
    setFile(null);
  };

  const handleDocumentSubmit = () => {
    const newDoc: VehicleDocument = {
      documentName,
      customName,
      expirationDate,
      file,
    };
    setDocuments((prev) => [...prev, newDoc]);
    resetDocumentForm();
    setDocumentDialogOpen(false);
  };

  const handleRemoveDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors: any = {};
    if (!vehicleId) newErrors.vehicleId = "Vehicle ID is required";
    if (!vin) newErrors.vin = "VIN is required";
    if (!fuelType) newErrors.fuelType = "Fuel type is required";
    if (!company) newErrors.company = "Company is required";
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
      uuid: initialData?.uuid || null, // ✅ keep track if edit
    };

    onConfirm(data);
    resetForm();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{ fontWeight: "bold", bgcolor: "#121a26", color: "white" }}
      >
        {initialData ? "Edit Vehicle" : "Add Vehicle"}
      </DialogTitle>

      <DialogContent dividers sx={{ bgcolor: "#121a26", color: "white" }}>
        <Typography
          variant="subtitle2"
          sx={{ mb: 2, color: "#888", fontSize: 12, fontWeight: "bold" }}
        >
          GENERAL
        </Typography>

        {/* ==== TEXT FIELDS ==== */}
        <TextField
          label="Vehicle ID"
          required
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ sx: { color: "white" } }}
          inputProps={{
            style: { color: "white", backgroundColor: "#1e2630" },
          }}
        />
        <TextField
          label="VIN"
          required
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ sx: { color: "white" } }}
          inputProps={{
            style: { color: "white", backgroundColor: "#1e2630" },
          }}
        />
        <TextField
          label="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ sx: { color: "white" } }}
          inputProps={{
            style: { color: "white", backgroundColor: "#1e2630" },
          }}
        />
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
        <TextField
          label="License Plate"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ sx: { color: "white" } }}
          inputProps={{
            style: { color: "white", backgroundColor: "#1e2630" },
          }}
        />
        <TextField
          label="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ sx: { color: "white" } }}
          inputProps={{
            style: { color: "white", backgroundColor: "#1e2630" },
          }}
        />

        {/* ==== DROPDOWNS ==== */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>Fuel Type</InputLabel>
          <Select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            {Object.values(FuelType).map((fuel) => (
              <MenuItem key={fuel} value={fuel}>
                {fuel}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>License State</InputLabel>
          <Select
            value={licenseState}
            onChange={(e) => setLicenseState(e.target.value)}
            sx={{ bgcolor: "#1e2630", color: "white" }}
          >
            {Object.values(UsState).map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
