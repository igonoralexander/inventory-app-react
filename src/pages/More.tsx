import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box, Paper, Divider } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Package, ShoppingCart, Settings, BarChart } from 'lucide-react';

const More = () => {
    const menuItems = [
        { text: 'Products', icon: <Package />, path: '/products' },
        { text: 'Sales', icon: <ShoppingCart />, path: '/sales' },
        { text: 'Reports', icon: <BarChart />, path: '/reports' },
        { text: 'Settings', icon: <Settings />, path: '/settings' },
    ];

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, mt:2 }}>More</Typography>
            <Paper sx={{ borderRadius: 4, overflow: 'hidden' }}>
                <List disablePadding>
                    {menuItems.map((item, index) => (
                        <React.Fragment key={item.text}>
                            <ListItem disablePadding>
                                <ListItemButton component={NavLink} to={item.path} sx={{p: 2.5}}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} primaryTypographyProps={{fontWeight: 500}} />
                                </ListItemButton>
                            </ListItem>
                            {index < menuItems.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default More;
