import React, { useState, useMemo } from 'react';
import {
    Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip,
    useTheme, useMediaQuery, Grid, Card, CardContent, CardActions, Avatar, InputAdornment, TextField, Fab, Tabs, Tab, Menu, MenuItem
} from '@mui/material';
import {
    Plus, Edit, Trash, Archive, MoreVertical, Search, Filter, ChevronDown, Image as ImageIcon, X
} from 'lucide-react';
import ProductForm from '../components/products/ProductForm';
import ConfirmationDialog from '../components/ConfirmationDialog'; // Assuming you'll create this
import EmptyState from '../components/EmptyState'; // Assuming you'll create this
import StyledAvatar from '../components/StyledAvatar';


const mockProducts = [
    { id: 1, name: 'Wireless Mouse', sku: 'WM-001', category: 'Electronics', price: 25.99, stock: 150, lowStock: 20, status: 'In Stock', image: 'https://images.unsplash.com/photo-1615914690484-63c37ca45595?q=80&w=2670&auto=format&fit=crop' },
    { id: 2, name: 'Mechanical Keyboard', sku: 'MK-001', category: 'Electronics', price: 129.99, stock: 8, lowStock: 10, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1618384887624-7635c7553f74?q=80&w=2670&auto=format&fit=crop' },
    { id: 3, name: 'Standing Desk', sku: 'SD-001', category: 'Furniture', price: 399.99, stock: 0, lowStock: 5, status: 'Out of Stock', image: '' },
    { id: 4, name: 'Laptop Stand', sku: 'LS-001', category: 'Accessories', price: 49.99, stock: 200, lowStock: 30, status: 'Archived', image: '' },
    { id: 5, name: 'USB-C Hub', sku: 'UH-001', category: 'Electronics', price: 79.99, stock: 120, lowStock: 25, status: 'In Stock', image: 'https://images.unsplash.com/photo-1581012784536-5d61483d5b4e?q=80&w=2670&auto=format&fit=crop' },
];

const Products = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [products, setProducts] = useState(mockProducts);
    const [formOpen, setFormOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All Products');
    const [category, setCategory] = useState('All');
    const [anchorEl, setAnchorEl] = useState(null);


    const handleMenuClick = (event, product) => {
        setAnchorEl(event.currentTarget);
        setSelectedProduct(product);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedProduct(null);
    };

    const handleAddClick = () => {
        setSelectedProduct(null);
        setFormOpen(true);
        handleMenuClose();
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setFormOpen(true);
        handleMenuClose();
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setConfirmOpen(true);
        handleMenuClose();
    };

    const handleConfirmDelete = () => {
        setProducts(products.filter(p => p.id !== productToDelete.id));
        setConfirmOpen(false);
        setProductToDelete(null);
    };

    const handleArchiveClick = (product) => {
        const newStatus = product.status === 'Archived' ? 'In Stock' : 'Archived';
        setProducts(products.map(p => p.id === product.id ? { ...p, status: newStatus } : p));
        handleMenuClose();
    };

    const handleSubmit = (productData) => {
        if (selectedProduct) {
            setProducts(products.map(p => (p.id === selectedProduct.id ? { ...p, ...productData } : p)));
        } else {
            const newProduct = {
                id: Math.max(...products.map(p => p.id), 0) + 1,
                ...productData,
            };
            setProducts([newProduct, ...products]);
        }
        setFormOpen(false);
    };

    const getStatusInfo = (product) => {
        const { stock, lowStock, status } = product;
        if (status === 'Archived') return { label: 'Archived', color: 'default' };
        if (stock === 0) return { label: 'Out of Stock', color: 'error' };
        if (stock <= lowStock) return { label: 'Low Stock', color: 'warning' };
        return { label: 'In Stock', color: 'success' };
    };

    const filteredProducts = useMemo(() => {
        return products
            .filter(p => {
                const statusInfo = getStatusInfo(p);
                if (filter === 'All Products') return true;
                return statusInfo.label === filter;
            })
            .filter(p => category === 'All' || p.category === category)
            .filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.sku.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [products, searchTerm, filter, category]);


    const categories = ['All', ...new Set(mockProducts.map(p => p.category))];

    if (products.length === 0 && !isMobile) {
        return <EmptyState
            title="No products yet."
            message="Get started by adding your first product."
            buttonText="Add Product"
            onButtonClick={handleAddClick}
        />
    }

    return (
        <Box sx={{ maxWidth: 1200, margin: 'auto', p: { xs: 2, md: 3 } }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, mt: 2 }}>
                <Box>
                    <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 'bold' }}>Products</Typography>
                    <Typography variant="body1" color="text.secondary">Manage all products in your inventory</Typography>
                </Box>
                {!isMobile && (
                    <Button variant="contained" startIcon={<Plus />} sx={{ borderRadius: 3, px: 3, py: 1.5 }} onClick={handleAddClick}>
                        Add Product
                    </Button>
                )}
            </Box>

            {/* Filters and Search */}
            <Paper sx={{ p: 2, mb: 3, borderRadius: 4, position: 'sticky', top: 70, zIndex: 10, backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255,255,255,0.8)' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search products by name or SKU..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Search size={20} /></InputAdornment>,
                                sx: { borderRadius: 3, bgcolor: 'background.paper' }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'space-between', md: 'flex-end' }, gap: 1 }}>
                            <Tabs value={filter} onChange={(e, newValue) => setFilter(newValue)} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile>
                                {['All Products', 'In Stock', 'Low Stock', 'Out of Stock', 'Archived'].map(f => <Tab key={f} label={f} value={f} sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, mr: 1, minHeight: 48 }} />)}
                            </Tabs>
                            <TextField select value={category} onChange={e => setCategory(e.target.value)} SelectProps={{ IconComponent: ChevronDown }} sx={{ minWidth: 150, '.MuiOutlinedInput-root': { borderRadius: 3, bgcolor: 'background.paper' } }}>
                                {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                            </TextField>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {/* Product Display */}
            {isMobile ? (
                // Mobile Card View
                <Grid container spacing={2}>
                    {filteredProducts.map(product => {
                        const status = getStatusInfo(product);
                        return (
                            <Grid item xs={12} key={product.id}>
                                <Card sx={{ borderRadius: 4, display: 'flex', p: 1.5, alignItems: 'center' }}>
                                    {product.image ? <Avatar src={product.image} variant="rounded" sx={{ width: 72, height: 72, mr: 2 }} /> : <StyledAvatar name={product.name} variant="rounded" sx={{ width: 72, height: 72, mr: 2 }} />}
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography sx={{ fontWeight: 'bold', mb: 0.5 }}>{product.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">{product.category} &bull; ${product.price.toFixed(2)}</Typography>
                                        <Chip label={status.label} color={status.color} size="small" sx={{ mt: 1, fontWeight: 'bold' }} />
                                    </Box>
                                    <IconButton onClick={(e) => handleMenuClick(e, product)}><MoreVertical /></IconButton>
                                </Card>
                            </Grid>
                        )
                    })
                    }
                </Grid>
            ) : (
                // Desktop Table View
                <TableContainer component={Paper} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts.map((product) => {
                                const status = getStatusInfo(product);
                                return (
                                    <TableRow key={product.id} hover>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                {product.image ? <Avatar src={product.image} variant="rounded" sx={{ width: 48, height: 48, mr: 2 }} /> : <StyledAvatar name={product.name} variant="rounded" sx={{ width: 48, height: 48, mr: 2 }} />}
                                                <Box>
                                                    <Typography sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">{product.sku}</Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>${product.price.toFixed(2)}</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell><Chip label={status.label} color={status.color} size="small" sx={{ fontWeight: 'bold' }} /></TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={(e) => handleMenuClick(e, product)}><MoreVertical /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Action Menu */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => handleEditClick(selectedProduct)}><Edit size={16} style={{ marginRight: 8 }} /> Edit</MenuItem>
                <MenuItem onClick={() => handleArchiveClick(selectedProduct)}><Archive size={16} style={{ marginRight: 8 }} /> {selectedProduct?.status === 'Archived' ? 'Unarchive' : 'Archive'}</MenuItem>
                <MenuItem onClick={() => handleDeleteClick(selectedProduct)} sx={{ color: 'error.main' }}><Trash size={16} style={{ marginRight: 8 }} /> Delete</MenuItem>
            </Menu>

            {/* Add Product FAB for Mobile */}
            {isMobile && (
                <Fab color="primary" sx={{ position: 'fixed', bottom: 80, right: 16 }} onClick={handleAddClick}>
                    <Plus />
                </Fab>
            )}

            {/* Dialogs */}
            <ProductForm
                open={formOpen}
                handleClose={() => setFormOpen(false)}
                handleSubmit={handleSubmit}
                product={selectedProduct}
            />
            <ConfirmationDialog
                open={confirmOpen}
                handleClose={() => setConfirmOpen(false)}
                handleConfirm={handleConfirmDelete}
                title="Delete Product?"
                message={`Are you sure you want to delete "${productToDelete?.name}"? This action is permanent. If this product has sales history, consider archiving it instead.`}
            />

            {filteredProducts.length === 0 && products.length > 0 &&
                <Box sx={{ textAlign: 'center', mt: 8 }}>
                    <Typography variant="h6">No products found</Typography>
                    <Typography color="text.secondary">Try adjusting your search or filters.</Typography>
                </Box>
            }
        </Box>
    );
};

export default Products;