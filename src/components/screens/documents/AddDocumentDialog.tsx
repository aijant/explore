import React, { useState } from "react";
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
} from "@mui/material";

const AddDocumentDialog = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
}) => {
  const [type, setType] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setType("");
    setDateTime("");
    setVehicleId("");
    setReference("");
    setNotes("");
    setFile(null);
  };

  const handleSubmit = () => {
    if (!type || !dateTime || !vehicleId) {
      alert("Please fill all required fields.");
      return;
    }
      onConfirm({ type, dateTime, vehicleId, reference, notes, file });
      resetForm();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{ fontWeight: "bold", bgcolor: "#121a26", color: "white" }}
      >
        Add Document
      </DialogTitle>
      <DialogContent dividers sx={{ bgcolor: "#121a26", color: "white" }}>
        <Typography
          variant="subtitle2"
          sx={{ mb: 2, color: "#888", fontSize: 12, fontWeight: "bold" }}
        >
          DOCUMENT INFO
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>Company</InputLabel>
          <Select
            value={"Orkan ELD"}
            sx={{
              bgcolor: "#1e2630",
              color: "white",
              ".MuiSelect-icon": { color: "white" },
            }}
          >
            <MenuItem value="Orkan ELD">Orkan ELD</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>Type *</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            sx={{
              bgcolor: "#1e2630",
              color: "white",
              ".MuiSelect-icon": { color: "white" },
            }}
          >
            <MenuItem value="">Select Type</MenuItem>
            <MenuItem value="Scale Ticket">Scale Ticket</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Date/Time *"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{
            shrink: true,
            sx: { color: "white" },
          }}
          inputProps={{
            style: { color: "white", backgroundColor: "#1e2630" },
          }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>Vehicle ID *</InputLabel>
          <Select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            sx={{
              bgcolor: "#1e2630",
              color: "white",
              ".MuiSelect-icon": { color: "white" },
            }}
          >
            <MenuItem value="">Select Vehicle</MenuItem>
            <MenuItem value="008">008</MenuItem>
            <MenuItem value="009">009</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Reference"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ sx: { color: "white" } }}
          inputProps={{ style: { color: "white", backgroundColor: "#1e2630" } }}
        />

        <TextField
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
          InputLabelProps={{ sx: { color: "white" } }}
          inputProps={{ style: { color: "white", backgroundColor: "#1e2630" } }}
        />

        <Button
          variant="outlined"
          component="label"
          sx={{
            width: "100%",
            borderColor: "white",
            color: "white",
            "&:hover": { borderColor: "#1669f2", color: "#1669f2" },
          }}
        >
          Browse for file
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            accept="application/pdf,image/*"
          />
        </Button>
        {file && (
          <Typography sx={{ mt: 1, fontSize: 12, color: "#ccc" }}>
            Selected: {file.name}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ bgcolor: "#121a26" }}>
        <Button
          onClick={() => {
            resetForm();
            onClose();
          }}
          sx={{ color: "#777" }}
        >
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

export default AddDocumentDialog;
