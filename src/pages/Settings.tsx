import { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database, Palette } from 'lucide-react';
import { PageHeader, Tabs, FormField, Badge } from '../components/ui';
import { useToast } from '../components/Toast';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const toast = useToast();

  const tabs = [
    { key: 'general', label: 'Umum' },
    { key: 'users', label: 'Pengguna' },
    { key: 'notifications', label: 'Notifikasi' },
    { key: 'security', label: 'Keamanan' },
  ];

  const handleSave = () => {
    toast.success('Pengaturan berhasil disimpan', 'Perubahan telah diterapkan');
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Pengaturan"
        subtitle="Konfigurasi sistem dan preferensi pengguna"
      />

      <div className="card mb-4">
        <div className="px-4 pt-3">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {activeTab === 'general' && (
        <div className="card">
          <div className="card-header">
            <div className="flex items-center gap-2">
              <SettingsIcon className="w-4 h-4 text-[#64748b]" />
              <h3 className="text-[14px] font-semibold text-[#0f172a]">Pengaturan Umum</h3>
            </div>
          </div>
          <div className="card-body space-y-5">
            <FormField label="Nama Perusahaan">
              <input type="text" defaultValue="TimberFlow Trading" className="input-field" />
            </FormField>
            <FormField label="Alamat">
              <textarea defaultValue="Jl. Kayu Lapis No. 123, Samarinda" className="input-field min-h-[80px] resize-none" />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="No. Telepon">
                <input type="text" defaultValue="0541-123456" className="input-field" />
              </FormField>
              <FormField label="Email">
                <input type="email" defaultValue="info@timberflow.id" className="input-field" />
              </FormField>
            </div>
            <FormField label="NPWP">
              <input type="text" defaultValue="01.234.567.8-901.000" className="input-field" />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Mata Uang" hint="Mata uang default untuk transaksi">
                <select className="input-field">
                  <option>IDR - Rupiah Indonesia</option>
                  <option>USD - US Dollar</option>
                </select>
              </FormField>
              <FormField label="Format Tanggal">
                <select className="input-field">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </FormField>
            </div>
            <div className="pt-4 border-t border-[#f1f5f9] flex justify-end">
              <button onClick={handleSave} className="btn btn-primary">Simpan Perubahan</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#64748b]" />
              <h3 className="text-[14px] font-semibold text-[#0f172a]">Manajemen Pengguna</h3>
            </div>
            <button className="btn btn-primary">+ Tambah Pengguna</button>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#166534] flex items-center justify-center">
                        <span className="text-white text-[11px] font-bold">A</span>
                      </div>
                      <span className="text-[13px] font-medium text-[#0f172a]">Admin User</span>
                    </div>
                  </td>
                  <td className="text-[12px] text-[#64748b]">admin@timberflow.id</td>
                  <td><Badge variant="purple">Administrator</Badge></td>
                  <td className="text-center"><Badge variant="green" dot>Aktif</Badge></td>
                  <td className="text-center">
                    <button className="text-[12px] text-[#166534] font-medium hover:underline">Edit</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center">
                        <span className="text-white text-[11px] font-bold">O</span>
                      </div>
                      <span className="text-[13px] font-medium text-[#0f172a]">Operator 1</span>
                    </div>
                  </td>
                  <td className="text-[12px] text-[#64748b]">operator@timberflow.id</td>
                  <td><Badge variant="blue">Operator</Badge></td>
                  <td className="text-center"><Badge variant="green" dot>Aktif</Badge></td>
                  <td className="text-center">
                    <button className="text-[12px] text-[#166534] font-medium hover:underline">Edit</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#16a34a] flex items-center justify-center">
                        <span className="text-white text-[11px] font-bold">F</span>
                      </div>
                      <span className="text-[13px] font-medium text-[#0f172a]">Finance 1</span>
                    </div>
                  </td>
                  <td className="text-[12px] text-[#64748b]">finance@timberflow.id</td>
                  <td><Badge variant="green">Finance</Badge></td>
                  <td className="text-center"><Badge variant="green" dot>Aktif</Badge></td>
                  <td className="text-center">
                    <button className="text-[12px] text-[#166534] font-medium hover:underline">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="card">
          <div className="card-header">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#64748b]" />
              <h3 className="text-[14px] font-semibold text-[#0f172a]">Pengaturan Notifikasi</h3>
            </div>
          </div>
          <div className="card-body space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#f8fafc] rounded-lg">
              <div>
                <p className="text-[13px] font-medium text-[#0f172a]">Notifikasi Invoice Jatuh Tempo</p>
                <p className="text-[12px] text-[#64748b]">Kirim notifikasi H-7, H-3, dan hari-H jatuh tempo</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-9 h-5 bg-[#cbd5e1] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#166534]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#f8fafc] rounded-lg">
              <div>
                <p className="text-[13px] font-medium text-[#0f172a]">Peringatan Credit Limit</p>
                <p className="text-[12px] text-[#64748b]">Notifikasi saat piutang mendekati credit limit</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-9 h-5 bg-[#cbd5e1] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#166534]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#f8fafc] rounded-lg">
              <div>
                <p className="text-[13px] font-medium text-[#0f172a]">Notifikasi Email</p>
                <p className="text-[12px] text-[#64748b]">Kirim notifikasi penting via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-9 h-5 bg-[#cbd5e1] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#166534]"></div>
              </label>
            </div>
            <div className="pt-4 border-t border-[#f1f5f9] flex justify-end">
              <button onClick={handleSave} className="btn btn-primary">Simpan Perubahan</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="card">
          <div className="card-header">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#64748b]" />
              <h3 className="text-[14px] font-semibold text-[#0f172a]">Keamanan</h3>
            </div>
          </div>
          <div className="card-body space-y-5">
            <FormField label="Password Lama">
              <input type="password" className="input-field" placeholder="••••••••" />
            </FormField>
            <FormField label="Password Baru">
              <input type="password" className="input-field" placeholder="••••••••" />
            </FormField>
            <FormField label="Konfirmasi Password Baru">
              <input type="password" className="input-field" placeholder="••••••••" />
            </FormField>
            <div className="pt-4 border-t border-[#f1f5f9] flex justify-end">
              <button onClick={handleSave} className="btn btn-primary">Ubah Password</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
