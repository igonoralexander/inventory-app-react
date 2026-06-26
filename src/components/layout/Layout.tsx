import React, { useState } from 'react';
import {
    Box, CssBaseline, ThemeProvider, GlobalStyles,
    Paper, BottomNavigation, BottomNavigationAction, Menu, MenuItem,
    AppBar, Toolbar, Typography, useMediaQuery
} from '@mui/material';
import {
  Home, Package, DollarSign, List as ListIcon, MoreHorizontal, BarChart2, ShoppingCart
} from 'lucide-react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import theme from '../../theme';

const navItems = [
    { path: '/', label: 'Dashboard', icon: <Home /> },
    { path: '/inventory', label: 'Inventory', icon: <ListIcon /> },
    { path: '/inventory/record-purchase', label: 'Purchase', icon: <DollarSign /> },
    { path: '/products', label: 'Products', icon: <Package /> },
];

const moreNavItems = [
    { path: '/sales', label: 'Sales', icon: ShoppingCart },
    { path: '/reports', label: 'Reports', icon: BarChart2 }
];

const getPageTitle = (pathname) => {
    const allItems = [...navItems, ...moreNavItems];
    const item = allItems.find(item => item.path === pathname);
    if (!item) {
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length === 0) return 'Dashboard';
        return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ')).join(' ');
    }
    return item.label;
}

export const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = useState(location.pathname);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (path) => {
        setAnchorEl(null);
        if (typeof path === 'string') {
            navigate(path);
            setValue(path);
        }
    };

    const pageTitle = getPageTitle(location.pathname);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <CssBaseline />
                <GlobalStyles styles={{ body: { backgroundColor: theme.palette.background.default, overflow: 'hidden' } }} />

                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {pageTitle}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto', p: { xs: 2, md: 3 } }}>
                    <Outlet />
                </Box>

                <Paper sx={{ borderTop: `1px solid ${theme.palette.divider}`}} elevation={3}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            if (newValue !== 'more') {
                                setValue(newValue);
                                navigate(newValue);
                            }
                        }}
                    >
                        {navItems.map(item => (
                            <BottomNavigationAction key={item.path} label={item.label} value={item.path} icon={item.icon} />
                        ))}
                        <BottomNavigationAction key="more" label="More" value="more" icon={<MoreHorizontal />} onClick={handleMenuClick} />
                    </BottomNavigation>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => handleMenuClose(null)}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        {moreNavItems.map(item => {
                            const Icon = item.icon;
                            return (
                                <MenuItem key={item.path} onClick={() => handleMenuClose(item.path)} sx={{pl:2, pr: 3, py: 1.5}}>
                                    <Icon size={18} />
                                    <Typography sx={{ml: 1.5}}>{item.label}</Typography>
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </Paper>
            </Box>
        </ThemeProvider>
    );
};