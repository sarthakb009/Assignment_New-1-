import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ArbitrageTable.css';

const ArbitrageTable = () => {
  const [arbitrageData, setArbitrageData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real-time arbitrage data from the backend
  const fetchArbitrageData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/arbitrage');
      setArbitrageData([response.data]); // Wrap in an array for mapping
    } catch (error) {
      console.error('Error fetching arbitrage data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArbitrageData();
    const interval = setInterval(fetchArbitrageData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="arbitrage-container">
      <h1>Crypto Arbitrage Opportunities</h1>
      <h3>Binance vs Solana DEX</h3>
      <div className="table-container">
        <table className="arbitrage-table">
          <thead>
            <tr>
              <th>Token Pair</th>
              <th>Binance Price</th>
              <th>Solana Price</th>
              <th>Arbitrage %</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {arbitrageData.map((opportunity, index) => (
              <tr 
                key={index}
                className={opportunity.arbitragePercentage > 0 ? 'positive' : 'negative'}
              >
                <td>{opportunity.tokenPair}</td>
                <td>${opportunity.binancePrice.toFixed(6)}</td>
                <td>${opportunity.solanaPrice.toFixed(6)}</td>
                <td>{opportunity.arbitragePercentage.toFixed(2)}%</td>
                <td>{new Date(opportunity.timestamp).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArbitrageTable; 