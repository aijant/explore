import React, { FC, useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Popover,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FeedbackDialog from "./FeedbackDialog";

import useSignOut from "@hooks/useSignOut";
import { isExpiringSoon } from "@/store/interceptor/token";
import { useChangePasswordMutation } from "@/store/services/account.service";

const Header: FC = () => {
  const user = JSON.parse(localStorage.getItem("@auth") || "{}")?.user;
  const accessToken = JSON.parse(
    localStorage.getItem("@auth") || "{}"
  )?.accessToken;
  const { handleSignOut } = useSignOut();

  if (isExpiringSoon(accessToken)) {
    handleSignOut();
    return null;
  }

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<null | HTMLElement>(null);
  const [groupAnchorEl, setGroupAnchorEl] = useState<null | HTMLElement>(null);
  const [subSettingsAnchorEl, setSubSettingsAnchorEl] =
    useState<null | HTMLElement>(null);

  const [selectedGroup, setSelectedGroup] = useState("All Groups");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAccountAnchorEl(event.currentTarget);
  const handleAccountMenuClose = () => setAccountAnchorEl(null);

  const handleGroupMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setGroupAnchorEl(event.currentTarget);
  const handleGroupMenuClose = () => setGroupAnchorEl(null);
  const handleGroupSelect = (group: string) => {
    setSelectedGroup(group);
    handleGroupMenuClose();
  };

  const handleOpenSettings = () => {
    setSubSettingsAnchorEl(null);
    setSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setSettingsOpen(false);
    setErrors({ currentPassword: "", newPassword: "", repeatPassword: "" });
  };

  const validate = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      repeatPassword: "",
    };
    let isValid = true;

    if (!currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }
    if (!newPassword.trim()) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
      isValid = false;
    }
    if (!repeatPassword.trim()) {
      newErrors.repeatPassword = "Please repeat new password";
      isValid = false;
    } else if (newPassword !== repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveProfile = async () => {
    if (!validate()) return;

    try {
      await changePassword({
        oldPassword: currentPassword,
        newPassword,
        newPassword2: repeatPassword,
      }).unwrap();

      setSnackbar({
        open: true,
        message: "Password changed successfully",
        severity: "success",
      });

      setCurrentPassword("");
      setNewPassword("");
      setRepeatPassword("");
      setSettingsOpen(false);
    } catch (error: any) {
      if (error?.originalStatus === 200) {
        let message = "Password changed successfully";

        if (typeof error?.data === "string") {
          message = error.data;
        } else if (error?.data?.message) {
          message = error.data.message;
        }

        setSnackbar({
          open: true,
          message,
          severity: "success",
        });

        setCurrentPassword("");
        setNewPassword("");
        setRepeatPassword("");
        setSettingsOpen(false);
        return;
      }

      let errorMessage = "Failed to change password";
      if (error?.data) {
        if (typeof error.data === "string") {
          errorMessage = error.data;
        } else if (error.data.message) {
          errorMessage = error.data.message;
        }
      }

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  const accountMenuOpen = Boolean(accountAnchorEl);

  return (
    <>
      <header className="h-[65px] flex items-center justify-between px-6 text-white border-b border-[#ffffff1a] bg-[#121212]">
        <div />
        <div className="flex items-center gap-[8px]">
          <Button
            onClick={handleGroupMenuOpen}
            endIcon={<ArrowDropDownIcon />}
            sx={{
              color: "white",
              border: "1px solid #333",
              backgroundColor: "#1f1f1f",
              textTransform: "none",
              px: 2,
              py: 1,
              "&:hover": { backgroundColor: "#2a2a2a" },
            }}
          >
            {selectedGroup}
          </Button>
          <Menu
            anchorEl={groupAnchorEl}
            open={Boolean(groupAnchorEl)}
            onClose={handleGroupMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: "#1f1f1f",
                color: "white",
                mt: 1,
                minWidth: 160,
              },
            }}
          >
            <MenuItem onClick={() => handleGroupSelect("All Groups")}>
              All Groups
            </MenuItem>
            <MenuItem onClick={() => handleGroupSelect("Group 1")}>
              Group 1
            </MenuItem>
            <MenuItem onClick={() => handleGroupSelect("Group 2")}>
              Group 2
            </MenuItem>
          </Menu>

          <Button
            variant="outlined"
            sx={{
              color: "#1669f2",
              borderColor: "#1669f2",
              minWidth: 50,
              "&:hover": { bgcolor: "#1669f230", borderColor: "#1669f2" },
            }}
          >
            <AddIcon />
          </Button>

          <Button
            color="primary"
            onClick={(e) => setNotificationAnchorEl(e.currentTarget)}
          >
            <NotificationsIcon />
          </Button>
          <Popover
            open={Boolean(notificationAnchorEl)}
            anchorEl={notificationAnchorEl}
            onClose={() => setNotificationAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                backgroundColor: "#1f1f1f",
                color: "white",
                p: 2,
                width: 300,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <Typography variant="body2" color="gray">
              No new notifications.
            </Typography>
          </Popover>

          <span className="text-[#fff]">
            {user?.id ? `${user.name} ${user.surname}` : "Test Admin"}
          </span>

          <Button color="primary" onClick={handleAccountMenuOpen}>
            <AccountCircleIcon />
          </Button>
          <Menu
            anchorEl={accountAnchorEl}
            open={accountMenuOpen}
            onClose={handleAccountMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: "#1f1f1f",
                color: "white",
                mt: 1,
                minWidth: 180,
              },
            }}
          >
            <MenuItem
              onClick={(e) => {
                handleAccountMenuClose();
                setSubSettingsAnchorEl(e.currentTarget);
              }}
            >
              Settings
            </MenuItem>
            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
          </Menu>

          {/* Popover: Settings Submenu (Profile + Feedback) */}
          <Popover
            open={Boolean(subSettingsAnchorEl)}
            anchorEl={subSettingsAnchorEl}
            onClose={() => setSubSettingsAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            PaperProps={{
              sx: {
                backgroundColor: "#1f1f1f",
                color: "#fff",
                mt: 1,
                minWidth: 180,
              },
            }}
          >
            <MenuItem onClick={handleOpenSettings}>Profile</MenuItem>
            <MenuItem
              onClick={() => {
                setSubSettingsAnchorEl(null);
                setFeedbackDialogOpen(true);
              }}
            >
              Send Feedback
            </MenuItem>
          </Popover>
        </div>
      </header>

      {/* Password Settings Dialog */}
      <Dialog
        open={settingsOpen}
        onClose={handleCloseSettings}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: "#121212", color: "#fff" }}>
          Profile
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#121212", color: "#fff", p: 3 }}>
          <TextField
            fullWidth
            label="Email"
            value={user?.email || ""}
            disabled
            margin="normal"
            variant="outlined"
            InputLabelProps={{ style: { color: "#999" } }}
            InputProps={{
              style: { color: "#fff", backgroundColor: "#1f1f1f" },
            }}
          />
          {[
            {
              label: "Current Password",
              value: currentPassword,
              setValue: setCurrentPassword,
              error: errors.currentPassword,
              show: showCurrent,
              setShow: setShowCurrent,
            },
            {
              label: "New Password",
              value: newPassword,
              setValue: setNewPassword,
              error: errors.newPassword,
              show: showNew,
              setShow: setShowNew,
            },
            {
              label: "Repeat New Password",
              value: repeatPassword,
              setValue: setRepeatPassword,
              error: errors.repeatPassword,
              show: showRepeat,
              setShow: setShowRepeat,
            },
          ].map((field, i) => (
            <TextField
              key={i}
              fullWidth
              required
              label={field.label}
              type={field.show ? "text" : "password"}
              value={field.value}
              onChange={(e) => field.setValue(e.target.value)}
              error={!!field.error}
              helperText={field.error}
              margin="normal"
              variant="outlined"
              InputLabelProps={{ style: { color: "#999" } }}
              InputProps={{
                style: { color: "#fff", backgroundColor: "#1f1f1f" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => field.setShow(!field.show)}
                      edge="end"
                    >
                      {field.show ? (
                        <VisibilityIcon sx={{ color: "#777" }} />
                      ) : (
                        <VisibilityOffIcon sx={{ color: "#777" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ))}
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#1669f2",
              color: "#fff",
              "&:hover": { backgroundColor: "#1669f2cc" },
            }}
            fullWidth
            onClick={handleSaveProfile}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Save Profile"
            )}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      {/* Feedback Dialog */}
      <FeedbackDialog
        open={feedbackDialogOpen}
        onClose={() => setFeedbackDialogOpen(false)}
      />
    </>
  );
};

export default Header;
