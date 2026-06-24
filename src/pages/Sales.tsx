import React, { useState } from 'react';
import {
    Box, Typography, Grid, Paper, Button, Chip, TextField, InputAdornment, useTheme, useMediaQuery
} from '@mui/material';
import {
    Search, PlusCircle, ShoppingBag, Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StyledAvatar from '../components/StyledAvatar';

// MOCK DATA (Price Removed)
const summaryData = [
    { title: 'Sales Today', value: '25', icon: <ShoppingBag size={24} color="#10b981" /> },
    { title: 'Sales This Week', value: '152', icon: <Calendar size={24} color="#3b82f6" /> },
];

const sales = [
    { id: 1, customer: 'John Doe', product: 'Espresso Machine', quantity: 1, payment: 'Card', date: '2024-05-21' },
    { id: 2, customer: 'Jane Smith', product: 'Designer Sneakers', quantity: 2, payment: 'Cash', date: '2024-05-21' },
    { id: 3, customer: 'Mike Johnson', product: 'Webcam Pro', quantity: 1, payment: 'Transfer', date: '2024-05-20' },
    { id: 4, customer: 'Sarah Williams', product: 'Mechanical Keyboard', quantity: 1, payment: 'Card', date: '2024-05-20' },
    { id: 5, customer: 'David Brown', product: 'Organic Bananas', quantity: 5, payment: 'Cash', date: '2024-05-19' },
];

const SummaryCard = ({ item }) => {
    return (
        <Paper sx={{ p: 2.5, borderRadius: 4, height: '100%', border: theme => `1px solid ${theme.palette.divider}` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <Box sx={{ mr: 1.5, bgcolor: 'transparent'}}>{item.icon}</Box>
                <Typography variant="body2" color="text.secondary">{item.title}</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{item.value}</Typography>
        </Paper>
    );
};

const Sales = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [searchTerm, setSearchTerm] = useState('');
    const filteredSales = sales.filter(sale => sale.product.toLowerCase().includes(searchTerm.toLowerCase()));

    const FADE_IN_VARIANTS = {
        hidden: { opacity: 0, y: 10 },
        visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } })
    };

    return (
        <Box>
            <motion.div custom={0} initial="hidden" animate="visible" variants={FADE_IN_VARIANTS}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Sales</Typography>
                        <Typography variant="body1" color="text.secondary">Track and manage all sales.</Typography>
                    </Box>
                    <Button variant="contained" startIcon={<PlusCircle />} onClick={() => navigate('/sales/record')} sx={{textTransform: 'none', fontWeight: 600, display: {xs: 'none', sm: 'flex'} }}>
                        Record a Sale
                    </Button>
                </Box>
            </motion.div>

            <Grid container spacing={3} sx={{ mb: 3 }}>
                {summaryData.map((item, index) => (
                    <Grid item xs={12} sm={6} key={item.title}>
                        <motion.div custom={index + 1} initial="hidden" animate="visible" variants={FADE_IN_VARIANTS}>
                           <SummaryCard item={item} />
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            <motion.div custom={3} initial="hidden" animate="visible" variants={FADE_IN_VARIANTS}>
                 <Paper sx={{ p: {xs: 2, md: 3}, borderRadius: 4, border: theme => `1px solid ${theme.palette.divider}` }}>
                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>All Sales</Typography>
                         <TextField
                            size="small"
                            placeholder="Search sales..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Search size={18} /></InputAdornment>,
                                sx: { borderRadius: 3, fontSize: '14px' }
                            }}
                        />
                    </Box>
                    {
                      filteredSales.map((sale) => (
                        <Box key={sale.id} sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 1, borderRadius: 3, transition: 'background-color 0.2s', '&:hover': { bgcolor: 'action.hover' } }}>
                            <StyledAvatar name={sale.customer} sx={{ mr: 2 }} />
                            <Box flexGrow={1}>
                                <Typography sx={{ fontWeight: 600 }}>{sale.product}</Typography>
                                <Typography variant="body2" color="text.secondary">Sold to {sale.customer}</Typography>
                            </Box>
                            <Box sx={{ display: {xs: 'none', sm: 'block'}, mr: 3}}>
                                 <Chip label={sale.payment} size="small" />
                            </Box>
                            <Box textAlign="right">
                                <Typography sx={{ fontWeight: 'bold' }}>{sale.quantity} units</Typography>
                                <Typography variant="body2" color="text.secondary">{sale.date}</Typography>
                            </Box>
                        </Box>
                      ))
                    }
                 </Paper>
            </motion.div>
             {isMobile && (
                <Button variant="contained" startIcon={<PlusCircle />} onClick={() => navigate('/sales/record')} sx={{textTransform: 'none', fontWeight: 600, position: 'fixed', bottom: 80, right: 16, zIndex: 1000, borderRadius: 100, p: '12px 24px'}}>
                    Record Sale
                </Button>
            )}
        </Box>
    );
};

export default Sales;
