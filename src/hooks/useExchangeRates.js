import { useEffect, useState } from 'react';
import { getExchangeRates } from '../services/getExchangeRates';

export function useExchangeRates(baseCurrency = 'USD') {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchRates() {
      setLoading(true);
      setError(null);
      try {
        const data = await getExchangeRates(baseCurrency);
        if (isMounted) {
          setRates(data.conversion_rates);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchRates();

    return () => {
      isMounted = false;
    };
  }, [baseCurrency]);

  return { rates, loading, error };
}
