import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Supplier, Company, WoodSpec, Price, Order, Payment, suppliers as initialSuppliers, companies as initialCompanies, woodSpecs as initialWoodSpecs, prices as initialPrices, orders as initialOrders, payments as initialPayments } from '../data/mockData';

interface DataContextType {
  suppliers: Supplier[];
  companies: Company[];
  woodSpecs: WoodSpec[];
  prices: Price[];
  orders: Order[];
  payments: Payment[];
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  updateSupplier: (id: string, updates: Partial<Supplier>) => void;
  addCompany: (company: Omit<Company, 'id'>) => void;
  addWoodSpec: (spec: Omit<WoodSpec, 'id'>) => void;
  addPrice: (price: Omit<Price, 'id'>) => void;
  updatePrice: (id: string, updates: Partial<Price>) => void;
  addOrder: (order: Omit<Order, 'id' | 'orderNumber'>) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  deletePrice: (id: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}

// Fix Issue #1: Use secure UUID instead of Math.random()
const generateId = () => uuidv4();
const generateOrderNumber = () => {
  const date = new Date();
  const yearMonth = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`;
  return `HC-${yearMonth}-${uuidv4().slice(-4)}`;
};

export function DataProvider({ children }: { children: ReactNode }) {
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

  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem('timberflow_payments');
    return saved ? JSON.parse(saved) : initialPayments;
  });

  useEffect(() => { localStorage.setItem('timberflow_suppliers', JSON.stringify(suppliers)); }, [suppliers]);
  useEffect(() => { localStorage.setItem('timberflow_companies', JSON.stringify(companies)); }, [companies]);
  useEffect(() => { localStorage.setItem('timberflow_woodSpecs', JSON.stringify(woodSpecs)); }, [woodSpecs]);
  useEffect(() => { localStorage.setItem('timberflow_prices', JSON.stringify(prices)); }, [prices]);
  useEffect(() => { localStorage.setItem('timberflow_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('timberflow_payments', JSON.stringify(payments)); }, [payments]);

  const addSupplier = (supplier: Omit<Supplier, 'id'>) => setSuppliers(prev => [...prev, { ...supplier, id: generateId() }]);
  const updateSupplier = (id: string, updates: Partial<Supplier>) => setSuppliers(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  const addCompany = (company: Omit<Company, 'id'>) => setCompanies(prev => [...prev, { ...company, id: generateId() }]);
  const addWoodSpec = (spec: Omit<WoodSpec, 'id'>) => setWoodSpecs(prev => [...prev, { ...spec, id: generateId() }]);
  const addPrice = (price: Omit<Price, 'id'>) => setPrices(prev => [...prev, { ...price, id: generateId() }]);
  const updatePrice = (id: string, updates: Partial<Price>) => setPrices(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  
  const addOrder = (order: Omit<Order, 'id' | 'orderNumber'>) => {
    setOrders(prev => [...prev, { ...order, id: generateId(), orderNumber: generateOrderNumber() }]);
  };
  
  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };
  
  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    setPayments(prev => prev.filter(p => p.invoiceId !== id));
  };
  
  const deletePrice = (id: string) => setPrices(prev => prev.filter(p => p.id !== id));

  return (
    <DataContext.Provider value={{
      suppliers, companies, woodSpecs, prices, orders, payments,
      addSupplier, updateSupplier, addCompany, addWoodSpec, addPrice, updatePrice, addOrder, updateOrder, deleteOrder, deletePrice
    }}>
      {children}
    </DataContext.Provider>
  );
}
