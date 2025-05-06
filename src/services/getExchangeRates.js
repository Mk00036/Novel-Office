import axios from 'axios';
import { EXCHANGE_RATE_BASE_URL } from '../constants/apiUrls';

const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;

export async function getExchangeRates(baseCurrency = 'USD') {
  const url = `${EXCHANGE_RATE_BASE_URL}/${API_KEY}/latest/${baseCurrency}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error.response?.data || error.message);
    throw error;
  }
}
