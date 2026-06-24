import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Paper } from '@mui/material';
import InventoryReports from '../components/reports/InventoryReports';
import SalesReports from '../components/reports/SalesReports';
import StockReports from '../components/reports/StockReports';
import ReportExport from '../components/reports/ReportExport';
import { motion } from 'framer-motion';

const Reports = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } })
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <motion.div custom={0} initial="hidden" animate="visible" variants={FADE_IN_VARIANTS}>
        <Box sx={{ mb: 4, mt: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Business Reports</Typography>
          <Typography variant="body1" color="text.secondary">An overview of your business performance.</Typography>
        </Box>
      </motion.div>

      <Paper sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab label="Inventory" />
          <Tab label="Sales" />
          <Tab label="Stock" />
        </Tabs>
      </Paper>

      <Box sx={{ mt: 3 }}>
        {value === 0 && <InventoryReports />}
        {value === 1 && <SalesReports />}
        {value === 2 && <StockReports />}
      </Box>

      <ReportExport />
    </Box>
  );
};

export default Reports;
