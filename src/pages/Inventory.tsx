import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Button,
  Avatar,
  Chip,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
  Skeleton
} from '@mui/material';
import {
  Filter,
  X,
  Archive,
  AlertTriangle,
  Package,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react';
import EmptyState from '../components/EmptyState';


const products = [
  // ... (previous products data, unchanged)
    { id: 'PROD001', name: 'Espresso Machine', category: 'Electronics', stock: 15, status: 'In Stock' },
    { id: 'PROD002', name: 'Organic Bananas', category: 'Groceries', stock: 150, status: 'In Stock' },
    { id: 'PROD003', name: 'Designer Sneakers', category: 'Fashion', stock: 3, status: 'Low Stock' },
    { id: 'PROD004', name: 'Mechanical Keyboard', category: 'Electronics', stock: 8, status: 'Low Stock' },
    { id: 'PROD005', name: 'Yoga Mat', category: 'Fitness', stock: 0, status: 'Out of Stock' },
    { id: 'PROD006', name: 'Cold Brew Coffee', category: 'Groceries', stock: 75, status: 'In Stock' },
    { id: 'PROD007', name: 'Smartwatch', category: 'Electronics', stock: 25, status: 'In Stock' },
    { id: 'PROD008', name: 'Summer Dress', category: 'Fashion', stock: 0, status: 'Out of Stock' },
    { id: 'PROD009', name: 'Kettlebell', category: 'Fitness', stock: 12, status: 'In Stock' },
    { id: 'PROD010', name: 'Almond Milk', category: 'Groceries', stock: 40, status: 'In Stock' },
];

const statusColors = {
  'In Stock': 'success',
  'Low Stock': 'warning',
  'Out of Stock': 'error',
};

const SummaryCard = ({ title, value, icon, color, loading }) => (
  <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 4, height: '100%' }} elevation={0} variant="outlined">
    {loading ? <Skeleton variant="circular" width={48} height={48} /> : 
      <Avatar sx={{ bgcolor: `${color}1A`, width: 48, height: 48 }}>
        {icon}
      </Avatar>
    }
    <Box>
      {loading ? <Skeleton width="80%" /> : <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{value}</Typography>}
      {loading ? <Skeleton width="60%" /> : <Typography variant="body2" color="text.secondary">{title}</Typography>}
    </Box>
  </Paper>
);

const ProductDetails = ({ product, onClose, loading }) => {
  const theme = useTheme();

  if (loading) {
    return (
        <Box sx={{p: 3}}>
            <Skeleton variant="circular" width={80} height={80} sx={{mb: 2}}/>
            <Skeleton width="60%" height={32}/>
            <Skeleton width="30%" sx={{mt: 1}}/>
            <Skeleton width="40%" sx={{mt: 0.5}}/>
            <Box sx={{display: 'flex', gap: 2, mt: 3}}>
                <Skeleton variant='rounded' width={100} height={50}/>
                <Skeleton variant='rounded' width={100} height={50}/>
            </Box>
        </Box>
    )
  }

  if (!product) return null;

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar name={product.name} sx={{ width: 80, height: 80, mr: 2, fontSize: '2rem' }} variant="rounded" />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
          <Chip
            label={product.status}
            color={statusColors[product.status]}
            size="small"
            sx={{ fontWeight: 600, mt: 0.5 }}
          />
        </Box>
        <IconButton onClick={onClose} sx={{ ml: 'auto', alignSelf: 'flex-start' }}>
          <X size={20}/>
        </IconButton>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={4}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
            <Typography color="text.secondary" variant="subtitle2">Stock</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{product.stock}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
           <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
            <Typography color="text.secondary" variant="subtitle2">Category</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{product.category}</Typography>
          </Paper>
        </Grid>
         <Grid item xs={12} sm={4}>
           <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
            <Typography color="text.secondary" variant="subtitle2">Product ID</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{product.id}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" startIcon={<Package />}>Record Stock Update</Button>
        <Button variant="outlined" sx={{ ml: 2 }}>Edit Product</Button>
      </Box>
    </Box>
  );
};

