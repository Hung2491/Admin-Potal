import { Box, TextField, Typography } from "@mui/material";
import type React from "react";

type InputProp = {
  title?: string;
  placehoder?: string;
  children?: React.ReactNode;
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
};

const Input = ({
  title,
  placehoder,
  children,
  onChange,
  ...props
}: InputProp) => {
  return (
    <Box sx={{ marginBottom: "15px" }}>
      <Typography
        variant="subtitle1"
        sx={{ marginBottom: "8px", fontWeight: 600 }}
      >
        {title}
      </Typography>
      <TextField
        {...props}
        fullWidth
        placeholder={placehoder}
        onChange={onChange}
      >
        {children}
      </TextField>
    </Box>
  );
};

export default Input;
