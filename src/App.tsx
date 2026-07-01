import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import BottomNav from './components/BottomNavigation';
import Header from './components/Header';

const Splash = lazy(() => import('./pages/SplashScreen'));
const Login = lazy(() => import('./pages/Login'));
const Registration = lazy(() => import('./pages/Registration'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Inventory = lazy(() => import('./pages/Inventory'));
const ProductList = lazy(() => import('./pages/ProductList'));
const Products = lazy(() => import('./pages/Products'));
const AddProduct = lazy(() => import('./pages/AddProduct'));
const RecordPurchase = lazy(() => import('./pages/RecordPurchase'));
const RecordSale = lazy(() => import('./pages/RecordSale'));
const Reports = lazy(() => import('./pages/Reports'));
const Customers = lazy(() => import('./pages/Customers'));
const Sales = lazy(() => import('./pages/Sales'));
const More = lazy(() => import('./pages/More'));
const LowStockPage = lazy(() => import('./pages/LowStockPage'));
const OutOfStockPage = lazy(() => import('./pages/OutOfStockPage'));
const StockOverviewPage = lazy(() => import('./pages/StockOverviewPage'));

const AnimatedOutlet = () => {
    const o = useLocation();
    return (
        <motion.div
            key={o.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <Outlet />
        </motion.div>
    );
};

const ProtectedLayout = ({ handleLogout }) => {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => {
        toast.success('Page Refreshed');
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header handleLogout={handleLogout} handleRefresh={handleRefresh} />
            <Box key={refreshKey} component="main" sx={{ flexGrow: 1, p: 3, mt: '64px', mb: '56px' }}>
                <AnimatedOutlet />
            </Box>
            <BottomNav />
        </Box>
    );
};

const LoadingFallback = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
    </Box>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!sessionStorage.getItem('isLoggedIn'));
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('splashShown'));

  useEffect(() => {
    if (showSplash) {
        const timer = setTimeout(() => {
            setShowSplash(false);
            sessionStorage.setItem('splashShown', 'true');
        }, 2000);

        return () => clearTimeout(timer);
    }
  }, [showSplash]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
    toast.success('Successfully logged in!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
    toast.success('Successfully logged out!');
  };

  if (showSplash) {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Splash />
        </Suspense>
    );
  }

  return (
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Toaster position="top-center" reverseOrder={false} />
          <AnimatePresence mode="wait">
              <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                      <Route path="/login" element={!isLoggedIn ? <Login handleLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
                      <Route path="/register" element={!isLoggedIn ? <Registration /> : <Navigate to="/dashboard" />} />
                      <Route 
                          element={
                              isLoggedIn ? (
                                  <ProtectedLayout handleLogout={handleLogout} />
                              ) : (
                                  <Navigate to="/login" />
                              )
                          }
                      >
                          <Route path="/" element={<Navigate to="/dashboard" replace />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/inventory" element={<Inventory />} />
                          <Route path="/inventory/low-stock" element={<LowStockPage />} />
                          <Route path="/inventory/out-of-stock" element={<OutOfStockPage />} />
                          <Route path="/inventory/in-stock" element={<StockOverviewPage />} />
                          <Route path="/productlist" element={<ProductList />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/sales" element={<Sales />} />
                          <Route path="/customers" element={<Customers />} />
                          <Route path="/reports" element={<Reports />} />
                          <Route path="/more" element={<More />} />
                          <Route path="/products/add" element={<AddProduct />} />
                          <Route path="/inventory/record-purchase" element={<RecordPurchase />} />
                          <Route path="/sales/record" element={<RecordSale />} />
                      </Route>
                  </Routes>
              </Suspense>
          </AnimatePresence>
      </Router>
  );
};

export default App;
