import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import type React from "react";

interface PopupProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const PopUp = ({ title, children, open, onClose, onConfirm }: PopupProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>{children}</DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button variant="contained" onClick={onConfirm}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUp;
