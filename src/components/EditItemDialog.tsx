import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Box, Typography
} from '@mui/material';
import { Edit } from 'lucide-react';
import type { InventoryItem } from '../types/inventory';

type EditItemDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditItem: (item: InventoryItem) => void;
  item: InventoryItem | null;
};

const EditItemDialog: React.FC<EditItemDialogProps> = ({ open, onClose, onEditItem, item }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({ name: false, quantity: false, price: false });

  useEffect(() => {
    if (item) {
        setName(item.name);
        setQuantity(String(item.quantity));
        setPrice(String(item.price));
    }
  }, [item]);

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
    if (!validate() || !item) {
        return;
    }
    onEditItem({ ...item, name, quantity: parseInt(quantity, 10), price: parseFloat(price) });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 4, p: 2 } }}>
      <DialogTitle sx={{ p: 2 }}>
          <Box display="flex" alignItems="center">
              <Edit size={24} style={{ marginRight: 8 }}/>
              <Typography variant="h6" component="div">Edit Inventory Item</Typography>
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
        <Button onClick={onClose} sx={{ borderRadius: 2 }}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ borderRadius: 2 }}>Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditItemDialog;
