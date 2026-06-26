
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useTheme } from '@mui/material';
import { AlertTriangle } from 'lucide-react';

const ConfirmationDialog = ({ open, handleClose, handleConfirm, title, message }) => {
    const theme = useTheme();
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 'bold' }}>
                <AlertTriangle color={theme.palette.warning.main} />
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleClose} color="inherit" sx={{ borderRadius: 2 }}>
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="error" variant="contained" autoFocus sx={{ borderRadius: 2 }}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
