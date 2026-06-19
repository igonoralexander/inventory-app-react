import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  Typography
} from '@mui/material';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { borderRadius: 4, p: 2 } }}
    >
      <DialogTitle id="alert-dialog-title">
          <Box display="flex" alignItems="center">
              <AlertTriangle size={24} style={{ marginRight: 8, color: '#F87171' }}/>
              <Typography variant="h6" component="div">{title}</Typography>
          </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ borderRadius: 2 }}>Cancel</Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus sx={{ borderRadius: 2 }}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
