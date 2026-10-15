import { PageHeader } from '../components/ui';
import { useData } from '../context/DataContext';
import { formatCurrency } from '../data/mockData';
import { BarChart3, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export default function Reports() {
  const { orders, suppliers, companies } = useData();

  const TRADER_MARGIN_PER_M3 = 15;

  const totalOrders = orders.length;
  const totalVolume = orders.reduce((sum, o) => sum + o.totalVolume, 0);
  const totalValue = orders.reduce((sum, o) => sum + o.totalValue, 0);
  const totalProfit = orders.reduce((sum, o) => sum + (o.totalVolume * TRADER_MARGIN_PER_M3), 0);

  // Laporan Utang Keseluruhan (dari Supplier)
  const supplierDebts = suppliers.map(supplier => {
    const supplierOrders = orders.filter(o => o.supplierId === supplier.id);
    const totalDebt = supplierOrders.reduce((sum, o) => {
      const hargaBeli = o.totalAfterPPH || (o.totalValue * 0.9975);
      const margin = o.totalVolume * TRADER_MARGIN_PER_M3;
      return sum + (hargaBeli - margin);
    }, 0);
    const paidDebt = supplierOrders.filter(o => o.status === 'paid').reduce((sum, o) => {
      const hargaBeli = o.totalAfterPPH || (o.totalValue * 0.9975);
      const margin = o.totalVolume * TRADER_MARGIN_PER_M3;
      return sum + (hargaBeli - margin);
    }, 0);
    const unpaidDebt = totalDebt - paidDebt;

    return {
      supplier: supplier.name,
      totalOrders: supplierOrders.length,
      totalDebt,
      paidDebt,
      unpaidDebt,
      status: unpaidDebt === 0 ? 'Lunas' : 'Belum Lunas'
    };
  }).filter(s => s.totalOrders > 0);

  // Laporan Tagihan Keseluruhan (dari Perusahaan)
  const companyReceivables = companies.map(company => {
    const companyOrders = orders.filter(o => o.companyId === company.id);
    const totalReceivable = companyOrders.reduce((sum, o) => {
      return sum + (o.totalAfterPPH || (o.totalValue * 0.9975));
    }, 0);
    const paidReceivable = companyOrders.filter(o => o.status === 'paid').reduce((sum, o) => {
      return sum + (o.totalAfterPPH || (o.totalValue * 0.9975));
    }, 0);
    const unpaidReceivable = totalReceivable - paidReceivable;

    return {
      company: company.name,
      totalOrders: companyOrders.length,
      totalReceivable,
      paidReceivable,
      unpaidReceivable,
      status: unpaidReceivable === 0 ? 'Lunas' : 'Belum Lunas'
    };
  }).filter(c => c.totalOrders > 0);

  // Laporan Keuntungan
  const profitData = orders.map(order => {
    const profit = order.totalVolume * TRADER_MARGIN_PER_M3;
    return {
      noKedatangan: order.noKedatangan,
      noKendaraan: order.noKendaraan,
      date: new Date(order.orderDate).toLocaleDateString('id-ID'),
      company: order.companyName,
      supplier: order.supplierName,
      volume: order.totalVolume,
      profit
    };
  });

  return (
    <div className="animate-fade-in">
      <PageHeader title="Laporan" subtitle="Analisis dan laporan bisnis" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <div className="stat-card"><p className="text-[11px] text-[#64748b]">Total Transaksi</p><p className="text-[20px] font-bold text-[#0f172a] mt-1">{totalOrders}</p></div>
        <div className="stat-card"><p className="text-[11px] text-[#64748b]">Total Volume</p><p className="text-[20px] font-bold text-[#0f172a] mt-1">{totalVolume.toFixed(2)} m³</p></div>
        <div className="stat-card"><p className="text-[11px] text-[#64748b]">Total Nilai</p><p className="text-[20px] font-bold text-[#0f172a] mt-1">{formatCurrency(totalValue)}</p></div>
        <div className="stat-card"><p className="text-[11px] text-[#64748b]">Total Profit</p><p className="text-[20px] font-bold text-[#166534] mt-1">{formatCurrency(totalProfit)}</p></div>
      </div>

      {/* Daftar Transaksi */}
      <div className="card mb-4">
        <div className="card-body">
          {orders.length > 0 ? (
            <div>
              <h3 className="text-[14px] font-semibold text-[#0f172a] mb-4">Daftar Transaksi</h3>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>No. Kedatangan</th>
                      <th>No. Kendaraan</th>
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
                        <td className="text-[12px] font-semibold text-[#166534]">{order.noKedatangan}</td>
                        <td className="text-[12px] text-[#0f172a]">{order.noKendaraan}</td>
                        <td className="text-[12px] text-[#64748b]">{new Date(order.orderDate).toLocaleDateString('id-ID')}</td>
                        <td className="text-[13px] text-[#0f172a] font-medium">{order.companyName}</td>
                        <td className="text-[12px] text-[#64748b]">{order.supplierName}</td>
                        <td className="text-right text-[13px] font-medium">{order.totalVolume.toFixed(2)} m³</td>
                        <td className="text-right text-[13px] font-medium">{formatCurrency(order.totalValue)}</td>
                        <td className="text-right text-[13px] font-medium text-[#166534]">{formatCurrency(order.totalVolume * TRADER_MARGIN_PER_M3)}</td>
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

      {/* Laporan Keuntungan */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#166534]" />
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Laporan Keuntungan</h3>
          </div>
          {profitData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>No. Kedatangan</th>
                    <th>No. Kendaraan</th>
                    <th>Tanggal</th>
                    <th>Perusahaan</th>
                    <th>Supplier</th>
                    <th className="text-right">Volume</th>
                    <th className="text-right">Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {profitData.map((item, idx) => (
                    <tr key={idx}>
                      <td className="text-[12px] font-semibold text-[#166534]">{item.noKedatangan}</td>
                      <td className="text-[12px] text-[#0f172a]">{item.noKendaraan}</td>
                      <td className="text-[12px] text-[#64748b]">{item.date}</td>
                      <td className="text-[13px] text-[#0f172a] font-medium">{item.company}</td>
                      <td className="text-[12px] text-[#64748b]">{item.supplier}</td>
                      <td className="text-right text-[13px] font-medium">{item.volume.toFixed(2)} m³</td>
                      <td className="text-right text-[13px] font-bold text-[#166534]">{formatCurrency(item.profit)}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#f0fdf4] font-semibold">
                    <td colSpan={5} className="text-right text-[13px]">Total Profit:</td>
                    <td className="text-right text-[13px]">{totalVolume.toFixed(2)} m³</td>
                    <td className="text-right text-[14px] text-[#166534]">{formatCurrency(totalProfit)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-[13px] text-[#64748b] text-center py-4">Belum ada data keuntungan</p>
          )}
        </div>
      </div>

      {/* Laporan Utang Keseluruhan (Supplier) */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-[#dc2626]" />
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Laporan Utang Keseluruhan (ke Supplier)</h3>
          </div>
          {supplierDebts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Supplier</th>
                    <th className="text-right">Total Transaksi</th>
                    <th className="text-right">Total Utang</th>
                    <th className="text-right">Sudah Dibayar</th>
                    <th className="text-right">Belum Dibayar</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {supplierDebts.map((item, idx) => (
                    <tr key={idx}>
                      <td className="text-[13px] font-semibold text-[#0f172a]">{item.supplier}</td>
                      <td className="text-right text-[13px] text-[#64748b]">{item.totalOrders} transaksi</td>
                      <td className="text-right text-[13px] font-medium text-[#0f172a]">{formatCurrency(item.totalDebt)}</td>
                      <td className="text-right text-[13px] text-[#166534]">{formatCurrency(item.paidDebt)}</td>
                      <td className="text-right text-[13px] font-bold text-[#dc2626]">{formatCurrency(item.unpaidDebt)}</td>
                      <td className="text-center">
                        <span className={`badge ${item.status === 'Lunas' ? 'badge-green' : 'badge-yellow'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[#fef2f2] font-semibold">
                    <td className="text-[13px]">Total Keseluruhan:</td>
                    <td className="text-right text-[13px]">{supplierDebts.reduce((sum, s) => sum + s.totalOrders, 0)} transaksi</td>
                    <td className="text-right text-[13px]">{formatCurrency(supplierDebts.reduce((sum, s) => sum + s.totalDebt, 0))}</td>
                    <td className="text-right text-[13px] text-[#166534]">{formatCurrency(supplierDebts.reduce((sum, s) => sum + s.paidDebt, 0))}</td>
                    <td className="text-right text-[14px] text-[#dc2626]">{formatCurrency(supplierDebts.reduce((sum, s) => sum + s.unpaidDebt, 0))}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-[13px] text-[#64748b] text-center py-4">Belum ada data utang ke supplier</p>
          )}
        </div>
      </div>

      {/* Laporan Tagihan Keseluruhan (Perusahaan) */}
      <div className="card">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-[#166534]" />
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Laporan Tagihan Keseluruhan (dari Perusahaan)</h3>
          </div>
          {companyReceivables.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Perusahaan</th>
                    <th className="text-right">Total Transaksi</th>
                    <th className="text-right">Total Tagihan</th>
                    <th className="text-right">Sudah Dibayar</th>
                    <th className="text-right">Belum Dibayar</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {companyReceivables.map((item, idx) => (
                    <tr key={idx}>
                      <td className="text-[13px] font-semibold text-[#0f172a]">{item.company}</td>
                      <td className="text-right text-[13px] text-[#64748b]">{item.totalOrders} transaksi</td>
                      <td className="text-right text-[13px] font-medium text-[#0f172a]">{formatCurrency(item.totalReceivable)}</td>
                      <td className="text-right text-[13px] text-[#166534]">{formatCurrency(item.paidReceivable)}</td>
                      <td className="text-right text-[13px] font-bold text-[#dc2626]">{formatCurrency(item.unpaidReceivable)}</td>
                      <td className="text-center">
                        <span className={`badge ${item.status === 'Lunas' ? 'badge-green' : 'badge-yellow'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[#f0fdf4] font-semibold">
                    <td className="text-[13px]">Total Keseluruhan:</td>
                    <td className="text-right text-[13px]">{companyReceivables.reduce((sum, c) => sum + c.totalOrders, 0)} transaksi</td>
                    <td className="text-right text-[13px]">{formatCurrency(companyReceivables.reduce((sum, c) => sum + c.totalReceivable, 0))}</td>
                    <td className="text-right text-[13px] text-[#166534]">{formatCurrency(companyReceivables.reduce((sum, c) => sum + c.paidReceivable, 0))}</td>
                    <td className="text-right text-[14px] text-[#dc2626]">{formatCurrency(companyReceivables.reduce((sum, c) => sum + c.unpaidReceivable, 0))}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-[13px] text-[#64748b] text-center py-4">Belum ada data tagihan dari perusahaan</p>
          )}
        </div>
      </div>
    </div>
  );
}
