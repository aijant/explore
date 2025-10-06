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
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useGetTrailerDocumentQuery } from "@store/services/trailers.service";
import {
  Ownership,
  Suspension,
  TrailerType,
  TrailerDocumentName,
} from "@store/models/enums/general.enums";

interface TrailerDocument {
  documentName: TrailerDocumentName | "";
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

const AddTrailersDialog = ({
  open,
  onClose,
  onConfirm,
  initialData,
}: Props) => {
  const [form, setForm] = useState({
    trailerId: "",
    type: "",
    year: "",
    make: "",
    vin: "",
    licensePlateNumber: "",
    ownership: "",
    suspension: "",
    company: "",
    fleetRequestedDistance: "",
    status: true,
  });

  const [documents, setDocuments] = useState<TrailerDocument[]>([]);
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
  const [documentName, setDocumentName] = useState<TrailerDocumentName | "">(
    ""
  );
  const [customName, setCustomName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    "cancel" | "confirm" | null
  >(null);
  
  const trailerId = initialData?.uuid;

  const { data: documentData } = useGetTrailerDocumentQuery(trailerId, {
    skip: !trailerId,
  });

  useEffect(() => {
    if (documentData && Array.isArray(documentData)) {
      const mappedDocs = documentData.map((doc: any) => ({
        documentName: doc.documentName,
        customName: doc.customName,
        expirationDate: doc.expirationDate,
        file: doc.fileName,
      }));

      setDocuments(mappedDocs);
    }
  }, [documentData]);


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
    if (!documentName || !customName || !expirationDate || !file) return;
    setDocuments((prev) => [
      ...prev,
      {
        documentName,
        customName,
        expirationDate,
        file,
      },
    ]);
    resetDocumentForm();
    setDocumentDialogOpen(false);
  };

  const handleRemoveDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const trailer = {
      ...form,
      year: Number(form.year),
      fleetRequestedDistance: Number(form.fleetRequestedDistance),
      status: Boolean(form.status),
    };
    onConfirm({ trailer, documents });
    onClose();
  };

  const handleResetConfirm = () => {
    if (pendingAction === "cancel") {
      setForm({
        trailerId: "",
        type: "",
        year: "",
        make: "",
        vin: "",
        licensePlateNumber: "",
        ownership: "",
        suspension: "",
        company: "",
        fleetRequestedDistance: "",
        status: true,
      });
      setDocuments([]);
      onClose();
    }

    if (pendingAction === "confirm") {
      handleSubmit();
    }

    setPendingAction(null);
    setOpenResetDialog(false);
  };

  useEffect(() => {
    if (initialData) {
      setForm({ ...form, ...initialData });
    }
  }, [initialData]);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: "#121a26", color: "white" }}>
          {initialData ? "Edit Trailer" : "Add Trailer"}
        </DialogTitle>

        <DialogContent sx={{ bgcolor: "#121a26", color: "white" }}>
          <Typography sx={{ mb: 2 }}>General Info</Typography>

          <TextField
            name="trailerId"
            label="Trailer ID"
            fullWidth
            sx={{ mb: 2 }}
            value={form.trailerId}
            onChange={handleChange}
            InputLabelProps={{ sx: { color: "white" } }}
            inputProps={{ style: { color: "white", background: "#1e2630" } }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "white" }}>Type</InputLabel>
            <Select
              name="type"
              value={form.type}
              onChange={handleChange}
              sx={{ background: "#1e2630", color: "white" }}
            >
              {Object.values(TrailerType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            name="year"
            label="Year"
            type="number"
            fullWidth
            sx={{ mb: 2 }}
            value={form.year}
            onChange={handleChange}
            InputLabelProps={{ sx: { color: "white" } }}
            inputProps={{ style: { color: "white", background: "#1e2630" } }}
          />

          <TextField
            name="make"
            label="Make"
            fullWidth
            sx={{ mb: 2 }}
            value={form.make}
            onChange={handleChange}
            InputLabelProps={{ sx: { color: "white" } }}
            inputProps={{ style: { color: "white", background: "#1e2630" } }}
          />

          <TextField
            name="vin"
            label="VIN"
            fullWidth
            sx={{ mb: 2 }}
            value={form.vin}
            onChange={handleChange}
            InputLabelProps={{ sx: { color: "white" } }}
            inputProps={{ style: { color: "white", background: "#1e2630" } }}
          />

          <TextField
            name="licensePlateNumber"
            label="License Plate Number"
            fullWidth
            sx={{ mb: 2 }}
            value={form.licensePlateNumber}
            onChange={handleChange}
            InputLabelProps={{ sx: { color: "white" } }}
            inputProps={{ style: { color: "white", background: "#1e2630" } }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "white" }}>Ownership</InputLabel>
            <Select
              name="ownership"
              value={form.ownership}
              onChange={handleChange}
              sx={{ background: "#1e2630", color: "white" }}
            >
              {Object.values(Ownership).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "white" }}>Suspension</InputLabel>
            <Select
              name="suspension"
              value={form.suspension}
              onChange={handleChange}
              sx={{ background: "#1e2630", color: "white" }}
            >
              {Object.values(Suspension).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            name="company"
            label="Company"
            fullWidth
            sx={{ mb: 2 }}
            value={form.company}
            onChange={handleChange}
            InputLabelProps={{ sx: { color: "white" } }}
            inputProps={{ style: { color: "white", background: "#1e2630" } }}
          />

          <TextField
            name="fleetRequestedDistance"
            label="Fleet Requested Distance"
            type="number"
            fullWidth
            sx={{ mb: 2 }}
            value={form.fleetRequestedDistance}
            onChange={handleChange}
            InputLabelProps={{ sx: { color: "white" } }}
            inputProps={{ style: { color: "white", background: "#1e2630" } }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={form.status}
                onChange={() =>
                  setForm((prev) => ({ ...prev, status: !prev.status }))
                }
              />
            }
            label="Status"
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
              }}
            >
              <Typography sx={{ color: "white" }}>
                {doc.customName || doc.documentName}{" "}
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
          <Button
            onClick={() => {
              setPendingAction("cancel");
              setOpenResetDialog(true);
            }}
            sx={{ color: "#888" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setPendingAction("confirm");
              setOpenResetDialog(true);
            }}
            variant="contained"
            sx={{ bgcolor: "#1669f2", fontWeight: "bold" }}
          >
            Confirm
          </Button>
        </DialogActions>

        {/* Document Dialog */}
        <Dialog open={documentDialogOpen} onClose={handleDocumentDialogClose}>
          <DialogTitle sx={{ bgcolor: "#121a26", color: "white" }}>
            Add Trailer Document
          </DialogTitle>
          <DialogContent sx={{ bgcolor: "#121a26" }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: "white" }}>Document Name</InputLabel>
              <Select
                value={documentName}
                onChange={(e) =>
                  setDocumentName(e.target.value as TrailerDocumentName)
                }
                sx={{ bgcolor: "#1e2630", color: "white" }}
              >
                {Object.values(TrailerDocumentName).map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              sx={{ bgcolor: "#1669f2" }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Dialog>

      {/* Reset/Confirm Confirmation Dialog */}
      <Dialog open={openResetDialog} onClose={() => setOpenResetDialog(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>
            {pendingAction === "cancel"
              ? "All unsaved changes will be lost. Do you want to cancel?"
              : "Do you want to confirm and save this trailer?"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResetDialog(false)}>No</Button>
          <Button onClick={handleResetConfirm} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTrailersDialog;
