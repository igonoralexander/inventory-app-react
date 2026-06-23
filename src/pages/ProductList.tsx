import React, { useState } from 'react';
import {
  Box, Typography, InputBase, Chip, Grid, Paper, IconButton, Menu, MenuItem, Button, useTheme, useMediaQuery
} from '@mui/material';
import {
  Search, Filter, MoreVertical, Plus, ArrowLeft, PlusCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Mock Data (Price info removed)
const mockProducts = [
  {
    id: 1,
    name: 'Organic Bananas',
    sku: 'HB-FR-001',
    category: 'Food',
    stock: 120,
    status: 'in-stock',
    image: 'https://images.unsplash.com/photo-1571771894824-269f85b83969?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    name: 'Espresso Machine',
    sku: 'AP-EM-089',
    category: 'Electronics',
    stock: 8,
    status: 'low-stock',
    image: 'https://images.unsplash.com/photo-1565679905434-a6c62984ca11?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 3,
    name: 'Designer Sneakers',
    sku: 'SH-SNK-45',
    category: 'Fashion',
    stock: 0,
    status: 'out-of-stock',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 4,
    name: 'Sparkling Water 50cl',
    sku: 'DR-SW-500',
    category: 'Drinks',
    stock: 250,
    status: 'in-stock',
    image: 'https://images.unsplash.com/photo-1550522434-3F57f3a83017?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
];

const categories = ['All', 'Food', 'Drinks', 'Electronics', 'Fashion', 'Pharmacy', 'Stationery', 'Others'];

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    event.stopPropagation(); // Prevent card click when opening menu
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (event) => {
    event.stopPropagation(); // Prevent card click when closing menu
    setAnchorEl(null);
  };

  const handleCardClick = () => {
    navigate(`/products/edit/${product.id}`);
  };

  const getStatusBadge = (status) => {
    const styles = {
        borderRadius: '12px', fontSize: '0.7rem', fontWeight: 600, px: 1.5, py: 0.5,
        display: 'inline-flex', alignItems: 'center', textTransform: 'capitalize'
    };
    switch (status) {
        case 'in-stock':
            return <Box sx={{ ...styles, bgcolor: '#16a34a20', color: '#16a34a' }}><Box sx={{width: 6, height: 6, borderRadius: '50%', bgcolor: '#16a34a', mr: 1}} />In Stock</Box>;
        case 'low-stock':
            return <Box sx={{ ...styles, bgcolor: '#f9731620', color: '#f97316' }}><Box sx={{width: 6, height: 6, borderRadius: '50%', bgcolor: '#f97316', mr: 1}} />Low Stock</Box>;
        case 'out-of-stock':
            return <Box sx={{ ...styles, bgcolor: '#dc262620', color: '#dc2626' }}><Box sx={{width: 6, height: 6, borderRadius: '50%', bgcolor: '#dc2626', mr: 1}} />Out of Stock</Box>;
        default: return null;
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <motion.div whileHover={{ y: -6, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }} transition={{ duration: 0.3, ease: "easeOut" }} style={{height: '100%'}} onClick={handleCardClick}>
        <Paper sx={{ borderRadius: 4, overflow: 'hidden', border: `1px solid ${theme.palette.divider}`, boxShadow: 'none', display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem', mb: 0.5 }}>{product.name}</Typography>
              <IconButton size="small" onClick={handleMenuClick}><MoreVertical size={18} /></IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
                <MenuItem onClick={handleMenuClose}>View</MenuItem>
                <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
              </Menu>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', mb: 2 }}>{product.sku} &bull; {product.category}</Typography>
            
            <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="caption" color="text.secondary">Stock</Typography>
                    <Typography sx={{fontWeight: 600, fontSize: '1.1rem'}}>{product.stock}</Typography>
                </Box>
                {getStatusBadge(product.status)}
            </Box>

          </Box>
        </Paper>
      </motion.div>
    </Grid>
  )
}

const ProductList = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  return (
    <Box>
        {/* Header */}
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
            p: isDesktop ? 0 : 2,
            borderBottom: isDesktop ? 'none' : `1px solid ${theme.palette.divider}`,
            position: isDesktop ? 'static' : 'fixed',
            top: 0, left: 0, right: 0, 
            bgcolor: 'background.paper',
            zIndex: 1100
        }}>
            {isDesktop ? (
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Products</Typography>
            ) : (
                <>
                    <IconButton><ArrowLeft /></IconButton>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Products</Typography>
                    <Box />
                </>
            )}
            <Box>
                <Button 
                    variant="outlined"
                    startIcon={<PlusCircle size={18}/>}
                    sx={{mr: 1.5, borderRadius: 3, textTransform: 'none', fontWeight: 600}}
                    onClick={() => navigate('/inventory/record-purchase')}
                >
                    Record Purchase
                </Button>
                <Button 
                    variant="contained"
                    color="primary"
                    startIcon={<Plus size={18}/>}
                    sx={{borderRadius: 3, textTransform: 'none', fontWeight: 600}}
                    onClick={() => navigate('/products/add')}
                >
                    Add Product
                </Button>
            </Box>
        </Box>

      <Box sx={{ mt: isDesktop ? 0 : '72px', pb: 8 }}>
        
        {/* Search Field */}
        <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', p: '8px 16px', borderRadius: 3, border: `1px solid ${theme.palette.divider}`, mb: 3 }}>
            <Search size={22} color={theme.palette.text.secondary} />
            <InputBase sx={{ ml: 2, flex: 1, fontWeight: 500 }} placeholder="Search by product name, barcode or category..." />
        </Paper>
        
        {/* Category Chips */}
        <Box sx={{ display: 'flex', overflowX: 'auto', mb: 4, pb: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
          {categories.map(category => (
            <Chip 
                key={category} 
                label={category} 
                onClick={() => setActiveCategory(category)}
                sx={{ 
                    mr: 1.5, 
                    fontWeight: 600, 
                    borderRadius: '12px', 
                    px: 1,
                    bgcolor: activeCategory === category ? 'primary.main' : 'background.paper',
                    color: activeCategory === category ? 'primary.contrastText' : 'text.primary',
                    border: `1px solid ${activeCategory === category ? theme.palette.primary.main : theme.palette.divider}`
                }} 
            />
          ))}
        </Box>

        {/* Product Grid */}
        <Grid container spacing={3}>
          {mockProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default ProductList;
