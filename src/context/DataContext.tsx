import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Supplier, Company, WoodSpec, Price, Order, Delivery, Invoice, Payment,
  suppliers as initialSuppliers,
  companies as initialCompanies,
  woodSpecs as initialWoodSpecs,
  prices as initialPrices,
  orders as initialOrders,
  deliveries as initialDeliveries,
  invoices as initialInvoices,
  payments as initialPayments
} from '../data/mockData';

interface DataContextType {
  // Data
  suppliers: Supplier[];
  companies: Company[];
  woodSpecs: WoodSpec[];
  prices: Price[];
  orders: Order[];
  deliveries: Delivery[];
  invoices: Invoice[];
  payments: Payment[];
  
  // CRUD Operations
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;
  
  addCompany: (company: Omit<Company, 'id'>) => void;
  updateCompany: (id: string, company: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
  
  addWoodSpec: (spec: Omit<WoodSpec, 'id'>) => void;
  updateWoodSpec: (id: string, spec: Partial<WoodSpec>) => void;
  deleteWoodSpec: (id: string) => void;
  
  addPrice: (price: Omit<Price, 'id'>) => void;
  updatePrice: (id: string, price: Partial<Price>) => void;
  deletePrice: (id: string) => void;
  
  addOrder: (order: Omit<Order, 'id' | 'orderNumber'>) => void;
  updateOrder: (id: string, order: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  
  addDelivery: (delivery: Omit<Delivery, 'id' | 'doNumber'>) => void;
  updateDelivery: (id: string, delivery: Partial<Delivery>) => void;
  deleteDelivery: (id: string) => void;
  
  addInvoice: (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => void;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  
  addPayment: (payment: Omit<Payment, 'id'>) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}

// Helper untuk generate ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper untuk generate document number
const generateOrderNumber = () => {
  const date = new Date();
  const yearMonth = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`;
  return `ORD-${yearMonth}-${String(Date.now()).slice(-4)}`;
};

const generateDONumber = () => {
  const date = new Date();
  const yearMonth = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`;
  return `DO-${yearMonth}-${String(Date.now()).slice(-4)}`;
};

const generateInvoiceNumber = () => {
  const date = new Date();
  const yearMonth = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`;
  return `INV-${yearMonth}-${String(Date.now()).slice(-4)}`;
};

export function DataProvider({ children }: { children: ReactNode }) {
  // Load data from localStorage or use initial data
  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const saved = localStorage.getItem('timberflow_suppliers');
    return saved ? JSON.parse(saved) : initialSuppliers;
  });

  const [companies, setCompanies] = useState<Company[]>(() => {
    const saved = localStorage.getItem('timberflow_companies');
    return saved ? JSON.parse(saved) : initialCompanies;
  });

  const [woodSpecs, setWoodSpecs] = useState<WoodSpec[]>(() => {
    const saved = localStorage.getItem('timberflow_woodSpecs');
    return saved ? JSON.parse(saved) : initialWoodSpecs;
  });

  const [prices, setPrices] = useState<Price[]>(() => {
    const saved = localStorage.getItem('timberflow_prices');
    return saved ? JSON.parse(saved) : initialPrices;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('timberflow_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [deliveries, setDeliveries] = useState<Delivery[]>(() => {
    const saved = localStorage.getItem('timberflow_deliveries');
    return saved ? JSON.parse(saved) : initialDeliveries;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('timberflow_invoices');
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem('timberflow_payments');
    return saved ? JSON.parse(saved) : initialPayments;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('timberflow_suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem('timberflow_companies', JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem('timberflow_woodSpecs', JSON.stringify(woodSpecs));
  }, [woodSpecs]);

  useEffect(() => {
    localStorage.setItem('timberflow_prices', JSON.stringify(prices));
  }, [prices]);

  useEffect(() => {
    localStorage.setItem('timberflow_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('timberflow_deliveries', JSON.stringify(deliveries));
  }, [deliveries]);

  useEffect(() => {
    localStorage.setItem('timberflow_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('timberflow_payments', JSON.stringify(payments));
  }, [payments]);

  // CRUD Operations
  const addSupplier = (supplier: Omit<Supplier, 'id'>) => {
    setSuppliers(prev => [...prev, { ...supplier, id: generateId() }]);
  };

  const updateSupplier = (id: string, updates: Partial<Supplier>) => {
    setSuppliers(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSupplier = (id: string) => {
    setSuppliers(prev => prev.filter(s => s.id !== id));
  };

  const addCompany = (company: Omit<Company, 'id'>) => {
    setCompanies(prev => [...prev, { ...company, id: generateId() }]);
  };

  const updateCompany = (id: string, updates: Partial<Company>) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCompany = (id: string) => {
    setCompanies(prev => prev.filter(c => c.id !== id));
  };

  const addWoodSpec = (spec: Omit<WoodSpec, 'id'>) => {
    setWoodSpecs(prev => [...prev, { ...spec, id: generateId() }]);
  };

  const updateWoodSpec = (id: string, updates: Partial<WoodSpec>) => {
    setWoodSpecs(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteWoodSpec = (id: string) => {
    setWoodSpecs(prev => prev.filter(s => s.id !== id));
  };

  const addPrice = (price: Omit<Price, 'id'>) => {
    setPrices(prev => [...prev, { ...price, id: generateId() }]);
  };

  const updatePrice = (id: string, updates: Partial<Price>) => {
    setPrices(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePrice = (id: string) => {
    setPrices(prev => prev.filter(p => p.id !== id));
  };

  const addOrder = (order: Omit<Order, 'id' | 'orderNumber'>) => {
    setOrders(prev => [...prev, { ...order, id: generateId(), orderNumber: generateOrderNumber() }]);
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const addDelivery = (delivery: Omit<Delivery, 'id' | 'doNumber'>) => {
    setDeliveries(prev => [...prev, { ...delivery, id: generateId(), doNumber: generateDONumber() }]);
  };

  const updateDelivery = (id: string, updates: Partial<Delivery>) => {
    setDeliveries(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const deleteDelivery = (id: string) => {
    setDeliveries(prev => prev.filter(d => d.id !== id));
  };

  const addInvoice = (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => {
    setInvoices(prev => [...prev, { ...invoice, id: generateId(), invoiceNumber: generateInvoiceNumber() }]);
  };

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(i => i.id !== id));
  };

  const addPayment = (payment: Omit<Payment, 'id'>) => {
    setPayments(prev => [...prev, { ...payment, id: generateId() }]);
  };

  const value: DataContextType = {
    suppliers,
    companies,
    woodSpecs,
    prices,
    orders,
    deliveries,
    invoices,
    payments,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    addCompany,
    updateCompany,
    deleteCompany,
    addWoodSpec,
    updateWoodSpec,
    deleteWoodSpec,
    addPrice,
    updatePrice,
    deletePrice,
    addOrder,
    updateOrder,
    deleteOrder,
    addDelivery,
    updateDelivery,
    deleteDelivery,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    addPayment,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
