import { Outlet, useLocation, NavLink } from 'react-router-dom';
import {
    Box, Typography, CssBaseline, useTheme, useMediaQuery, Avatar, InputBase, IconButton, Badge, Popper, Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider
} from '@mui/material';
import { LogOut, ChevronDown, Search, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNavigation from './BottomNavigation';
import React from 'react';

const TopBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 3,
                height: 68,
                borderBottom: '1px solid #E2E8F0',
                bgcolor: 'background.paper',
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                InventoryPro
            </Typography>

            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                bgcolor: '#F8F9FA', 
                borderRadius: '12px', 
                p: '6px 12px', 
                width: '40%'
            }}>
                <Search size={20} color="#6B7280" />
                <InputBase sx={{ ml: 1.5, flex: 1, fontWeight: 500, fontSize: '0.9rem' }} placeholder="Search products, invoices, or suppliers..." />
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <IconButton>
                    <Badge color="error" variant="dot">
                        <Bell size={22} color="#64748B" />
                    </Badge>
                </IconButton>

                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleClick}>
                    <Avatar src="https://i.pravatar.cc/300" sx={{ width: 40, height: 40 }} />
                    <ChevronDown size={20} color="#64748B" style={{ marginLeft: 8 }} />
                </Box>

                <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition sx={{zIndex: 1200}}>
                    {({ TransitionProps }) => (
                         <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10}} transition={{ duration: 0.2}} {...TransitionProps}>
                            <Paper sx={{ mt: 1.5, borderRadius: 3, boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)', width: 240, border: '1px solid #E2E8F0' }}>
                                <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                                     <Avatar src="https://i.pravatar.cc/300" sx={{ width: 48, height: 48 }} />
                                     <Box sx={{ ml: 1.5 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Phoenix</Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Admin</Typography>
                                    </Box>
                                </Box>
                                <Divider />
                                <List disablePadding sx={{p: 1}}>
                                    <ListItemButton component={NavLink} to="/login" sx={{ borderRadius: 2 }}>
                                        <ListItemIcon sx={{ minWidth: 40 }}><LogOut size={20} /></ListItemIcon>
                                        <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 500 }}/>
                                    </ListItemButton>
                                </List>
                            </Paper>
                        </motion.div>
                    )}
                </Popper>
            </Box>
        </Box>
    );
};

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
        <Box sx={{ bgcolor: '#F8F9FB', minHeight: '100vh' }}>
            <CssBaseline />
            <TopBar />
            <Box component="main" sx={{ p: 4, pb: '88px' }}>
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
