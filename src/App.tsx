import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import BottomNav from './components/BottomNavigation';
import Header from './components/Header';
import Splash from './pages/SplashScreen';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import ProductList from './pages/ProductList';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import RecordPurchase from './pages/RecordPurchase';
import RecordSale from './pages/RecordSale';
import Reports from './pages/Reports';
import Customers from './pages/Customers';
import Sales from './pages/Sales';
import More from './pages/More';

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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000); // Show splash for 4 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (showSplash) {
    return <Splash />;
  }

  return (
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/login" element={!isLoggedIn ? <Login handleLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={<Registration />} />
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
      </Router>
  );
};

export default App;