import React from 'react';
import {
  Box, Typography, TextField, Button, Paper, IconButton, useTheme, useMediaQuery, Select, MenuItem, FormControl, InputLabel, Grid, Avatar
} from '@mui/material';
import { ArrowLeft, ImageUp, UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = ['Food', 'Drinks', 'Electronics', 'Fashion', 'Pharmacy', 'Stationery', 'Others'];

const AddProduct = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton sx={{ mr: 1, color: 'text.primary' }}>
          <ArrowLeft />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Add New Product
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
                <TextField fullWidth label="Product Name" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="SKU / Barcode" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Category</InputLabel>
                  <Select label="Category">
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Initial Stock Quantity" type="number" variant="outlined" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" sx={{ borderRadius: 3, px: 3 }}>
          Discard
        </Button>
        <Button variant="contained" color="primary" sx={{ borderRadius: 3, px: 4 }}>
          Save Product
        </Button>
      </Box>
    </Box>
  );
}

export default AddProduct;
