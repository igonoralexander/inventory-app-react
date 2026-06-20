import { useState, useMemo, useEffect, ChangeEvent } from 'react';
import {
  Box, Typography, Button, IconButton, Grid, TextField, InputAdornment, 
  Chip, CircularProgress, Alert, Paper, Fab
} from '@mui/material';
import { Plus, Search, Edit, Trash2, Sliders } from 'lucide-react';
import type { InventoryItem } from '../types/inventory';
import AddItemDialog from '../components/AddItemDialog';
import EditItemDialog from '../components/EditItemDialog';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { useInventoryStore } from '../store/inventoryStore';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onEdit, onDelete }: { product: InventoryItem; onEdit: (product: InventoryItem) => void; onDelete: (id: number) => void; }) => {
  const getStatusChip = (quantity: number) => {
    if (quantity === 0) {
        return <Chip label="Out of Stock" size="small" color="error" sx={{ fontWeight: 500 }} />;
    }
    if (quantity < 20) {
        return <Chip label="Low Stock" size="small" color="warning" sx={{ fontWeight: 500 }} />;
    }
    return <Chip label="In Stock" size="small" color="success" sx={{ fontWeight: 500 }} />;
  }

  return (
    <Grid item xs={6} sm={6} md={4}>
        <motion.div whileHover={{ y: -5 }}>
            <Paper sx={{ overflow: 'hidden', borderRadius: 4 }}>
                <img src={`https://source.unsplash.com/random/400x300?product=${product.id}`} alt={product.name} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
                <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>{product.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>ID: {product.id}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>{`$${product.price}`}</Typography>
                        {getStatusChip(product.quantity)}
                    </Box>
                     <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>Qty: {product.quantity}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        <IconButton size="small" onClick={() => onEdit(product)}>
                            <Edit size={18} />
                        </IconButton>
                        <IconButton size="small" onClick={() => onDelete(product.id)}>
                            <Trash2 size={18} color="#EF4444" />
                        </IconButton>
                    </Box>
                </Box>
            </Paper>
        </motion.div>
    </Grid>
  )
}

const Inventory = () => {
  const { inventory, isLoading, error, fetchInventory, addItem, editItem, deleteItem } = useInventoryStore();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const filteredInventory = useMemo(() => {
    return inventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [inventory, searchTerm]);

  const handleAddItem = async (item: Omit<InventoryItem, 'id'>) => {
    await addItem(item);
  };

  const handleEditItem = async (item: InventoryItem) => {
    await editItem(item);
  };

  const openDeleteDialog = (id: number) => {
    setItemToDelete(id);
    setIsConfirmDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete !== null) {
      await deleteItem(itemToDelete);
      setItemToDelete(null);
    }
    setIsConfirmDialogOpen(false);
  };

  const openEditDialog = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  return (
    <Box sx={{ px: '20px', pb: '20px' }}>
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', borderRadius: '18px', height: '56px', mb: 3 }}>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search products..." onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <Search />
          </IconButton>
           <IconButton sx={{ p: '10px' }} aria-label="filter">
            <Sliders />
          </IconButton>
        </Paper>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>
        )}
        {!isLoading && !error && (
             <Grid container spacing={2}>
                {filteredInventory.map(item => (
                    <ProductCard key={item.id} product={item} onEdit={openEditDialog} onDelete={openDeleteDialog} />
                ))}
            </Grid>
        )}

        {filteredInventory.length === 0 && !isLoading && (
            <Box textAlign="center" mt={5}>
                <Typography variant="h6">No Products Found</Typography>
                <Typography color="textSecondary">Add a new product to get started.</Typography>
                <Button variant="contained" startIcon={<Plus />} onClick={() => setIsAddDialogOpen(true)} sx={{ mt: 2 }}>
                    Add Product
                </Button>
            </Box>
        )}
        
        <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 88, right: 20 }} onClick={() => setIsAddDialogOpen(true)}>
            <Plus />
        </Fab>

        <AddItemDialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAddItem={handleAddItem}
        />
        {selectedItem && <EditItemDialog
          open={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedItem(null);
          }}
          onEditItem={handleEditItem}
          item={selectedItem}
        />}
        <ConfirmationDialog
          open={isConfirmDialogOpen}
          onClose={() => setIsConfirmDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Confirm Deletion"
          message="Are you sure you want to delete this product? This action cannot be undone."
        />
    </Box>
  );
};

export default Inventory;
