import { useState, useMemo, ChangeEvent } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Button, IconButton, Box, TextField, InputAdornment,
  TableSortLabel, Grid, Switch, FormControlLabel, Chip
} from '@mui/material';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import type { InventoryItem } from '../types/inventory';
import AddItemDialog from '../components/AddItemDialog';
import EditItemDialog from '../components/EditItemDialog';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { visuallyHidden } from '@mui/utils';

const mockInventory: InventoryItem[] = [
  { id: 1, name: 'Laptop', quantity: 10, price: 1200 },
  { id: 2, name: 'Keyboard', quantity: 25, price: 75 },
  { id: 3, name: 'Mouse', quantity: 50, price: 25 },
  { id: 4, name: 'Monitor', quantity: 5, price: 300 },
  { id: 5, name: 'Webcam', quantity: 15, price: 50 },
  { id: 6, name: 'USB Hub', quantity: 30, price: 20 },
  { id: 7, name: 'Docking Station', quantity: 8, price: 150 },
];

type Order = 'asc' | 'desc';
type HeadCell = { id: keyof InventoryItem; label: string; numeric: boolean };

const headCells: readonly HeadCell[] = [
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'quantity', numeric: true, label: 'Quantity' },
  { id: 'price', numeric: true, label: 'Price' },
];

const Inventory = () => {
  const [inventory, setInventory] = useState(mockInventory);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof InventoryItem>('name');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showLowStock, setShowLowStock] = useState(false);

  const handleSortRequest = (property: keyof InventoryItem) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedAndFilteredInventory = useMemo(() => {
    let filtered = inventory
      .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(item => {
        const price = item.price;
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        if (!isNaN(min) && price < min) return false;
        if (!isNaN(max) && price > max) return false;
        return true;
      });

    if (showLowStock) {
      filtered = filtered.filter(item => item.quantity < 20);
    }

    const comparator = (a: InventoryItem, b: InventoryItem) => {
      if (b[orderBy] < a[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
      return 0;
    };

    return [...filtered].sort(comparator);
  }, [inventory, searchTerm, order, orderBy, minPrice, maxPrice, showLowStock]);

  const handleAddItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      id: inventory.length > 0 ? Math.max(...inventory.map(i => i.id)) + 1 : 1,
      ...item,
    };
    setInventory([...inventory, newItem]);
  };

  const handleEditItem = (item: InventoryItem) => {
    setInventory(inventory.map((i) => (i.id === item.id ? item : i)));
  };

  const openDeleteDialog = (id: number) => {
    setItemToDelete(id);
    setIsConfirmDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete !== null) {
      setInventory(inventory.filter((i) => i.id !== itemToDelete));
      setItemToDelete(null);
    }
    setIsConfirmDialogOpen(false);
  };

  const openEditDialog = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 4, background: 'background.paper' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Inventory List
        </Typography>
        <Button variant="contained" startIcon={<Plus />} onClick={() => setIsAddDialogOpen(true)} sx={{ borderRadius: 2 }}>
          Add New Item
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for items..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Min Price"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Max Price"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            control={<Switch checked={showLowStock} onChange={(e) => setShowLowStock(e.target.checked)} />}
            label="Low Stock"
          />
        </Grid>
      </Grid>

      <TableContainer>
        <Table>
        <TableHead>
                  <TableRow sx={{ '& .MuiTableCell-root': { borderBottom: 'none', bgcolor: '#F9FAFB', fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem' } }}>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={() => handleSortRequest(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAndFilteredInventory.map((item) => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>{item.name}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Chip label={item.quantity} size="small" sx={{ bgcolor: item.quantity < 20 ? '#FEF2F2' : '#EFF6FF', color: item.quantity < 20 ? '#EF4444' : '#3B82F6', fontWeight: 500 }} />
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 500, color: 'text.secondary' }}>{`$${item.price.toLocaleString()}`}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => openEditDialog(item)} >
                    <Edit size={20} />
                  </IconButton>
                  <IconButton onClick={() => openDeleteDialog(item.id)} >
                    <Trash2 size={20} color="#EF4444" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {sortedAndFilteredInventory.length === 0 && (
        <Typography sx={{ textAlign: 'center', p: 4, color: 'text.secondary' }}>No items match your criteria.</Typography>
      )}

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
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
    </Paper>
  );
};

export default Inventory;
