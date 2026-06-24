import React from 'react';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RecordPurchase = () => {
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
                    Record Stock Purchase
                </Typography>
            </Box>

            <Paper sx={{ p: {xs: 2, md: 4}, borderRadius: 4, border: theme => `1px solid ${theme.palette.divider}` }}>
                 <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>Product Name</Typography>
                        <TextField fullWidth placeholder="e.g., 'Espresso Machine'" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>Supplier</Typography>
                        <TextField fullWidth placeholder="e.g., 'Pro Coffee Supplies'" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>Quantity</Typography>
                        <TextField type="number" fullWidth placeholder="e.g., 25" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>Cost Price Per Unit</Typography>
                        <TextField type="number" fullWidth placeholder="e.g., $150.00" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>Purchase Date</Typography>
                        <TextField type="date" fullWidth InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>Notes (Optional)</Typography>
                        <TextField multiline rows={4} fullWidth placeholder="e.g., Part of the new 'Winter Collection' order"/>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                     <Button variant="text" sx={{ mr: 2, color: 'text.secondary' }} onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button variant="contained" startIcon={<Plus />} sx={{ textTransform: 'none', fontWeight: 600}}>
                        Record Purchase
                    </Button>
                </Box>
            </Paper>
        </Box>
    </motion.div>
  );
};

export default RecordPurchase;
