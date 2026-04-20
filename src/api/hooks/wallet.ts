import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { mockApi } from '../mockApi';

export function useTransactionHistory(address: string) {
  return useInfiniteQuery({
    queryKey: queryKeys.wallet.transactions(address),
    queryFn: async ({ pageParam = 1 }) => {
      // simulate pagination logic on top of mocked transactions
      const txs = await mockApi.getWalletTransactions();
      return {
        items: txs,
        page: pageParam,
        hasMore: false,
      };
    },
    getNextPageParam: (lastPage: any) => lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 60 * 1000,
  });
}
