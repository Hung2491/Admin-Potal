import { Box } from "@mui/material";
import Header from "../component/Header";
import Sidebar from "../component/SideBar";
import { useState } from "react";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Users from "./Users";
import Document from "./Document";
import Tasks from "./Tasks";

const Home = () => {
  const [page, setPage] = useState("dashboard");
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

  const renderPage = () => {
    switch (page) {
      case "Profile":
        return <Profile />;
      case "Users":
        return <Users />;
      case "Document":
        return <Document />;
      case "Tasks":
        return <Tasks />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Box sx={styles.container}>
      <Header />
      <Box sx={styles.box}>
        <Sidebar open={open} onSelectMenu={(menu) => setPage(menu)} />
        <Box component="main" sx={styles.main}>
          {renderPage()}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
