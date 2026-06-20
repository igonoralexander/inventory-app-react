import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { Box, Typography, CssBaseline, useTheme, useMediaQuery, Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { LogOut, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNavigation from './BottomNavigation';

const sidebarWidth = 240;

const Sidebar = () => (
    <Box
        sx={{
            width: sidebarWidth,
            flexShrink: 0,
            bgcolor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            borderRight: '1px solid #E2E8F0'
        }}
    >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 64, borderBottom: '1px solid #E2E8F0' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                InventoryPro
            </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, p: 2 }}>
            {/* This space is intentionally left blank to push the user profile section to the bottom */}
        </Box>
        <Box sx={{ p: 2, borderTop: '1px solid #E2E8F0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 1.5, borderRadius: 2, '&:hover': {backgroundColor: '#F8F9FA'} }}>
                <Avatar src="https://i.pravatar.cc/300" sx={{ width: 40, height: 40 }} />
                <Box sx={{ ml: 1.5, flexGrow: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Phoenix</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Admin</Typography>
                </Box>
                <ChevronDown size={20} color="#64748B" />
            </Box>
             <ListItem disablePadding sx={{mt: 1}}>
                <ListItemButton component={NavLink} to="/login" sx={{ borderRadius: 2, color: 'text.secondary', height: 56 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}><LogOut size={20} /></ListItemIcon>
                    <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 500 }}/>
                </ListItemButton>
            </ListItem>
        </Box>
    </Box>
);

const Layout = () => {
    const location = useLocation();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    if (!isDesktop) {
        return (
             <Box sx={{ bgcolor: '#F8F9FA', minHeight: '100vh', pb: '80px' }}>
                <Box sx={{ p: { xs: 2, sm: 3 } }}>
                    <Outlet />
                </Box>
                <BottomNavigation />
            </Box>
        )
    }

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <CssBaseline />
            {/* This container wraps the app shell and provides spacing */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 4,
                pb: '88px', // Added extra padding here: 64px (nav) + 24px (gap)
            }}>
                {/* The Centered Application Shell */}
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '1280px',
                        minHeight: 'calc(100vh - 32px - 88px)', // Adjusted min-height
                        borderRadius: '24px',
                        bgcolor: 'background.paper',
                        boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        overflow: 'hidden',
                    }}
                >
                    <Sidebar />
                    <Box component="main" sx={{ 
                        flexGrow: 1, 
                        overflowY: 'auto',
                        bgcolor: '#F8F9FB',
                        p: 4,
                    }}>
                         <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                            <Outlet />
                        </motion.div>
                    </Box>
                </Box>
            </Box>
            <BottomNavigation />
        </Box>
    );
};

export default Layout;
