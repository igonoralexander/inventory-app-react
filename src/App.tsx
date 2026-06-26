import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
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

const ProtectedLayout = ({ handleLogout }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header handleLogout={handleLogout} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '64px', mb: '56px' }}>
                <Outlet />
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
        }, 2000); // Reduced splash time to 2 seconds

        return () => clearTimeout(timer);
    }
  }, [showSplash]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
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
      </Router>
  );
};

export default App;
