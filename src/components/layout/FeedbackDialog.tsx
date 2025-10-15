import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateFeedbackMutation } from "@/store/services/feedback.service";
import { useGetDriverQuery } from "@store/services/driver.service";

interface FeedbackDialogProps {
  open: boolean;
  onClose: () => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ open, onClose }) => {
  const [feedback, setFeedback] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const user = JSON.parse(localStorage.getItem("@auth") || "{}")?.user;

  const [createFeedback] = useCreateFeedbackMutation();
  const { data: driversData } = useGetDriverQuery({});
  const drivers = driversData?.content || [];

  const handleAttachImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const handleClear = () => {
    setFeedback("");
    setAttachments([]);
  };

  const handleSend = async () => {
    try {
      if (!user) throw new Error("User data not found");
      const matchedDriver = drivers.find(
        (driver) => driver.email === user.email
      );

      if (!matchedDriver) {
        setSnackbar({
          open: true,
          message: "Driver not found for current user",
          severity: "error",
        });
        return;
      }

      const formData = new FormData();
      formData.append("text", feedback);
      formData.append("driverUuid", matchedDriver.uuid);

      attachments.forEach((file) => {
        formData.append("images", file);
      });

      await createFeedback(formData).unwrap();

      setSnackbar({
        open: true,
        message: "Feedback sent successfully",
        severity: "success",
      });

      handleClear();
      onClose();
    } catch (error: any) {
      const errorMessage =
        typeof error?.data === "string"
          ? error.data
          : error?.data?.message || "Failed to send feedback";

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#121212",
            color: "#fff",
          }}
        >
          Send Feedback
          <IconButton onClick={onClose} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ backgroundColor: "#121212", color: "#fff", p: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Please provide your feedback.
          </Typography>

          <TextField
            fullWidth
            multiline
            minRows={6}
            placeholder="Type comment here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{
              backgroundColor: "#1f1f1f",
              "& .MuiInputBase-input": { color: "#fff" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#333" },
              "& .MuiInputLabel-root": { color: "#aaa" },
            }}
          />

          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              component="label"
              sx={{ color: "#fff", borderColor: "#333" }}
            >
              Attach image(s)
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleAttachImages}
              />
            </Button>
            <Button
              variant="outlined"
              onClick={handleClear}
              sx={{ color: "#fff", borderColor: "#333" }}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              onClick={handleSend}
              sx={{
                backgroundColor: "#1669f2",
                color: "#fff",
                "&:hover": { backgroundColor: "#1669f2cc" },
              }}
            >
              Send Feedback
            </Button>
          </Stack>

          {attachments.length > 0 && (
            <Stack sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Attached file{attachments.length > 1 ? "s" : ""}:
              </Typography>
              {attachments.map((file, i) => (
                <Typography key={i} variant="body2" sx={{ fontSize: 12 }}>
                  {file.name}
                </Typography>
              ))}
            </Stack>
          )}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

export default FeedbackDialog;
