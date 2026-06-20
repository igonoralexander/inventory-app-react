import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Paper, Typography } from '@mui/material';
import { LayoutGrid, Package, BarChart2, User, CreditCard } from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { path: '/inventory', icon: Package, label: 'Products' },
  { path: '/sales', icon: CreditCard, label: 'Sales' },
  { path: '/reports', icon: BarChart2, label: 'Reports' },
  { path: '/settings', icon: User, label: 'Profile' },
];

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleNavigate = (path: string) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <Paper
      component={motion.div}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: 'block', md: 'none' },
        height: '72px',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        boxShadow: '0 -5px 20px rgba(0,0,0,0.08)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        background: '#FFFFFF',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%', px: 1 }}>
        {navItems.map((item) => (
          <Box
            key={item.path}
            onClick={() => handleNavigate(item.path)}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: activeTab === item.path ? 'primary.main' : 'text.secondary',
              flex: 1,
              height: '100%',
            }}
          >
            <item.icon size={24} strokeWidth={activeTab === item.path ? 2.5 : 2} />
            <Typography variant="caption" sx={{ mt: 0.5, fontWeight: activeTab === item.path ? 600 : 500 }}>
              {item.label}
            </Typography>
            {activeTab === item.path && (
              <motion.div
                layoutId="active-indicator"
                style={{
                  position: 'absolute',
                  bottom: 8,
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: '#2563EB',
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default BottomNavigation;