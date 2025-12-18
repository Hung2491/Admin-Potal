import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import { useLocation, useNavigate } from "react-router";

interface SidebarProps {
  open: boolean;
}
export default function Sidebar({ open }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const menu = [
    { lable: "Dashboard", icon: <DashboardIcon />, path: "/home" },
    { lable: "Document", icon: <DescriptionIcon />, path: "/home/document" },
    { lable: "Tasks", icon: <AssignmentIcon />, path: "/home/tasks" },
    { lable: "Users", icon: <PeopleIcon />, path: "/home/users" },
    { lable: "Profile", icon: <AccountCircleIcon />, path: "/home/profile" },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      onClose={close}
      PaperProps={{
        sx: {
          zIndex: 1,
          width: open ? "10%" : "3%",
          transition: "all .3s ease",
        },
      }}
    >
      <Toolbar />

      <Divider />

      <List>
        {menu.map((item) => (
          <ListItemButton
            key={item.lable}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              pl: open ? 3 : 1,
              justifyContent: open ? "flex-start" : "center",
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 0 }}>
              {item.icon}
            </ListItemIcon>

            {open && <ListItemText primary={item.lable} />}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
