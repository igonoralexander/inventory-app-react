import React from 'react';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { Plus } from 'lucide-react';
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
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                Record Stock In / Purchase
            </Typography>

            <Paper sx={{ p: {xs: 2, md: 4}, borderRadius: 4, border: theme => `1px solid ${theme.palette.divider}` }}>
                 <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>Product Name</Typography>
                        <TextField fullWidth placeholder="e.g., 'Espresso Machine'"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>Supplier</Typography>
                        <TextField fullWidth placeholder="e.g., 'Pro Coffee Supplies'"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>Quantity</Typography>
                        <TextField type="number" fullWidth placeholder="e.g., 25" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>Purchase Date</Typography>
                        <TextField type="date" fullWidth InputLabelProps={{ shrink: true }} defaultValue={new Date().toISOString().split('T')[0]} />
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
                        Record
                    </Button>
                </Box>
            </Paper>
        </Box>
    </motion.div>
  );
};

export default RecordPurchase;