const Inventory = () => {
  const [filters, setFilters] = useState({ search: '', status: 'All', category: 'All' });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // Simulate loading
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredProducts = useMemo(() =>
    products.filter(p =>
      p.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.status === 'All' || p.status === filters.status) &&
      (filters.category === 'All' || p.category === filters.category)
    ), [filters]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    if(isMobile) setDrawerOpen(true);
  };

  const summary = useMemo(() => ({
    total: products.length,
    inStock: products.filter(p => p.status === 'In Stock').length,
    lowStock: products.filter(p => p.status === 'Low Stock').length,
    outOfStock: products.filter(p => p.status === 'Out of Stock').length,
  }), [products]);

  const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], [products]);

  const renderProductList = () => {
    if(loading) {
        return Array(5).fill(0).map((_, index) => (
            <Paper key={index} sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2, borderRadius: 3, border: '1px solid transparent' }}>
                <Skeleton variant="circular" width={40} height={40} sx={{mr: 2}}/>
                <Box sx={{flex: 1}}>
                     <Skeleton width="40%" />
                     <Skeleton width="20%" sx={{mt: 0.5}}/>
                </Box>
                <Skeleton width={80} height={24} />
            </Paper>
        ))
    }

    if (filteredProducts.length === 0) {
        return <EmptyState
            icon={<Search size={64}/>}
            title="No Products Found"
            message="Your search did not match any products. Try adjusting your filters."
        />;
    }

    return filteredProducts.map(product => (
      <Paper
        key={product.id}
        onClick={() => handleProductClick(product)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          mb: 2,
          borderRadius: 3,
          cursor: 'pointer',
          border: '1px solid',
          borderColor: selectedProduct?.id === product.id ? 'primary.main' : 'transparent',
          bgcolor: selectedProduct?.id === product.id ? theme.palette.action.selected : 'background.paper',
          transition: 'border-color 200ms, background-color 200ms'
        }}
      >
        <Avatar
          name={product.name}
          sx={{ width: 40, height: 40, mr: 2 }}
          variant="rounded"
        />
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 600 }}>{product.name}</Typography>
          <Typography variant="body2" color="text.secondary">{product.category}</Typography>
        </Box>
        <Chip label={product.status} color={statusColors[product.status]} size="small" sx={{ fontWeight: 600 }} />
      </Paper>
    ));
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Inventory</Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}><SummaryCard loading={loading} title="Total Products" value={summary.total} icon={<Package color={theme.palette.primary.main} />} color={theme.palette.primary.main} /></Grid>
        <Grid item xs={12} sm={6} md={3}><SummaryCard loading={loading} title="In Stock" value={summary.inStock} icon={<Archive color={theme.palette.success.main} />} color={theme.palette.success.main} /></Grid>
        <Grid item xs={12} sm={6} md={3}><SummaryCard loading={loading} title="Low Stock" value={summary.lowStock} icon={<AlertTriangle color={theme.palette.warning.main} />} color={theme.palette.warning.main} /></Grid>
        <Grid item xs={12} sm={6} md={3}><SummaryCard loading={loading} title="Out of Stock" value={summary.outOfStock} icon={<X color={theme.palette.error.main} />} color={theme.palette.error.main} /></Grid>
      </Grid>

      <Paper sx={{ p: 2, mb: 3, borderRadius: 4, display: 'flex', flexWrap: 'wrap', gap: 2, border: '1px solid ', borderColor: 'divider' }} elevation={0}>
        <TextField
          name="search"
          variant="outlined"
          placeholder="Search products..."
          value={filters.search}
          onChange={handleFilterChange}
          size="small"
          sx={{ flexGrow: 1, minWidth: '200px' }}
        />
        <TextField
          select
          name="status"
          label="Status"
          value={filters.status}
          onChange={handleFilterChange}
          size="small"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="All">All Statuses</MenuItem>
          <MenuItem value="In Stock">In Stock</MenuItem>
          <MenuItem value="Low Stock">Low Stock</MenuItem>
          <MenuItem value="Out of Stock">Out of Stock</MenuItem>
        </TextField>
        <TextField
          select
          name="category"
          label="Category"
          value={filters.category}
          onChange={handleFilterChange}
          size="small"
          sx={{ minWidth: 150 }}
        >
          {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
        </TextField>
        <Button variant="outlined" startIcon={<Filter size={18} />}>More Filters</Button>
      </Paper>

      <Box sx={{ display: 'flex', flexGrow: 1, gap: 3, overflow: 'hidden' }}>
        <Box sx={{ width: { sm: '100%', md: 450 }, overflowY: 'auto' }}>
          {renderProductList()}
        </Box>
        {!isMobile && (
          <Paper sx={{ flex: 1, borderRadius: 4, height: 'fit-content', border: '1px solid', borderColor: 'divider' }} elevation={0}>
            {selectedProduct ? (
              <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} loading={loading} />
            ) : (
                <Box sx={{display: 'grid', placeItems: 'center', height: '100%', p:3, textAlign: 'center'}}>
                    <Avatar sx={{width: 64, height: 64, bgcolor: 'grey.100', mb: 2}}>
                        <ChevronLeft/>
                    </Avatar>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>Select a product</Typography>
                    <Typography color="text.secondary">Click on a product from the list to view its details here.</Typography>
                </Box>
            )}
          </Paper>
        )}
      </Box>
      <Drawer anchor="bottom" open={drawerOpen} onClose={() => setDrawerOpen(false)} sx={{ '& .MuiDrawer-paper': { height: '80%', borderTopLeftRadius: 16, borderTopRightRadius: 16 } }}>
        <ProductDetails product={selectedProduct} onClose={() => setDrawerOpen(false)} loading={loading}/>
      </Drawer>
    </Box>
  );
};

export default Inventory;
