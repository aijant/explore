import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Divider
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const eldReports = [
  {
    title: "IFTA Mileage Report",
    description: "IFTA mileage summary report with vehicles mileage breakdown.",
  },
  {
    title: "IFTA State Report",
    description: "Breakdown of distance traveled per states.",
  },
  {
    title: "Mileage Utilization Report",
    description: "Breakdown of utilization of preferred vehicle's mileage.",
  },
  {
    title: "Idling Utilization Report",
    description: "Breakdown of idling time for each vehicle.",
  },
  {
    title: "ELD Events Report",
    description:
      "Unidentified vs. identified mileage. Summary vs. daily breakdown.",
  },
  {
    title: "Inactivity Report",
    description: "Vehicle Inactive hours.",
  },
  {
    title: "Unplugged Events Report",
    description: "Vehicle Unplugged events.",
  },
];

const driversReports = [
  {
    title: "HOS Violations Report",
    description: "HOS Violations summary report for all drivers.",
  },
  {
    title: "Form & Manner Errors Report",
    description: "Form & Manner Errors summary report for all drivers.",
  },
  {
    title: "HOS Summary Report",
    description: "HOS summary report for all drivers with daily breakdown.",
  },
];

const gpsReports = {
  vehicles: [],
  drivers: [],
};

const ReportContent: React.FC = () => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const currentVehiclesReports = tab === 0 ? eldReports : gpsReports.vehicles;
  const currentDriversReports = tab === 0 ? driversReports : gpsReports.drivers;

  return (
    <Box sx={{ p: 3, bgcolor: "#121a26" }}>
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          aria-label="Reports Tabs"
          indicatorColor="primary"
        >
          <Tab
            label="Reports"
            sx={{ fontWeight: "bold", color: "white" }}
          />
          <Tab
            label="GPS Reports"
            sx={{ fontWeight: "bold", color: "white" }}
          />
        </Tabs>
      </Box>

      <Box sx={{ display: "flex", gap: 5 }}>

        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, color: "white" }}>
            VEHICLES
          </Typography>

          <Paper variant="outlined" sx={{ bgcolor: "#1e2630" }}>
            <List disablePadding>
              {currentVehiclesReports.length === 0 ? (
                <ListItemText
                  sx={{ p: 2, color: "white" }}
                  primary="No reports available"
                />
              ) : (
                currentVehiclesReports.map(({ title, description }, index) => (
                  <React.Fragment key={title}>
                    <ListItemButton sx={{ py: 1, px: 2 }}>
                      <ListItemText
                        primary={
                          <Typography fontWeight={600} sx={{ color: "white" }}>
                            {title}
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ color: "white" }}>
                            {description}
                          </Typography>
                        }
                      />
                      <ChevronRightIcon sx={{ color: "white" }} />
                    </ListItemButton>
                    {index !== currentVehiclesReports.length - 1 && (
                      <Divider sx={{ borderColor: "#2a3746" }} />
                    )}
                  </React.Fragment>
                ))
              )}
            </List>
          </Paper>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ color: "white", mb: 1 }}>
            DRIVERS
          </Typography>

          <Paper variant="outlined" sx={{ bgcolor: "#1e2630" }}>
            <List disablePadding>
              {currentDriversReports.length === 0 ? (
                <ListItemText
                  sx={{ p: 2, color: "white" }}
                  primary="No reports available"
                />
              ) : (
                currentDriversReports.map(({ title, description }, index) => (
                  <React.Fragment key={title}>
                    <ListItemButton sx={{ py: 1, px: 2 }}>
                      <ListItemText
                        primary={
                          <Typography fontWeight={600} sx={{ color: "white" }}>
                            {title}
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ color: "white" }}>
                            {description}
                          </Typography>
                        }
                      />
                      <ChevronRightIcon sx={{ color: "white" }} />
                    </ListItemButton>
                    {index !== currentDriversReports.length - 1 && (
                      <Divider sx={{ borderColor: "#2a3746" }} />
                    )}
                  </React.Fragment>
                ))
              )}
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ReportContent;
