import React from 'react';
import {
  Card, CardContent, Typography, Grid, Paper, List, ListItem, ListItemText, 
  Divider, Box, Avatar, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Chip
} from '@mui/material';
import {
  Package, DollarSign, ArchiveX, Laptop, Keyboard, Mouse, Monitor, Camera
} from 'lucide-react';
import { motion } from 'framer-motion';

const mockInventory = [
  { id: 1, name: 'Laptop', quantity: 10, price: 1200, category: 'Electronics', icon: <Laptop size={20} /> },
  { id: 2, name: 'Keyboard', quantity: 25, price: 75, category: 'Peripherals', icon: <Keyboard size={20} /> },
  { id: 3, name: 'Mouse', quantity: 50, price: 25, category: 'Peripherals', icon: <Mouse size={20} /> },
  { id: 4, name: 'Monitor', quantity: 5, price: 300, category: 'Displays', icon: <Monitor size={20} /> },
  { id: 5, name: 'Webcam', quantity: 15, price: 50, category: 'Peripherals', icon: <Camera size={20} /> },
];

const recentActivity = [
  { id: 1, user: 'Admin', action: 'added', itemName: 'Docking Station', time: '2 hours ago' },
  { id: 2, user: 'Admin', action: 'updated', itemName: 'Laptop', time: '5 hours ago' },
  { id: 3, user: 'Admin', action: 'deleted', itemName: 'Old Printer', time: '1 day ago' },
];

const StatCard = ({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: string }) => (
  <Card component={motion.div} whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }} sx={{ display: 'flex', alignItems: 'center', p: 3, borderRadius: 4, height: '100%' }}>
    <Avatar sx={{ bgcolor: color, width: 56, height: 56, mr: 2, borderRadius: 3 }}>
      {icon}
    </Avatar>
    <Box>
      <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>{title}</Typography>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>{value}</Typography>
    </Box>
  </Card>
);

const Dashboard = () => {
  const totalItems = mockInventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = mockInventory.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const lowStockItemsCount = mockInventory.filter(item => item.quantity < 20).length;

  return (
    <Grid container spacing={3}>
      {/* Stat Cards */}
      <Grid item xs={12} sm={6} md={4}>
        <StatCard title="Total Items" value={totalItems} icon={<Package />} color="#E0F2FE" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatCard title="Inventory Value" value={`$${totalValue.toLocaleString()}`} icon={<DollarSign />} color="#D1FAE5" />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard title="Low on Stock" value={lowStockItemsCount} icon={<ArchiveX />} color="#FEF2F2" />
      </Grid>

      {/* Full Inventory Overview */}
      <Grid item xs={12} lg={8}>
        <Paper sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>Full Inventory Overview</Typography>
            <TableContainer>
              <Table size="medium">
                <TableHead>
                  <TableRow sx={{ '& .MuiTableCell-root': { borderBottom: 'none', bgcolor: '#F9FAFB', fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem' } }}>
                    <TableCell>Item</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockInventory.map(item => (
                    <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.primary' }}>
                          <Avatar sx={{ bgcolor: '#F3F4F6', color: '#4B5563', width: 40, height: 40, borderRadius: 2, mr: 2 }}>{item.icon}</Avatar>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell><Chip label={item.category} size="small" sx={{ bgcolor: '#EFF6FF', color: '#3B82F6', fontWeight: 500 }} /></TableCell>
                      <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 500 }}>{item.quantity}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600, color: 'text.primary' }}>{`$${item.price.toLocaleString()}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Paper>
      </Grid>

      {/* Recent Activity */}
      <Grid item xs={12} lg={4}>
        <Paper sx={{ borderRadius: 4, height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>Recent Activity</Typography>
            <List disablePadding>
              {recentActivity.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <ListItem disablePadding sx={{ py: 1.5 }}>
                    <ListItemText
                      primary={<Typography variant='subtitle2' sx={{ fontWeight: 600 }}>{`${activity.itemName} ${activity.action}`}</Typography>}
                      secondary={`by ${activity.user} • ${activity.time}`}
                    />
                  </ListItem>
                  {index < recentActivity.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
