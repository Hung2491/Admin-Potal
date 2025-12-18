import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export default function Header() {
  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        zIndex: 2,
        height: "6%",
        bgcolor: "#fff",
        color: "#000",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Admin Portal
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <span>☀️</span>
          <span>🔔</span>

          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              bgcolor: "primary.main",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
            }}
          >
            JD
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
