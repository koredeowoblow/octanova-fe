import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { mockApi } from '../mockApi';

export function useP2PListings(filters: { type: 'buy' | 'sell' }) {
  return useInfiniteQuery({
    queryKey: queryKeys.p2p.listings(filters),
    queryFn: ({ pageParam = 1 }) => mockApi.getP2PListings({ ...filters, page: pageParam, limit: 20 }),
    getNextPageParam: (lastPage: any) => lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 15 * 1000, // 15 seconds
    refetchInterval: 15 * 1000,
  });
}

// Example mutation
export function useCreateOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      // simulate API post
      return new Promise(resolve => setTimeout(() => resolve({ id: 'order-1', ...data }), 1500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.p2p.orders() });
      queryClient.invalidateQueries({ queryKey: queryKeys.p2p.listings({}) });
    }
  });
}
