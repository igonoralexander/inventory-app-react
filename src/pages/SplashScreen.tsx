import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#FFFFFF',
        textAlign: 'center',
        p: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography 
          variant="h4" 
          component="h1"
          sx={{ 
            fontWeight: 'bold', 
            color: 'text.primary',
            mb: 1,
          }}
        >
          Inventory Management System
        </Typography>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Typography 
          variant="body1" 
          sx={{ mb: 4, color: 'text.secondary' }}
        >
          Manage Products • Track Sales • Monitor Inventory
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <CircularProgress size={24} sx={{ mb: 4 }} />
      </motion.div>

      <Box sx={{ position: 'absolute', bottom: 24 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Version 1.0
          </Typography>
      </Box>
    </Box>
  );
};

export default SplashScreen;
