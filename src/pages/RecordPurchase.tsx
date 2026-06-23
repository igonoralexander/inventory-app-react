import React, { useState, useMemo } from 'react';
import {
  Box, Typography, TextField, Button, Paper, IconButton, useTheme, useMediaQuery, Select, MenuItem, FormControl, InputLabel, Grid, Autocomplete
} from '@mui/material';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data
const mockProducts = [
  { id: 1, name: 'Organic Bananas', stock: 120, costPrice: 350.00 },
  { id: 2, name: 'Espresso Machine', stock: 8, costPrice: 62000.00 },
  { id: 3, name: 'Designer Sneakers', stock: 0, costPrice: 28000.00 },
  { id: 4, name: 'Sparkling Water 50cl', stock: 250, costPrice: 180.00 },
];

const paymentMethods = ['Cash', 'Transfer', 'POS', 'Credit'];

const RecordPurchase = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityPurchased, setQuantityPurchased] = useState('');

  const newStockQuantity = useMemo(() => {
    const current = selectedProduct ? selectedProduct.stock : 0;
    const purchased = quantityPurchased ? parseInt(quantityPurchased, 10) : 0;
    return current + purchased;
  }, [selectedProduct, quantityPurchased]);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton sx={{ mr: 1, color: 'text.primary' }}>
          <ArrowLeft />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Record Purchase
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left Side - Form */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Section 1: Select Product */}
            <Paper sx={{ p: 3, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, boxShadow: 'none' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Select Product</Typography>
              <Autocomplete
                options={mockProducts}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => {
                  setSelectedProduct(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Search Product" />}
              />
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Current Stock</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{selectedProduct ? selectedProduct.stock : '-'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Current Cost Price</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{selectedProduct ? `₦${selectedProduct.costPrice.toFixed(2)}` : '-'}</Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Section 2: Purchase Details */}
            <Paper sx={{ p: 3, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, boxShadow: 'none' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Purchase Details</Typography>
              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Quantity Purchased" type="number" value={quantityPurchased} onChange={(e) => setQuantityPurchased(e.target.value)} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Cost Price Per Unit (₦)" type="number" /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Purchase Date" type="date" InputLabelProps={{ shrink: true }} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Invoice Number (Optional)" /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Supplier (Optional)" /></Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Payment Method</InputLabel>
                        <Select label="Payment Method">
                            {paymentMethods.map(method => <MenuItem key={method} value={method}>{method}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}><TextField fullWidth multiline rows={3} label="Notes (Optional)" /></Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>

        {/* Right Side - Live Summary */}
        <Grid item xs={12} md={4}>
          <Paper component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            sx={{ p: 3, borderRadius: 4, background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`, color: 'white', position: 'sticky', top: 80 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Live Summary</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1.5 }}>
              <Typography>Current Stock</Typography>
              <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>{selectedProduct ? selectedProduct.stock : 0}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}><PlusCircle size={20} /></Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1.5 }}>
              <Typography>Purchased Quantity</Typography>
              <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>{quantityPurchased || 0}</Typography>
            </Box>
            <Box sx={{ borderTop: `2px solid ${theme.palette.primary.light}`, my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{fontWeight: 600}}>New Stock Quantity</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{newStockQuantity}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" sx={{ borderRadius: 3, px: 3 }}>Cancel</Button>
        <Button variant="contained" color="primary" sx={{ borderRadius: 3, px: 4 }}>Save Purchase</Button>
      </Box>
    </Box>
  );
}

export default RecordPurchase;
