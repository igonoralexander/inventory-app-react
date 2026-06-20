import { Paper, BottomNavigation as MuiBottomNavigation, BottomNavigationAction } from '@mui/material';
import { LayoutGrid, DollarSign, Package, BarChart2, MoreHorizontal } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', label: 'Home', icon: <LayoutGrid /> },
  { path: '/sales', label: 'Sales', icon: <DollarSign /> },
  { path: '/inventory', label: 'Products', icon: <Package /> },
  { path: '/reports', label: 'Reports', icon: <BarChart2 /> },
  { path: '/more', label: 'More', icon: <MoreHorizontal /> },
];

const BottomNavigation = () => {
    const location = useLocation();

    return (
        <Paper 
            sx={{ 
                position: 'fixed', 
                bottom: 0, 
                left: 0, 
                right: 0,
                borderTop: '1px solid #E2E8F0',
                borderRadius: 0,
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
                        label={item.label}
                        value={item.path}
                        icon={item.icon}
                        sx={{
                            color: 'text.secondary',
                            '&.Mui-selected': {
                                color: 'primary.main',
                            },
                        }}
                    />
                ))}
            </MuiBottomNavigation>
        </Paper>
    );
};

export default BottomNavigation;
