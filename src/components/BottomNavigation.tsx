import { Paper, BottomNavigation as MuiBottomNavigation, BottomNavigationAction, useTheme } from '@mui/material';
import { LayoutGrid, Package, Archive, MoreHorizontal } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', label: 'Home', icon: <LayoutGrid /> },
  { path: '/inventory', label: 'Inventory', icon: <Package /> },
  { path: '/inventory/record-purchase', label: 'Purchase', icon: <Archive /> },
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
                            color: theme.palette.text.secondary,
                            '&.Mui-selected': {
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
