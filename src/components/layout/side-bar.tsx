import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import DashboardIcon from "@mui/icons-material/Dashboard";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SecurityIcon from "@mui/icons-material/Security";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InventoryIcon from "@mui/icons-material/Inventory";
import BuildIcon from "@mui/icons-material/Build";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MapIcon from "@mui/icons-material/Map";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DocumentScannerIcon from "@mui/icons-material/InsertDriveFile";
import SearchIcon from "@mui/icons-material/Search";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { ROUTES } from "@lib/constants/routes";
import React from "react";

type NavItem = {
  label: string;
  href: string;
  icon: any;
  id: number;
  children?: {
    label: string;
    href: string;
    id: number;
  }[];
};

const NAV_LINKS: NavItem[] = [
  {
    label: "Dashboard",
    href: ROUTES.dashboard,
    icon: <DashboardIcon />,
    id: 1,
  },
  {
    label: "Compliance",
    href: ROUTES.compliance,
    icon: <VerifiedUserIcon />,
    id: 2,
  },
  { label: "Safety", href: ROUTES.safety, icon: <SecurityIcon />, id: 3 },
  { label: "Location", href: ROUTES.location, icon: <LocationOnIcon />, id: 4 },
  { label: "Assets", href: ROUTES.assets, icon: <InventoryIcon />, id: 5 },
  {
    label: "Maintenance",
    href: ROUTES.maintenance,
    icon: <BuildIcon />,
    id: 6,
  },
  { label: "Events", href: ROUTES.eldEvents, icon: <EventNoteIcon />, id: 7 },
  { label: "Geofence", href: ROUTES.geofence, icon: <MapIcon />, id: 8 },
  {
    label: "Dispatch",
    href: ROUTES.dispatch,
    icon: <LocalShippingIcon />,
    id: 9,
  },
  {
    label: "Documents",
    href: ROUTES.documents,
    icon: <DocumentScannerIcon />,
    id: 13,
  },
  { label: "Loads", href: ROUTES.loads, icon: <SearchIcon />, id: 10 },
  { label: "Reports", href: ROUTES.reports, icon: <AssessmentIcon />, id: 11 },
  {
    label: "Admin",
    href: ROUTES.admin,
    icon: <AdminPanelSettingsIcon />,
    id: 12,
    children: [
      { label: "Drivers", href: ROUTES.admin, id: 14 },
      { label: "Vehicles", href: ROUTES.adminVehicles, id: 16 },
      { label: "Trailers", href: ROUTES.adminTrailers, id: 17 },
      { label: "Company", href: ROUTES.adminCompany, id: 18 },
    ],
  },
];

const SideBar: FC = () => {
  const [openMenus, setOpenMenus] = useState<{ [key: number]: boolean }>({});

  const toggleMenu = (id: number) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="w-[250px] min-h-screen flex flex-col text-white border-r-1 border-[#ffffff1a] ml-8">
      <NavLink
        key="99iii"
        to={ROUTES.dashboard}
        className="flex items-center h-[64px] ml-[14px]"
      >
        <img
          src="/orkhan_trans.png"
          alt="Orkan ELD"
          className="w-[72px] object-contain"
        />
        <span className="font-bold text-lg leading-none text-[#fff] mt-[12px]">
          Orkan ELD
        </span>
      </NavLink>

      <List className="flex-1">
        {NAV_LINKS.map((nav) => {
          const hasChildren =
            Array.isArray(nav.children) && nav.children.length > 0;
          const isOpen = !!openMenus[nav.id];

          return (
            <div key={nav.id}>
              {!hasChildren ? (
                <NavLink
                  to={nav.href}
                  className={({ isActive }) =>
                    `block no-underline ${
                      isActive
                        ? "bg-[#4a525e69] text-white border-l-4 border-blue-500"
                        : "hover:bg-[#2e2e2e] text-white border-l-4 border-transparent"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <ListItemButton className="px-6 py-2">
                      <div
                        className={`flex items-center gap-[14px] ${
                          isActive ? "text-white" : "text-white/70"
                        }`}
                      >
                        <span className="text-xl">
                          {React.cloneElement(nav.icon, {
                            sx: { color: isActive ? "white" : "#ccc" },
                          })}
                        </span>
                        <ListItemText
                          primary={nav.label}
                          primaryTypographyProps={{
                            style: { color: isActive ? "white" : "#ccc" },
                          }}
                        />
                      </div>
                    </ListItemButton>
                  )}
                </NavLink>
              ) : (
                <>
                  <ListItemButton
                    onClick={() => toggleMenu(nav.id)}
                    className="px-6 py-2"
                  >
                    <div className="flex items-center justify-between w-full text-white">
                      <div className="flex items-center gap-[14px]">
                        <span className="text-xl">
                          {React.cloneElement(nav.icon, {
                            sx: { color: "white" },
                          })}
                        </span>
                        <ListItemText
                          primary={nav.label}
                          primaryTypographyProps={{ style: { color: "white" } }}
                        />
                      </div>
                      {isOpen ? (
                        <ExpandLessIcon sx={{ color: "white" }} />
                      ) : (
                        <ExpandMoreIcon sx={{ color: "white" }} />
                      )}
                    </div>
                  </ListItemButton>

                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {nav.children?.map((child) => (
                        <NavLink
                          key={child.id}
                          to={child.href}
                          className={({ isActive }) =>
                            `block no-underline ${
                              isActive
                                ? "bg-[#4a525e69] text-white border-l-4 border-blue-500"
                                : "hover:bg-[#2e2e2e] text-white border-l-4 border-transparent"
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <ListItemButton
                              sx={{
                                pl: 8,
                                bgcolor: isActive ? "#4a525e69" : "inherit",
                              }}
                            >
                              <ListItemText
                                primary={child.label}
                                primaryTypographyProps={{
                                  style: { color: isActive ? "white" : "#ccc" },
                                }}
                              />
                            </ListItemButton>
                          )}
                        </NavLink>
                      ))}
                    </List>
                  </Collapse>
                </>
              )}
            </div>
          );
        })}
      </List>
    </aside>
  );
};

export default SideBar;
