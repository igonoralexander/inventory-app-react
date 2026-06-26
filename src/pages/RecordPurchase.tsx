import React from 'react';
import { Box, TextField, Button, Grid, Paper } from '@mui/material';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

const RecordPurchase = () => {
  const navigate = useNavigate();

  const FADE_IN_VARIANTS = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={FADE_IN_VARIANTS}>
        <Box>
            <PageHeader title="Record Stock In / Purchase" />

            <Paper sx={{ p: {xs: 2, md: 4}, borderRadius: 4, border: theme => `1px solid ${theme.palette.divider}` }}>
                 <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Product Name" placeholder="e.g., 'Espresso Machine'"/>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <TextField type="number" fullWidth label="Quantity" placeholder="e.g., 25" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField type="date" fullWidth label="Purchase Date" InputLabelProps={{ shrink: true }} defaultValue={new Date().toISOString().split('T')[0]} />
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