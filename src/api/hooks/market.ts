import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { mockApi } from '../mockApi';

export function useCoinList() {
  return useQuery({
    queryKey: queryKeys.market.coins(),
    queryFn: mockApi.getMarketCoins,
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });
}
