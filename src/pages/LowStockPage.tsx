import React, { useState, useMemo } from 'react';
import {
    Box, Typography, Button, Paper, Grid, Avatar, InputAdornment, TextField,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
    Alert, Skeleton, Pagination, IconButton, Tooltip
} from '@mui/material';
import { ArrowBack, Search, FilterList, Refresh } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState';

interface LowStockItem {
    id: number;
    name: string;
    sku: string;
    category: string;
    stock: number;
    reorderLevel: number;
    lastUpdated: string;
    image?: string;
}

const mockLowStockItems: LowStockItem[] = [
    { id: 2, name: 'Mechanical Keyboard', sku: 'MK-001', category: 'Electronics', stock: 8, reorderLevel: 10, lastUpdated: '2023-10-26', image: 'https://images.unsplash.com/photo-1618384887624-7635c7553f74?q=80&w=2670&auto=format&fit=crop' },
    { id: 3, name: 'Standing Desk', sku: 'SD-001', category: 'Home & Kitchen', stock: 0, reorderLevel: 5, lastUpdated: '2023-10-25', image: '' },
    { id: 8, name: 'Denim Jacket', sku: 'DJ-001', category: 'Fashion', stock: 3, reorderLevel: 5, lastUpdated: '2023-10-24', image: 'https://images.unsplash.com/photo-1543087903-1ac2378a9613?q=80&w=2574&auto=format&fit=crop' },
    { id: 1, name: 'Espresso Machine', sku: 'EM-001', category: 'Appliances', stock: 4, reorderLevel: 8, lastUpdated: '2023-10-23' },
];

const LowStockPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [items, setItems] = useState<LowStockItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Simulate loading and fetching data
    useState(() => {
        const timer = setTimeout(() => {
            setItems(mockLowStockItems);
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    });

    const handleRetry = () => {
        setLoading(true);
        setError(false);
        const timer = setTimeout(() => {
            setItems(mockLowStockItems);
            setLoading(false);
        }, 1500);
    };

    const filteredItems = useMemo(() => {
        return items.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [items, searchTerm]);


    const renderContent = () => {
        if (loading) {
            return Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                    <TableCell><Skeleton variant="rectangular" width={40} height={40} /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                </TableRow>
            ));
        }

        if (error) {
            return (
                <TableRow>
                    <TableCell colSpan={7}>
                        <EmptyState
                            title="Something went wrong"
                            message="We couldn't load the low stock items. Please try again."
                            buttonText="Retry"
                            onButtonClick={handleRetry}
                        />
                    </TableCell>
                </TableRow>
            );
        }

        if (filteredItems.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={7}>
                        <EmptyState
                            title="No low stock items"
                            message="All your products have sufficient stock levels."
                        />
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
                <TableCell>
                    <Chip label={item.stock} color={item.stock === 0 ? "error" : "warning"} size="small" />
                </TableCell>
                <TableCell>{item.reorderLevel}</TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
                <TableCell>
                    <Button variant="contained" size="small">Restock</Button>
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
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Low Stock Items</Typography>
            </Box>

            <Alert severity="warning" sx={{ mb: 3 }}>
                These items are running low and may require restocking soon.
            </Alert>

            <Paper sx={{ p: 2, mb: 3, borderRadius: 4, boxShadow: 'none', border: `1px solid #E0E0E0` }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search by product name or SKU"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Tooltip title="Filter">
                            <IconButton>
                                <FilterList />
                            </IconButton>
                        </Tooltip>
                         <Tooltip title="Refresh">
                            <IconButton onClick={handleRetry}>
                                <Refresh />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Paper>

            <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 'none', border: `1px solid #E0E0E0` }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Current Stock</TableCell>
                            <TableCell>Reorder Level</TableCell>
                            <TableCell>Last Updated</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderContent()}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination count={10} color="primary" />
            </Box>
        </Box>
    );
};

export default LowStockPage;
