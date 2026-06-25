import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Box, InputAdornment, Typography, Avatar
} from '@mui/material';
import {
    Package, Hash, DollarSign, Archive, AlertTriangle, Image as ImageIcon, Link2
} from 'lucide-react';

const ProductForm = ({ open, handleClose, handleSubmit, product }) => {
    const [formData, setFormData] = useState({ name: '', sku: '', price: '', stock: '', lowStock: '', image: '' });

    useEffect(() => {
        if (product) {
            setFormData(product);
        } else {
            setFormData({ name: '', sku: '', price: '', stock: '', lowStock: '', image: '' });
        }
    }, [product, open]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFormSubmit = () => {
        handleSubmit(formData);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
            <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', p: 3 }}>{product ? 'Edit Product' : 'Add Product'}</DialogTitle>
            <DialogContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    {/* Left side: Main details */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField
                                label="Product Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                                InputProps={{ startAdornment: <InputAdornment position="start"><Package size={20} /></InputAdornment> }}
                            />
                            <TextField
                                label="Barcode/SKU"
                                name="sku"
                                value={formData.sku}
                                onChange={handleChange}
                                fullWidth
                                InputProps={{ startAdornment: <InputAdornment position="start"><Hash size={20} /></InputAdornment> }}
                            />
                        </Box>
                    </Grid>
                    {/* Right side: Image upload */}
                    <Grid item xs={12} md={4}>
                         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', border: '2px dashed', borderColor: 'divider', borderRadius: 3, p: 2, bgcolor: 'background.default' }}>
                            {formData.image ? (
                                <Avatar src={formData.image} variant="rounded" sx={{ width: 150, height: 150, mb: 2 }} />
                            ) : (
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'text.secondary' }}>
                                    <ImageIcon size={48} />
                                    <Typography sx={{mt: 1}}>Product Image</Typography>
                                </Box>
                            )}
                             <TextField
                                label="Image URL"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                                sx={{mt: 2}}
                                InputProps={{ startAdornment: <InputAdornment position="start"><Link2 size={16} /></InputAdornment> }}
                            />
                        </Box>
                    </Grid>
                    
                    {/* Bottom part: Stock and pricing */}
                    <Grid item xs={12}><Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>Inventory & Pricing</Typography></Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            label="Selling Price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{ startAdornment: <InputAdornment position="start"><DollarSign size={20} /></InputAdornment> }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            label="Current Stock"
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{ startAdornment: <InputAdornment position="start"><Archive size={20} /></InputAdornment> }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            label="Low Stock Alert"
                            name="lowStock"
                            type="number"
                            value={formData.lowStock}
                            onChange={handleChange}
                            fullWidth
                            helperText="Receive alert when stock is at or below this level"
                            InputProps={{ startAdornment: <InputAdornment position="start"><AlertTriangle size={20} /></InputAdornment> }}
                        />
                    </Grid>
                   
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={handleClose} sx={{ borderRadius: 3 }} >Cancel</Button>
                <Button onClick={onFormSubmit} variant="contained" sx={{ borderRadius: 3 }}>
                    {product ? 'Save Changes' : 'Add Product'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductForm;
