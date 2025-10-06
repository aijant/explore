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
  Checkbox,
  Box,
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import {
  DriverDocumentName,
  CycleRule,
  UsState,
  DriverType,
} from "@store/models/enums/general.enums";
import { useGetDriverDocumentQuery } from "@store/services/driver.service";

interface DriverDocument {
  documentName: DriverDocumentName | "";
  customName: string;
  expirationDate: string;
  file: File | string | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  initialData?: any;
}

const AddDriverDialog = ({ open, onClose, onConfirm, initialData }: Props) => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    dateOfBirth: "",
    driverId: "",
    address: "",
    driverType: "CompanyDriver",
    email: "",
    phone: "",
    licenseIssuingState: "",
    licenseNumber: "",
    status: true,

    exemptFromEld: false,
    allowYardMove: false,
    allowPersonalConveyance: false,
    allowManualDriveTime: false,
    forbidCertifyIfMissing: false,
    pairedSplitSleeper: false,
    enhanceViolationSound: false,
    requireDriverSignature: false,
    keepTrailer: false,
    keepShippingDocs: false,

    cycleRule: "USA_70_8",
    break30MinException: false,
    reset24h: false,
  });

  const [documents, setDocuments] = useState<DriverDocument[]>([]);
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [documentName, setDocumentName] = useState<DriverDocumentName | "">("");
  const [customName, setCustomName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [file, setFile] = useState<File | string | null>(null);

  const driverId = initialData?.uuid;
  const { data: documentData } = useGetDriverDocumentQuery(driverId, {
    skip: !driverId,
  });

  useEffect(() => {
    if (documentData && Array.isArray(documentData)) {
      const mapped = documentData.map((doc: any) => ({
        documentName: doc.documentName,
        customName: doc.customName,
        expirationDate: doc.expirationDate,
        file: doc.fileName,
      }));
      setDocuments(mapped);
    }
  }, [documentData]);

  useEffect(() => {
    if (initialData) setForm((prev) => ({ ...prev, ...initialData }));
  }, [initialData]);

  const handleChange = (e: any) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddDocument = () => {
    if (!documentName || !expirationDate) return;

    const newDoc: DriverDocument = {
      documentName,
      customName,
      expirationDate,
      file,
    };

    if (editingIndex !== null) {
      setDocuments((prev) =>
        prev.map((d, i) => (i === editingIndex ? newDoc : d))
      );
    } else {
      setDocuments((prev) => [...prev, newDoc]);
    }

    resetDocFields();
    setDocumentDialogOpen(false);
  };

  const resetDocFields = () => {
    setDocumentName("");
    setCustomName("");
    setExpirationDate("");
    setFile(null);
    setEditingIndex(null);
  };

  const handleEditDoc = (i: number) => {
    const d = documents[i];
    setDocumentName(d.documentName);
    setCustomName(d.customName);
    setExpirationDate(d.expirationDate);
    setFile(d.file);
    setEditingIndex(i);
    setDocumentDialogOpen(true);
  };

  const handleRemoveDoc = (i: number) =>
    setDocuments((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    const driver = { ...form };
    onConfirm({ driver, documents });
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ bgcolor: "#121a26", color: "white" }}>
          {initialData ? "Edit Driver" : "Add Driver"}
        </DialogTitle>

        <DialogContent sx={{ bgcolor: "#121a26", color: "white" }}>
          {/* Personal Info */}
          <Typography sx={{ mb: 2, mt: 1 }}>PERSONAL INFO</Typography>

          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            <TextField
              name="name"
              label="First Name"
              value={form.name}
              onChange={handleChange}
              InputLabelProps={{ sx: { color: "white" } }}
              inputProps={{ style: { color: "white", background: "#1e2630" } }}
            />
            <TextField
              name="surname"
              label="Last Name"
              value={form.surname}
              onChange={handleChange}
              InputLabelProps={{ sx: { color: "white" } }}
              inputProps={{ style: { color: "white", background: "#1e2630" } }}
            />
            <TextField
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              value={form.dateOfBirth}
              onChange={handleChange}
              InputLabelProps={{ shrink: true, sx: { color: "white" } }}
              inputProps={{ style: { color: "white", background: "#1e2630" } }}
            />
            <TextField
              name="driverId"
              label="Driver ID"
              value={form.driverId}
              onChange={handleChange}
              InputLabelProps={{ sx: { color: "white" } }}
              inputProps={{ style: { color: "white", background: "#1e2630" } }}
            />
            <TextField
              name="address"
              label="Address"
              value={form.address}
              onChange={handleChange}
              fullWidth
              sx={{ gridColumn: "1 / span 2" }}
              InputLabelProps={{ sx: { color: "white" } }}
              inputProps={{ style: { color: "white", background: "#1e2630" } }}
            />
          </Box>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel sx={{ color: "white" }}>Driver Type</InputLabel>
            <Select
              name="driverType"
              value={form.driverType}
              onChange={handleChange}
              sx={{ bgcolor: "#1e2630", color: "white" }}
            >
              {Object.values(DriverType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mt={2}>
            <TextField
              name="email"
              label="Email (Username)"
              value={form.email}
              onChange={handleChange}
              InputLabelProps={{ sx: { color: "white" } }}
              inputProps={{ style: { color: "white", background: "#1e2630" } }}
            />
            <TextField
              name="phone"
              label="Phone"
              value={form.phone}
              onChange={handleChange}
              InputLabelProps={{ sx: { color: "white" } }}
              inputProps={{ style: { color: "white", background: "#1e2630" } }}
            />

            <FormControl>
              <InputLabel sx={{ color: "white" }}>License State</InputLabel>
              <Select
                name="licenseIssuingState"
                value={form.licenseIssuingState}
                onChange={handleChange}
                sx={{ bgcolor: "#1e2630", color: "white" }}
              >
                {Object.values(UsState).map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              name="licenseNumber"
              label="License Number"
              value={form.licenseNumber}
              onChange={handleChange}
              InputLabelProps={{ sx: { color: "white" } }}
              inputProps={{ style: { color: "white", background: "#1e2630" } }}
            />
          </Box>

          {/* ELD Options */}
          <Typography sx={{ mt: 4, mb: 1 }}>ELD OPTIONS</Typography>
          {[
            "exemptFromEld",
            "allowYardMove",
            "allowPersonalConveyance",
            "allowManualDriveTime",
            "forbidCertifyIfMissing",
            "pairedSplitSleeper",
            "enhanceViolationSound",
            "requireDriverSignature",
            "keepTrailer",
            "keepShippingDocs",
          ].map((key) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={(form as any)[key]}
                  name={key}
                  onChange={handleChange}
                  sx={{ color: "white" }}
                />
              }
              label={key}
            />
          ))}

          {/* Cycle */}
          <Typography sx={{ mt: 3, mb: 1 }}>CYCLE DETAILS</Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "white" }}>Cycle Rule</InputLabel>
            <Select
              name="cycleRule"
              value={form.cycleRule}
              onChange={handleChange}
              sx={{ bgcolor: "#1e2630", color: "white" }}
            >
              {Object.values(CycleRule).map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={form.break30MinException}
                name="break30MinException"
                onChange={handleChange}
              />
            }
            label="30 Minute Break Exception"
            sx={{ color: "white" }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={form.reset24h}
                name="reset24h"
                onChange={handleChange}
              />
            }
            label="24 Hour Cycle Reset"
            sx={{ color: "white" }}
          />

          {/* Documents */}
          <Typography sx={{ mt: 3, mb: 1 }}>DOCUMENTS</Typography>
          {documents.map((d, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                bgcolor: "#1e2630",
                p: 1,
                borderRadius: 1,
                mb: 1,
              }}
            >
              <Typography sx={{ color: "white" }}>
                {d.customName || d.documentName} (exp: {d.expirationDate})
              </Typography>
              <Box>
                <Button
                  startIcon={<Edit />}
                  sx={{ color: "#4caf50" }}
                  onClick={() => handleEditDoc(i)}
                >
                  Edit
                </Button>
                <Button
                  sx={{ color: "#f44336" }}
                  onClick={() => handleRemoveDoc(i)}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          ))}

          <Button
            startIcon={<Add />}
            variant="outlined"
            onClick={() => {
              resetDocFields();
              setDocumentDialogOpen(true);
            }}
            sx={{ color: "#1669f2", borderColor: "#1669f2" }}
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
            sx={{ bgcolor: "#1669f2" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Document sub-dialog */}
      <Dialog
        open={documentDialogOpen}
        onClose={() => setDocumentDialogOpen(false)}
      >
        <DialogTitle sx={{ bgcolor: "#121a26", color: "white" }}>
          {editingIndex !== null ? "Edit Document" : "Add Driver Document"}
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#121a26" }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "white" }}>Document Name</InputLabel>
            <Select
              value={documentName}
              onChange={(e) =>
                setDocumentName(e.target.value as DriverDocumentName)
              }
              sx={{ bgcolor: "#1e2630", color: "white" }}
            >
              {Object.values(DriverDocumentName).map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {documentName === DriverDocumentName.CUSTOM_NAME && (
            <TextField
              label="Custom Name"
              fullWidth
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              sx={{ mb: 2 }}
              InputLabelProps={{ sx: { color: "white" } }}
              inputProps={{ style: { color: "white", background: "#1e2630" } }}
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
            inputProps={{ style: { color: "white", background: "#1e2630" } }}
          />

          <Button variant="contained" component="label" fullWidth>
            {file ? "Change File" : "Upload File"}
            <input
              hidden
              type="file"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
          </Button>

          {typeof file === "string" && (
            <Typography sx={{ mt: 1, color: "#bbb", fontSize: 13 }}>
              Current file: {file}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#121a26" }}>
          <Button
            onClick={() => setDocumentDialogOpen(false)}
            sx={{ color: "#888" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddDocument}
            variant="contained"
            sx={{ bgcolor: "#1669f2" }}
          >
            {editingIndex !== null ? "Save" : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddDriverDialog;
