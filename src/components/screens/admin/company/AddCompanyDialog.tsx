import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Switch,
  FormControlLabel,
  SelectChangeEvent,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import {
  CargoType,
  CompanyDocumentName,
  CycleRule,
  UsState,
} from "@store/models/enums/general.enums";

interface CompanyDocument {
  documentName: CompanyDocumentName | "";
  customName: string;
  expirationDate: string;
  file: File | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  initialData?: any;
}

const AddCompanyDialog = ({ open, onClose, onConfirm, initialData }: Props) => {
  const [form, setForm] = useState({
    companyName: "",
    street: "",
    city: "",
    state: "", // new
    zip: "", // new
    dot: "",
    homeTerminalTimeZone: "",
    cycleRule: CycleRule.USA_70_8,
    cargoType: CargoType.PROPERTY,
    break30MinException: false,
  });

  const [documents, setDocuments] = useState<CompanyDocument[]>([]);
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
  const [documentName, setDocumentName] = useState<CompanyDocumentName | "">(
    ""
  );
  const [customName, setCustomName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    if (!name) return;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    if (!name) return;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAddDocument = () => {
    if (
      !documentName ||
      (!customName && documentName === CompanyDocumentName.CUSTOM_NAME) ||
      !expirationDate ||
      !file
    )
      return;

    const docToAdd: CompanyDocument = {
      documentName,
      customName,
      expirationDate,
      file,
    };

    setDocuments((prev) => [...prev, docToAdd]);
    resetDocumentForm();
    setDocumentDialogOpen(false);
  };

  const handleRemoveDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Prepare data for submit
    onConfirm({ company: form, documents });
    onClose();
  };

  // Load initial data (edit mode)
  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({ ...prev, ...initialData.company }));
      if (initialData.documents) {
        setDocuments(initialData.documents);
      }
    }
  }, [initialData]);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: "#121a26", color: "white" }}>
          {initialData ? "Edit Company" : "Add Company"}
        </DialogTitle>

        <DialogContent sx={{ bgcolor: "#121a26", color: "white" }}>
          <Typography sx={{ mb: 2 }}>Company Info</Typography>

          <TextField
            name="companyName"
            label="Company Name"
            fullWidth
            sx={{ mb: 2 }}
            value={form.companyName}
            onChange={handleInputChange} 
            InputLabelProps={{ sx: { color: "white" } }}
            inputProps={{ style: { color: "white", background: "#1e2630" } }}
          />

          <TextField
            name="street"
            label="Street"
            fullWidth
            sx={{ mb: 2 }}
            value={form.street}
            onChange={handleInputChange} 
            InputLabelProps={{ sx: { color: "white" } }}
            inputProps={{ style: { color: "white", background: "#1e2630" } }}
          />

          <TextField
            name="city"
            label="City"
            fullWidth
            sx={{ mb: 2 }}
            value={form.city}
            onChange={handleInputChange} 
            InputLabelProps={{ sx: { color: "white" } }}
            inputProps={{ style: { color: "white", background: "#1e2630" } }}
          />

          {/* State Select */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "white" }}>State</InputLabel>
            <Select
              name="state"
              value={form.state}
              onChange={handleSelectChange} 
              sx={{ background: "#1e2630", color: "white" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Object.entries(UsState).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* ZIP/Postal Code */}
          <TextField
            name="zip"
            label="ZIP/Postal Code"
            fullWidth
            sx={{ mb: 2 }}
            value={form.zip}
            onChange={handleInputChange} 
            InputLabelProps={{ sx: { color: "white" } }}
            inputProps={{ style: { color: "white", background: "#1e2630" } }}
          />

          <TextField
            name="dot"
            label="DOT Number"
            fullWidth
            sx={{ mb: 2 }}
            value={form.dot}
            onChange={handleInputChange} 
            InputLabelProps={{ sx: { color: "white" } }}
            inputProps={{ style: { color: "white", background: "#1e2630" } }}
          />

          <TextField
            name="homeTerminalTimeZone"
            label="Home Terminal Time Zone"
            fullWidth
            sx={{ mb: 2 }}
            value={form.homeTerminalTimeZone}
            onChange={handleInputChange} 
            placeholder="e.g. America/Chicago"
            InputLabelProps={{ sx: { color: "white" } }}
            inputProps={{ style: { color: "white", background: "#1e2630" } }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "white" }}>Cycle Rule</InputLabel>
            <Select
              name="cycleRule"
              value={form.cycleRule}
              onChange={handleSelectChange} 
              sx={{ background: "#1e2630", color: "white" }}
            >
              {Object.values(CycleRule).map((rule) => (
                <MenuItem key={rule} value={rule}>
                  {rule}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "white" }}>Cargo Type</InputLabel>
            <Select
              name="cargoType"
              value={form.cargoType}
              onChange={handleSelectChange} 
              sx={{ background: "#1e2630", color: "white" }}
            >
              {Object.values(CargoType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={form.break30MinException}
                name="break30MinException"
                onChange={handleInputChange} 
              />
            }
            label="Break 30 Min Exception"
            sx={{ color: "white", mb: 2 }}
          />

          <Typography variant="subtitle2" sx={{ mb: 1, color: "#bbb" }}>
            Documents
          </Typography>

          {documents.map((doc, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
                padding: "8px 12px",
                background: "#1e2630",
                borderRadius: 4,
                color: "white",
              }}
            >
              <Typography>
                {doc.documentName === CompanyDocumentName.CUSTOM_NAME
                  ? doc.customName
                  : doc.documentName}{" "}
                {doc.expirationDate && `(exp: ${doc.expirationDate})`}
              </Typography>
              <Button
                onClick={() => handleRemoveDocument(idx)}
                sx={{ color: "#f44336" }}
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            startIcon={<Add />}
            variant="outlined"
            onClick={handleDocumentDialogOpen}
            sx={{ color: "#1669f2", borderColor: "#1669f2", mt: 1 }}
          >
            Add Document
          </Button>
        </DialogContent>

        <DialogActions sx={{ bgcolor: "#121a26" }}>
          <Button onClick={onClose} sx={{ color: "#888" }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ bgcolor: "#1669f2", fontWeight: "bold" }}
          >
            Confirm
          </Button>
        </DialogActions>

        {/* Add Document Dialog */}
        <Dialog open={documentDialogOpen} onClose={handleDocumentDialogClose}>
          <DialogTitle sx={{ bgcolor: "#121a26", color: "white" }}>
            Add Company Document
          </DialogTitle>
          <DialogContent sx={{ bgcolor: "#121a26" }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: "white" }}>Document Name</InputLabel>
              <Select
                value={documentName}
                onChange={(e) =>
                  setDocumentName(e.target.value as CompanyDocumentName)
                }
                sx={{ bgcolor: "#1e2630", color: "white" }}
              >
                {Object.values(CompanyDocumentName).map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {documentName === CompanyDocumentName.CUSTOM_NAME && (
              <TextField
                label="Custom Name"
                fullWidth
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                sx={{ mb: 2 }}
                InputLabelProps={{ sx: { color: "white" } }}
                inputProps={{
                  style: { color: "white", background: "#1e2630" },
                }}
              />
            )}

            <TextField
              label="Expiration Date"
              type="date"
              fullWidth
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              sx={{ mb: 2 }}
              InputLabelProps={{ sx: { color: "white" } }}
              inputProps={{
                style: { color: "white", background: "#1e2630" },
              }}
            />

            <Button variant="contained" component="label" fullWidth>
              Upload File
              <input hidden type="file" onChange={handleFileChange} />
            </Button>
          </DialogContent>
          <DialogActions sx={{ bgcolor: "#121a26" }}>
            <Button onClick={handleDocumentDialogClose} sx={{ color: "#888" }}>
              Cancel
            </Button>
            <Button
              onClick={handleAddDocument}
              variant="contained"
              disabled={
                !documentName ||
                (!customName &&
                  documentName === CompanyDocumentName.CUSTOM_NAME) ||
                !expirationDate ||
                !file
              }
              sx={{ bgcolor: "#1669f2", fontWeight: "bold" }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Dialog>
    </>
  );
};

export default AddCompanyDialog;
