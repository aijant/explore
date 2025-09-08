import { FC, useState } from "react";
import { Button, Menu, MenuItem, Popover, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useSignOut from "@hooks/useSignOut";

const Header: FC = () => {
  const user = JSON.parse(localStorage.getItem("@auth") || "{}")?.user;
  const { handleSignOut } = useSignOut();

  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const accountMenuOpen = Boolean(accountAnchorEl);

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountAnchorEl(null);
  };

  const [addAnchorEl, setAddAnchorEl] = useState<null | HTMLElement>(null);
  const addMenuOpen = Boolean(addAnchorEl);

  const handleAddMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAddAnchorEl(event.currentTarget);
  };

  const handleAddMenuClose = () => {
    setAddAnchorEl(null);
  };

  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<null | HTMLElement>(null);
  const notificationsOpen = Boolean(notificationAnchorEl);

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const [groupAnchorEl, setGroupAnchorEl] = useState<null | HTMLElement>(null);
  const groupMenuOpen = Boolean(groupAnchorEl);
  const [selectedGroup, setSelectedGroup] = useState("All Groups");

  const handleGroupMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setGroupAnchorEl(event.currentTarget);
  };

  const handleGroupMenuClose = () => {
    setGroupAnchorEl(null);
  };

  const handleGroupSelect = (group: string) => {
    setSelectedGroup(group);
    handleGroupMenuClose();
  };

  return (
    <header className="h-[65px] flex items-center justify-between px-6 text-white border-b border-[#ffffff1a] bg-[#121212]">
      <div className="flex items-center">
        <span className="font-semibold text-[#fff] ml-[24px]">
          Company name
        </span>
      </div>

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
            "&:hover": {
              backgroundColor: "#2a2a2a",
            },
          }}
        >
          {selectedGroup}
        </Button>
        <Menu
          anchorEl={groupAnchorEl}
          open={groupMenuOpen}
          onClose={handleGroupMenuClose}
          PaperProps={{
            sx: {
              backgroundColor: "#1f1f1f",
              color: "white",
              mt: 1,
              minWidth: 160,
            },
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
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

        <Button variant="contained" color="primary" onClick={handleAddMenuOpen}>
          <AddIcon />
        </Button>
        <Menu
          anchorEl={addAnchorEl}
          open={addMenuOpen}
          onClose={handleAddMenuClose}
          PaperProps={{
            sx: {
              backgroundColor: "#1f1f1f",
              color: "white",
              mt: 1,
              minWidth: 180,
            },
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleAddMenuClose}>Add Driver</MenuItem>
          <MenuItem onClick={handleAddMenuClose}>Add Vehicle</MenuItem>
          <MenuItem onClick={handleAddMenuClose}>Add Trailer</MenuItem>
          <MenuItem onClick={handleAddMenuClose}>Add Geofence</MenuItem>
          <MenuItem onClick={handleAddMenuClose}>Add Alert</MenuItem>
        </Menu>

        {/* Notifications */}
        <Button color="primary" onClick={handleNotificationClick}>
          <NotificationsIcon />
        </Button>
        <Popover
          open={notificationsOpen}
          anchorEl={notificationAnchorEl}
          onClose={handleNotificationClose}
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
          <div style={{ minHeight: 150 }}>
            <Typography variant="body2" color="gray">
              No new notifications.
            </Typography>
          </div>
        </Popover>

        {user?.id ? (
          <span className="text-[#fff]">
            {user.name} {user.surname}
          </span>
        ) : (
          <span className="text-[#fff]">Test Admin</span>
        )}

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
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleAccountMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleAccountMenuClose}>What's New</MenuItem>
          <MenuItem onClick={handleAccountMenuClose}>
            Manual Instruction
          </MenuItem>
          <MenuItem onClick={handleSignOut}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
