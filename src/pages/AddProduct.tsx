import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Typography, TextField, Button, Paper, IconButton, useTheme, useMediaQuery, Select, MenuItem, FormControl, InputLabel, Grid, Avatar
} from '@mui/material';
import { ArrowLeft, ImageUp, UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';

const AddProduct = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const navigate = useNavigate();
    const [image, setImage] = useState<File | null>(null);

    const handleBack = () => {
        navigate(-1);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <IconButton sx={{ mr: 1, color: 'text.primary' }} onClick={handleBack}>
                        <ArrowLeft />
                    </IconButton>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Add New Product
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: isDesktop ? 4 : 2, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, boxShadow: 'none' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Product Name" variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="SKU" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Initial Stock Quantity" type="number" variant="outlined" required />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper
                            component={motion.div}
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.3 }}
                            sx={{
                                p: 3, borderRadius: 4, textAlign: 'center',
                                border: `2px dashed ${theme.palette.divider}`,
                                bgcolor: 'background.default', boxShadow: 'none',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'
                            }}
                        >
                            <input accept="image/*" style={{ display: 'none' }} id="raised-button-file" type="file" onChange={handleImageUpload} />
                            <label htmlFor="raised-button-file" style={{ width: '100%', cursor: 'pointer' }}>
                                {image ? (
                                    <Avatar src={URL.createObjectURL(image)} sx={{ width: 100, height: 100, m: 'auto' }} />
                                ) : (
                                    <>
                                        <UploadCloud size={48} color={theme.palette.text.secondary} />
                                        <Typography sx={{ mt: 2, fontWeight: 600, color: 'text.primary' }}>Upload Image</Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Click to browse</Typography>
                                    </>
                                )}
                            </label>
                            {image && (
                                <Button onClick={() => setImage(null)} sx={{ mt: 1 }}>Remove</Button>
                            )}
                        </Paper>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="outlined" sx={{ borderRadius: 3, px: 3 }}>
                        Discard
                    </Button>
                    <Button variant="contained" color="primary" sx={{ borderRadius: 3, px: 4 }}>
                        Save Product
                    </Button>
                </Box>
            </motion.div>
        </Box>
    );
}

export default AddProduct;
