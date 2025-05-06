import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { useCurrency } from '../../context/CurrencyContext';

const EmiScheduleTable = ({ schedule }) => {
  const { currency } = useCurrency();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom textAlign="center" fontWeight="bold">
        EMI Schedule
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: '60vh',
          overflow: 'auto',
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Principal</TableCell>
              <TableCell>Interest</TableCell>
              <TableCell>Remaining Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.month}</TableCell>
                <TableCell>{formatCurrency(row.principal)}</TableCell>
                <TableCell>{formatCurrency(row.interest)}</TableCell>
                <TableCell>{formatCurrency(row.remainingBalance)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmiScheduleTable;
