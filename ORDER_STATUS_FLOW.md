# 🔄 Alur Status Pesanan - Panduan Lengkap

## 📋 **Flow Status Pesanan**

Pesanan memiliki beberapa status yang menentukan di halaman mana pesanan akan muncul:

```
┌─────────┐     ┌─────────────┐     ┌────────────┐     ┌──────────┐
│  DRAFT  │ ──> │ CONFIRMED   │ ──> │  INVOICED  │ ──> │   PAID   │
│         │     │             │     │            │     │          │
│ (Awal)  │     │ (Uang       │     │ (Uang      │     │ (Lunas)  │
│         │     │  Keluar)    │     │  Masuk)    │     │          │
└─────────┘     └─────────────┘     └────────────┘     └──────────┘
     │                  │                   │
     │                  │                   │
     └──────────────────┴───────────────────┘
                        │
                        v
                  ┌──────────┐
                  │ CANCELLED│
                  │          │
                  │(Dibatalkan)
                  └──────────┘
```

---

## 🎯 **Status dan Halaman Keuangan**

| Status | Halaman Keuangan | Keterangan |
|--------|------------------|------------|
| **Draft** | ❌ Tidak muncul | Pesanan baru dibuat, belum dikonfirmasi |
| **Confirmed** | 💸 **Uang Keluar** | Pesanan dikonfirmasi, harus bayar ke supplier |
| **In Delivery** | 💸 **Uang Keluar** | Barang sedang dikirim dari supplier |
| **Received** | 💸 **Uang Keluar** | Barang sudah diterima dari supplier |
| **Invoiced** | 💰 **Uang Masuk** | Invoice sudah dibuat, harus tagih ke perusahaan |
| **Paid** | ✅ **Selesai** | Sudah dibayar oleh perusahaan |
| **Cancelled** | ❌ Tidak muncul | Pesanan dibatalkan |

---

## 🔧 **Cara Mengubah Status**

### **1. Draft → Confirmed (Muncul di Uang Keluar)**

**Langkah:**
1. Buka halaman **Transaksi → Pesanan**
2. Cari pesanan dengan status **Draft**
3. Klik tombol **✓ (Konfirmasi)** di kolom Aksi
4. Atau klik **👁 (Lihat Detail)** → klik tombol **Konfirmasi Pesanan**
5. Konfirmasi di modal yang muncul
6. ✅ Pesanan akan muncul di **Keuangan → Uang Keluar (ke Supplier)**

**Visual:**
```
┌─────────────────────────────────────────────────────┐
│ No. Order    │ Status │ Aksi                        │
├─────────────────────────────────────────────────────┤
│ ORD-001      │ Draft  │ 👁  ✓  🗑️                  │
│              │        │      ↑                      │
│              │        │   Klik ini                  │
└─────────────────────────────────────────────────────┘
```

**Modal Konfirmasi:**
```
┌─────────────────────────────────────────────────────┐
│ Konfirmasi Pesanan                                  │
├─────────────────────────────────────────────────────┤
│ ℹ️ Konfirmasi Pesanan                               │
│                                                     │
│ Anda akan mengkonfirmasi pesanan ORD-001 dari       │
│ PT. Plywood Nusantara.                              │
│                                                     │
│ Total: 100 batang, 50.000 m³, Rp60.000.000         │
│                                                     │
│ ✅ Setelah dikonfirmasi, pesanan akan muncul di     │
│    halaman Keuangan → Uang Keluar (ke Supplier)     │
│                                                     │
│ [Batal]                          [✓ Konfirmasi]     │
└─────────────────────────────────────────────────────┘
```

---

### **2. Confirmed → Invoiced (Muncul di Uang Masuk)**

**Langkah:**
1. Buka halaman **Transaksi → Pesanan**
2. Cari pesanan dengan status **Confirmed**
3. Klik tombol **📄 (Invoice)** di kolom Aksi
4. Atau klik **👁 (Lihat Detail)** → klik tombol **Buat Invoice**
5. Konfirmasi di modal yang muncul
6. ✅ Pesanan akan muncul di **Keuangan → Uang Masuk (dari Perusahaan)**

**Visual:**
```
┌─────────────────────────────────────────────────────┐
│ No. Order    │ Status      │ Aksi                   │
├─────────────────────────────────────────────────────┤
│ ORD-001      │ Confirmed   │ 👁  📄  🗑️             │
│              │             │      ↑                 │
│              │             │   Klik ini             │
└─────────────────────────────────────────────────────┘
```

**Modal Invoice:**
```
┌─────────────────────────────────────────────────────┐
│ Buat Invoice                                        │
├─────────────────────────────────────────────────────┤
│ 📄 Buat Invoice                                     │
│                                                     │
│ Anda akan membuat invoice untuk pesanan ORD-001     │
│ dari PT. Plywood Nusantara.                         │
│                                                     │
│ Total: 100 batang, 50.000 m³, Rp60.000.000         │
│                                                     │
│ ✅ Setelah di-invoice, pesanan akan muncul di       │
│    halaman Keuangan → Uang Masuk (dari Perusahaan)  │
│                                                     │
│ [Batal]                          [📄 Buat Invoice]  │
└─────────────────────────────────────────────────────┘
```

