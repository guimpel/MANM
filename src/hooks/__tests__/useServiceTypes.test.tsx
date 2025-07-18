
import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useServiceTypes } from '../useServiceTypes';

// Mock Supabase
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          order: jest.fn(() => Promise.resolve({ data: [], error: null }))
        }))
      }))
    }))
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

describe('useServiceTypes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch service types successfully', async () => {
    const mockServiceTypes = [
      {
        id: '1',
        name: 'Mechanical Repair',
        category: 'mechanical',
        description: 'General mechanical services',
        active: true,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Electrical Repair',
        category: 'electrical', 
        description: 'Electrical system services',
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
    expect(result.current.data).toHaveLength(2);
  });

  it('should handle fetch error gracefully', async () => {
    const mockSupabase = {
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            order: jest.fn(() => Promise.resolve({ 
              data: null, 
              error: { message: 'Network error' }
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
