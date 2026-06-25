import React from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Grid } from '@mui/material';
import { Download } from 'lucide-react';

const mockSales = [
  { id: 1, date: '2024-07-27', product: 'Wireless Mouse', quantity: 2, price: 25.99, total: 51.98, status: 'Completed' },
  { id: 2, date: '2024-07-27', product: 'Mechanical Keyboard', quantity: 1, price: 129.99, total: 129.99, status: 'Completed' },
  { id: 3, date: '2024-07-26', product: 'Standing Desk', quantity: 1, price: 399.99, total: 399.99, status: 'Pending' },
  { id: 4, date: '2024-07-25', product: 'Laptop Stand', quantity: 3, price: 49.99, total: 149.97, status: 'Completed' },
  { id: 5, date: '2024-07-24', product: 'USB-C Hub', quantity: 1, price: 79.99, total: 79.99, status: 'Canceled' },
];

const Sales = () => {
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

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Sales</Typography>
          <Typography variant="body1" color="text.secondary">Track your sales performance</Typography>
        </Box>
        <Button variant="contained" startIcon={<Download />} sx={{ borderRadius: '12px' }}>
          Export
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Sales</Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1 }}>${totalSales.toFixed(2)}</Typography>
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
                  <TableCell>${sale.price.toFixed(2)}</TableCell>
                  <TableCell>${sale.total.toFixed(2)}</TableCell>
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
