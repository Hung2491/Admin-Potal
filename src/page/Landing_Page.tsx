import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import type React from "react";
interface Data {
  title: string;
  discription: string;
  icon: React.ReactNode;
}

const LandingPage = () => {
  const data: Data[] = [
    {
      title: "User Management",
      discription:
        "Manage users, user management, canoiirmort, and management.",
      icon: <PeopleOutlineIcon></PeopleOutlineIcon>,
    },
    {
      title: "Document Repository",
      discription:
        "Enthmove document repository, repository, innart, aps, etc.",
      icon: <InsertDriveFileOutlinedIcon></InsertDriveFileOutlinedIcon>,
    },
    {
      title: "Task Tracking",
      discription:
        "Task tracking tromd-inve triamzation, convirloination, and integles.",
      icon: <FormatListBulletedOutlinedIcon></FormatListBulletedOutlinedIcon>,
    },
  ];

  const styles = {
    container: {
      display: "flex",
      width: 1,
      height: "100vh",
    },
    appBar: {
      alignItems: "center",
      justifyContent: "center",
      height: "8%",
      padding: "0px 15% 0px 15%",
      borderBottomWidth: "1px",
      borderColor: "gray",
      backgroundColor: "white",
    },
    toolbar: {
      display: "flex",
      width: 1,
      justifyContent: "space-between",
    },
    title: {
      fontWeight: 600,
      color: "black",
    },
    navBox: {
      display: "flex",
      alignItems: "center",
    },
    navItem: {
      paddingRight: "30px",
      fontWeight: 500,
      color: "black",
    },
    signInButton: {
      color: "white",
      backgroundColor: "#2e6bcf",
      fontWeight: 600,
      padding: "15px",
      borderRadius: "8px",
    },
    mainBox: {
      display: "flex",
      width: 1,
      height: 1,
      alignItems: "center",
      flexDirection: "column",
    },
    heroBox: {
      mt: "10%",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    heading: {
      textAlign: "center",
      fontWeight: 800,
    },
    subheading: {
      textAlign: "center",
      padding: "30px 0px 30px 0px",
      fontWeight: 500,
      color: "gray",
    },
    ctaButton: {
      padding: "15px",
      backgroundColor: "#2e6bcf",
      borderRadius: "8px",
    },
    cardContainer: {
      marginTop: "3%",
      display: "flex",
      justifyContent: "center",
    },
    card: {
      pl: 5,
      pr: 5,
      width: "15%",
    },
    iconButton: {
      padding: "15px",
      backgroundColor: "#e6eff8",
      color: "#507bb6",
      borderRadius: "8px",
    },
    cardTitle: {
      fontWeight: 600,
    },
    cardDescription: {
      fontWeight: 500,
    },
    footerBox: {
      display: "flex",
      flexDirection: "column",
      width: "47%",
      mt: 10,
    },
    footerContent: {
      width: 1,
      display: "flex",
      justifyContent: "space-between",
      mt: 5,
    },
    footerText: {
      fontWeight: 600,
    },
  };

  const navigate = useNavigate();

  return (
    <Box sx={styles.container}>
      <AppBar component="nav" sx={styles.appBar}>
        <Toolbar sx={styles.toolbar}>
          <Typography variant="h5" sx={styles.title}>
            Admin Portal
          </Typography>
          <Box sx={styles.navBox}>
            {["About", "Features", "Contact"].map((item) => (
              <Typography variant="h6" sx={styles.navItem} key={item}>
                {item}
              </Typography>
            ))}
            <Button onClick={() => navigate("/signIn")}>
              <Typography variant="h6" sx={styles.signInButton}>
                Sign In / Sign Up
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={styles.mainBox}>
        <Box sx={styles.heroBox}>
          <Typography variant="h2" sx={styles.heading}>
            Manage Your Organization
            <br />
            Efficiently
          </Typography>
          <Typography variant="h5" sx={styles.subheading}>
            Manage your organization user, document, and task management,
            <br />
            features a key funcion and dadalted for you
          </Typography>
          <Button onClick={() => navigate("/signIn")} sx={styles.ctaButton}>
            <Typography variant="h6" sx={styles.signInButton}>
              Get Started
            </Typography>
          </Button>
        </Box>

        <Box sx={styles.cardContainer}>
          {data.map((item) => (
            <Box key={item.title} sx={styles.card}>
              <IconButton sx={styles.iconButton}>{item.icon}</IconButton>
              <Box sx={{ height: "15px" }} />
              <Typography variant="h5" sx={styles.cardTitle}>
                {item.title}
              </Typography>
              <Box sx={{ height: "10px" }} />
              <Typography variant="h6" sx={styles.cardDescription}>
                {item.discription}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={styles.footerBox}>
          <Divider variant="fullWidth" sx={{ height: "3px" }} />
          <Box sx={styles.footerContent}>
            <Typography variant="h6" sx={styles.footerText}>
              FQA
            </Typography>
            <Typography variant="h6" sx={styles.footerText}>
              Contact
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
