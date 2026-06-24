import React from 'react';
import {
    Box, Typography, Grid, Paper, Avatar, useTheme
} from '@mui/material';
import {
    DollarSign, ShoppingCart, Users, TrendingUp
} from 'lucide-react';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import StyledAvatar from '../components/StyledAvatar';

// MOCK DATA
const stats = [
    { title: 'Total Revenue', value: '$24,350', icon: <DollarSign size={24} />, color: '#10b981' },
    { title: 'Total Sales', value: '1,250', icon: <ShoppingCart size={24} />, color: '#3b82f6' },
    { title: 'Total Customers', value: '820', icon: <Users size={24} />, color: '#8b5cf6' },
    { title: 'Avg. Sale Value', value: '$19.48', icon: <TrendingUp size={24} />, color: '#f97316' },
];

const revenueData = [
    { month: 'Jan', revenue: 1800 }, { month: 'Feb', revenue: 2200 }, { month: 'Mar', revenue: 3500 },
    { month: 'Apr', revenue: 4100 }, { month: 'May', revenue: 3900 }, { month: 'Jun', revenue: 5200 },
];

const salesByCategoryData = [
    { name: 'Electronics', sales: 4000 },
    { name: 'Clothing', sales: 3000 },
    { name: 'Groceries', sales: 2000 },
    { name: 'Home Goods', sales: 2780 },
    { name: 'Toys', sales: 1890 },
];

const topProducts = [
    { name: 'Espresso Machine', revenue: '$30,000' },
    { name: 'Designer Sneakers', revenue: '$14,250' },
    { name: 'Mechanical Keyboard', revenue: '$9,600' },
    { name: 'Webcam Pro', revenue: '$5,760' },
    { name: 'Organic Bananas', revenue: '$2,500' },
];

const StatCard = ({ item }) => (
    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', borderRadius: 4, height: '100%', border: theme => `1px solid ${theme.palette.divider}` }}>
        <Avatar sx={{ bgcolor: `${item.color}20`, color: item.color, mr: 2, width: 48, height: 48 }}>{item.icon}</Avatar>
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item.value}</Typography>
            <Typography color="text.secondary">{item.title}</Typography>
        </Box>
    </Paper>
);

const Reports = () => {
    const theme = useTheme();

    const FADE_IN_VARIANTS = {
        hidden: { opacity: 0, y: 10 },
        visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } })
    };

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <motion.div custom={0} initial="hidden" animate="visible" variants={FADE_IN_VARIANTS}>
                <Box sx={{ mb: 4, mt: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Business Reports</Typography>
                    <Typography variant="body1" color="text.secondary">An overview of your business performance.</Typography>
                </Box>
            </motion.div>

            <Grid container spacing={3} sx={{ mb: 3 }}>
                {stats.map((stat, i) => (
                    <Grid item xs={12} sm={6} md={3} key={stat.title}>
                         <motion.div custom={i+1} initial="hidden" animate="visible" variants={FADE_IN_VARIANTS} style={{height: '100%'}}>
                           <StatCard item={stat} />
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} lg={8}>
                    <motion.div custom={5} initial="hidden" animate="visible" variants={FADE_IN_VARIANTS} style={{height: '100%'}}>
                         <Paper sx={{ p: {xs: 2, md: 3}, borderRadius: 4, height: '100%', border: theme => `1px solid ${theme.palette.divider}` }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Monthly Revenue</Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="month" />
                                    <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                                    <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)} />
                                    <Line type="monotone" dataKey="revenue" stroke={theme.palette.primary.main} strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </motion.div>
                </Grid>
                 <Grid item xs={12} lg={4}>
                     <motion.div custom={6} initial="hidden" animate="visible" variants={FADE_IN_VARIANTS} style={{height: '100%'}}>
                         <Paper sx={{ p: {xs: 2, md: 3}, borderRadius: 4, height: '100%', border: theme => `1px solid ${theme.palette.divider}` }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Top Products by Revenue</Typography>
                            {topProducts.map(product => (
                                <Box key={product.name} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <StyledAvatar name={product.name} sx={{ mr: 2 }} />
                                    <Box flexGrow={1}>
                                        <Typography sx={{ fontWeight: 600 }}>{product.name}</Typography>
                                    </Box>
                                    <Typography sx={{ fontWeight: 'bold' }}>{product.revenue}</Typography>
                                </Box>
                            ))}
                        </Paper>
                    </motion.div>
                </Grid>
            </Grid>

            <motion.div custom={7} initial="hidden" animate="visible" variants={FADE_IN_VARIANTS}>
                <Paper sx={{ p: {xs: 2, md: 3}, borderRadius: 4, border: theme => `1px solid ${theme.palette.divider}` }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Sales by Category</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesByCategoryData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" tickFormatter={(value) => `$${value/1000}k`} />
                            <YAxis dataKey="name" type="category" width={100} />
                            <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)} />
                            <Bar dataKey="sales" fill={theme.palette.primary.main} radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            </motion.div>

        </Box>
    );
};

export default Reports;