---

## 📊 **Contoh Skenario Lengkap**

### **Skenario: Trading Kayu Meranti 50 m³**

**Step 1: Buat Pesanan**
```
1. Klik "Buat Pesanan"
2. Pilih perusahaan: PT. Plywood Nusantara
3. Pilih supplier: Depo Kayu Makmur
4. Input item:
   - Jenis: Meranti 20-30cm Premium
   - Diameter: 25 cm
   - Jumlah: 100 pcs
   - Panjang: 400 cm
5. Klik "Buat Pesanan"

Status: DRAFT ❌ (belum muncul di keuangan)
```

**Step 2: Konfirmasi Pesanan**
```
1. Di tabel pesanan, klik tombol ✓ (Konfirmasi)
2. Konfirmasi di modal
3. Status berubah: CONFIRMED ✅

Status: CONFIRMED 💸
→ Muncul di "Uang Keluar (ke Supplier)"
→ Total harus bayar: Rp60.750.000
   (Harga beli: Rp60.000.000 + Margin: Rp750.000)
```

**Step 3: Buat Invoice**
```
1. Di tabel pesanan, klik tombol 📄 (Invoice)
2. Konfirmasi di modal
3. Status berubah: INVOICED ✅

Status: INVOICED 💰
→ Muncul di "Uang Masuk (dari Perusahaan)"
→ Total harus tagih: Rp60.750.000
   (Harga pokok: Rp60.000.000 + Margin: Rp750.000)
```

**Step 4: Catat Pembayaran**
```
1. Buka "Uang Keluar" → Catat pembayaran ke supplier
2. Buka "Uang Masuk" → Catat pembayaran dari perusahaan
3. Status berubah: PAID ✅

Status: PAID ✅
→ Selesai, tidak muncul di keuangan aktif
```

---

## 🎨 **Visual Guide**

### **Tabel Pesanan dengan Tombol Aksi**

```
┌────────────┬──────────┬──────────┬────────┬────────┬──────────┬────────┬──────┐
│ No. Order  │ Tanggal  │Perusahaan│ Volume │ Nilai  │ Status   │ Aksi   │      │
├────────────┼──────────┼──────────┼────────┼────────┼──────────┼────────┼──────┤
│ ORD-001    │ 15 Jan   │ PT. XYZ  │ 50 m³  │ Rp60M  │ Draft    │ 👁 ✓ 🗑️│      │
│            │          │          │        │        │          │        │      │
│ ORD-002    │ 16 Jan   │ PT. ABC  │ 30 m³  │ Rp36M  │Confirm.  │ 👁 📄 🗑️│      │
│            │          │          │        │        │          │        │      │
│ ORD-003    │ 17 Jan   │ PT. DEF  │ 40 m³  │ Rp48M  │ Invoiced │ 👁   🗑️│      │
│            │          │          │        │        │          │        │      │
│ ORD-004    │ 18 Jan   │ PT. GHI  │ 25 m³  │ Rp30M  │ Paid     │ 👁      │      │
└────────────┴──────────┴──────────┴────────┴────────┴──────────┴────────┴──────┘

Legend:
 👁 = Lihat Detail
 ✓ = Konfirmasi (hanya untuk Draft)
 📄 = Buat Invoice (hanya untuk Confirmed)
 🗑️ = Hapus Pesanan
```

---

## 🔍 **Detail Status**

### **Draft**
```
┌─────────────────────────────────────────────────────┐
│ Status: DRAFT                                       │
├─────────────────────────────────────────────────────┤
│ • Pesanan baru dibuat                               │
│ • Belum dikonfirmasi                                │
│ • Bisa diedit atau dihapus                          │
│ • TIDAK muncul di halaman keuangan                  │
│                                                     │
│ Aksi yang tersedia:                                 │
│ ✓ Konfirmasi → muncul di Uang Keluar               │
│ 🗑️ Hapus → pesanan dihapus                          │
└─────────────────────────────────────────────────────┘
```

### **Confirmed**
```
┌─────────────────────────────────────────────────────┐
│ Status: CONFIRMED                                   │
├─────────────────────────────────────────────────────┤
│ • Pesanan sudah dikonfirmasi                        │
│ • Harus bayar ke supplier                           │
│ • Muncul di "Uang Keluar (ke Supplier)"             │
│ • Bisa dibuat invoice                               │
│                                                     │
│ Aksi yang tersedia:                                 │
│ 📄 Buat Invoice → muncul di Uang Masuk             │
│ 🗑️ Hapus → pesanan dihapus                          │
└─────────────────────────────────────────────────────┘
```

