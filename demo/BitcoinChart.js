import React, { useEffect, useState, useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


  export const options = {
    responsive: true,
    layout: {
      padding: 10,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'BTC/USD Price Chart - 1 Day',
      },
    },
  };




const BitcoinChart = (key) => {
  const [chartData, setChartData] = useState({});

  const isMounted = useRef(false)

    // initial state
  useEffect(() => {
    const fetchHistoricalData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=minutely"
      );
      const data = await response.json();
      const prices = data.prices.map((price) => (
        { x: new Date(price[0]).toUTCString(), y: price[1] }
      ));
      setChartData({
        datasets: [
          {
            label: "BTC/USD",
            data: prices,
            fill: false,
            borderColor: "rgba(75,192,192,1)",
            tension: 0.1,
          },
        ],
      });
    };

    fetchHistoricalData();
  }, []);


  // fetch the latest price every 10 seconds

  const fetchPrice = async () => {
    try {
        const response = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        );
        const data = await response.json();
        const price = data.bitcoin.usd;
        const time = new Date().toUTCString();
        setChartData((prevState) => {
            const newChartData = { ...prevState };
            newChartData.datasets[0].data.push({ x: time, y: price });
            return newChartData;
        });
    } catch (error) {
        console.error('Error fetching BTC price:', error);
    }
  };


  useEffect(() => {
      // fetch only the latest price from the coingecko api

      if (isMounted.current) {
        fetchPrice();
      } else {
        isMounted.current = true;
      }

  }, [key]);





  return (
    <div>
        {chartData.datasets && <Line options={options} data={chartData} />}
    </div>
  );
};

export default BitcoinChart;
