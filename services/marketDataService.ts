import { CryptoData, ChartDataPoint } from '../types';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

// Fetches the top 15 cryptocurrencies for the ticker display.
export const fetchCryptoPrices = async (): Promise<CryptoData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false`);
    if (!response.ok) {
      throw new Error(`CoinGecko API request failed with status ${response.status}`);
    }
    const data = await response.json();
    
    // Map the API response to our CryptoData interface
    return data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h,
      image: coin.image,
    }));
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    // In case of an API error, return an empty array to prevent the app from crashing.
    return [];
  }
};

// Fetches historical market data for a specific coin to be used in the price chart.
export const fetchCryptoChartData = async (coinId: string): Promise<ChartDataPoint[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=30&interval=daily`);
        if (!response.ok) {
            throw new Error(`CoinGecko API request for chart data failed with status ${response.status}`);
        }
        const data = await response.json();
        return data.prices; // The API returns an array of [timestamp, price]
    } catch (error) {
        console.error(`Error fetching chart data for ${coinId}:`, error);
        return [];
    }
};
