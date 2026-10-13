# 💰 Restrukturisasi Keuangan - Uang Masuk & Uang Keluar

## 🎯 **Perubahan Utama**

Struktur keuangan telah direstrukturisasi untuk memberikan visibilitas yang lebih jelas tentang **cash flow** bisnis trading kayu lapis.

### **Struktur Lama:**
```
Keuangan
├── Invoice (membingungkan - tidak jelas arah uang)
└── Piutang & Aging
```

### **Struktur Baru:**
```
Keuangan
├── 💸 Uang Keluar (ke Supplier) - Pembayaran hutang ke depo/supplier
└── 💰 Uang Masuk (dari Perusahaan) - Penerimaan piutang dari perusahaan plywood
```

---

## 📊 **Flow Bisnis yang Jelas**

```
┌─────────────┐                    ┌─────────────┐                    ┌─────────────┐
│   SUPPLIER  │                    │    ANDA     │                    │  PERUSAHAAN │
│  (Depo Kayu)│                    │  (TRADER)   │                    │  (PLYWOOD)  │
└─────────────┘                    └─────────────┘                    └─────────────┘
       │                                   │                                   │
       │  1. Kirim Kayu                    │                                   │
       │──────────────────────────────────>│                                   │
       │                                   │                                   │
       │  2. UANG KELUAR                   │                                   │
       │<──────────────────────────────────│                                   │
       │  (Pembayaran ke Supplier)         │                                   │
       │                                   │                                   │
       │                                   │  3. Kirim Kayu ke Perusahaan      │
       │                                   │──────────────────────────────────>│
       │                                   │                                   │
       │                                   │  4. UANG MASUK                    │
       │                                   │<──────────────────────────────────│
       │                                   │  (Pembayaran dari Perusahaan)     │
       │                                   │                                   │
```

---

## 💸 **Uang Keluar (ke Supplier)**

### **Halaman:** `/finance/payables`

### **Fungsi:**
Mengelola pembayaran yang harus dilakukan ke depo/supplier kayu.

### **Data yang Ditampilkan:**
- ✅ Daftar pesanan yang sudah dikonfirmasi (harus bayar ke supplier)
- ✅ Status pembayaran (Harus Bayar, Dalam Pengiriman, Barang Diterima, Sudah Dibayar)
- ✅ Total hutang ke supplier
- ✅ Detail item kayu yang dibeli
- ✅ Form pencatatan pembayaran

### **Status Pembayaran:**
| Status | Warna | Keterangan |
|--------|-------|------------|
| **Harus Bayar** | 🔵 Biru | Pesanan sudah dikonfirmasi, harus bayar ke supplier |
| **Dalam Pengiriman** | 🟡 Kuning | Kayu sedang dikirim dari supplier |
| **Barang Diterima** | 🟣 Ungu | Kayu sudah diterima dari supplier |
| **Sudah Ditagih** | 🟠 Oranye | Sudah ditagih ke perusahaan (menunggu pembayaran) |
| **Sudah Dibayar** | 🟢 Hijau | Sudah dibayar ke supplier |

### **Summary Cards:**
```
┌─────────────────┬─────────────────┬─────────────────┐
│ Total Harus     │ Sudah Dibayar   │ Total Pesanan   │
│ Bayar           │                 │                 │
│ Rp50.000.000    │ Rp30.000.000    │ 5 pesanan       │
│ 🔴              │ 🟢              │ 📅              │
└─────────────────┴─────────────────┴─────────────────┘
```

### **Tabel Data:**
```
┌────────────┬──────────┬──────────┬──────────┬────────┬────────┬──────────────┬──────────┬──────┐
│ No. Order  │ Tanggal  │ Supplier │Perusahaan│ Batang │ Volume │ Harus Bayar  │ Status   │ Aksi │
├────────────┼──────────┼──────────┼──────────┼────────┼────────┼──────────────┼──────────┼──────┤
│ ORD-001    │ 15 Jan   │ Depo A   │ PT. XYZ  │ 100    │ 50 m³  │ Rp60.000.000 │ Harus    │ 👁 💸│
│            │          │          │          │        │        │              │ Bayar    │      │
└────────────┴──────────┴──────────┴──────────┴────────┴────────┴──────────────┴──────────┴──────┘
```

