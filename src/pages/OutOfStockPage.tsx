import React, { useState, useMemo, useEffect } from 'react';
import {
    Box, Typography, Button, Paper, Grid, Avatar, InputAdornment, TextField,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
    Alert, Skeleton, Pagination, IconButton, Tooltip
} from '@mui/material';
import { ArrowBack, Search, FilterList, Refresh } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import RestockDialog from '../components/RestockDialog';
import { toast } from 'react-hot-toast';

interface OutOfStockItem {
    id: number;
    name: string;
    sku: string;
    category: string;
    stock: number;
    reorderLevel: number;
    lastUpdated: string;
    image?: string;
}

const mockOutOfStockItems: OutOfStockItem[] = [
    { id: 3, name: 'Standing Desk', sku: 'SD-001', category: 'Home & Kitchen', stock: 0, reorderLevel: 5, lastUpdated: '2023-10-25', image: '' },
    { id: 10, name: 'Wireless Mouse', sku: 'WM-001', category: 'Electronics', stock: 0, reorderLevel: 10, lastUpdated: '2023-10-22', image: 'https://images.unsplash.com/photo-1615655406736-b95c78964c72?q=80&w=2670&auto=format&fit=crop' },
    { id: 12, name: 'Cotton T-shirt', sku: 'CT-001', category: 'Fashion', stock: 0, reorderLevel: 20, lastUpdated: '2023-10-20', image: '' },
];

const OutOfStockPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [items, setItems] = useState<OutOfStockItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<OutOfStockItem | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setItems(mockOutOfStockItems);
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleRetry = () => {
        setLoading(true);
        setError(false);
        const timer = setTimeout(() => {
            setItems(mockOutOfStockItems);
            setLoading(false);
        }, 1500);
    };

    const handleOpenDialog = (item: OutOfStockItem) => {
        setSelectedItem(item);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedItem(null);
    };

    const handleRestock = (productId: number, newQuantity: number) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, stock: newQuantity, lastUpdated: new Date().toISOString().split('T')[0] } : item
            ).filter(item => item.stock > 0) // Optionally remove from this list if restocked
        );
        toast.success(`${selectedItem?.name} has been restocked.`);
    };

    const filteredItems = useMemo(() => {
        return items.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [items, searchTerm]);

    const renderContent = () => {
        if (loading) {
            return Array.from(new Array(3)).map((_, index) => (
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
                            message="We couldn't load the out-of-stock items. Please try again."
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
                            title="No out-of-stock items"
                            message="All products are currently in stock."
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
                    <Chip label={item.stock} color="error" size="small" />
                </TableCell>
                <TableCell>{item.reorderLevel}</TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
                <TableCell>
                    <Button variant="contained" size="small" onClick={() => handleOpenDialog(item)}>Restock</Button>
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
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Out of Stock Items</Typography>
            </Box>

            <Alert severity="error" sx={{ mb: 3 }}>
                These items are currently unavailable and require immediate attention.
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

            <RestockDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                product={selectedItem}
                onRestock={handleRestock}
            />
        </Box>
    );
};

export default OutOfStockPage;
