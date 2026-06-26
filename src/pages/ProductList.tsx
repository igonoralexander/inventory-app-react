import React, { useState, useMemo } from 'react';
import {
    Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip,
    useTheme, useMediaQuery, Grid, Card, Avatar, InputAdornment, TextField, Fab, Tabs, Tab, Menu, MenuItem
} from '@mui/material';
import type { ChipProps } from '@mui/material';
import {
    Plus, Edit, Trash, Archive, MoreVertical, Search
} from 'lucide-react';
import ProductForm from '../components/products/ProductForm';
import ConfirmationDialog from '../components/ConfirmationDialog';
import EmptyState from '../components/EmptyState';
import StyledAvatar from '../components/StyledAvatar';

interface Product {
    id: number;
    name: string;
    sku: string;
    price: number;
    stock: number;
    lowStock: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Archived';
    image?: string;
}

const mockProducts: Product[] = [
    { id: 1, name: 'Wireless Mouse', sku: 'WM-001', price: 25.99, stock: 150, lowStock: 20, status: 'In Stock', image: 'https://images.unsplash.com/photo-1615914690484-63c37ca45595?q=80&w=2670&auto=format&fit=crop' },
    { id: 2, name: 'Mechanical Keyboard', sku: 'MK-001', price: 129.99, stock: 8, lowStock: 10, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1618384887624-7635c7553f74?q=80&w=2670&auto=format&fit=crop' },
    { id: 3, name: 'Standing Desk', sku: 'SD-001', price: 399.99, stock: 0, lowStock: 5, status: 'Out of Stock', image: '' },
    { id: 4, name: 'Laptop Stand', sku: 'LS-001', price: 49.99, stock: 200, lowStock: 30, status: 'Archived', image: '' },
    { id: 5, name: 'USB-C Hub', sku: 'UH-001', price: 79.99, stock: 120, lowStock: 25, status: 'In Stock', image: 'https://images.unsplash.com/photo-1581012784536-5d61483d5b4e?q=80&w=2670&auto=format&fit=crop' },
];


const ProductList = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [formOpen, setFormOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All Products');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, product: Product) => {
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

    const handleEditClick = (product: Product) => {
        setSelectedProduct(product);
        setFormOpen(true);
        handleMenuClose();
    };

    const handleDeleteClick = (product: Product) => {
        setProductToDelete(product);
        setConfirmOpen(true);
        handleMenuClose();
    };

    const handleConfirmDelete = () => {
        if (!productToDelete) return;
        setProducts(products.filter(p => p.id !== productToDelete.id));
        setConfirmOpen(false);
        setProductToDelete(null);
    };

    const handleArchiveClick = (product: Product) => {
        const newStatus = product.status === 'Archived' ? 'In Stock' : 'Archived';
        setProducts(products.map(p => p.id === product.id ? { ...p, status: newStatus } : p));
        handleMenuClose();
    };

    const handleSubmit = (productData: Omit<Product, 'id'>) => {
        if (selectedProduct) {
            setProducts(products.map(p => (p.id === selectedProduct.id ? { ...p, ...productData } : p)));
        } else {
            const newProduct: Product = {
                id: Math.max(...products.map(p => p.id), 0) + 1,
                ...productData,
            };
            setProducts([newProduct, ...products]);
        }
        setFormOpen(false);
    };

    const getStatusInfo = (product: Product): { label: string; color: ChipProps['color'] } => {
        if (product.status === 'Archived') return { label: 'Archived', color: 'default' };
        if (product.stock === 0) return { label: 'Out of Stock', color: 'error' };
        if (product.stock <= product.lowStock) return { label: 'Low Stock', color: 'warning' };
        return { label: 'In Stock', color: 'success' };
    };

    const filteredProducts = useMemo(() => {
        return products
            .filter(p => {
                const statusInfo = getStatusInfo(p);
                if (filter === 'All Products') return true;
                return statusInfo.label === filter;
            })
            .filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.sku.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [products, searchTerm, filter]);

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, mt: 2 }}>
                <Box>
                    <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 'bold' }}>Inventroy of our Products</Typography>
                    <Typography variant="body1" color="text.secondary">Manage all products in your inventory</Typography>
                </Box>
                {!isMobile && (
                    <Button variant="contained" startIcon={<Plus />} sx={{ borderRadius: 3, px: 3, py: 1.5 }} onClick={handleAddClick}>
                        Add Product
                    </Button>
                )}
            </Box>

            <Paper sx={{ p: 2, mb: 3, borderRadius: 4, position: 'sticky', top: 70, zIndex: 10, backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255,255,255,0.8)' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={8}>
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
                    <Grid item xs={12} md={4}>
                         <Tabs value={filter} onChange={(_, newValue) => setFilter(newValue)} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile>
                                {['All Products', 'In Stock', 'Low Stock', 'Out of Stock', 'Archived'].map(f => <Tab key={f} label={f} value={f} sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, mr: 1, minHeight: 48 }} />)}
                            </Tabs>
                    </Grid>
                </Grid>
            </Paper>

            {isMobile ? (
                <Grid container spacing={2}>
                    {filteredProducts.map(product => {
                        const status = getStatusInfo(product);
                        return (
                            <Grid item xs={12} key={product.id}>
                                <Card sx={{ borderRadius: 4, display: 'flex', p: 1.5, alignItems: 'center' }}>
                                    {product.image ? <Avatar src={product.image} variant="rounded" sx={{ width: 72, height: 72, mr: 2 }} /> : <StyledAvatar name={product.name} variant="rounded" sx={{ width: 72, height: 72, mr: 2 }} />}
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography sx={{ fontWeight: 'bold', mb: 0.5 }}>{product.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">SKU: {product.sku}</Typography>
                                        <Chip label={status.label} color={status.color} size="small" sx={{ mt: 1, fontWeight: 'bold' }} />
                                    </Box>
                                    <IconButton onClick={(e) => handleMenuClick(e, product)}><MoreVertical /></IconButton>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
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

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => { if(selectedProduct) handleEditClick(selectedProduct) }}><Edit size={16} style={{ marginRight: 8 }} /> Edit</MenuItem>
                <MenuItem onClick={() => { if(selectedProduct) handleArchiveClick(selectedProduct) }}><Archive size={16} style={{ marginRight: 8 }} /> {selectedProduct?.status === 'Archived' ? 'Unarchive' : 'Archive'}</MenuItem>
                <MenuItem onClick={() => { if(selectedProduct) handleDeleteClick(selectedProduct) }} sx={{ color: 'error.main' }}><Trash size={16} style={{ marginRight: 8 }} /> Delete</MenuItem>
            </Menu>

            {isMobile && (
                <Fab color="primary" sx={{ position: 'fixed', bottom: 80, right: 16 }} onClick={handleAddClick}>
                    <Plus />
                </Fab>
            )}

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

export default ProductList;
