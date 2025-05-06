// utils/calculateEMI.js
export const calculateEMI = (P, annualRate, termYears) => {
    const N = termYears * 12;
    const R = annualRate / 12 / 100;
  
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
  };
  