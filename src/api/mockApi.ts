// Mocking the Backend Responses

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  getMarketCoins: async () => {
    await delay(1000); // simulate network
    const baseTokens = [
      { id: 'btc', symbol: 'BTC', name: 'Bitcoin', bg: 'bg-[#F7931A]', network: 'Bitcoin', balance: '0.045', value: '$2,450.00', rate: 64000.00, enabled: true },
      { id: 'eth', symbol: 'ETH', name: 'Ethereum', bg: 'bg-[#627EEA]', network: 'Ethereum', balance: '1.45', value: '$4,132.50', rate: 2845.50, enabled: true },
      { id: 'usdt', symbol: 'USDT', name: 'Tether', bg: 'bg-[#26A17B]', network: 'Tron', balance: '150.00', value: '$150.00', rate: 1.0, enabled: true },
      { id: 'bnb', symbol: 'BNB', name: 'BNB', bg: 'bg-[#F3BA2F]', network: 'BNB Smart Chain', balance: '2.5', value: '$800.00', rate: 320.00, enabled: true },
      { id: 'sol', symbol: 'SOL', name: 'Solana', bg: 'bg-black', network: 'Solana', balance: '0', value: '$0.00', rate: 145.00, enabled: false },
      { id: 'matic', symbol: 'MATIC', name: 'Polygon', bg: 'bg-[#8247E5]', network: 'Polygon', balance: '0', value: '$0.00', rate: 0.95, enabled: false }
    ];

    const extra = Array.from({ length: 994 }).map((_, i) => ({
      id: `tk-${i}`, 
      symbol: `TK${i}`, 
      name: `Token ${i}`, 
      bg: 'bg-gray-800', 
      network: 'Ethereum', 
      balance: '0', 
      value: '$0.00', 
      rate: Math.random() * 10, 
      enabled: false 
    }));

    return [...baseTokens, ...extra];
  },

  getP2PListings: async ({ page = 1, limit = 20, type = 'buy' }: any) => {
    await delay(1200);
    // Simulate pagination locally
    const items = [
      { id: '1', name: "Slickbee", trades: 310, completion: "98.5%", price: "139,247,858", qty: "0.0001 - 0.05", bank: "Bank Transfer", type: 'buy' },
      { id: '2', name: "OctaTrader", trades: 1450, completion: "100%", price: "139,500,000", qty: "0.01 - 2.5", bank: "Bank Transfer", type: 'buy' },
      { id: '3', name: "FastPayNG", trades: 89, completion: "94.2%", price: "140,100,000", qty: "0.05 - 1.0", bank: "Bank Transfer", type: 'buy' },
      { id: '4', name: "Slickbee", trades: 310, completion: "98.5%", price: "138,500,000", qty: "0.0001 - 0.05", bank: "Bank Transfer", type: 'sell' },
      { id: '5', name: "CryptoWhale", trades: 50, completion: "100%", price: "138,000,000", qty: "0.1 - 5.0", bank: "Bank Transfer", type: 'sell' },
    ].filter(i => i.type === type);
    
    return {
      items,
      page,
      hasMore: false 
    };
  },

  getWalletTransactions: async () => {
    await delay(800);
    return [
      { id: 'tx-1', type: 'Receive', asset: 'BTC', amount: '+0.05 BTC', fiat: '+$3,450.00', date: 'Today, 14:30', status: 'Completed', incoming: true },
      { id: 'tx-2', type: 'Send', asset: 'USDT', amount: '-150.00 USDT', fiat: '-$150.00', date: 'Yesterday, 09:12', status: 'Pending', incoming: false },
      { id: 'tx-3', type: 'Swap', asset: 'ETH → USDT', amount: '1.2 ETH', fiat: '', date: 'Mar 12, 18:45', status: 'Completed', incoming: false },
      { id: 'tx-4', type: 'Receive', asset: 'ETH', amount: '+0.45 ETH', fiat: '+$1,280.00', date: 'Mar 10, 11:20', status: 'Failed', incoming: true },
    ];
  }
};
