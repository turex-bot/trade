import React from 'react';
import { PageHeader } from '../components/ui';
import { useData } from '../context/DataContext';
import { formatCurrency } from '../data/mockData';
import { BarChart3 } from 'lucide-react';

export default function Reports() {
  const { orders } = useData();

  const totalOrders = orders.length;
  const totalVolume = orders.reduce((sum, o) => sum + o.totalVolume, 0);
  const totalValue = orders.reduce((sum, o) => sum + o.totalValue, 0);
  const totalProfit = orders.reduce((sum, o) => sum + (o.totalVolume * 15000), 0);

  return (
    <div className="animate-fade-in">
      <PageHeader title="Laporan" subtitle="Analisis dan laporan bisnis" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <div className="stat-card"><p className="text-[11px] text-[#64748b]">Total Transaksi</p><p className="text-[20px] font-bold text-[#0f172a] mt-1">{totalOrders}</p></div>
        <div className="stat-card"><p className="text-[11px] text-[#64748b]">Total Volume</p><p className="text-[20px] font-bold text-[#0f172a] mt-1">{totalVolume.toFixed(2)} m³</p></div>
        <div className="stat-card"><p className="text-[11px] text-[#64748b]">Total Nilai</p><p className="text-[20px] font-bold text-[#0f172a] mt-1">{formatCurrency(totalValue)}</p></div>
        <div className="stat-card"><p className="text-[11px] text-[#64748b]">Total Profit</p><p className="text-[20px] font-bold text-[#166534] mt-1">{formatCurrency(totalProfit)}</p></div>
      </div>

      <div className="card">
        <div className="card-body">
          {orders.length > 0 ? (
            <div>
              <h3 className="text-[14px] font-semibold text-[#0f172a] mb-4">Daftar Transaksi</h3>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>No. Order</th>
                      <th>Tanggal</th>
                      <th>Perusahaan</th>
                      <th>Supplier</th>
                      <th className="text-right">Volume</th>
                      <th className="text-right">Nilai</th>
                      <th className="text-right">Profit</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td className="text-[12px] font-semibold text-[#166534]">{order.orderNumber}</td>
                        <td className="text-[12px] text-[#64748b]">{new Date(order.orderDate).toLocaleDateString('id-ID')}</td>
                        <td className="text-[13px] text-[#0f172a] font-medium">{order.companyName}</td>
                        <td className="text-[12px] text-[#64748b]">{order.supplierName}</td>
                        <td className="text-right text-[13px] font-medium">{order.totalVolume.toFixed(2)} m³</td>
                        <td className="text-right text-[13px] font-medium">{formatCurrency(order.totalValue)}</td>
                        <td className="text-right text-[13px] font-medium text-[#166534]">{formatCurrency(order.totalVolume * 15000)}</td>
                        <td className="text-center"><span className="badge badge-gray capitalize">{order.status.replace('_', ' ')}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <BarChart3 className="w-12 h-12 text-[#94a3b8] mb-3" />
              <h3 className="text-[14px] font-semibold text-[#0f172a]">Belum ada data laporan</h3>
              <p className="text-[13px] text-[#64748b] mt-1">Laporan akan muncul setelah ada transaksi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
