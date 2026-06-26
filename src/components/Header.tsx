import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, Avatar, Badge, IconButton } from '@mui/material';
import { LogOut, Bell } from 'lucide-react';
import InventoryIcon from '@mui/icons-material/Inventory';

const Header = ({ handleLogout }) => {
  const [randomImageId, setRandomImageId] = useState(1);

  useEffect(() => {
    // Generate a random number between 1 and 70 for pravatar image
    setRandomImageId(Math.floor(Math.random() * 70) + 1);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        boxShadow: '0 2px 4px -1px rgba(0,0,0,0.06), 0 4px 5px 0 rgba(0,0,0,0.04), 0 1px 10px 0 rgba(0,0,0,0.04)',
        borderBottom: '1px solid #EAF0F6'
      }}
    >
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <InventoryIcon sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight:'bold', color: 'text.primary', display: { xs: 'none', sm: 'block' } }}>
            Inventory
          </Typography>
        </Link>
        
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
            <IconButton sx={{color: 'text.secondary'}}>
                <Badge badgeContent={4} color="error">
                    <Bell size={20} />
                </Badge>
            </IconButton>
        
          <Avatar alt="User Avatar" src={`https://i.pravatar.cc/150?img=${randomImageId}`} sx={{ width: 32, height: 32 }} />
          
          <Button 
            variant="outlined" 
            onClick={handleLogout}
            sx={{ 
              textTransform: 'none', 
              borderRadius: '12px',
              borderColor: '#EAF0F6',
              color: 'text.secondary',
              minWidth: 'auto',
              px: { xs: 1, sm: 2 },
              py: 0.75,
              '&:hover': {
                backgroundColor: '#F4F7FC',
                borderColor: '#E0E6F1',
              }
            }}
          >
            <LogOut size={16} />
            <Typography component="span" sx={{ display: { xs: 'none', sm: 'inline' }, ml: 1}}>
                Logout
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
