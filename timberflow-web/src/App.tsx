import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Suppliers from './pages/Suppliers';
import Companies from './pages/Companies';
import WoodSpecs from './pages/WoodSpecs';
import Prices from './pages/Prices';
import Orders from './pages/Orders';
import Payables from './pages/Payables';
import Receivables from './pages/Receivables';
import Reports from './pages/Reports';
import SettingsPage from './pages/Settings';
import AuditLog from './pages/AuditLog';
import { ToastProvider } from './components/Toast';
import { CommandPalette } from './components/CommandPalette';
import { DataProvider } from './context/DataContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
              <Route path="/transactions/orders" element={<Orders />} />
              <Route path="/finance/payables" element={<Payables />} />
              <Route path="/finance/receivables" element={<Receivables />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/audit-log" element={<AuditLog />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
          <CommandPalette isOpen={showCommandPalette} onClose={() => setShowCommandPalette(false)} />
        </BrowserRouter>
      </ToastProvider>
    </DataProvider>
  );
}

export default App;
