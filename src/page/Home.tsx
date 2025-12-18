import { Box, } from "@mui/material";
import Header from "../component/Header";
import Sidebar from "../component/SideBar";
import { useState } from "react";

import { Outlet } from "react-router";

const Home = () => {
  const [open] = useState(true);

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
      <Header />
      <Box sx={styles.box}>
        <Sidebar open={open} />
        <Box component="main" sx={styles.main}>
    
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
