export const queryKeys = {
  auth: {
    user: () => ['auth', 'user'],
  },
  wallet: {
    all: () => ['wallet'],
    balance: (address: string) => ['wallet', 'balance', address],
    tokens: (address: string) => ['wallet', 'tokens', address],
    transactions: (address: string) => ['wallet', 'transactions', address],
  },
  market: {
    all: () => ['market'],
    coins: () => ['market', 'coins'],
    coin: (symbol: string) => ['market', 'coin', symbol],
    chart: (symbol: string, timeframe: string) => 
      ['market', 'chart', symbol, timeframe],
    onchain: (address: string, chain: string) => 
      ['market', 'onchain', address, chain],
  },
  p2p: {
    all: () => ['p2p'],
    listings: (filters: object) => ['p2p', 'listings', filters],
    seller: (sellerId: string) => ['p2p', 'seller', sellerId],
    sellerAds: (sellerId: string) => ['p2p', 'seller', sellerId, 'ads'],
    sellerReviews: (sellerId: string) => ['p2p', 'seller', sellerId, 'reviews'],
    orders: () => ['p2p', 'orders'],
    order: (orderId: string) => ['p2p', 'order', orderId],
  },
  alerts: {
    all: () => ['alerts'],
    list: () => ['alerts', 'list'],
  },
  kyc: {
    status: () => ['kyc', 'status'],
  },
  deposit: {
    coins: () => ['deposit', 'coins'],
    networks: (coinId: string) => ['deposit', 'networks', coinId],
  },
};
