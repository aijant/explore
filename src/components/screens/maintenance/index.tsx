import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";

const MaintenanceContent = () => {
  const [tabValue, setTabValue] = useState("ongoing");
  const [filterAsset, setFilterAsset] = useState("All");
  const [filterAssignee, setFilterAssignee] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ padding: 3, color: "#fff" }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{ mb: 2 }}
        textColor="inherit"
        TabIndicatorProps={{
          style: { backgroundColor: "#1669f2", height: 3 },
        }}
      >
        <Tab
          label="Ongoing"
          value="ongoing"
          sx={{
            fontWeight: 600,
            fontSize: 14,
            color: tabValue === "ongoing" ? "#fff" : "#5a5f73",
            textTransform: "none",
            minWidth: 100,
          }}
        />
        <Tab
          label="Upcoming"
          value="upcoming"
          sx={{
            fontWeight: 600,
            fontSize: 14,
            color: tabValue === "upcoming" ? "#fff" : "#5a5f73",
            textTransform: "none",
            minWidth: 100,
          }}
        />
        <Tab
          label="History"
          value="history"
          sx={{
            fontWeight: 600,
            fontSize: 14,
            color: tabValue === "history" ? "#fff" : "#5a5f73",
            textTransform: "none",
            minWidth: 100,
          }}
        />
      </Tabs>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Select
          value={filterAsset}
          onChange={(e) => setFilterAsset(e.target.value)}
          size="small"
          sx={{
            minWidth: 130,
            bgcolor: "#142134",
            color: "#3e587c",
            fontWeight: 600,
            fontSize: 13,
            borderRadius: 1,
            ".MuiSelect-select": { paddingY: "6px", paddingX: "10px" },
            "&:before, &:after": { borderBottom: "none" },
            "& .MuiSvgIcon-root": { color: "#3e587c" },
          }}
        >
          <MenuItem value="All">All</MenuItem>
        </Select>

        <Select
          value={filterAssignee}
          onChange={(e) => setFilterAssignee(e.target.value)}
          size="small"
          sx={{
            minWidth: 130,
            bgcolor: "#142134",
            color: "#3e587c",
            fontWeight: 600,
            fontSize: 13,
            borderRadius: 1,
            ".MuiSelect-select": { paddingY: "6px", paddingX: "10px" },
            "&:before, &:after": { borderBottom: "none" },
            "& .MuiSvgIcon-root": { color: "#3e587c" },
          }}
        >
          <MenuItem value="All">All</MenuItem>
        </Select>

        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          size="small"
          sx={{
            minWidth: 130,
            bgcolor: "#142134",
            color: "#3e587c",
            fontWeight: 600,
            fontSize: 13,
            borderRadius: 1,
            ".MuiSelect-select": { paddingY: "6px", paddingX: "10px" },
            "&:before, &:after": { borderBottom: "none" },
            "& .MuiSvgIcon-root": { color: "#3e587c" },
          }}
        >
          <MenuItem value="All">All</MenuItem>
        </Select>

        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          size="small"
          sx={{
            minWidth: 130,
            bgcolor: "#142134",
            color: "#3e587c",
            fontWeight: 600,
            fontSize: 13,
            borderRadius: 1,
            ".MuiSelect-select": { paddingY: "6px", paddingX: "10px" },
            "&:before, &:after": { borderBottom: "none" },
            "& .MuiSvgIcon-root": { color: "#3e587c" },
          }}
        >
          <MenuItem value="All">All</MenuItem>
        </Select>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          variant="outlined"
          sx={{
            color: "#1669f2",
            borderColor: "#1669f2",
            textTransform: "none",
            fontWeight: 600,
            fontSize: 13,
            minWidth: 110,
            "&:hover": {
              bgcolor: "#1669f230",
              borderColor: "#1669f2",
            },
          }}
        >
          + Add Repair
        </Button>

        <Button
          variant="contained"
          sx={{
            textTransform: "uppercase",
            fontWeight: 700,
            fontSize: 13,
            bgcolor: "#1669f2",
            minWidth: 90,
            "&:hover": { bgcolor: "#144fc7" },
            ml: 1,
          }}
        >
          Export
        </Button>

        <IconButton sx={{ color: "#3e587c", ml: 1 }}>
          <Refresh />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          color: "#808191",
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: 0.3,
          textTransform: "uppercase",
          px: 1,
          py: 1,
          borderBottom: "1px solid #1e2430",
        }}
      >
        <Box sx={{ flex: 1, pl: 1 }}>Asset</Box>
        <Box sx={{ flex: 1, textAlign: "center" }}>
          Created On <span style={{ cursor: "pointer" }}>▲</span>
        </Box>
        <Box sx={{ flex: 1, textAlign: "center" }}>Due Date</Box>
        <Box sx={{ flex: 1, textAlign: "center" }}>Type</Box>
        <Box sx={{ flex: 1, textAlign: "center" }}>Status</Box>
        <Box sx={{ flex: 1, textAlign: "center" }}>Assignee</Box>
        <Box sx={{ flex: 1, textAlign: "center", pr: 1 }}>Documents</Box>
      </Box>
    </Box>
  );
};

export default MaintenanceContent;
