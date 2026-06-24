import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Divider } from '@mui/material';
import { ChevronRight } from 'lucide-react';

const salesReports = [
  { title: 'Daily Sales', description: 'View sales for the current day.' },
  { title: 'Weekly Sales', description: 'View sales for the current week.' },
  { title: 'Monthly Sales', description: 'View sales for the current month.' },
  { title: 'Yearly Sales', description: 'View sales for the current year.' },
  { title: 'Revenue', description: 'Total revenue from all sales.' },
  { title: 'Profit', description: 'Total profit from all sales.' },
  { title: 'Best Selling Products', description: 'Products with the highest sales volume.' },
];

const SalesReports = () => {
  return (
    <Paper sx={{ p: 2, borderRadius: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Sales Reports</Typography>
      <List>
        {salesReports.map((report, index) => (
          <React.Fragment key={report.title}>
            <ListItem button>
              <ListItemText primary={report.title} secondary={report.description} />
              <ChevronRight />
            </ListItem>
            {index < salesReports.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default SalesReports;
