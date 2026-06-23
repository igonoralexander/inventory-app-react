import React from 'react';
import {
  Box, Typography, TextField, Button, Paper, IconButton, useTheme, useMediaQuery, Select, MenuItem, FormControl, InputLabel, Grid, Avatar
} from '@mui/material';
import { ArrowLeft, ImageUp, UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const categories = ['Food', 'Drinks', 'Electronics', 'Fashion', 'Pharmacy', 'Stationery', 'Others'];

const EditProduct = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { id } = useParams(); // In a real app, you'd fetch the product by this id

  // Mock product data for pre-filling the form
  const product = {
    name: 'Organic Bananas',
    sku: 'HB-FR-001',
    category: 'Food',
    stock: 120,
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton sx={{ mr: 1, color: 'text.primary' }}>
          <ArrowLeft />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Edit Product
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left Side - Image Upload */}
        <Grid item xs={12} md={4}>
          <Paper
            component={motion.div}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            sx={{
              p: 3,
              borderRadius: 4,
              textAlign: 'center',
              border: `2px dashed ${theme.palette.divider}`,
              bgcolor: 'background.default',
              boxShadow: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <UploadCloud size={48} color={theme.palette.text.secondary} />
            <Typography sx={{ mt: 2, fontWeight: 600, color: 'text.primary' }}>
              Upload Product Image
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Drag and drop or click to browse
            </Typography>
            <Button variant="contained" color="primary" component="label" startIcon={<ImageUp size={16} />}>
              Browse
              <input type="file" hidden />
            </Button>
          </Paper>
        </Grid>

        {/* Right Side - Form Fields */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: isDesktop ? 4 : 2,
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: 'none'
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField fullWidth label="Product Name" variant="outlined" defaultValue={product.name} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="SKU / Barcode" variant="outlined" defaultValue={product.sku} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Category</InputLabel>
                  <Select label="Category" defaultValue={product.category}>
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Stock Quantity" type="number" variant="outlined" defaultValue={product.stock} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" sx={{ borderRadius: 3, px: 3 }}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" sx={{ borderRadius: 3, px: 4 }}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}

export default EditProduct;
