import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Grid, IconButton } from '@mui/material';
import { Download, ArrowLeft } from 'lucide-react';

const mockSales = [
  { id: 1, date: '2024-07-27', product: 'Wireless Mouse', quantity: 2, price: 12000, total: 24000, status: 'Completed' },
  { id: 2, date: '2024-07-27', product: 'Mechanical Keyboard', quantity: 1, price: 60000, total: 60000, status: 'Completed' },
  { id: 3, date: '2024-07-26', product: 'Standing Desk', quantity: 1, price: 180000, total: 180000, status: 'Pending' },
  { id: 4, date: '2024-07-25', product: 'Laptop Stand', quantity: 3, price: 22000, total: 66000, status: 'Completed' },
  { id: 5, date: '2024-07-24', product: 'USB-C Hub', quantity: 1, price: 35000, total: 35000, status: 'Canceled' },
];

const Sales = () => {
  const navigate = useNavigate();
  const totalSales = mockSales.reduce((acc, sale) => sale.status === 'Completed' ? acc + sale.total : acc, 0);

  const getStatusChip = (status) => {
    let color;
    switch (status) {
      case 'Completed':
        color = 'success';
        break;
      case 'Pending':
        color = 'warning';
        break;
      case 'Canceled':
        color = 'error';
        break;
      default:
        color = 'default';
    }
    return <Chip label={status} color={color} size="small" sx={{fontWeight: 'bold'}}/>;
  }

  const formatCurrency = (amount) => `₦${new Intl.NumberFormat('en-NG').format(amount)}`;

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, mt: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1, color: 'text.primary' }}>
            <ArrowLeft />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Sales</Typography>
            <Typography variant="body1" color="text.secondary">Track your sales performance</Typography>
          </Box>
          <Button variant="contained" startIcon={<Download />} sx={{ borderRadius: '12px' }}>
            Export
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Sales</Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1 }}>{formatCurrency(totalSales)}</Typography>
            <Typography variant="body2" color="text.secondary">for all completed sales</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, borderRadius: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Transactions</Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1 }}>{mockSales.length}</Typography>
            <Typography variant="body2" color="text.secondary">in the last 30 days</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell sx={{fontWeight: 'bold'}}>{sale.product}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>{formatCurrency(sale.price)}</TableCell>
                  <TableCell>{formatCurrency(sale.total)}</TableCell>
                  <TableCell>{getStatusChip(sale.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Sales;
