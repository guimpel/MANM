
import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useServiceTypes } from '../useServiceTypes';
import { useQuoteItems } from '../useQuoteItems';

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
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            single: jest.fn(() => Promise.resolve({ data: {}, error: null }))
          }))
        }))
      })),
      delete: jest.fn(() => ({
        eq: jest.fn(() => Promise.resolve({ error: null }))
      }))
    }))
  }
}));

// Mock Auth Context
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id' },
    isAuthenticated: true
  })
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

describe('Service Types Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch service types successfully', async () => {
    const mockServiceTypes = [
      {
        id: '1',
        name: 'Mechanical',
        category: 'repair',
        description: 'General mechanical services',
        active: true,
        created_at: new Date().toISOString()
      }
    ];

    const mockSupabase = {
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            order: jest.fn(() => Promise.resolve({ 
              data: mockServiceTypes, 
              error: null 
            }))
          }))
        }))
      }))
    };

    const mockModule = require('@/integrations/supabase/client');
    mockModule.supabase = mockSupabase;

    const { result } = renderHook(() => useServiceTypes(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockServiceTypes);
  });

  it('should handle service types fetch error', async () => {
    const mockSupabase = {
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            order: jest.fn(() => Promise.resolve({ 
              data: null, 
              error: { message: 'Database error' }
            }))
          }))
        }))
      }))
    };

    const mockModule = require('@/integrations/supabase/client');
    mockModule.supabase = mockSupabase;

    const { result } = renderHook(() => useServiceTypes(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});

describe('Quote Items Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch quote items for a specific quote', async () => {
    const mockQuoteItems = [
      {
        id: '1',
        quote_id: 'quote-1',
        description: 'Oil change',
        quantity: 1,
        unit_price: 50,
        total_price: 50,
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
});
