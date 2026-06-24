import { Outlet, useLocation, NavLink, useNavigate } from 'react-router-dom';
import {
    Box, Typography, CssBaseline, useTheme, useMediaQuery, Avatar, InputBase, IconButton, Badge, Popper, Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider
} from '@mui/material';
import { LogOut, ChevronDown, Search, Bell, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNavigation from './BottomNavigation';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const TopBar = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const navigate = useNavigate();
    const location = useLocation();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => {
        toast.success('Logged out successfully');
        handleClose();
        navigate('/login');
    };

    const showDemoToast = () => {
        toast.error('This is an error message!');
    }

    const mainPages = ['/dashboard', '/sales', '/reports', '/more', '/settings', '/products', '/inventory'];
    const showBackButton = !mainPages.includes(location.pathname) && !isDesktop;


    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                height: 68,
                borderBottom: `1px solid ${theme.palette.divider}`,
                bgcolor: 'background.paper',
            }}
        >
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                {showBackButton ? (
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowLeft size={22} />
                    </IconButton>
                ) : (
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', ml: 1 }}>
                        InventoryPro
                    </Typography>
                )}
            </Box>

            {isDesktop && (
              <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  bgcolor: theme.palette.background.default, 
                  borderRadius: '12px', 
                  p: '6px 12px', 
                  width: '40%'
              }}>
                  <Search size={20} color={theme.palette.text.secondary} />
                  <InputBase sx={{ ml: 1.5, flex: 1, fontWeight: 500, fontSize: '0.9rem' }} placeholder="Search..." />
              </Box>
            )}
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                 {!isDesktop && (
                    <IconButton>
                         <Search size={22} color={theme.palette.text.secondary} />
                    </IconButton>
                )}
                <IconButton onClick={showDemoToast}>
                    <Badge color="error" variant="dot">
                        <Bell size={22} color={theme.palette.text.secondary} />
                    </Badge>
                </IconButton>

                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleClick}>
                    <Avatar src="https://i.pravatar.cc/300" sx={{ width: 40, height: 40 }} />
                     {isDesktop && <ChevronDown size={20} color={theme.palette.text.secondary} style={{ marginLeft: 8 }} />}
                </Box>

                <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition sx={{zIndex: 1200}}>
                    {({ TransitionProps }) => (
                         <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10}} transition={{ duration: 0.2}} {...TransitionProps}>
                            <Paper sx={{ mt: 1.5, borderRadius: 3, boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)', width: 240, border: `1px solid ${theme.palette.divider}` }}>
                                <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                                     <Avatar src="https://i.pravatar.cc/300" sx={{ width: 48, height: 48 }} />
                                     <Box sx={{ ml: 1.5 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Phoenix</Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Admin</Typography>
                                    </Box>
                                </Box>
                                <Divider />
                                <List disablePadding sx={{p: 1}}>
                                    <ListItemButton sx={{ borderRadius: 2 }} onClick={handleLogout}>
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

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
            <CssBaseline />
             <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    className: '',
                    duration: 5000,
                    style: {
                        background: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        borderRadius: '12px',
                        boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)',
                        border: `1px solid ${theme.palette.divider}`
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: theme.palette.success.main,
                            secondary: theme.palette.background.paper,
                        },
                    },
                     error: {
                        iconTheme: {
                            primary: theme.palette.error.main,
                            secondary: theme.palette.background.paper,
                        },
                    },
                }}
            />
            <TopBar />
            <Box component="main" sx={{ p: isDesktop ? 4 : 2, pb: '88px' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </Box>
            {!location.pathname.startsWith('/login') && !location.pathname.startsWith('/register') && <BottomNavigation />}
        </Box>
    );
};

export default Layout;
