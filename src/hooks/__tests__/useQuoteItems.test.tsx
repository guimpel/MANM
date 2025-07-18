
import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useQuoteItems, useCreateQuoteItem } from '../useQuoteItems';

// Mock Supabase
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          order: jest.fn(() => Promise.resolve({ data: [], error: null }))
        }))
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: {}, error: null }))
        }))
      }))
    }))
  }
}));

// Mock toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useQuoteItems', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch quote items successfully', async () => {
    const mockQuoteItems = [
      {
        id: '1',
        quote_id: 'quote-1',
        description: 'Oil change service',
        quantity: 1,
        unit_price: 50.00,
        total_price: 50.00,
        created_at: new Date().toISOString()
      }
    ];

    const mockSupabase = {
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            order: jest.fn(() => Promise.resolve({ 
              data: mockQuoteItems, 
              error: null 
            }))
          }))
        }))
      }))
    };

    const mockModule = require('@/integrations/supabase/client');
    mockModule.supabase = mockSupabase;

    const { result } = renderHook(() => useQuoteItems('quote-1'), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockQuoteItems);
  });

  it('should return empty array when no quote ID provided', () => {
    const { result } = renderHook(() => useQuoteItems(''), {
      wrapper: createWrapper()
    });

    expect(result.current.data).toEqual([]);
  });
});

describe('useCreateQuoteItem', () => {
  it('should create quote item successfully', async () => {
    const mockCreatedItem = {
      id: '1',
      quote_id: 'quote-1',
      description: 'New service',
      quantity: 2,
      unit_price: 25.00,
      total_price: 50.00,
      created_at: new Date().toISOString()
    };

    const mockSupabase = {
      from: jest.fn(() => ({
        insert: jest.fn(() => ({
          select: jest.fn(() => ({
            single: jest.fn(() => Promise.resolve({ 
              data: mockCreatedItem, 
              error: null 
            }))
          }))
        }))
      }))
    };

    const mockModule = require('@/integrations/supabase/client');
    mockModule.supabase = mockSupabase;

    const { result } = renderHook(() => useCreateQuoteItem(), {
      wrapper: createWrapper()
    });

    result.current.mutate({
      quote_id: 'quote-1',
      description: 'New service',
      quantity: 2,
      unit_price: 25.00
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
