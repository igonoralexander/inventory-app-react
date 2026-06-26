import React, { useState, useMemo } from 'react';
import {
    Box, Typography, Button, Paper, Grid, Avatar, InputAdornment, TextField, Fab, Tabs, Tab, Menu, MenuItem, IconButton, useTheme, useMediaQuery, Pagination, ToggleButtonGroup, ToggleButton, Card
} from '@mui/material';
import type { ChipProps } from '@mui/material';
import {
    Plus, MoreVertical, Search, Filter, LayoutGrid, List
} from 'lucide-react';
import ProductForm from '../components/products/ProductForm';
import ConfirmationDialog from '../components/ConfirmationDialog';
import EmptyState from '../components/EmptyState';
import StyledAvatar from '../components/StyledAvatar';

interface Product {
    id: number;
    name: string;
    sku: string;
    category: string;
    stock: number;
    lowStock: number;
    image?: string;
}

const mockProducts: Product[] = [
    { id: 1, name: 'Wireless Mouse', sku: 'WM-001', category: 'Electronics', stock: 150, lowStock: 20, image: 'https://images.unsplash.com/photo-1615914690484-63c37ca45595?q=80&w=2670&auto=format&fit=crop' },
    { id: 2, name: 'Mechanical Keyboard', sku: 'MK-001', category: 'Electronics', stock: 8, lowStock: 10, image: 'https://images.unsplash.com/photo-1618384887624-7635c7553f74?q=80&w=2670&auto=format&fit=crop' },
    { id: 3, name: 'Standing Desk', sku: 'SD-001', category: 'Home & Kitchen', stock: 0, lowStock: 5, image: '' },
    { id: 4, name: 'Laptop Stand', sku: 'LS-001', category: 'Hardware', stock: 200, lowStock: 30, image: '' },
    { id: 5, name: 'USB-C Hub', sku: 'UH-001', category: 'Electronics', stock: 120, lowStock: 25, image: 'https://images.unsplash.com/photo-1581012784536-5d61483d5b4e?q=80&w=2670&auto=format&fit=crop' },
    { id: 6, name: 'Skin Care Essentials', sku: 'SCE-001', category: 'Beauty', stock: 50, lowStock: 10, image: 'https://images.unsplash.com/photo-1556228852-6d45a7c2e144?q=80&w=2670&auto=format&fit=crop' },
    { id: 7, name: 'Smart Lightbulb', sku: 'SL-001', category: 'Appliances', stock: 75, lowStock: 15, image: '' },
    { id: 8, name: 'Denim Jacket', sku: 'DJ-001', category: 'Fashion', stock: 3, lowStock: 5, image: 'https://images.unsplash.com/photo-1543087903-1ac2378a9613?q=80&w=2574&auto=format&fit=crop' },
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
    const [category, setCategory] = useState('All Products');
    const [view, setView] = useState<'grid' | 'list'>('grid');
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

    const handleSubmit = (productData: Omit<Product, 'id' | 'status'>) => {
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

    const getStatusInfo = (product: Product): { label: string; color: string; bgColor: string; } => {
        if (product.stock === 0) return { label: 'Out of Stock', color: '#D32F2F', bgColor: '#FFEBEE' };
        if (product.stock <= product.lowStock) return { label: 'Low Stock', color: '#F57C00', bgColor: '#FFF3E0' };
        return { label: 'In Stock', color: '#388E3C', bgColor: '#E8F5E9' };
    };

    const filteredProducts = useMemo(() => {
        return products
            .filter(p => category === 'All Products' || p.category === category)
            .filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.sku.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [products, searchTerm, category]);

    if (products.length === 0 && !isMobile) {
        return <EmptyState
            title="No products yet."
            message="Get started by adding your first product."
            buttonText="Add Product"
            onButtonClick={handleAddClick}
        />
    }

    return (
        <Box sx={{ backgroundColor: '#F8FAFC', minHeight: '100vh', p: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Products</Typography>
                    <Typography variant="body1" color="text.secondary">Manage and track all your inventory items.</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton><Search /></IconButton>
                    <Button variant="outlined" startIcon={<Filter />}>Filter</Button>
                    <Button variant="contained" startIcon={<Plus />} onClick={handleAddClick} sx={{ borderRadius: '12px' }}>Add Product</Button>
                </Box>
            </Box>

            <Paper sx={{ p: 2, mb: 3, borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search by product name, SKU..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Search size={20} color="#64748B" /></InputAdornment>,
                                sx: { borderRadius: '12px', backgroundColor: '#FFFFFF' }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="outlined">Sort</Button>
                        <ToggleButtonGroup value={view} exclusive onChange={(_, newView) => setView(newView || 'grid')}>
                            <ToggleButton value="grid"><LayoutGrid /></ToggleButton>
                            <ToggleButton value="list"><List /></ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                </Grid>
                <Tabs value={category} onChange={(_, newValue) => setCategory(newValue)} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile sx={{ mt: 2 }}>
                    {['All Products', 'Electronics', 'Home & Kitchen', 'Fashion', 'Beauty', 'Hardware', 'Appliances'].map(c => <Tab key={c} label={c} value={c} sx={{ textTransform: 'none', borderRadius: '8px', '&.Mui-selected': { backgroundColor: 'primary.main', color: 'white' } }} />)}
                </Tabs>
            </Paper>

            <Grid container spacing={2}>
                {filteredProducts.map(product => {
                    const status = getStatusInfo(product);
                    return (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card sx={{ borderRadius: '16px', p: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Avatar src={product.image || undefined} sx={{ width: 48, height: 48, bgcolor: 'primary.light' }}>
                                        {!product.image && product.name.substring(0, 2).toUpperCase()}
                                    </Avatar>
                                    <IconButton size="small" onClick={(e) => handleMenuClick(e, product)}><MoreVertical size={20} /></IconButton>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">{product.category}</Typography>
                                    <Typography variant="body2" color="text.secondary">SKU: {product.sku}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1, borderRadius: '12px', backgroundColor: status.bgColor }}>
                                    <Typography variant="body2" sx={{ color: status.color, fontWeight: 'bold' }}>{status.label}</Typography>
                                    <Typography variant="body2" color="text.secondary">Qty: {product.stock}</Typography>
                                </Box>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination count={14} page={3} />
            </Box>

            <Fab color="primary" sx={{ position: 'fixed', bottom: 32, right: 32, borderRadius: '50%' }} onClick={handleAddClick}>
                <Plus />
            </Fab>

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
                message={`Are you sure you want to delete "${productToDelete?.name}"? This action is permanent.`}
            />
        </Box>
    );
};

export default ProductList;
