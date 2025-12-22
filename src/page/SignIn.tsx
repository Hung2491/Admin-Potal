import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router";
import { UseAuth } from "../hook/AuthContext";
import { useState } from "react";
import Input from "../component/Input";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { COLORS } from "../styles/Corlor";
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 1,
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
  },
  spacer: {
    height: 50,
  },
  inputBox: {
    padding: "20px 0px 20px 0px",
  },
  errorText: {
    color: COLORS.error,
  },
  button: {
    backgroundColor: COLORS.primary,
    margin: "20px 0px 25px 0px",
    borderRadius: "6px",
    padding: "15px",
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "600",
  },
  bottomText: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
  },
  registerLink: {
    color: COLORS.primary,
    marginLeft: "4px",
  },
};

function SignIn() {
  const { signIn, errors } = UseAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const signInNow = async () => {
    const success = await signIn(form);
    if (success) {
      console.log("Đăng nhập thành công");
      navigate("/home");
    }
  };

  return (
    <Box sx={styles.container}>
      <Container maxWidth="sm">
        <Paper elevation={10} sx={styles.paper}>
          <Typography variant="h4" sx={styles.title}>
            Sign In
          </Typography>
          <Box sx={styles.spacer} />
          <Box sx={styles.inputBox}>
            <Input
              title="Email"
              placehoder="Email"
              error={!!errors.username}
              helperText={errors.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </Box>

          <Input
            title="Password"
            placehoder="Password"
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            helperText={errors.password}
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

          {errors.api && (
            <Typography mt={2} sx={styles.errorText}>
              {errors.api}
            </Typography>
          )}

          <Button onClick={signInNow} fullWidth sx={styles.button}>
            <Typography variant="subtitle1" sx={styles.buttonText}>
              Login
            </Typography>
          </Button>

          <Typography variant="subtitle1" sx={styles.bottomText}>
            Don't have an account?
            <Typography
              onClick={() => navigate("/signUp")}
              variant="subtitle1"
              component="span"
              sx={styles.registerLink}
            >
              Register
            </Typography>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default SignIn;
