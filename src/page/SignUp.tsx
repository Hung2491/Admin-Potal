import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
} from "@mui/material";
import Input from "../component/Input";
import { useNavigate } from "react-router";
import { UseAuth } from "../hook/AuthContext";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ValidateSignIn } from "../utils/validate";
function SignUp() {
  const navigate = useNavigate();
  const { errors } = UseAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const styles = {
    box: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 1, // = 100%
      height: "100vh",
    },
    paper: {
      width: "80%",
      padding: "10%",
      borderRadius: "8px",
    },
    title: {
      textAlign: "center",
      fontWeight: 700,
      marginBottom: "20px",
    },
    button: {
      backgroundColor: "#3269be",
      margin: "20px 0px",
      borderRadius: "6px",
      padding: "10px",
    },
    link: {
      color: "#3269be",
      marginLeft: "4px",
    },
    subtitle: {
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
    },
    buttonText: {
      color: "white",
      fontWeight: "500",
    },
  };

  return (
    <Box sx={styles.box}>
      <Container maxWidth="sm">
        <Paper elevation={10} sx={styles.paper}>
          <Typography variant="h4" sx={styles.title}>
            Sign Up
          </Typography>
          <Input title="Full Name" placehoder="Full name" />
          <Input
            title="Email"
            placehoder="Email"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <Input
            title="Password"
            placehoder="Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Input
            title="Confirm Password"
            placehoder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={() => {
            
                navigate("/signIn");
              
            }}
            fullWidth
            sx={styles.button}
          >
            <Typography variant="subtitle1" sx={styles.buttonText}>
              Register
            </Typography>
          </Button>

          <Typography variant="subtitle1" sx={styles.subtitle}>
            Already have an account?
            <Typography
              onClick={() => navigate("/signIn")}
              variant="subtitle1"
              sx={styles.link}
            >
              {" "}
              Sign In
            </Typography>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default SignUp;
