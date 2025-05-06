import { useMemo } from 'react';

const useEmiCalculator = (loanAmount, interestRate, loanTermYears) => {
  const result = useMemo(() => {
    if (!loanAmount || !interestRate || !loanTermYears) return null;

    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const N = parseInt(loanTermYears * 12); // Total months
    const R = annualRate / 12 / 100; // Monthly interest rate

    // EMI Formula
    const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const monthlyEMI = parseFloat(emi.toFixed(2));

    let remainingBalance = P;
    const schedule = [];

    for (let i = 0; i < N; i++) {
      const interest = parseFloat((remainingBalance * R).toFixed(2));
      const principal = parseFloat((monthlyEMI - interest).toFixed(2));
      remainingBalance = parseFloat((remainingBalance - principal).toFixed(2));

      schedule.push({
        month: i + 1,
        principal,
        interest,
        remainingBalance: remainingBalance < 0 ? 0 : remainingBalance,
      });
    }

    return { monthlyEMI, schedule };
  }, [loanAmount, interestRate, loanTermYears]);

  return result;
};

export default useEmiCalculator;
