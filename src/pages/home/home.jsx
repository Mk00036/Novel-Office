import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { calculateEMI } from '../../utils/calculateEMI';

const Home = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [termYears, setTermYears] = useState('');
  const [errors, setErrors] = useState({});
  const [emiResult, setEmiResult] = useState(null); // To store the EMI result

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const validate = () => {
    const newErrors = {};

    if (!loanAmount) newErrors.loanAmount = 'Loan amount is required';
    else if (isNaN(loanAmount)) newErrors.loanAmount = 'Only numbers allowed';

    if (!interestRate) newErrors.interestRate = 'Interest rate is required';
    else if (isNaN(interestRate)) newErrors.interestRate = 'Only numbers allowed';

    if (!termYears) newErrors.termYears = 'Term (years) is required';
    else if (isNaN(termYears)) newErrors.termYears = 'Only numbers allowed';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const { monthlyEMI, schedule } = calculateEMI(
        parseFloat(loanAmount),
        parseFloat(interestRate),
        parseFloat(termYears)
      );

      // Log the results
      console.log('Monthly EMI:', monthlyEMI);
      console.log('Schedule:', schedule);

      // Optionally set the result to display in the UI
      setEmiResult({ monthlyEMI, schedule });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        backgroundColor: '#f0f0f0',
        marginTop: { xs: -4, md: -6 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 3,
          p: { xs: 3, md: 6 },
        }}
      >
        <Typography
          variant={isMobile ? 'h6' : 'h4'}
          gutterBottom
          textAlign="center"
          fontWeight="bold"
        >
          Loan Calculator
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            justifyContent: 'center',
          }}
        >
          <TextField
            label="Loan Amount"
            fullWidth
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            error={!!errors.loanAmount}
            helperText={errors.loanAmount}
          />

          <TextField
            label="Interest Rate (%)"
            fullWidth
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            error={!!errors.interestRate}
            helperText={errors.interestRate}
          />

          <TextField
            label="Term (Years)"
            fullWidth
            value={termYears}
            onChange={(e) => setTermYears(e.target.value)}
            error={!!errors.termYears}
            helperText={errors.termYears}
          />
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ px: 6, py: 1.5, fontWeight: 'bold' }}
          >
            Calculate
          </Button>
        </Box>

        {/* Optional: Display EMI result */}
        {emiResult && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" textAlign="center">
              Monthly EMI: {emiResult.monthlyEMI}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
