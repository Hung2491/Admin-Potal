import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { UseAuth } from "../hook/AuthContext";
import { useEffect } from "react";

const styles = {
  container: {
    padding: "3%",
    flex: 1,
    height: 1,
    width: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    width: 1,
    textAlign: "left",
    fontWeight: 700,
  },
  paper: {
    mt: "5%",
    width: "35%",
    padding: "2%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "10px",
  },
  subtitle: {
    fontWeight: 700,
  },
  uploadButton: {
    marginBlock: "25px",
    padding: "5px",
    borderRadius: "8px",
    border: "2px solid #2e6bcf",
  },
  textField: {
    width: "60%",
  },
  updateButton: {
    width: "60%",
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#2e6bcf",
    color: "white",
    fontWeight: 600,
  },
};

export default function Profile() {
  const { user, fetchProfile } = UseAuth();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!user) return null;

  return (
    <Box sx={styles.container}>
      <Typography variant="h3" sx={styles.title}>
        User Profile
      </Typography>
      <Paper elevation={10} sx={styles.paper}>
        <Typography variant="h4" sx={styles.subtitle}>
          User Profile
        </Typography>
        <Button sx={styles.uploadButton}>Upload New Image</Button>
        <TextField
          fullWidth
          label="Email Address"
          value={user.username}
          sx={styles.textField}
        />
        <Box height={20} />
        <Button fullWidth sx={styles.updateButton}>
          Update Profile
        </Button>
      </Paper>
    </Box>
  );
}
