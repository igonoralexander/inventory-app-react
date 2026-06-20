import React from 'react';
import {
  Box, Typography, Grid, Paper, InputBase, Avatar, Badge, Fab
} from '@mui/material';
import {
  Search, Bell, Sliders, Briefcase, ShoppingCart, Truck, Users, BarChart, PieChart, CreditCard, Settings, Plus
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
  { id: 4, name: 'Webcam Pro', sku: 'WCP-1080', quantity: 15, price: 89.99, image: 'https://images.unsplash.com/photo-1609346938925-6d9b9d2ise8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', status: 'in-stock' },
];

const QuickActionCard = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <Grid item xs={6} sm={3}>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 100 }}>
        {icon}
        <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>{text}</Typography>
      </Paper>
    </motion.div>
  </Grid>
);

const ProductCard = ({ product }: { product: typeof mockProducts[0] }) => {
  const getStatusChip = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <Box sx={{ px: 1, py: 0.5, bgcolor: '#D1FAE5', color: '#065F46', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 500 }}>In Stock</Box>;
      case 'low-stock':
        return <Box sx={{ px: 1, py: 0.5, bgcolor: '#FEF3C7', color: '#92400E', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 500 }}>Low Stock</Box>;
      case 'out-of-stock':
        return <Box sx={{ px: 1, py: 0.5, bgcolor: '#FEE2E2', color: '#991B1B', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 500 }}>Out of Stock</Box>;
      default: return null;
    }
  }

  return (
    <Grid item xs={6}>
      <motion.div whileHover={{ y: -5 }}>
        <Paper sx={{ overflow: 'hidden' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: 100, objectFit: 'cover' }} />
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>{product.name}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>SKU: {product.sku}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>{`$${product.price.toFixed(2)}`}</Typography>
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
    <Box sx={{ px: '20px', pb: '20px' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: '16px' }}>
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', flex: 1, borderRadius: '18px', height: '56px' }}>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search products, invoices, suppliers..." />
          <Sliders size={20} style={{ margin: '0 10px', color: '#6B7280' }}/>
        </Paper>
        <Badge badgeContent={4} color="primary" sx={{ mx: 2}}>
          <Bell size={24} color="#6B7280" />
        </Badge>
        <Avatar alt="User" src="https://i.pravatar.cc/300" />
      </Box>

      {/* Dashboard Summary */}
      <Paper sx={{
        p: 3, mb: 3,
        background: 'linear-gradient(135deg, #2563EB 0%, #5983EE 100%)',
        color: 'white', height: '170px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6">Good Morning, Phoenix 👋</Typography>
            <Typography variant="body2">Total Inventory Value</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>₦12,580,000</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
             <Typography variant="body2">This Month Sales</Typography>
            <Typography variant="h6" sx={{ color: '#A7F3D0' }}>+18%</Typography>
             <ResponsiveContainer width={100} height={40}>
               <LineChart data={salesData}>
                 <Line type="monotone" dataKey="sales" stroke="#A7F3D0" strokeWidth={2} dot={false} />
               </LineChart>
             </ResponsiveContainer>
          </Box>
        </Box>
      </Paper>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <QuickActionCard icon={<Briefcase color="#2563EB" />} text="Products" />
        <QuickActionCard icon={<ShoppingCart color="#16A34A" />} text="Sales" />
        <QuickActionCard icon={<Truck color="#F97316" />} text="Purchases" />
        <QuickActionCard icon={<Users color="#8B5CF6" />} text="Suppliers" />
        <QuickActionCard icon={<BarChart color="#3B82F6" />} text="Reports" />
        <QuickActionCard icon={<PieChart color="#EC4899" />} text="Analytics" />
        <QuickActionCard icon={<CreditCard color="#F59E0B" />} text="Expenses" />
        <QuickActionCard icon={<Settings color="#6B7280" />} text="Settings" />
      </Grid>

      {/* Inventory Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Inventory</Typography>
        <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>See All</Typography>
      </Box>
      <Grid container spacing={2}>
        {mockProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </Grid>

      {/* FAB */}
      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 88, right: 20 }}>
        <Plus />
      </Fab>

    </Box>
  );
};

export default Dashboard;
