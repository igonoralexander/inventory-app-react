import React from 'react';
import { Paper, BottomNavigation as MuiBottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Package, DollarSign, ClipboardList, MoreHorizontal } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home /> },
    { path: '/inventory', label: 'Inventory', icon: <ClipboardList /> },
    { path: '/products', label: 'Products', icon: <Package /> },
    { path: '/sales', label: 'Sales', icon: <DollarSign /> },
    { path: '/more', label: 'More', icon: <MoreHorizontal /> },
];

const BottomNavigation = () => {
    const theme = useTheme();
    const location = useLocation();

    return (
            <Paper 
                sx={{ 
                    position: 'fixed', 
                    bottom: 0, 
                    left: 0, 
                    right: 0,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    borderRadius: 0,
                    zIndex: 1100
                }} 
                elevation={0}
            >
                <MuiBottomNavigation
                    showLabels
                    value={location.pathname}
                    sx={{ 
                        bgcolor: 'background.paper',
                        height: '64px',
                    }}
                >
                    {navItems.map(item => (
                        <BottomNavigationAction
                            key={item.path}
                            component={NavLink}
                            to={item.path}
                            value={item.path}
                            label={item.label}
                            icon={item.icon}
                            sx={{
                                '&.active': {
                                    color: theme.palette.primary.main,
                                },
                                color: theme.palette.text.secondary,
                                // This will apply the active color to the icon as well
                                '&.active > .MuiBottomNavigationAction-label': {
                                    color: theme.palette.primary.main,
                                },
                            }}
                        />
                    ))}
                </MuiBottomNavigation>
            </Paper>
    );
};

export default BottomNavigation;
