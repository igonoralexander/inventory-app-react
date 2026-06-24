import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { FileDown } from 'lucide-react';

const ReportExport = () => {
  return (
    <Paper sx={{ p: 2, mt: 3, borderRadius: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Export</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" startIcon={<FileDown size={16} />}>Export to PDF</Button>
        <Button variant="contained" startIcon={<FileDown size={16} />}>Export to Excel</Button>
      </Box>
    </Paper>
  );
};

export default ReportExport;
