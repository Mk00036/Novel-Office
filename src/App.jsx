import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar/navBar";
import Home from "./pages/home/home";
import ExchangeRates from "./pages/exchangeRates/exchangeRates";
import ThemeContextProvider from "./context/theme/ThemeContextProvider";

function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
     {/*  <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFound />} /> */}
          <Route path="/exchange-rates" element={<ExchangeRates />} />
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;