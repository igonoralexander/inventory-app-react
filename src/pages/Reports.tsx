import React from 'react';
import {
  Box, Typography, Grid, Paper, Button, Chip
} from '@mui/material';
import { Download, Calendar, DollarSign, ShoppingBag, TrendingUp, BarChart, PieChart, Star } from 'lucide-react';
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { BarChart as RechartsBarChart } from 'recharts';
import { PieChart as RechartsPieChart } from 'recharts';

const salesData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
];

const categoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Groceries', value: 300 },
  { name: 'Books', value: 200 },
];

const COLORS = ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'];

const topProducts = [
    { name: 'Wireless Mouse', sold: 120, revenue: 3118.8 },
    { name: 'Mechanical Keyboard', sold: 75, revenue: 9712.5 },
    { name: '4K Monitor', sold: 50, revenue: 24950 },
];

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
    <Grid item xs={12} sm={4}>
        <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', borderRadius: 4 }}>
            {icon}
            <Box ml={2}>
                <Typography color="textSecondary" variant="body2">{title}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{value}</Typography>
            </Box>
        </Paper>
    </Grid>
);

const Reports = () => {
  return (
    <Box sx={{ px: '20px', pb: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Reports</Typography>
            <Box>
                <Button variant="outlined" startIcon={<Calendar size={18}/>} sx={{ mr: 1 }}>Last 30 Days</Button>
                <Button variant="contained" startIcon={<Download size={18}/>}>Export</Button>
            </Box>
        </Box>

        <Grid container spacing={2} mb={3}>
            <StatCard title="Total Revenue" value="$28,350" icon={<DollarSign size={32} color="#16A34A" />} />
            <StatCard title="Total Profit" value="$12,890" icon={<TrendingUp size={32} color="#2563EB" />} />
            <StatCard title="Total Orders" value="452" icon={<ShoppingBag size={32} color="#F97316" />} />
        </Grid>

        <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
                 <Paper sx={{ p: 2, borderRadius: 4, height: '400px' }}>
                     <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Sales Trend</Typography>
                    <ResponsiveContainer width="100%" height="90%">
                        <RechartsBarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#2563EB" />
                        </RechartsBarChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
                 <Paper sx={{ p: 2, borderRadius: 4, height: '400px' }}>
                     <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Category Breakdown</Typography>
                     <ResponsiveContainer width="100%" height="90%">
                        <RechartsPieChart>
                            <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </RechartsPieChart>
                     </ResponsiveContainer>
                </Paper>
            </Grid>
             <Grid item xs={12}>
                <Paper sx={{ p: 2, borderRadius: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Top Selling Products</Typography>
                    {topProducts.map(product => (
                        <Box key={product.name} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderBottom: '1px solid #E5E7EB' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{product.name}</Typography>
                            <Box textAlign="right">
                                <Typography variant="body2">Sold: {product.sold}</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>Revenue: ${product.revenue.toLocaleString()}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Paper>
             </Grid>
        </Grid>

    </Box>
  );
};

export default Reports;
