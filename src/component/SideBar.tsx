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

interface SidebarProps {
  open: boolean;

  onSelectMenu: (menu: string) => void;
}
export default function Sidebar({ open, onSelectMenu }: SidebarProps) {
  const menu = [
    { lable: "Dashboard", icon: <DashboardIcon /> },
    { lable: "Document", icon: <DescriptionIcon /> },
    { lable: "Tasks", icon: <AssignmentIcon /> },
    { lable: "Users", icon: <PeopleIcon /> },
    { lable: "Profile", icon: <AccountCircleIcon /> },
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
            onClick={() => onSelectMenu(item.lable)}
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
