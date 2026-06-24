import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Divider } from '@mui/material';
import { ChevronRight } from 'lucide-react';

const stockReports = [
  { title: 'Stock In Report', description: 'View a history of all stock received.' },
  { title: 'Stock Adjustment Report', description: 'View a history of all stock adjustments.' },
];

const StockReports = () => {
  return (
    <Paper sx={{ p: 2, borderRadius: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Stock Reports</Typography>
      <List>
        {stockReports.map((report, index) => (
          <React.Fragment key={report.title}>
            <ListItem button>
              <ListItemText primary={report.title} secondary={report.description} />
              <ChevronRight />
            </ListItem>
            {index < stockReports.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default StockReports;
