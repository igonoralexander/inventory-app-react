import React, { useState, useMemo, useEffect } from 'react';
import {
    Box, Typography, Button, Paper, Grid, Avatar, InputAdornment, TextField, useTheme,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
    Alert, Skeleton, Pagination, IconButton, Tooltip, useMediaQuery, Card, CardContent
} from '@mui/material';
import { ArrowBack, Search, FilterList, Refresh, Inventory, Functions, AttachMoney } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState';

interface StockItem {
    id: number;
    name: string;
    sku: string;
    category: string;
    quantity: number;
    unit: string;
    price: number;
    lastUpdated: string;
    image?: string;
}

const mockStockItems: StockItem[] = [
    { id: 1, name: 'Espresso Machine', sku: 'EM-001', category: 'Appliances', quantity: 20, unit: 'pcs', price: 250, lastUpdated: '2023-10-26', image: '' },
    { id: 2, name: 'Mechanical Keyboard', sku: 'MK-001', category: 'Electronics', quantity: 15, unit: 'pcs', price: 120, lastUpdated: '2023-10-26', image: 'https://images.unsplash.com/photo-1618384887624-7635c7553f74?q=80&w=2670&auto=format&fit=crop' },
    { id: 4, name: 'Webcam Pro', sku: 'WCP-001', category: 'Electronics', quantity: 30, unit: 'pcs', price: 99, lastUpdated: '2023-10-25' },
    { id: 5, name: 'Organic Bananas', sku: 'OB-001', category: 'Groceries', quantity: 200, unit: 'kg', price: 1.5, lastUpdated: '2023-10-24', image: 'https://images.unsplash.com/photo-1571771894824-269f85b83969?q=80&w=2670&auto=format&fit=crop' },
    { id: 6, name: 'Designer Watch', sku: 'DW-001', category: 'Fashion', quantity: 10, unit: 'pcs', price: 500, lastUpdated: '2023-10-23', image: '' },
    { id: 7, name: 'Leather Wallet', sku: 'LW-001', category: 'Accessories', quantity: 50, unit: 'pcs', price: 45, lastUpdated: '2023-10-22', image: 'https://images.unsplash.com/photo-1611552504395-9def423a5c4d?q=80&w=2670&auto=format&fit=crop' },
];

const StatCard = ({ title, value, icon }) => (
    <Paper sx={{ p: 2, borderRadius: 4, boxShadow: 'none', border: `1px solid #E0E0E0`, display: 'flex', alignItems: 'center' }}>
        {icon}
        <Box ml={2}>
            <Typography variant="h6" fontWeight="bold">{value}</Typography>
            <Typography variant="body2" color="text.secondary">{title}</Typography>
        </Box>
    </Paper>
);

const StockOverviewPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [items, setItems] = useState<StockItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setItems(mockStockItems);
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleRetry = () => {
        setLoading(true);
        setError(false);
        const timer = setTimeout(() => {
            setItems(mockStockItems);
            setLoading(false);
        }, 1500);
    };

    const filteredItems = useMemo(() => {
        return items.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [items, searchTerm]);

    const summaryStats = useMemo(() => {
        if (items.length === 0) return { totalProducts: 0, totalQuantity: 0, totalValue: 0 };
        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalValue = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        return { totalProducts: items.length, totalQuantity, totalValue };
    }, [items]);


    const renderContent = () => {
        if (loading) {
            return Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                    <TableCell colSpan={8}><Skeleton animation="wave" /></TableCell>
                </TableRow>
            ));
        }

        if (error) {
            return (
                <TableRow>
                    <TableCell colSpan={8}>
                        <EmptyState title="Error" message="Could not fetch stock data." buttonText="Retry" onButtonClick={handleRetry} />
                    </TableCell>
                </TableRow>
            );
        }

        if (filteredItems.length === 0) {
            return (
                 <TableRow>
                    <TableCell colSpan={8}>
                        <EmptyState title="No Products" message="No products currently in stock." />
                    </TableCell>
                </TableRow>
            );
        }

        return filteredItems.map(item => (
            <TableRow key={item.id} hover>
                <TableCell>
                     <Avatar src={item.image || undefined} variant="rounded">
                        {!item.image && item.name.substring(0, 2).toUpperCase()}
                    </Avatar>
                </TableCell>
                <TableCell>
                    <Typography variant="subtitle2" fontWeight="bold">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.sku}</Typography>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity} {item.unit}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
                <TableCell>
                    <Button variant="outlined" size="small">Details</Button>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={() => navigate('/inventory')}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Products In Stock</Typography>
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}><StatCard title="Total Products In Stock" value={summaryStats.totalProducts} icon={<Inventory color="primary" />} /></Grid>
                <Grid item xs={12} md={4}><StatCard title="Total Quantity" value={summaryStats.totalQuantity} icon={<Functions color="success" />} /></Grid>
                <Grid item xs={12} md={4}><StatCard title="Total Stock Value" value={`$${summaryStats.totalValue.toLocaleString()}`} icon={<AttachMoney color="warning" />} /></Grid>
            </Grid>

            <Paper sx={{ p: 2, mb: 3, borderRadius: 4, boxShadow: 'none', border: `1px solid #E0E0E0` }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth variant="outlined" placeholder="Search products..." onChange={e => setSearchTerm(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }} />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Tooltip title="Filter"><IconButton><FilterList /></IconButton></Tooltip>
                        <Tooltip title="Refresh"><IconButton onClick={handleRetry}><Refresh /></IconButton></Tooltip>
                    </Grid>
                </Grid>
            </Paper>

            {isMobile ? (
                <Grid container spacing={2}>
                    {filteredItems.map(item => (
                        <Grid item xs={12} key={item.id}>
                            <Card sx={{ borderRadius: 4 }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center">
                                        <Avatar src={item.image || undefined} variant="rounded" sx={{ mr: 2 }}>{!item.image && item.name.substring(0, 2).toUpperCase()}</Avatar>
                                        <Box>
                                            <Typography variant="h6">{item.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">{item.sku}</Typography>
                                        </Box>
                                    </Box>
                                    <Box mt={2} display="flex" justifyContent="space-between">
                                        <Box><Typography variant="body2">Quantity</Typography><Typography fontWeight="bold">{item.quantity} {item.unit}</Typography></Box>
                                        <Box><Typography variant="body2">Value</Typography><Typography fontWeight="bold">${(item.quantity * item.price).toFixed(2)}</Typography></Box>
                                    </Box>
                                    <Button fullWidth variant="outlined" sx={{ mt: 2 }}>View Details</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 'none', border: `1px solid #E0E0E0` }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Unit Price</TableCell>
                                <TableCell>Stock Value</TableCell>
                                <TableCell>Last Updated</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{renderContent()}</TableBody>
                    </Table>
                </TableContainer>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination count={10} color="primary" />
            </Box>
        </Box>
    );
};

export default StockOverviewPage;
