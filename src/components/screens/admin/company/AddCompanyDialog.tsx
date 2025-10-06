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
import { Add, Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useGetCompanyDocumentQuery } from "@store/services/company.service";
import {
  CompanyDocumentName,
  CargoType,
  CycleRule,
  UsState,
} from "@store/models/enums/general.enums";

interface CompanyDocument {
  documentName: CompanyDocumentName | "";
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

const AddCompanyDialog = ({ open, onClose, onConfirm, initialData }: Props) => {
  const [form, setForm] = useState({
    companyName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    dot: "",
    homeTerminalTimeZone: "",
    cycleRule: "",
    cargoType: "",
    break30MinException: false,
  });

  const [documents, setDocuments] = useState<CompanyDocument[]>([]);
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
  const [documentName, setDocumentName] = useState<CompanyDocumentName | "">(
    ""
  );
  const [customName, setCustomName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [file, setFile] = useState<File | string | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    "cancel" | "confirm" | null
  >(null);

  const companyId = initialData?.uuid;

  const { data: documentData } = useGetCompanyDocumentQuery(companyId, {
    skip: !companyId,
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

  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDocumentDialogOpen = () => {
    resetDocumentForm();
    setEditingIndex(null);
    setDocumentDialogOpen(true);
  };

  const handleDocumentDialogClose = () => {
    resetDocumentForm();
    setDocumentDialogOpen(false);
  };

  const resetDocumentForm = () => {
    setDocumentName("");
    setCustomName("");
    setExpirationDate("");
    setFile(null);
    setEditingIndex(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleAddOrEditDocument = () => {
    if (
      !documentName ||
      (!customName && documentName === CompanyDocumentName.CUSTOM_NAME) ||
      !expirationDate
    )
      return;

    const newDoc: CompanyDocument = {
      documentName,
      customName,
      expirationDate,
      file,
    };

    if (editingIndex !== null) {
      setDocuments((prev) =>
        prev.map((doc, idx) => (idx === editingIndex ? newDoc : doc))
      );
    } else {
      setDocuments((prev) => [...prev, newDoc]);
    }

    resetDocumentForm();
    setDocumentDialogOpen(false);
  };

  const handleEditDocument = (index: number) => {
    const doc = documents[index];
    setDocumentName(doc.documentName);
    setCustomName(doc.customName);
    setExpirationDate(doc.expirationDate);
    setFile(doc.file);
    setEditingIndex(index);
    setDocumentDialogOpen(true);
  };

  const handleRemoveDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const company = { ...form };
    onConfirm({ company, documents });
    onClose();
  };

  const handleResetConfirm = () => {
    if (pendingAction === "cancel") {
      setForm({
        companyName: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        dot: "",
        homeTerminalTimeZone: "",
        cycleRule: "",
        cargoType: "",
        break30MinException: false,
      });
      setDocuments([]);
      onClose();
    }

    if (pendingAction === "confirm") handleSubmit();

    setPendingAction(null);
    setOpenResetDialog(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: "#121a26", color: "white" }}>
          {initialData ? "Edit Company" : "Add Company"}
        </DialogTitle>

        <DialogContent sx={{ bgcolor: "#121a26", color: "white" }}>
          <Typography sx={{ mb: 2 }}>Company Info</Typography>

          {[
            { name: "companyName", label: "Company Name" },
            { name: "street", label: "Street" },
            { name: "city", label: "City" },
            { name: "zip", label: "ZIP / Postal Code" },
            { name: "dot", label: "DOT Number" },
            { name: "homeTerminalTimeZone", label: "Home Terminal Time Zone" },
          ].map((field) => (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              fullWidth
              sx={{ mb: 2 }}
              value={(form as any)[field.name]}
              onChange={handleChange}
              InputLabelProps={{ sx: { color: "white" } }}
              inputProps={{
                style: { color: "white", background: "#1e2630" },
              }}
            />
          ))}

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "white" }}>State</InputLabel>
            <Select
              name="state"
              value={form.state}
              onChange={handleChange}
              sx={{ background: "#1e2630", color: "white" }}
            >
              {Object.values(UsState).map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "white" }}>Cycle Rule</InputLabel>
            <Select
              name="cycleRule"
              value={form.cycleRule}
              onChange={handleChange}
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
              onChange={handleChange}
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
                onChange={handleChange}
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
                alignItems: "center",
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
              <div>
                <Button
                  startIcon={<Edit />}
                  onClick={() => handleEditDocument(idx)}
                  sx={{ color: "#4caf50" }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleRemoveDocument(idx)}
                  sx={{ color: "#f44336" }}
                >
                  Remove
                </Button>
              </div>
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
            {initialData ? "Save Changes" : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={documentDialogOpen} onClose={handleDocumentDialogClose}>
        <DialogTitle sx={{ bgcolor: "#121a26", color: "white" }}>
          {editingIndex !== null ? "Edit Document" : "Add Company Document"}
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
            {file ? "Change File" : "Upload File"}
            <input hidden type="file" onChange={handleFileChange} />
          </Button>

          {typeof file === "string" && (
            <Typography sx={{ mt: 1, color: "#bbb", fontSize: 13 }}>
              Current file: {file}
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ bgcolor: "#121a26" }}>
          <Button onClick={handleDocumentDialogClose} sx={{ color: "#888" }}>
            Cancel
          </Button>
          <Button
            onClick={handleAddOrEditDocument}
            variant="contained"
            sx={{ bgcolor: "#1669f2" }}
          >
            {editingIndex !== null ? "Save" : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openResetDialog} onClose={() => setOpenResetDialog(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>
            {pendingAction === "cancel"
              ? "All unsaved changes will be lost. Do you want to cancel?"
              : "Do you want to confirm and save this company?"}
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

export default AddCompanyDialog;
