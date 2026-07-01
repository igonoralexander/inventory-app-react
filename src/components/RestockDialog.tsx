import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Typography, Box
} from '@mui/material';

interface Product {
    id: number;
    name: string;
    stock: number;
}

interface RestockDialogProps {
    open: boolean;
    onClose: () => void;
    product: Product | null;
    onRestock: (productId: number, newQuantity: number) => void;
}

const RestockDialog: React.FC<RestockDialogProps> = ({ open, onClose, product, onRestock }) => {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if (product) {
            setQuantity(0); // Reset to 0 for adding new stock
        }
    }, [product]);

    const handleRestock = () => {
        if (product && quantity > 0) {
            onRestock(product.id, product.stock + quantity);
            onClose();
        }
    };

    if (!product) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold', color: 'black' }}>Restock: {product.name}</DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Current stock: {product.stock}
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Quantity to Add"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 0)}
                    InputProps={{ inputProps: { min: 1 } }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleRestock} variant="contained" disabled={quantity <= 0}>
                    Restock
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RestockDialog;