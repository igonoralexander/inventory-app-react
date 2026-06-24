import React from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Autocomplete } from '@mui/material';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data for products
const products = [
  { label: 'Espresso Machine' },
  { label: 'Mechanical Keyboard' },
  { label: 'Designer Sneakers' },
  { label: 'Webcam Pro' },
  { label: 'Organic Bananas' },
];

const RecordSale = () => {
  const navigate = useNavigate();

  const FADE_IN_VARIANTS = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={FADE_IN_VARIANTS}>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            onClick={() => navigate('/dashboard')}
            startIcon={<ArrowLeft size={20} />}
            sx={{ mr: 2, color: 'text.secondary', textTransform: 'none' }}
          >
            Back to Dashboard
          </Button>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Record New Sale
          </Typography>
        </Box>

        <Paper sx={{ p: {xs: 2, md: 4}, borderRadius: 4, border: theme => `1px solid ${theme.palette.divider}` }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>Product Name</Typography>
              <Autocomplete
                freeSolo
                options={products.map((option) => option.label)}
                renderInput={(params) => <TextField {...params} placeholder="Start typing to search product..." />}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>Quantity Sold</Typography>
              <TextField type="number" fullWidth placeholder="e.g., 2" />
            </Grid>
            <Grid item xs={12} md={3}>
                <Typography sx={{ fontWeight: 600, mb: 1 }}>Total Amount</Typography>
                <TextField type="number" fullWidth placeholder="e.g., $300.00" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>Payment Method</Typography>
               <TextField fullWidth placeholder="e.g., Credit Card" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>Sale Date</Typography>
              <TextField type="date" fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>Notes (Optional)</Typography>
              <TextField multiline rows={3} fullWidth placeholder="e.g., Customer requested extra warranty" />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="text" sx={{ mr: 2, color: 'text.secondary' }} onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button variant="contained" startIcon={<ShoppingCart />} sx={{ textTransform: 'none', fontWeight: 600}}>
              Record Sale
            </Button>
          </Box>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default RecordSale;
