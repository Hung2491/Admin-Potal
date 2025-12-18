import {
  Box,
  Button,
  Typography,
} from "@mui/material";

export default function Users() {
  return (
    <Box
      sx={{
        padding: "3%",
        flex: 1,
        height:1
      }}
    >
      <Typography variant="h4" sx={{ width: 1, fontWeight: 700 }}>
        User Management
      </Typography>
      <Box height={'4%'}></Box>
      <Button
        sx={{
          padding: "10px",
          backgroundColor: "#2e6bcf",
          width: "13%",
          color: "white",
          fontSize: "18px",
          fontWeight: 600,
        }}
      >
        + Add New User
      </Button>
    </Box>
  );
}
