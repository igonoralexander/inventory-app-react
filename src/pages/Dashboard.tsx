import React from 'react';
import {
  Box, Typography, Grid, Paper, InputBase, Button, AvatarGroup, Avatar, IconButton
} from '@mui/material';
import {
  Search, Sliders, Briefcase, ShoppingCart, ArrowUpRight, ArrowDownRight, MoreHorizontal, ShoppingBag, Edit
} from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const salesData = [
  { name: 'Mon', Sales: 4000, Purchases: 2400 },
  { name: 'Tue', Sales: 3000, Purchases: 1398 },
  { name: 'Wed', Sales: 2000, Purchases: 9800 },
  { name: 'Thu', Sales: 2780, Purchases: 3908 },
  { name: 'Fri', Sales: 1890, Purchases: 4800 },
  { name: 'Sat', Sales: 2390, Purchases: 3800 },
  { name: 'Sun', Sales: 3490, Purchases: 4300 },
];

const mockProducts = [
  { id: 1, name: 'Wireless Mouse', sku: 'WM-1024', quantity: 42, price: 25.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', status: 'in-stock' },
  { id: 2, name: 'Mechanical Keyboard', sku: 'MK-87', quantity: 8, price: 129.50, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', status: 'low-stock' },
  { id: 3, name: '4K Monitor', sku: '4KM-27-01', quantity: 0, price: 499.00, image: 'https://images.unsplash.com/photo-1586210579191-30b4a3541465?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', status: 'out-of-stock' },
  { id: 4, name: 'Webcam Pro', sku: 'WCP-1080', quantity: 15, price: 89.99, image: 'https://images.unsplash.com/photo-1609346938925-6d9b9d2be8a8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', status: 'in-stock' },
];

const StatCard = ({ title, value, change, changeType, icon }) => (
    <motion.div whileHover={{ scale: 1.03 }} style={{ height: '100%' }}>
        <Paper sx={{ p: 2.5, borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.8rem' }}>{title}</Typography>
                {icon}
            </Box>
            <Box sx={{ mt: 'auto' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '1.8rem' }}>{value}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', color: changeType === 'increase' ? 'success.main' : 'error.main' }}>
                    {changeType === 'increase' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    <Typography variant="body2" sx={{ fontWeight: 600, ml: 0.5, fontSize: '0.8rem' }}>{change}</Typography>
                </Box>
            </Box>
        </Paper>
    </motion.div>
);

const ProductCard = ({ product }) => {
    const getStatusChip = (status) => {
        const style = {
            borderRadius: '12px',
            fontSize: '0.6rem',
            fontWeight: 600,
            px: 1.25,
            py: 0.5,
            display: 'inline-flex',
            alignItems: 'center',
        };
        switch (status) {
            case 'in-stock':
                return <Box sx={{ ...style, bgcolor: '#DCFCE7', color: '#166534' }}><Box sx={{width: 5, height: 5, borderRadius: '50%', bgcolor: '#22C55E', mr: 0.75}} />In Stock</Box>;
            case 'low-stock':
                return <Box sx={{ ...style, bgcolor: '#FEF9C3', color: '#854D0E' }}><Box sx={{width: 5, height: 5, borderRadius: '50%', bgcolor: '#FACC15', mr: 0.75}} />Low Stock</Box>;
            case 'out-of-stock':
                return <Box sx={{ ...style, bgcolor: '#FEE2E2', color: '#991B1B' }}><Box sx={{width: 5, height: 5, borderRadius: '50%', bgcolor: '#EF4444', mr: 0.75}} />Out of Stock</Box>;
            default: return null;
        }
    }

    return (
        <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ y: -6, scale: 1.02}} transition={{ duration: 0.2, ease: "easeOut" }} style={{height: '100%'}}>
                <Paper sx={{
                    borderRadius: 4, 
                    overflow: 'hidden', 
                    border: '1px solid #E2E8F0', 
                    boxShadow: 'none', 
                    display: 'flex', 
                    flexDirection: 'column',
                    height: '100%',
                }}>
                    <Box sx={{ p: 1.5, position: 'relative' }}>
                        <img src={product.image} alt={product.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: '12px' }} />
                        <Box sx={{position: 'absolute', top: 18, right: 18}}>
                            {getStatusChip(product.status)}
                        </Box>
                    </Box>
                    <Box sx={{ p: 2, pt: 1, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, fontSize: '0.9rem' }}>{product.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.7rem' }}>SKU: {product.sku}</Typography>
                        
                        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{`$${product.price.toFixed(2)}`}</Typography>
                            <Box>
                               <motion.div whileTap={{ scale: 0.95 }}>
                                    <IconButton size="small" sx={{background: '#F1F5F9', borderRadius: '8px', mr: 0.5}}>
                                        <Edit size={12} />
                                    </IconButton>
                               </motion.div>
                                <motion.div whileTap={{ scale: 0.95 }}>
                                    <IconButton size="small" sx={{background: '#F1F5F9', borderRadius: '8px'}}>
                                        <ShoppingBag size={12} />
                                    </IconButton>
                                </motion.div>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </motion.div>
        </Grid>
    )
}

const Dashboard = () => {
  return (
    <Box sx={{ p: {xs: 1, md: 0} }}>
      <Grid container spacing={3.5}>
        {/* Header */}
        <Grid item xs={12}>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                 <div>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '1.8rem' }}>Good morning, Phoenix</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{mt: 0.5, fontSize: '0.9rem'}}>Track, manage and forecast your inventory.</Typography>
                 </div>
                <Button variant="contained" color="primary" sx={{ borderRadius: '12px', height: 44, px: 3, textTransform: 'none', fontWeight: 600, boxShadow: 'none', fontSize: '0.85rem' }}>
                    View Full Report
                </Button>
            </Box>
        </Grid>

        {/* KPI Cards */}
        <Grid item xs={12} md={4}>
          <StatCard title="Total Value" value="₦12.6M" change="+18%" changeType="increase" icon={<Briefcase size={20} color="#64748B" />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Total Sales" value="₦4.8M" change="+2.5%" changeType="increase" icon={<ShoppingCart size={20} color="#64748B" />} />
        </Grid>
         <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.03 }} style={{ height: '100%' }}>
                <Paper sx={{ p: 2.5, borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 2, fontSize: '0.8rem' }}>Top Selling Products</Typography>
                    <AvatarGroup max={4} sx={{justifyContent: 'flex-start'}}>
                        <Avatar alt="Product 1" src="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=200&auto=format&fit=crop" />
                        <Avatar alt="Product 2" src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=200&auto=format&fit=crop" />
                        <Avatar alt="Product 3" src="https://images.unsplash.com/photo-1586210579191-30b4a3541465?q=80&w=200&auto=format&fit=crop" />
                        <Avatar alt="Product 4" src="https://images.unsplash.com/photo-1609346938925-6d9b9d2be8a8?q=80&w=200&auto=format&fit=crop" />
                    </AvatarGroup>
                    <Button size="small" sx={{mt: 'auto', alignSelf:'flex-start', textTransform: 'none', fontWeight: 600, borderRadius: '8px', fontSize: '0.8rem' }}>View All Products</Button>
                </Paper>
            </motion.div>
        </Grid>

        {/* Main Content Area */}
        <Grid item xs={12} md={12}>
          <Paper sx={{ p: 3, borderRadius: 4, height: 380, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Weekly Performance</Typography>
                <Box>
                    <Button sx={{textTransform: 'none', color: 'text.primary', fontWeight: 600, borderRadius: '10px', minWidth: 40, mr: 1, bgcolor: '#F1F5F9', fontSize: '0.8rem' }}>Sales</Button>
                    <Button sx={{textTransform: 'none', color: 'text.secondary', fontWeight: 500, borderRadius: '10px', fontSize: '0.8rem' }}>Purchases</Button>
                </Box>
            </Box>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={salesData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11}} dx={-10} />
                <Tooltip cursor={{fill: 'rgba(241, 245, 249, 0.5)'}} contentStyle={{borderRadius: '12px', borderColor: '#E2E8F0', fontSize: '0.8rem'}}/>
                <Legend iconType="circle" iconSize={8} wrapperStyle={{paddingTop: 20, fontSize: '0.8rem'}}/>
                <Bar dataKey="Sales" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Purchases" fill="#93C5FD" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Products Section */}
        <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '1.4rem' }}>Recent Products</Typography>
                <Button sx={{textTransform: 'none', fontWeight: 600, borderRadius: '10px', fontSize: '0.85rem' }}>See All</Button>
            </Box>
            <Grid container spacing={3}>
                {mockProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </Grid>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Dashboard;