### **Form Pencatatan Pembayaran:**
```
┌─────────────────────────────────────────┐
│ Catat Pembayaran ke Supplier            │
├─────────────────────────────────────────┤
│ Total Harus Bayar: Rp60.000.000         │
│                                         │
│ Tanggal Pembayaran: [2025-01-20]        │
│ Jumlah Pembayaran:  [60.000.000]        │
│ Metode Pembayaran:  [Transfer Bank ▼]   │
│ Nomor Referensi:    [TRF-BCA-001234]    │
│ Catatan:            [................]  │
│                                         │
│ [Batal]              [Simpan Pembayaran]│
└─────────────────────────────────────────┘
```

---

## 💰 **Uang Masuk (dari Perusahaan)**

### **Halaman:** `/finance/receivables`

### **Fungsi:**
Mengelola pembayaran yang diterima dari perusahaan plywood.

### **Data yang Ditampilkan:**
- ✅ Daftar invoice yang sudah ditagih ke perusahaan
- ✅ Status pembayaran (Sudah Ditagih, Sudah Dibayar)
- ✅ Total piutang dari perusahaan
- ✅ Detail item kayu yang dijual
- ✅ Form pencatatan pembayaran

### **Status Pembayaran:**
| Status | Warna | Keterangan |
|--------|-------|------------|
| **Sudah Ditagih** | 🟠 Oranye | Invoice sudah dikirim ke perusahaan, menunggu pembayaran |
| **Sudah Dibayar** | 🟢 Hijau | Perusahaan sudah membayar |

### **Summary Cards:**
```
┌─────────────────┬─────────────────┬─────────────────┐
│ Total Piutang   │ Sudah Diterima  │ Total Invoice   │
│                 │                 │                 │
│ Rp80.000.000    │ Rp45.000.000    │ 3 invoice       │
│ 🟢              │ 🟢              │ 📅              │
└─────────────────┴─────────────────┴─────────────────┘
```

### **Tabel Data:**
```
┌────────────┬──────────┬──────────┬──────────┬────────┬────────┬──────────────┬──────────┬──────┐
│ No. Order  │ Tanggal  │Perusahaan│ Supplier │ Batang │ Volume │ Harus Ditagih│ Status   │ Aksi │
├────────────┼──────────┼──────────┼──────────┼────────┼────────┼──────────────┼──────────┼──────┤
│ ORD-001    │ 15 Jan   │ PT. XYZ  │ Depo A   │ 100    │ 50 m³  │ Rp60.750.000 │ Sudah    │ 👁 💰│
│            │          │          │          │        │        │              │ Ditagih  │      │
└────────────┴──────────┴──────────┴──────────┴────────┴────────┴──────────────┴──────────┴──────┘
```

### **Form Pencatatan Pembayaran:**
```
┌─────────────────────────────────────────┐
│ Catat Pembayaran dari Perusahaan        │
├─────────────────────────────────────────┤
│ Total Harus Diterima: Rp60.750.000      │
│                                         │
│ Tanggal Pembayaran: [2025-02-15]        │
│ Jumlah Pembayaran:  [60.750.000]        │
│ Metode Pembayaran:  [Transfer Bank ▼]   │
│ Nomor Referensi:    [TRF-MDR-005678]    │
│ Catatan:            [................]  │
│                                         │
│ [Batal]              [Simpan Pembayaran]│
└─────────────────────────────────────────┘
```

---

## 🔄 **Perubahan yang Dilakukan**

### **1. Hapus Halaman:**
- ❌ **Surat Jalan** (`/transactions/deliveries`) - Dihapus
- ❌ **Invoice** (`/finance/invoices`) - Diganti dengan struktur baru

### **2. Tambah/Update Halaman:**
- ✅ **Uang Keluar (ke Supplier)** (`/finance/payables`) - Halaman baru
- ✅ **Uang Masuk (dari Perusahaan)** (`/finance/receivables`) - Update dari Piutang & Aging

### **3. Update Navigasi:**
```typescript
{
  label: 'Transaksi',
  children: [
    { label: 'Pesanan', path: '/transactions/orders' },
    // ❌ Surat Jalan dihapus
  ]
},
{
  label: 'Keuangan',
  children: [
    { label: 'Uang Keluar (ke Supplier)', path: '/finance/payables' },
    { label: 'Uang Masuk (dari Perusahaan)', path: '/finance/receivables' },
    // ❌ Invoice dihapus
    // ❌ Piutang & Aging diganti
  ]
}
```

