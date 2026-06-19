import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Box, Typography
} from '@mui/material';
import { PlusCircle } from 'lucide-react';
import type { InventoryItem } from '../types/inventory';

type AddItemDialogProps = {
  open: boolean;
  onClose: () => void;
  onAddItem: (item: Omit<InventoryItem, 'id'>) => void;
};

const AddItemDialog: React.FC<AddItemDialogProps> = ({ open, onClose, onAddItem }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({ name: false, quantity: false, price: false });

  const validate = () => {
    const newErrors = {
        name: name.trim() === '',
        quantity: !/^[1-9]\\d*$/.test(quantity),
        price: !/^\\d+(\\.\\d{1,2})?$/.test(price) || parseFloat(price) <= 0
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(e => e);
  };

  const handleSubmit = () => {
    if (!validate()) {
        return;
    }
    onAddItem({ name, quantity: parseInt(quantity, 10), price: parseFloat(price) });
    onClose();
    // Reset form
    setName('');
    setQuantity('');
    setPrice('');
    setErrors({ name: false, quantity: false, price: false });
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setName('');
    setQuantity('');
    setPrice('');
    setErrors({ name: false, quantity: false, price: false });
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: 4, p: 2 } }}>
      <DialogTitle sx={{ p: 2 }}>
          <Box display="flex" alignItems="center">
              <PlusCircle size={24} style={{ marginRight: 8 }}/>
              <Typography variant="h6" component="div">Add New Inventory Item</Typography>
          </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
          <TextField
            autoFocus
            id="name"
            label="Item Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            helperText={errors.name ? "Item name is required." : ""}
          />
          <TextField
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            error={errors.quantity}
            helperText={errors.quantity ? "Please enter a valid quantity." : ""}
          />
          <TextField
            id="price"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={errors.price}
            helperText={errors.price ? "Please enter a valid price." : ""}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} sx={{ borderRadius: 2 }}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ borderRadius: 2 }}>Add Item</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemDialog;
