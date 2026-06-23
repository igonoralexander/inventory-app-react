import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import InventoryIcon from '@mui/icons-material/Inventory';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500); // A slightly longer delay for the animations to complete

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #E3F2FD 100%)',
        textAlign: 'center',
        p: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <InventoryIcon sx={{
            fontSize: '6rem',
            color: 'primary.main',
            mb: 2,
            filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.1))'
        }} />

        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}
        >
          Inventory Management System
        </Typography>

        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          Manage Products • Track Sales • Monitor Inventory
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ width: '250px' }}
      >
        <LinearProgress color="primary" />
      </motion.div>
    </Box>
  );
};

export default SplashScreen;
