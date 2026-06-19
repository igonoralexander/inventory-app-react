import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import { LayoutGrid, Archive, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const drawerWidth = 260;

const navItems = [
  { text: 'Dashboard', icon: <LayoutGrid size={20} />, path: '/app/dashboard' },
  { text: 'Inventory', icon: <Archive size={20} />, path: '/app/inventory' },
  { text: 'Settings', icon: <Settings size={20} />, path: '/app/settings' },
];

const Layout = () => {
    const location = useLocation();

    const pageTitle = navItems.find(item => location.pathname.startsWith(item.path))?.text || 'Dashboard';

    return (
        <Box sx={{ display: 'flex', bgcolor: 'background.default' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    boxShadow: 'none',
                    borderBottom: '1px solid #E2E8F0',
                    bgcolor: 'background.paper',
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {pageTitle}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { 
                        width: drawerWidth, 
                        boxSizing: 'border-box',
                        borderRight: 'none',
                        backgroundColor: 'background.paper',
                    },
                }}
            >
                <Toolbar sx={{ height: 64, borderBottom: '1px solid #E2E8F0' }}>
                    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', color: 'primary.main', letterSpacing: '0.5px' }}>
                        InventoryPro
                    </Typography>
                </Toolbar>
                <Box sx={{ overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <List sx={{ flexGrow: 1 }}>
                        {navItems.map((item) => (
                            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                                <ListItemButton
                                    component={NavLink}
                                    to={item.path}
                                    sx={{
                                        borderRadius: 2,
                                        color: 'text.secondary',
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
                                            backgroundColor: 'action.hover',
                                        },
                                        transition: 'background-color 0.3s, color 0.3s',
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Box>
                        <ListItem disablePadding>
                            <ListItemButton component={NavLink} to="/login" sx={{ borderRadius: 2, color: 'text.secondary' }}>
                                <ListItemIcon sx={{ minWidth: 40 }}><LogOut size={20} /></ListItemIcon>
                                <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 500 }}/>
                            </ListItemButton>
                        </ListItem>
                    </Box>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, minHeight: '100vh' }}
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
        </Box>
    );
};

export default Layout;
