import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Inventory from './Inventory';
import { useInventoryStore } from '../store/inventoryStore';

vi.mock('../store/inventoryStore');

describe('Inventory', () => {
  const mockInventory = [
    { id: 1, name: 'Laptop', quantity: 10, price: 1200 },
    { id: 2, name: 'Keyboard', quantity: 25, price: 75 },
    { id: 3, name: 'Mouse', quantity: 50, price: 25 },
  ];

  it('renders the inventory table', () => {
    (useInventoryStore as any).mockReturnValue({
      inventory: mockInventory,
      isLoading: false,
      error: null,
      fetchInventory: vi.fn(),
    });

    render(<Inventory />);

    expect(screen.getByText('Inventory List')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Keyboard')).toBeInTheDocument();
    expect(screen.getByText('Mouse')).toBeInTheDocument();
  });

  it('filters the inventory based on search term', () => {
    (useInventoryStore as any).mockReturnValue({
      inventory: mockInventory,
      isLoading: false,
      error: null,
      fetchInventory: vi.fn(),
    });

    render(<Inventory />);

    const searchInput = screen.getByPlaceholderText('Search for items...');
    fireEvent.change(searchInput, { target: { value: 'key' } });

    expect(screen.queryByText('Laptop')).not.toBeInTheDocument();
    expect(screen.getByText('Keyboard')).toBeInTheDocument();
    expect(screen.queryByText('Mouse')).not.toBeInTheDocument();
  });
});
