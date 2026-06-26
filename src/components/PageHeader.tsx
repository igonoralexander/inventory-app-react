import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowLeft } from 'lucide-react';

const PageHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mr: 1, color: 'text.primary' }}>
        <ArrowLeft />
      </IconButton>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
    </Box>
  );
};

export default PageHeader;
