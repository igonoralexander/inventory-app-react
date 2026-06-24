import React, { useState } from 'react';
import {
    Box, Typography, Grid, Paper, Avatar, Button, Chip, TextField, InputAdornment
} from '@mui/material';
import {
    DollarSign, TrendingUp, Search, PlusCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StyledAvatar from '../components/StyledAvatar';

// MOCK DATA
const summaryData = [
    { title: 'Revenue Today', value: '$1,420', change: '+12%', changeType: 'increase', icon: <DollarSign size={24} color="#10b981" /> },
    { title: 'Revenue Weekly', value: '$8,950', change: '+8%', changeType: 'increase', icon: <TrendingUp size={24} color="#3b82f6" /> },
];

const sales = [
    { id: 1, customer: 'John Doe', product: 'Espresso Machine', amount: 250.00, quantity: 1, payment: 'Card', date: '2024-05-21' },
    { id: 2, customer: 'Jane Smith', product: 'Designer Sneakers', amount: 300.00, quantity: 2, payment: 'Cash', date: '2024-05-21' },
    { id: 3, customer: 'Mike Johnson', product: 'Webcam Pro', amount: 79.99, quantity: 1, payment: 'Transfer', date: '2024-05-20' },
    { id: 4, customer: 'Sarah Williams', product: 'Mechanical Keyboard', amount: 120.00, quantity: 1, payment: 'Card', date: '2024-05-20' },
    { id: 5, customer: 'David Brown', product: 'Organic Bananas', amount: 5.00, quantity: 5, payment: 'Cash', date: '2024-05-19' },
];

const SummaryCard = ({ item, loading }) => {
    return (
        <Paper sx={{ p: 2.5, borderRadius: 4, height: '100%', border: theme => `1px solid ${theme.palette.divider}` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <Avatar sx={{ bgcolor: 'transparent', mr: 1.5 }}>{item.icon}</Avatar>
                <Typography variant="body2" color="text.secondary">{item.title}</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0.5 }}>{item.value}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                <TrendingUp size={14} />
                <Typography variant="caption" sx={{ fontWeight: 600, ml: 0.5 }}>{item.change} vs yesterday</Typography>
            </Box>
        </Paper>
    );
};

const Sales = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const filteredSales = sales.filter(sale => sale.product.toLowerCase().includes(searchTerm.toLowerCase()));

    const FADE_IN_VARIANTS = {
        hidden: { opacity: 0, y: 10 },
        visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } })
    };

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <motion.div custom={0} initial="hidden" animate="visible" variants={FADE_IN_VARIANTS}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, mt: 2 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Sales</Typography>
                        <Typography variant="body1" color="text.secondary">Track and manage all sales.</Typography>
                    </Box>
                    <Button variant="contained" startIcon={<PlusCircle />} onClick={() => navigate('/sales/record')} sx={{textTransform: 'none', fontWeight: 600}}>
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
                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
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
                      filteredSales.map((sale, i) => (
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
                                <Typography sx={{ fontWeight: 'bold' }}>${sale.amount.toFixed(2)}</Typography>
                                <Typography variant="body2" color="text.secondary">{sale.date}</Typography>
                            </Box>
                        </Box>
                      ))
                    }
                 </Paper>
            </motion.div>
        </Box>
    );
};

export default Sales;
