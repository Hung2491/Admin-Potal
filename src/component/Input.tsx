import { Box, TextField, Typography } from "@mui/material";

type InputProp = {
  title?: string;
  placehoder?: string;
};

const Input = ({ title, placehoder, ...props }: InputProp) => {
  return (
    <Box sx={{ marginBottom: "15px" }}>
      <Typography
        variant="subtitle1"
        sx={{ marginBottom: "8px", fontWeight: 600 }}
      >
        {title}
      </Typography>
      <TextField {...props} fullWidth placeholder={placehoder}></TextField>
    </Box>
  );
};

export default Input;
