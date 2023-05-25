import React, { useState, useEffect } from 'react';

const BitcoinPrice = (key) => {
  const [btcPrice, setBtcPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        );
        const data = await response.json();
        setBtcPrice(data.bitcoin.usd);
      } catch (error) {
        console.error('Error fetching BTC price:', error);
      }
    };

    fetchPrice();
  }, [key]);

  return (
    <div>
      {btcPrice ? (
        <h2>BTC/USD: ${btcPrice.toLocaleString()}</h2>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BitcoinPrice;
