import React from 'react';
import {
  Box, Typography, Grid, Paper, InputBase, IconButton, Chip, Fab, Avatar
} from '@mui/material';
import { Search, Sliders, Plus, DollarSign, Receipt, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const mockSales = [
  { id: 'INV-2024-001', customer: 'Lana Steiner', date: '2024-07-28', amount: 150.75, status: 'Paid' },
  { id: 'INV-2024-002', customer: 'Corey Schleifer', date: '2024-07-28', amount: 320.00, status: 'Pending' },
  { id: 'INV-2024-003', customer: 'Phoenix Baker', date: '2024-07-27', amount: 89.99, status: 'Paid' },
  { id: 'INV-2024-004', customer: 'Olivia Rhyne', date: '2024-07-26', amount: 540.50, status: 'Overdue' },
  { id: 'INV-2024-005', customer: 'Liam James', date: '2024-07-25', amount: 25.00, status: 'Paid' },
];

const summaryData = [
  { title: "Today's Revenue", value: "$1,840", icon: <DollarSign />, color: '#D1FAE5', iconColor: '#065F46' },
  { title: "Weekly Revenue", value: "$9,320", icon: <TrendingUp />, color: '#E0F2FE', iconColor: '#0284C7' },
  { title: "Transactions", value: "152", icon: <Receipt />, color: '#FEF3C7', iconColor: '#92400E' },
];

const StatCard = ({ title, value, icon, color, iconColor }: { title: string, value: string, icon: React.ReactNode, color: string, iconColor: string }) => (
    <Grid item xs={4}>
         <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', borderRadius: 4 }}>
            <Avatar sx={{ bgcolor: color, color: iconColor, width: 48, height: 48, mr: 1.5, borderRadius: 3 }}>
                {icon}
            </Avatar>
            <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{title}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{value}</Typography>
            </Box>
        </Paper>
    </Grid>
);

const SaleCard = ({ sale }: { sale: typeof mockSales[0] }) => {
  const getStatusChip = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Chip label="Paid" size="small" color="success" sx={{ fontWeight: 500 }} />;
      case 'Pending':
        return <Chip label="Pending" size="small" color="warning" sx={{ fontWeight: 500 }} />;
      case 'Overdue':
        return <Chip label="Overdue" size="small" color="error" sx={{ fontWeight: 500 }} />;
      default: return null;
    }
  }

  return (
    <Grid item xs={12}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 4 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{sale.id}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{sale.customer} - {sale.date}</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{`$${sale.amount.toFixed(2)}`}</Typography>
            {getStatusChip(sale.status)}
          </Box>
        </Paper>
      </motion.div>
    </Grid>
  )
}

const Sales = () => {
  return (
    <Box sx={{ px: '20px', pb: '20px' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', my: 3 }}>Sales</Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {summaryData.map(item => <StatCard key={item.title} {...item} />)}
      </Grid>

      <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', borderRadius: '18px', height: '56px', mb: 3 }}>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search transactions..." />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <Search />
          </IconButton>
           <IconButton sx={{ p: '10px' }} aria-label="filter">
            <Sliders />
          </IconButton>
        </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Recent Transactions</Typography>
      </Box>
      
      <Grid container spacing={2}>
        {mockSales.map(sale => <SaleCard key={sale.id} sale={sale} />)}
      </Grid>
      
      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 88, right: 20 }}>
        <Plus />
      </Fab>
    </Box>
  );
};

export default Sales;
