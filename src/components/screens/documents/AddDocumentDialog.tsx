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
  OutlinedInput,
} from "@mui/material";
import { useGetVehiclesQuery } from "@store/services/vehicles.service";
import { DocumentType } from "@store/models/enums/general.enums"; // update path as needed


const AddDocumentDialog = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
}) => {
  const [type, setType] = useState<DocumentType | "">("");
  const [dateTime, setDateTime] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [errors, setErrors] = useState({
    type: false,
    dateTime: false,
    vehicleId: false,
  });

  const { data: vehiclesData } =
    useGetVehiclesQuery({
      page: 0,
      size: 10,
      vehicleId: "TRK",
    });

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
    setErrors({ type: false, dateTime: false, vehicleId: false });
  };

  const handleSubmit = () => {
    const newErrors = {
      type: !type,
      dateTime: !dateTime,
      vehicleId: !vehicleId,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;

    onConfirm({ type, dateTime, vehicleId, reference, notes, file });
    resetForm();
  };

  const selectMenuProps = {
    PaperProps: {
      sx: {
        bgcolor: "#1e2630",
        color: "white",
        "& .MuiMenuItem-root": {
          color: "white",
          "&:hover": {
            backgroundColor: "#2a3442",
          },
        },
      },
    },
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        resetForm();
        onClose();
      }}
      maxWidth="sm"
      fullWidth
    >
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

        {/* Company */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>Company</InputLabel>
          <Select
            value={"Orkan ELD"}
            input={<OutlinedInput label="Company" />}
            MenuProps={selectMenuProps}
            sx={{
              bgcolor: "#1e2630",
              color: "white",
              ".Mui-disabled": {
                WebkitTextFillColor: "white",
              },
              ".MuiSelect-icon": { color: "white" },
            }}
          >
            <MenuItem value="Orkan ELD">Orkan ELD</MenuItem>
          </Select>
        </FormControl>

        {/* Type */}
        <FormControl fullWidth sx={{ mb: 2 }} error={errors.type}>
          <InputLabel sx={{ color: "white" }}>Type *</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as DocumentType)}
            MenuProps={selectMenuProps}
            sx={{
              bgcolor: "#1e2630",
              color: "white",
              ".MuiSelect-icon": { color: "white" },
            }}
          >
            {Object.values(DocumentType).map((docType) => (
              <MenuItem key={docType} value={docType}>
                {docType}
              </MenuItem>
            ))}
          </Select>
          {errors.type && (
            <Typography variant="caption" color="error">
              Type is required
            </Typography>
          )}
        </FormControl>

        {/* Date/Time */}
        <TextField
          label="Date/Time *"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          fullWidth
          sx={{
            mb: 2,
            "& .MuiInputBase-root": {
              color: "white",
              backgroundColor: "#1e2630",
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
          error={errors.dateTime}
          helperText={errors.dateTime ? "Date/Time is required" : ""}
          InputLabelProps={{ shrink: true }}
        />

        {/* Vehicle ID */}
        <FormControl fullWidth sx={{ mb: 2 }} error={errors.vehicleId}>
          <InputLabel sx={{ color: "white" }}>Vehicle ID *</InputLabel>
          <Select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{
              bgcolor: "#1e2630",
              color: "white",
              ".MuiSelect-icon": { color: "white" },
            }}
          >
            {vehiclesData?.content?.map((item: any) => (
              <MenuItem key={item.uuid} value={item.uuid}>
                {item.vehicleId}
              </MenuItem>
            ))}
          </Select>
          {errors.vehicleId && (
            <Typography variant="caption" color="error">
              Vehicle ID is required
            </Typography>
          )}
        </FormControl>

        {/* Reference */}
        <TextField
          label="Reference"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ sx: { color: "white" } }}
          inputProps={{
            style: { color: "white", backgroundColor: "#1e2630" },
          }}
        />

        {/* Notes */}
        <TextField
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
          InputLabelProps={{ sx: { color: "white" } }}
          inputProps={{
            style: { color: "white", backgroundColor: "#1e2630" },
          }}
        />

        {/* File Upload */}
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

      {/* Actions */}
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
