export const mockArbitrageData = [
  {
    id: 1,
    tokenPair: "SOL/USDC",
    binancePrice: 124.53,
    solanaPrice: 125.89,
    arbitragePercentage: 1.09,
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    tokenPair: "RAY/USDC",
    binancePrice: 1.23,
    solanaPrice: 1.28,
    arbitragePercentage: 4.07,
    timestamp: new Date().toISOString(),
  },
  {
    id: 3,
    tokenPair: "BONK/USDC",
    binancePrice: 0.000012,
    solanaPrice: 0.000011,
    arbitragePercentage: -8.33,
    timestamp: new Date().toISOString(),
  },
  {
    id: 4,
    tokenPair: "ORCA/USDC",
    binancePrice: 0.85,
    solanaPrice: 0.88,
    arbitragePercentage: 3.53,
    timestamp: new Date().toISOString(),
  },
]; 