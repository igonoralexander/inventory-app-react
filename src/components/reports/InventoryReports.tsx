
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Divider } from '@mui/material';
import { ChevronRight } from 'lucide-react';

const inventoryReports = [
  { title: 'Current Stock', description: 'View current stock levels for all products.' },
  { title: 'Low Stock', description: 'Products that are running low on stock.' },
  { title: 'Out of Stock', description: 'Products that are completely out of stock.' },
  { title: 'Inventory Value', description: 'The total value of your current inventory.' },
];

const InventoryReports = () => {
  return (
    <Paper sx={{ p: 2, borderRadius: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Inventory Reports</Typography>
      <List>
        {inventoryReports.map((report, index) => (
          <React.Fragment key={report.title}>
            <ListItem button>
              <ListItemText primary={report.title} secondary={report.description} />
              <ChevronRight />
            </ListItem>
            {index < inventoryReports.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default InventoryReports;
