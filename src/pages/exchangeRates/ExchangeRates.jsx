import * as React from 'react';
import { useExchangeRates } from '../../hooks/useExchangeRates';
import { Box, Typography } from '@mui/material';
import ExchangeRatesTable from '../../components/table/ExchangeRatesTable';

export default function ExchangeRates() {
  const { rates, loading, error } = useExchangeRates('USD');
  console.log(rates , "rates")

  return (
    <Box sx={{ padding: '20px' }}>
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
      Exchange Rates
    </Typography>
    <ExchangeRatesTable rates={rates} loading={loading} error={error} />
  </Box>
  );
}