### **Invoiced**
```
┌─────────────────────────────────────────────────────┐
│ Status: INVOICED                                    │
├─────────────────────────────────────────────────────┤
│ • Invoice sudah dibuat                              │
│ • Harus tagih ke perusahaan                         │
│ • Muncul di "Uang Masuk (dari Perusahaan)"          │
│ • Menunggu pembayaran                               │
│                                                     │
│ Aksi yang tersedia:                                 │
│ (Tidak ada aksi perubahan status)                   │
│ 🗑️ Hapus → pesanan dihapus                          │
└─────────────────────────────────────────────────────┘
```

### **Paid**
```
┌─────────────────────────────────────────────────────┐
│ Status: PAID                                        │
├─────────────────────────────────────────────────────┤
│ • Sudah dibayar oleh perusahaan                     │
│ • Transaksi selesai                                 │
│ • Tidak muncul di halaman keuangan aktif            │
│ • Tetap tercatat di riwayat                         │
│                                                     │
│ Aksi yang tersedia:                                 │
│ 👁 Lihat Detail (read-only)                         │
└─────────────────────────────────────────────────────┘
```

---

## 💡 **Tips Penggunaan**

### **1. Konfirmasi Pesanan Segera**
- ✅ Konfirmasi pesanan segera setelah dibuat
- ✅ Pesanan akan muncul di Uang Keluar
- ✅ Bisa langsung catat pembayaran ke supplier

### **2. Buat Invoice Setelah Barang Diterima**
- ✅ Buat invoice setelah barang diterima dari supplier
- ✅ Invoice akan muncul di Uang Masuk
- ✅ Bisa langsung tagih ke perusahaan

### **3. Monitor Status di Tab**
- ✅ Gunakan tab untuk filter berdasarkan status
- ✅ Tab "Draft" → pesanan yang belum dikonfirmasi
- ✅ Tab "Confirmed" → pesanan yang harus bayar ke supplier
- ✅ Tab "Invoiced" → pesanan yang harus tagih ke perusahaan

### **4. Cek Halaman Keuangan**
- ✅ Buka "Uang Keluar" untuk lihat pesanan confirmed
- ✅ Buka "Uang Masuk" untuk lihat pesanan invoiced
- ✅ Catat pembayaran segera setelah dilakukan

---

## 📝 **Checklist Alur Kerja**

### **Untuk Setiap Pesanan:**

```
□ 1. Buat Pesanan (status: Draft)
     └─ Input data lengkap
     └─ Upload tally (opsional)
     └─ Klik "Buat Pesanan"

□ 2. Konfirmasi Pesanan (status: Confirmed)
     └─ Cek data pesanan
     └─ Klik tombol ✓ (Konfirmasi)
     └─ Pesanan muncul di Uang Keluar

□ 3. Catat Pembayaran ke Supplier
     └─ Buka Uang Keluar
     └─ Klik icon 💸 pada pesanan
     └─ Input tanggal pembayaran
     └─ Upload bukti transfer
     └─ Klik "Simpan Pembayaran"

□ 4. Buat Invoice (status: Invoiced)
     └─ Klik tombol 📄 (Invoice)
     └─ Pesanan muncul di Uang Masuk

□ 5. Catat Pembayaran dari Perusahaan
     └─ Buka Uang Masuk
     └─ Klik icon 💰 pada pesanan
     └─ Input tanggal pembayaran
     └─ Upload bukti transfer
     └─ Klik "Simpan Pembayaran"

□ 6. Selesai (status: Paid)
     └─ Transaksi selesai
     └─ Profit tercatat
```

---

## ✅ **Status Implementasi**

### **Fitur yang Ditambahkan:**
- ✅ Tombol Konfirmasi (✓) untuk Draft → Confirmed
- ✅ Tombol Invoice (📄) untuk Confirmed → Invoiced
- ✅ Modal konfirmasi untuk perubahan status
- ✅ Toast notification setelah status berubah
- ✅ Tombol aksi di tabel dan modal detail
- ✅ Visual feedback yang jelas

### **Build Status:**
```
✓ Build sukses tanpa error
✓ Bundle size: 735 KB (gzipped: 195 KB)
✓ TypeScript: No type errors
✓ Performance: Optimal
```

---

## 🎯 **Kesimpulan**

Alur status pesanan sekarang:
- ✅ **Jelas** - Setiap status memiliki arti yang jelas
- ✅ **Terstruktur** - Flow dari Draft → Confirmed → Invoiced → Paid
- ✅ **Terintegrasi** - Status menentukan muncul di halaman keuangan
- ✅ **Mudah** - Tombol aksi yang intuitif
- ✅ **Informatif** - Modal konfirmasi dengan detail lengkap

**Silakan test dengan buat pesanan dan ubah statusnya untuk melihat bagaimana pesanan muncul di halaman keuangan!** 🚀

---

**Status:** ✅ Selesai dan Build Sukses  
**Build Size:** 735 KB (gzipped: 195 KB)  
**Performance:** Optimal
