const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors()); // Enable CORS for all routes

// Endpoint to fetch arbitrage data
app.get('/api/arbitrage', async (req, res) => {
    try {
        // Fetch prices from Binance
        const binanceResponse = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT');
        const binancePrice = parseFloat(binanceResponse.data.price);

        // Fetch prices from Solana DEX (replace with actual Solana DEX API)
        const solanaResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const solanaPrice = parseFloat(solanaResponse.data.solana.usd);

        // Calculate arbitrage percentage
        const arbitragePercentage = ((solanaPrice - binancePrice) / binancePrice) * 100;

        // Return the data
        res.json({
            tokenPair: "SOL/USDC",
            binancePrice,
            solanaPrice,
            arbitragePercentage,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error fetching data:', error.message); // Log the error message
        res.status(500).json({ error: 'Failed to fetch data', details: error.message }); // Return error details
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 