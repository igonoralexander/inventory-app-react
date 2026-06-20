import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import { LayoutGrid, DollarSign, Package, BarChart2, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNavigation from './BottomNavigation';

const drawerWidth = 260;

const navItems = [
  { text: 'Dashboard', icon: <LayoutGrid size={20} />, path: '/dashboard' },
  { text: 'Sales', icon: <DollarSign size={20} />, path: '/sales' },
  { text: 'Products', icon: <Package size={20} />, path: '/inventory' },
  { text: 'Reports', icon: <BarChart2 size={20} />, path: '/reports' },
  { text: 'Settings', icon: <Settings size={20} />, path: '/settings' },
];

const Layout = () => {
    const location = useLocation();

    const pageTitleMapping = {
        '/dashboard': 'Dashboard',
        '/sales': 'Sales',
        '/inventory': 'Products',
        '/reports': 'Reports',
        '/settings': 'Settings',
        '/more': 'More',
    };

    const pageTitle = pageTitleMapping[location.pathname] || 'Dashboard';

    return (
        <Box sx={{ display: 'flex', bgcolor: '#F8F9FA' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    boxShadow: 'none',
                    borderBottom: '1px solid #E2E8F0',
                    bgcolor: '#FFFFFF',
                    display: { xs: 'block', md: 'block' } 
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600, color: '#1E293B' }}>
                        {pageTitle}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { 
                        width: drawerWidth, 
                        boxSizing: 'border-box',
                        borderRight: 'none',
                        backgroundColor: '#FFFFFF',
                    },
                }}
            >
                <Toolbar sx={{ height: 64, borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', color: 'primary.main', letterSpacing: '0.5px' }}>
                        InventoryPro
                    </Typography>
                </Toolbar>
                <Box sx={{ overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <List sx={{ flexGrow: 1, pt: 2 }}>
                        {navItems.map((item) => (
                            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                                <ListItemButton
                                    component={NavLink}
                                    to={item.path}
                                    sx={{
                                        borderRadius: 2,
                                        color: '#475569',
                                        '&.active': {
                                            backgroundColor: 'primary.main',
                                            color: 'primary.contrastText',
                                            boxShadow: '0 4px 12px 0 rgba(37, 99, 235, 0.25)',
                                            '& .MuiListItemIcon-root': {
                                                color: 'primary.contrastText',
                                            },
                                            '&:hover': {
                                                backgroundColor: 'primary.dark',
                                            }
                                        },
                                        '&:hover': {
                                            backgroundColor: '#F1F5F9',
                                        },
                                        transition: 'background-color 0.3s, color 0.3s',
                                        py: 1.5,
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{ pb: 2}}>
                        <ListItem disablePadding>
                            <ListItemButton component={NavLink} to="/login" sx={{ borderRadius: 2, color: '#475569', '&:hover': { backgroundColor: '#F1F5F9'} }}>
                                <ListItemIcon sx={{ minWidth: 40 }}><LogOut size={20} /></ListItemIcon>
                                <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 500 }}/>
                            </ListItemButton>
                        </ListItem>
                    </Box>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1, 
                    p: { xs: 2, sm: 3, md: 4 }, 
                    width: { sm: `calc(100% - ${drawerWidth}px)` }, 
                    minHeight: '100vh',
                    pb: { xs: '80px', md: 4 }
                }}
            >
                <Toolbar />
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                    <Outlet />
                </motion.div>
            </Box>
            <BottomNavigation />
        </Box>
    );
};

export default Layout;