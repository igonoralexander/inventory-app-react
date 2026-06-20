import {create} from 'zustand';
import type { InventoryItem } from '../types/inventory';

interface InventoryState {
  inventory: InventoryItem[];
  isLoading: boolean;
  error: string | null;
  fetchInventory: () => Promise<void>;
  addItem: (item: Omit<InventoryItem, 'id'>) => Promise<void>;
  editItem: (item: InventoryItem) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
}

const mockInventory: InventoryItem[] = [
  { id: 1, name: 'Laptop', quantity: 10, price: 1200 },
  { id: 2, name: 'Keyboard', quantity: 25, price: 75 },
  { id: 3, name: 'Mouse', quantity: 50, price: 25 },
  { id: 4, name: 'Monitor', quantity: 5, price: 300 },
  { id: 5, name: 'Webcam', quantity: 15, price: 50 },
  { id: 6, name: 'USB Hub', quantity: 30, price: 20 },
  { id: 7, name: 'Docking Station', quantity: 8, price: 150 },
];

const api = {
  getInventory: async (): Promise<InventoryItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [...mockInventory];
  },
  addItem: async (item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newItem = { ...item, id: Date.now() };
    mockInventory.push(newItem);
    return newItem;
  },
  editItem: async (item: InventoryItem): Promise<InventoryItem> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockInventory.findIndex(i => i.id === item.id);
    if (index !== -1) {
      mockInventory[index] = item;
      return item;
    }
    throw new Error('Item not found');
  },
  deleteItem: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockInventory.findIndex(i => i.id === id);
    if (index !== -1) {
      mockInventory.splice(index, 1);
    } else {
      throw new Error('Item not found');
    }
  },
};

export const useInventoryStore = create<InventoryState>((set) => ({
  inventory: [],
  isLoading: false,
  error: null,
  fetchInventory: async () => {
    set({ isLoading: true, error: null });
    try {
      const inventory = await api.getInventory();
      set({ inventory, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch inventory';
      set({ isLoading: false, error: errorMessage });
    }
  },
  addItem: async (item) => {
    try {
      const newItem = await api.addItem(item);
      set((state) => ({ inventory: [...state.inventory, newItem] }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add item';
      set({ error: errorMessage });
    }
  },
  editItem: async (item) => {
    try {
      const updatedItem = await api.editItem(item);
      set((state) => ({
        inventory: state.inventory.map((i) => (i.id === updatedItem.id ? updatedItem : i)),
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to edit item';
      set({ error: errorMessage });
    }
  },
  deleteItem: async (id) => {
    try {
      await api.deleteItem(id);
      set((state) => ({
        inventory: state.inventory.filter((i) => i.id !== id),
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete item';
      set({ error: errorMessage });
    }
  },
}));
