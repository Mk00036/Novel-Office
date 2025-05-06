import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { calculateEMI } from "../../utils/calculateEMI";
import EmiScheduleTable from "../../components/table/EmiScheduleTable";
import { useCurrency } from "../../context/CurrencyContext";

const Home = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [termYears, setTermYears] = useState("");
  const [errors, setErrors] = useState({});
  const [emiResult, setEmiResult] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const validate = () => {
    const newErrors = {};

    if (!loanAmount) newErrors.loanAmount = "Loan amount is required";
    else if (isNaN(loanAmount)) newErrors.loanAmount = "Only numbers allowed";

    if (!interestRate) newErrors.interestRate = "Interest rate is required";
    else if (isNaN(interestRate))
      newErrors.interestRate = "Only numbers allowed";

    if (!termYears) newErrors.termYears = "Term (years) is required";
    else if (isNaN(termYears)) newErrors.termYears = "Only numbers allowed";

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
      console.log("Monthly EMI:", monthlyEMI);
      console.log("Schedule:", schedule);
      setEmiResult({ monthlyEMI, schedule });
    }
  };

  // Reset function to clear form and EMI result
  const handleReset = () => {
    setLoanAmount("");
    setInterestRate("");
    setTermYears("");
    setErrors({});
    setEmiResult(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        backgroundColor: "#f0f0f0",
        mt: 4, // Margin top to separate from navbar
      }}
    >
      {/* Form Container */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          p: { xs: 3, md: 6 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "300px", // Fixed height for form container
          mb: 4, // Margin bottom to separate from table
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h4"}
          gutterBottom
          textAlign="center"
          fontWeight="bold"
        >
          Loan Calculator
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            justifyContent: "center",
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

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ px: 6, py: 1.5, fontWeight: "bold" }}
          >
            Calculate
          </Button>
        </Box>
      </Box>

      {/* EMI Result Table */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          p: { xs: 3, md: 6 },
          mt: 4, // Adds top margin for spacing from form
        }}
      >
        {emiResult ? (
          <>
            <Typography variant="h6" textAlign="center">
              Monthly EMI: ₹{emiResult.monthlyEMI.toLocaleString()}
            </Typography>

            <EmiScheduleTable schedule={emiResult.schedule} />
            {/* Reset Button */}
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleReset}
                sx={{ px: 6, py: 1.5, fontWeight: "bold" }}
              >
                Reset
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="body1" textAlign="center" color="textSecondary">
            Please fill in the form and calculate the EMI.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Home;
