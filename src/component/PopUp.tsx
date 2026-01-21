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
  showClose?: boolean;
}

const PopUp = ({
  title,
  children,
  open,
  onClose,
  onConfirm,
  showClose = false,
}: PopupProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>{children}</DialogContent>

      <DialogActions>
        {showClose ? <Button onClick={onClose}>Huỷ</Button> : null}
        <Button variant="contained" onClick={onConfirm}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUp;
