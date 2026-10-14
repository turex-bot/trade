import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Suppliers from './pages/Suppliers';
import Companies from './pages/Companies';
import WoodSpecs from './pages/WoodSpecs';
import Prices from './pages/Prices';
import ResultCheck from './pages/ResultCheck';
import Payables from './pages/Payables';
import Receivables from './pages/Receivables';
import Reports from './pages/Reports';
import { ToastProvider } from './components/Toast';
import { DataProvider } from './context/DataContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <ToastProvider>
        <Login onLogin={() => setIsAuthenticated(true)} />
      </ToastProvider>
    );
  }

  return (
    <DataProvider>
      <ToastProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/master/suppliers" element={<Suppliers />} />
              <Route path="/master/companies" element={<Companies />} />
              <Route path="/master/wood-specs" element={<WoodSpecs />} />
              <Route path="/master/prices" element={<Prices />} />
              <Route path="/transactions/result-check" element={<ResultCheck />} />
              <Route path="/finance/payables" element={<Payables />} />
              <Route path="/finance/receivables" element={<Receivables />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ToastProvider>
    </DataProvider>
  );
}

export default App;
