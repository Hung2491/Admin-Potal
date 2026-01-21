import { Box, MenuItem } from "@mui/material";
import Header from "./Header";
import Sidebar from "./SideBar";
import { useState } from "react";
import { Outlet } from "react-router";
import AppMenu from "../component/AppMenu";
import { UseAuth } from "../hook/AuthContext";

const MainLayout = () => {
  const [open] = useState(true);
  const { signOut } = UseAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const styles = {
    container: {
      display: "flex",
      height: "100%",
    },
    box: {
      width: 1,
      display: "flex",
    },
    main: {
      width: 1,
      height: "100vh",
      marginTop: "3%",
      marginLeft: open ? "9.8%" : "2.9%",
      transition: "0.3s",
    },
  };

  return (
    <Box sx={styles.container}>
      <Header
        click={(event: React.MouseEvent<HTMLElement>) => openMenu(event)}
      />
      <AppMenu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={closeMenu}>
        <MenuItem onClick={signOut}>Signout</MenuItem>
      </AppMenu>
      <Box sx={styles.box}>
        <Sidebar open={open} />
        <Box component="main" sx={styles.main}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
