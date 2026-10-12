import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Suppliers from './pages/Suppliers';
import Companies from './pages/Companies';
import WoodSpecs from './pages/WoodSpecs';
import Prices from './pages/Prices';
import Orders from './pages/Orders';
import Deliveries from './pages/Deliveries';
import Invoices from './pages/Invoices';
import Receivables from './pages/Receivables';
import Reports from './pages/Reports';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/master/suppliers" element={<Suppliers />} />
          <Route path="/master/companies" element={<Companies />} />
          <Route path="/master/wood-specs" element={<WoodSpecs />} />
          <Route path="/master/prices" element={<Prices />} />
          <Route path="/transactions/orders" element={<Orders />} />
          <Route path="/transactions/deliveries" element={<Deliveries />} />
          <Route path="/finance/invoices" element={<Invoices />} />
          <Route path="/finance/receivables" element={<Receivables />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
