import { FC } from "react";
import { NavLink } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ROUTES } from "@lib/constants/routes";

import DashboardIcon from "@mui/icons-material/Dashboard";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SecurityIcon from "@mui/icons-material/Security";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InventoryIcon from "@mui/icons-material/Inventory";
import BuildIcon from "@mui/icons-material/Build";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MapIcon from "@mui/icons-material/Map";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SearchIcon from "@mui/icons-material/Search";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const NAV_LINKS = [
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
  { label: "Loads", href: ROUTES.loads, icon: <SearchIcon />, id: 10 },
  { label: "Reports", href: ROUTES.reports, icon: <AssessmentIcon />, id: 11 },
  {
    label: "Admin",
    href: ROUTES.admin,
    icon: <AdminPanelSettingsIcon />,
    id: 12,
  },
];

const SideBar: FC = () => {
  return (
    <aside className="w-[250px] min-h-screen flex flex-col text-white border-r-1 border-[#ffffff1a] ml-8">
      <div className="flex items-center h-[64px] ml-[14px]">
        <img
          src="/logo.png"
          alt="EXplore"
          className="w-[42px] object-contain"
        />
        <span className="font-bold text-lg leading-none text-[#fff]">
          EXPLORE
        </span>
      </div>
      
      <List className="flex-1">
        {NAV_LINKS.map((nav) => (
          <NavLink
            key={nav.id}
            to={nav.href}
            className={({ isActive }) =>
              `block no-underline ${
                isActive
                  ? "bg-[#4a525e69] text-white border-l-4 border-blue-500"
                  : "hover:bg-[#2e2e2e] text-gray-300 border-l-4 border-transparent"
              }`
            }
          >
            {({ isActive }) => (
              <ListItemButton className="px-6 py-2">
                <div
                  className={`flex items-center gap-[14px] ${
                    isActive ? "text-[#fff]" : "text-[#4a525e]"
                  }`}
                >
                  <span className="text-xl">{nav.icon}</span>
                  <ListItemText primary={nav.label} />
                </div>
              </ListItemButton>
            )}
          </NavLink>
        ))}
      </List>
    </aside>
  );
};

export default SideBar;
