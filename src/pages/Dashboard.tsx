import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Paper, Avatar, IconButton, useTheme, Skeleton, Button, LinearProgress
} from '@mui/material';
import {
  Archive,
  AlertTriangle,
  XCircle,
  TrendingUp,
  PlusCircle,
  ShoppingCart,
  Truck,
  FileText,
  List,
  ChevronRight,
  Box as BoxIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StyledAvatar from '../components/StyledAvatar';

// MOCK DATA (Price Removed)
const summaryData = [
    { title: 'Total Products', value: '890', icon: BoxIcon, color: '#6366f1', path: '/products' },
    { title: 'Products In Stock', value: '750', icon: Archive, color: '#0ea5e9', path: '/inventory' },
    { title: 'Low Stock Items', value: '45', icon: AlertTriangle, color: '#f97316', path: '/inventory/low-stock' },
    { title: 'Out of Stock', value: '12', icon: XCircle, color: '#dc2626', path: '/inventory/out-of-stock' },
];
const lowStockItems = [
    { id: 1, name: 'Espresso Machine', image: '', currentQty: 8, minQty: 10 },
    { id: 2, name: 'Mechanical Keyboard', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2670&auto=format&fit=crop', currentQty: 5, minQty: 10 },
    { id: 3, name: 'Designer Sneakers', image: '', currentQty: 3, minQty: 5 },
    { id: 4, name: 'Webcam Pro', image: 'https://images.unsplash.com/photo-1609346938925-6d9b9d2be8a8?q=80&w=2670&auto=format&fit=crop', currentQty: 12, minQty: 15 },
    { id: 5, name: 'Organic Bananas', image: 'https://images.unsplash.com/photo-1571771894824-269f85b83969?q=80&w=2670&auto=format&fit=crop', currentQty: 50, minQty: 100 },
];
const recentSales = [
  { id: 1, time: '2m ago', productName: 'Espresso Machine', qty: 1 },
  { id: 2, time: '15m ago', productName: 'Designer Sneakers', qty: 2 },
  { id: 3, time: '30m ago', productName: 'Webcam Pro', qty: 1 },
  { id: 4, time: '1h ago', productName: 'Mechanical Keyboard', qty: 1 },
];
const topSellingProducts = [
  { id: 1, name: 'Espresso Machine', image: '', unitsSold: 120, popularity: 92 },
  { id: 2, name: 'Designer Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop', unitsSold: 95, popularity: 85 },
  { id: 3, name: 'Mechanical Keyboard', image: '', unitsSold: 80, popularity: 78 },
];
const recentActivity = [
  { id: 1, icon: PlusCircle, description: 'New product "Designer Watch" added', time: '5m ago' },
  { id: 2, icon: ShoppingCart, description: 'Sale recorded for "Espresso Machine" (x1)', time: '12m ago' },
  { id: 3, icon: Truck, description: 'Stock purchased for "Organic Bananas" (+100 units)', time: '45m ago' },
  { id: 4, icon: FileText, description: 'Product "Webcam Pro" details updated', time: '1h ago' },
  { id: 5, icon: XCircle, description: 'Product "Old T-Shirt" deleted', time: '3h ago' },
];

// COMPONENTS
const Card = ({ children, loading, ...props }) => {
    const theme = useTheme();
    return (
        <Paper sx={{ p: 2.5, borderRadius: 4, height: '100%', border: `1px solid ${theme.palette.divider}`, boxShadow: 'none', ...props.sx }}>
            {loading ? <Skeleton variant="rounded" height="100%" /> : children}
        </Paper>
    )
}

const SummaryCard = ({ item, loading }) => {
    const navigate = useNavigate();
    const Icon = item.icon;
    return (
        <motion.div
            onClick={() => navigate(item.path)}
            whileHover={{ y: -5, boxShadow: '0 10px 20px -5px rgba(0,0,0,0.08)' }}
            style={{ height: '100%', cursor: 'pointer' }}
        >
            <Card loading={loading} sx={{display: 'flex', flexDirection: 'column'}}>
                <Box sx={{ width: 40, height: 40, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: `${item.color}20`, mb: 1.5 }}>
                    <Icon size={24} color={item.color} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>{item.value}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{item.title}</Typography>
                {item.change && (
                    <Box sx={{ display: 'flex', alignItems: 'center', color: item.changeType === 'increase' ? 'success.main' : 'error.main', mt: 'auto' }}>
                        <TrendingUp size={14} />
                        <Typography variant="caption" sx={{ fontWeight: 600, ml: 0.5 }}>{item.change}</Typography>
                    </Box>
                )}
            </Card>
        </motion.div>
    );
};

const QuickActionButton = ({ icon, text, loading, path }) => {
    const navigate = useNavigate();
    return (
        <Grid item xs={6} sm={4} md={2.4}>
            {loading ? <Skeleton variant="rounded" height={56} /> : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{height: '100%'}}>
                     <Button onClick={() => navigate(path)} variant="outlined" fullWidth startIcon={icon} sx={{ borderRadius: 3, p: 2, height: '100%', flexDirection: 'column', justifyContent: 'center', borderColor: 'divider', color: 'text.primary', textTransform: 'none', fontWeight: 500 }}>
                        {text}
                    </Button>
                </motion.div>
            )}
        </Grid>
    )
}

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const FADE_IN_VARIANTS = {
        hidden: { opacity: 0, y: 10 },
        visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' }})
    };

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <motion.div custom={1} initial="hidden" animate="visible" variants={FADE_IN_VARIANTS}>
                 <Box sx={{ mb: 4, mt: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Good Morning, Administrator</Typography>
                    <Typography variant="body1" color="text.secondary">Here's a summary of today's business activity.</Typography>
                </Box>
            </motion.div>

            <Grid container spacing={2.5}>
                {summaryData.map((item, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2.4} key={item.title}>
                        <motion.div custom={index + 2} initial="hidden" animate="visible" variants={FADE_IN_VARIANTS} style={{height: '100%'}}>
                           <SummaryCard item={item} loading={loading} />
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

             <Box sx={{ my: 4 }}>
                <motion.div custom={7} initial="hidden" animate="visible" variants={FADE_IN_VARIANTS}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Quick Actions</Typography>
                </motion.div>
                <Grid container spacing={2}>
                    {loading ? Array.from(new Array(5)).map((_, i) => <QuickActionButton key={i} loading={true} />) :
                        <>
                            <QuickActionButton key="add" icon={<PlusCircle size={20}/>} text="Add Product" path="/products/add" />
                            <QuickActionButton key="purchase" icon={<Truck size={20}/>} text="Record Purchase" path="/inventory/record-purchase"/>
                            <QuickActionButton key="sale" icon={<ShoppingCart size={20}/>} text="Record Sale" path="/sales/record" />
                            <QuickActionButton key="inventory" icon={<List size={20}/>} text="View Inventory" path="/products" />
                            <QuickActionButton key="reports" icon={<FileText size={20}/>} text="Reports" path="/reports" />
                        </>
                    }
                </Grid>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                     <motion.div custom={8} initial="hidden" animate="visible" variants={FADE_IN_VARIANTS} style={{height: '100%'}}>
                        <Card loading={loading}>
                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Low Stock Alerts</Typography>
                                <Button size="small" endIcon={<ChevronRight size={16}/>} sx={{ textTransform: 'none', fontWeight: 600 }}>View All</Button>
                            </Box>
                            {lowStockItems.slice(0, 5).map(item => (
                            <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 1.5, p: 1.5, borderRadius: 3, transition: 'background-color 0.2s', '&:hover': { bgcolor: 'action.hover' } }}>
                                {item.image ? <Avatar src={item.image} variant="rounded" sx={{ width: 48, height: 48, mr: 2 }} /> : <StyledAvatar name={item.name} variant="rounded" sx={{ width: 48, height: 48, mr: 2 }} />}
                                <Box flexGrow={1}>
                                    <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Qty: <Typography component="span" sx={{color: 'warning.main', fontWeight: 'bold'}}>{item.currentQty}</Typography> / {item.minQty}
                                    </Typography>
                                </Box>
                                 <Button variant="contained" size="small" sx={{borderRadius: 2, textTransform: 'none', boxShadow: 'none'}}>Restock</Button>
                            </Box>
                            ))}
                        </Card>
                     </motion.div>
                </Grid>
                
                 <Grid item xs={12} md={7}>
                    <motion.div custom={11} initial="hidden" animate="visible" variants={FADE_IN_VARIANTS} style={{height: '100%'}}>
                        <Card loading={loading}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Top Selling Products</Typography>
                                <Button size="small" endIcon={<ChevronRight size={16}/>} sx={{ textTransform: 'none', fontWeight: 600 }}>View All</Button>
                            </Box>
                             {topSellingProducts.map(prod => (
                                <Box key={prod.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, ':last-child': {mb: 0} }}>
                                    {prod.image ? <Avatar src={prod.image} variant="rounded" sx={{ width: 48, height: 48, mr: 2 }} /> : <StyledAvatar name={prod.name} variant="rounded" sx={{ width: 48, height: 48, mr: 2 }} />}
                                    <Box flexGrow={1} sx={{ mr: 2 }}>
                                        <Typography sx={{ fontWeight: 600 }}>{prod.name}</Typography>
                                        <LinearProgress variant="determinate" value={prod.popularity} sx={{height: 6, borderRadius: 3, mt: 0.5}}/>
                                    </Box>
                                    <Box textAlign="right">
                                        <Typography sx={{ fontWeight: 'bold' }}>{prod.unitsSold} units</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6} lg={5}>
                    <motion.div custom={10} initial="hidden" animate="visible" variants={FADE_IN_VARIANTS} style={{height: '100%'}}>
                        <Card loading={loading}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Recent Sales</Typography>
                                <Button size="small" endIcon={<ChevronRight size={16}/>} sx={{ textTransform: 'none', fontWeight: 600 }}>View All</Button>
                            </Box>
                            {recentSales.map(sale => (
                                <Box key={sale.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, ':last-child': {mb: 0} }}>
                                    <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}><ShoppingCart size={20}/></Avatar>
                                    <Box flexGrow={1}>
                                        <Typography sx={{ fontWeight: 600 }}>{sale.productName} (x{sale.qty})</Typography>
                                        <Typography variant="body2" color="text.secondary">{sale.time}</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Card>
                    </motion.div>
                </Grid>
                
                <Grid item xs={12} md={6} lg={7}>
                    <motion.div custom={12} initial="hidden" animate="visible" variants={FADE_IN_VARIANTS} style={{height: '100%'}}>
                        <Card loading={loading}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Recent Activity</Typography>
                                <Button size="small" endIcon={<ChevronRight size={16}/>} sx={{ textTransform: 'none', fontWeight: 600 }}>View All</Button>
                            </Box>
                           {recentActivity.map(act => {
                               const Icon = act.icon;
                               return (
                                   <Box key={act.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, ':last-child': {mb: 0} }}>
                                       <Avatar sx={{ bgcolor: '#E2E8F0', color: 'text.primary', mr: 2 }}><Icon size={18} /></Avatar>
                                       <Box>
                                           <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.4 }}>{act.description}</Typography>
                                           <Typography variant="caption" color="text.secondary">{act.time}</Typography>
                                       </Box>
                                   </Box>
                               )
                           })}
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>

        </Box>
    );
};

export default Dashboard;