---

## 📊 **Keuntungan Struktur Baru**

### **1. Visibilitas Cash Flow yang Jelas**
- ✅ Langsung terlihat berapa uang yang harus keluar (ke supplier)
- ✅ Langsung terlihat berapa uang yang harus masuk (dari perusahaan)
- ✅ Mudah menghitung selisih (profit/loss)

### **2. Sesuai dengan Realita Bisnis**
- ✅ Trader membeli dari supplier → Uang keluar
- ✅ Trader menjual ke perusahaan → Uang masuk
- ✅ Flow bisnis yang natural dan mudah dipahami

### **3. Manajemen yang Lebih Baik**
- ✅ Pisahkan hutang (ke supplier) dan piutang (dari perusahaan)
- ✅ Monitor aging untuk kedua sisi
- ✅ Prioritas pembayaran yang jelas

### **4. Pelaporan yang Lebih Akurat**
- ✅ Laporan arus kas yang jelas
- ✅ Laporan hutang-piutang yang terstruktur
- ✅ Analisis profit yang lebih mudah

---

## 🧮 **Contoh Skenario Bisnis**

### **Skenario: Trading Kayu Meranti**

**Step 1: Beli dari Supplier**
```
Order: ORD-202501-0001
Supplier: Depo Kayu Makmur
Item: Meranti 20-30cm Premium, 100 batang, 50 m³
Harga Beli: Rp1.200.000/m³
Total: Rp60.000.000

→ Masuk ke "Uang Keluar (ke Supplier)"
→ Status: Harus Bayar
```

**Step 2: Jual ke Perusahaan**
```
Order: ORD-202501-0001 (sama)
Perusahaan: PT. Plywood Nusantara
Harga Jual: Rp1.215.000/m³
Total: Rp60.750.000

→ Masuk ke "Uang Masuk (dari Perusahaan)"
→ Status: Sudah Ditagih
```

**Step 3: Bayar ke Supplier**
```
Pembayaran: Rp60.000.000
Metode: Transfer Bank
Tanggal: 2025-01-25

→ Status di "Uang Keluar": Sudah Dibayar ✅
```

**Step 4: Terima dari Perusahaan**
```
Pembayaran: Rp60.750.000
Metode: Transfer Bank
Tanggal: 2025-02-15

→ Status di "Uang Masuk": Sudah Dibayar ✅
```

**Profit:**
```
Uang Masuk:  Rp60.750.000
Uang Keluar: Rp60.000.000
─────────────────────────
Profit:      Rp   750.000 (1.25% margin)
```

---

## 📝 **Tips Penggunaan**

### **Untuk Uang Keluar (ke Supplier):**
1. ✅ Cek pesanan yang sudah dikonfirmasi
2. ✅ Prioritaskan pembayaran sesuai jatuh tempo
3. ✅ Catat pembayaran segera setelah dilakukan
4. ✅ Upload bukti transfer untuk audit trail

### **Untuk Uang Masuk (dari Perusahaan):**
1. ✅ Monitor invoice yang sudah ditagih
2. ✅ Follow up perusahaan yang terlambat bayar
3. ✅ Catat pembayaran segera setelah diterima
4. ✅ Cek aging untuk identifikasi masalah

### **Untuk Dashboard:**
1. ✅ Lihat total uang keluar vs uang masuk
2. ✅ Monitor profit margin
3. ✅ Identifikasi supplier/perusahaan yang bermasalah
4. ✅ Buat laporan arus kas periodik

---

## 🎯 **Kesimpulan**

Struktur keuangan baru memberikan:
- ✅ **Kejelasan** - Langsung terlihat uang masuk dan uang keluar
- ✅ **Kontrol** - Manajemen hutang dan piutang yang lebih baik
- ✅ **Efisiensi** - Flow bisnis yang natural dan mudah dipahami
- ✅ **Akurasi** - Pelaporan yang lebih tepat dan terstruktur

**Silakan test dengan buat pesanan dan lihat bagaimana data muncul di halaman Uang Keluar dan Uang Masuk!** 🚀

---

**Status:** ✅ Selesai dan Build Sukses  
**Build Size:** 727 KB (gzipped: 193 KB)  
**Performance:** Optimal
