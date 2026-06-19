import { useState } from 'react';
import {
  Paper, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  TextField, 
  Divider
} from '@mui/material';
import ConfirmationDialog from '../components/ConfirmationDialog';

const Settings = () => {
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const handleClearInventory = () => {
        // In a real app, this would make an API call to clear the inventory.
        // For now, we'll just log a message to the console.
        console.log('Inventory cleared!');
        setIsConfirmDialogOpen(false);
    };

  return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Profile Settings</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="First Name" fullWidth variant="outlined" defaultValue="John" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Last Name" fullWidth variant="outlined" defaultValue="Doe" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Email" fullWidth variant="outlined" type="email" defaultValue="john.doe@example.com" />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Button variant="contained">Save Profile</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>

        <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Application Settings</Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" color="error" sx={{ fontWeight: 'bold' }}>Danger Zone</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <div>
                            <Typography sx={{ fontWeight: 'bold' }}>Clear All Inventory Data</Typography>
                            <Typography variant="body2" color="text.secondary">
                                This will permanently delete all inventory items. This action cannot be undone.
                            </Typography>
                        </div>
                        <Button 
                            variant="contained" 
                            color="error" 
                            onClick={() => setIsConfirmDialogOpen(true)}
                        >
                        Clear Data
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Grid>

      <ConfirmationDialog 
        open={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleClearInventory}
        title="Confirm Clear Inventory"
        message="Are you sure you want to permanently delete all inventory data? This is irreversible."
      />
    </Grid>
  );
};

export default Settings;
