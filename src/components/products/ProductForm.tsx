import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Box, InputAdornment, Typography, Avatar, IconButton, useTheme
} from '@mui/material';
import {
    Package, Hash, UploadCloud, X
} from 'lucide-react';

const ProductForm = ({ open, handleClose, handleSubmit, product }) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({ name: '', sku: '', price: '', stock: '', lowStock: '', image: '' });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (product) {
            setFormData(product);
            if (product.image) {
                setImagePreview(product.image);
            }
        } else {
            setFormData({ name: '', sku: '', price: '', stock: '', lowStock: '', image: '' });
            setImagePreview(null);
        }
    }, [product, open]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result as string });
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onFormSubmit = () => {
        handleSubmit(formData);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4, position: 'relative' } }}>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <X />
            </IconButton>
            <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.75rem', p: 3, color: 'text.primary' }}>
                {product ? 'Edit Product' : 'Add Product'}
            </DialogTitle>
            <DialogContent sx={{ p: 3, pt: 1 }}>
                <Grid container spacing={3}>
                    {/* Left side: Main details */}
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
                            <TextField
                                label="Product Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                                required
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
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', border: '2px dashed', borderColor: 'divider', borderRadius: 3, p: 2, bgcolor: 'background.default', position: 'relative' }}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="image-upload-dialog-main"
                                type="file"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="image-upload-dialog-main" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: 150 }}>
                                {imagePreview ? (
                                    <Avatar src={imagePreview} variant="rounded" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'text.secondary' }}>
                                        <UploadCloud size={48} />
                                        <Typography sx={{ mt: 2, fontWeight: 600 }}>Upload Image</Typography>
                                    </Box>
                                )}
                            </label>
                            {imagePreview && (
                                <IconButton
                                    size="small"
                                    onClick={() => { setImagePreview(null); setFormData({ ...formData, image: '' }); }}
                                    sx={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.8)', '&:hover': { background: 'rgba(255,255,255,1)' } }}
                                >
                                    <X size={16} />
                                </IconButton>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 2 }}>
                <Button onClick={handleClose} sx={{ borderRadius: 3, px: 2 }} >Cancel</Button>
                <Button onClick={onFormSubmit} variant="contained" sx={{ borderRadius: 3, px: 3 }}>
                    {product ? 'Save Changes' : 'Add Product'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductForm;
