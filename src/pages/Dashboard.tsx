import React from 'react';
import {
  Box, Typography, Grid, Paper, InputBase
} from '@mui/material';
import {
  Sliders, Briefcase, ShoppingCart, Truck, Users, Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const salesData = [
  { name: 'Week 1', sales: 4000 },
  { name: 'Week 2', sales: 3000 },
  { name: 'Week 3', sales: 5000 },
  { name: 'Week 4', sales: 4500 },
];

const mockProducts = [
  { id: 1, name: 'Wireless Mouse', sku: 'WM-1024', quantity: 42, price: 25.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', status: 'in-stock' },
  { id: 2, name: 'Mechanical Keyboard', sku: 'MK-87', quantity: 8, price: 129.50, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', status: 'low-stock' },
  { id: 3, name: '4K Monitor', sku: '4KM-27-01', quantity: 0, price: 499.00, image: 'https://images.unsplash.com/photo-1586210579191-30b4a3541465?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', status: 'out-of-stock' },
  { id: 4, name: 'Webcam Pro', sku: 'WCP-1080', quantity: 15, price: 89.99, image: 'https://images.unsplash.com/photo-1609346938925-6d9b9d2be8a8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', status: 'in-stock' },
];

const QuickActionCard = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <Grid item xs={6} sm={3} md={3}>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 120, borderRadius: '20px', boxShadow: 'none', border: '1px solid #E2E8F0' }}>
        {icon}
        <Typography variant="body2" sx={{ mt: 1.5, fontWeight: 600, color: 'text.primary' }}>{text}</Typography>
      </Paper>
    </motion.div>
  </Grid>
);

const ProductCard = ({ product }: { product: typeof mockProducts[0] }) => {
  const getStatusChip = (status: string) => {
    const style = {
        borderRadius: '12px', 
        fontSize: '0.75rem', 
        fontWeight: 600,
        px: 1.5, 
        py: 0.5,
    }
    switch (status) {
      case 'in-stock':
        return <Box sx={{ ...style, bgcolor: '#D1FAE5', color: '#065F46' }}>In Stock</Box>;
      case 'low-stock':
        return <Box sx={{ ...style, bgcolor: '#FEF3C7', color: '#92400E' }}>Low Stock</Box>;
      case 'out-of-stock':
        return <Box sx={{ ...style, bgcolor: '#FEE2E2', color: '#991B1B' }}>Out of Stock</Box>;
      default: return null;
    }
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <motion.div whileHover={{ y: -5 }}>
        <Paper sx={{ overflow: 'hidden', borderRadius: '20px', boxShadow: 'none', border: '1px solid #E2E8F0' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>{product.name}</Typography>
            <Typography variant="caption" color="text.secondary">SKU: {product.sku}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>{`$${product.price.toFixed(2)}`}</Typography>
              {getStatusChip(product.status)}
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Grid>
  )
}

const Dashboard = () => {
  return (
    <Box>
        <Paper component="form" sx={{ 
            p: '8px 12px', 
            display: 'flex', 
            alignItems: 'center', 
            width: '100%', 
            borderRadius: '16px', 
            height: '56px', 
            mb: 3,
            boxShadow: 'none',
            border: '1px solid #E2E8F0'
        }}>
            <Search size={22} color="#6B7280" />
            <InputBase sx={{ ml: 2, flex: 1, fontWeight: 500 }} placeholder="Search products, invoices, or suppliers..." />
            <Sliders size={22} color="#6B7280" style={{ cursor: 'pointer' }}/>
        </Paper>

      <Paper sx={{
        p: {xs: 2, md: 3}, mb: 3, borderRadius: '24px',
        background: 'linear-gradient(135deg, #2563EB 0%, #5983EE 100%)',
        color: 'white',
      }}>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6">Welcome back, Phoenix 👋</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>₦12,580,000</Typography>
            <Typography variant="body2" sx={{opacity: 0.8}}>Total inventory value</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6" sx={{ color: '#A7F3D0' }}>+18%</Typography>
             <Typography variant="body2" sx={{opacity: 0.8}}>This Month Sales</Typography>
             <ResponsiveContainer width={120} height={50}>
               <LineChart data={salesData}>
                 <Line type="monotone" dataKey="sales" stroke="#A7F3D0" strokeWidth={2.5} dot={false} />
               </LineChart>
             </ResponsiveContainer>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <QuickActionCard icon={<Briefcase size={28} color="#2563EB" />} text="Products" />
        <QuickActionCard icon={<ShoppingCart size={28} color="#16A34A" />} text="Sales" />
        <QuickActionCard icon={<Truck size={28} color="#F97316" />} text="Purchases" />
        <QuickActionCard icon={<Users size={28} color="#8B5CF6" />} text="Suppliers" />
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Recent Products</Typography>
        <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 600, cursor: 'pointer' }}>See All</Typography>
      </Box>
      <Grid container spacing={2.5}>
        {mockProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </Grid>
    </Box>
  );
};

export default Dashboard;
