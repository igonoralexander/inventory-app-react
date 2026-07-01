import React, { useState } from 'react';
import {
    Box, Typography, TextField, Button, Paper, Container,
    InputAdornment, IconButton, Grid, useTheme
} from '@mui/material';
import { Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        console.log('Password reset requested for:', email);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast.success('If an account with that email exists, a password reset link has been sent.');
            navigate('/login');
        }, 2000);
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, #F0F4F8 100%)`
        }}>
            <Container maxWidth="xs">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 4, mt: -8, border: `1px solid ${theme.palette.divider}` }}>
                        <Box sx={{ mb: 3, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                                Forgot Password?
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                No worries, we'll send you reset instructions.
                            </Typography>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Mail size={20} />
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: 3 }
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                sx={{ borderRadius: 3, py: 1.5, textTransform: 'none', fontSize: '1rem', mt: 2, mb: 2 }}
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </Button>

                             <Grid container justifyContent="center">
                                <Grid item>
                                    <Button
                                        onClick={() => navigate('/login')}
                                        startIcon={<ArrowLeft size={16} />}
                                        sx={{ textTransform: 'none', fontWeight: 500 }}
                                    >
                                        Back to Login
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

export default ForgotPassword;
