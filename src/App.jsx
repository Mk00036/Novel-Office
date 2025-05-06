import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar/navBar';
import Home from './pages/home/home';
import ExchangeRates from './pages/exchangeRates/exchangeRates';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
     {/*  <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFound />} /> */}
      <Route path="/exchange-rates" element={<ExchangeRates />} /> 
    </Routes>
  </BrowserRouter>
  )
}

export default App
