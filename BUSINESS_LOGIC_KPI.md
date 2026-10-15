# 💰 Logika Bisnis & KPI Keuangan - Panduan Lengkap

## 🎯 **Pemahaman Logika Bisnis**

### **Peran Anda sebagai Trader:**
Anda adalah **perantara** antara **Supplier (Depo Kayu)** dan **Perusahaan Plywood**.

```
┌─────────────┐                    ┌─────────────┐                    ┌─────────────┐
│  SUPPLIER   │                    │    ANDA     │                    │  PERUSAHAAN │
│  (Depo Kayu)│                    │  (TRADER)   │                    │  (PLYWOOD)  │
└─────────────┘                    └─────────────┘                    └─────────────┘
       │                                   │                                   │
       │  1. Kirim Kayu                    │                                   │
       │──────────────────────────────────>│                                   │
       │                                   │                                   │
       │  2. Anda Bayar                    │                                   │
       │  (Harga - Margin)                 │                                   │
       │<──────────────────────────────────│                                   │
       │                                   │                                   │
       │                                   │  3. Kirim Kayu ke Perusahaan      │
       │                                   │──────────────────────────────────>│
       │                                   │                                   │
       │                                   │  4. Perusahaan Bayar              │
       │                                   │  (Total Harga)                    │
       │                                   │<──────────────────────────────────│
       │                                   │                                   │
       │                                   │  5. PROFIT = MARGIN               │
       │                                   │  (Rp15.000 × m³)                  │
```

---

## 📊 **Logika Pembayaran yang BENAR**

### **UANG KELUAR (ke Supplier)**

**Formula:**
```
Total Bayar ke Supplier = Total Harga Pesanan - Margin Trader
```

**Contoh:**
```
Total Harga Pesanan: Rp60.000.000
Volume: 50 m³
Margin: 50 × Rp15.000 = Rp750.000

Total Bayar ke Supplier = Rp60.000.000 - Rp750.000
                        = Rp59.250.000
```

**Kenapa dikurangi margin?**
- Margin adalah **keuntungan Anda**, bukan biaya ke supplier
- Supplier hanya menerima harga pokok kayu
- Anda tidak perlu bayar margin ke supplier

---

### **UANG MASUK (dari Perusahaan)**

**Formula:**
```
Total Diterima dari Perusahaan = Total Harga Pesanan
```

**Contoh:**
```
Total Harga Pesanan: Rp60.000.000

Total Diterima = Rp60.000.000
```

**Kenapa penuh?**
- Perusahaan membayar **total harga** yang sudah termasuk margin
- Margin sudah termasuk dalam harga jual ke perusahaan
- Anda menerima penuh tanpa pengurangan

---

### **PROFIT TRADER**

**Formula:**
```
Profit = Uang Masuk - Uang Keluar
       = Total Harga - (Total Harga - Margin)
       = Margin
       = Volume × Rp15.000
```

**Contoh:**
```
Uang Masuk: Rp60.000.000
Uang Keluar: Rp59.250.000

Profit = Rp60.000.000 - Rp59.250.000
       = Rp750.000

Atau: 50 m³ × Rp15.000 = Rp750.000 ✅
```

---

## 📈 **KPI (Key Performance Indicators)**

### **KPI di Halaman Uang Keluar (ke Supplier)**

| KPI | Keterangan | Warna |
|-----|------------|-------|
| 💸 **UTANG KE SUPPLIER** | Total yang harus dibayar ke supplier | 🔴 Merah |
| ✅ **SUDAH DIBAYAR** | Total yang sudah dibayar ke supplier | 🟢 Hijau |
| 💰 **MARGIN TRADER** | Total profit dari semua pesanan | 🟡 Kuning |
| 📦 **TOTAL PESANAN** | Jumlah pesanan aktif | 🔵 Biru |

**Contoh Tampilan:**
```
┌─────────────────────┬─────────────────────┬─────────────────────┬─────────────────────┐
│ 💸 UTANG KE         │ ✅ SUDAH DIBAYAR    │ 💰 MARGIN TRADER    │ 📦 TOTAL PESANAN    │
│   SUPPLIER          │                     │                     │                     │
│ Rp59.250.000        │ Rp30.000.000        │ Rp750.000           │ 5 pesanan           │
│ 🔴                  │ 🟢                  │ 🟡                  │ 🔵                  │
│ Yang harus dibayar  │ Pembayaran ke       │ Rp15.000 × m³       │ 3 belum lunas       │
│ ke supplier         │ supplier            │                     │                     │
└─────────────────────┴─────────────────────┴─────────────────────┴─────────────────────┘
```

---

### **KPI di Halaman Uang Masuk (dari Perusahaan)**

| KPI | Keterangan | Warna |
|-----|------------|-------|
| 💰 **PIUTANG DARI PERUSAHAAN** | Total yang harus diterima dari perusahaan | 🟢 Hijau |
| ✅ **SUDAH DITERIMA** | Total yang sudah diterima dari perusahaan | 🟢 Hijau |
| 💎 **PROFIT TRADER** | Total profit dari semua pesanan | 🟡 Kuning |
| 📄 **TOTAL INVOICE** | Jumlah invoice aktif | 🔵 Biru |

**Contoh Tampilan:**
```
┌─────────────────────┬─────────────────────┬─────────────────────┬─────────────────────┐
│ 💰 PIUTANG DARI     │ ✅ SUDAH DITERIMA   │ 💎 PROFIT TRADER    │ 📄 TOTAL INVOICE    │
│   PERUSAHAAN        │                     │                     │                     │
│ Rp60.000.000        │ Rp45.000.000        │ Rp750.000           │ 3 invoice           │
│ 🟢                  │ 🟢                  │ 🟡                  │ 🔵                  │
│ Yang harus diterima │ Pembayaran dari     │ Rp15.000 × m³       │ 2 belum dibayar     │
│ dari perusahaan     │ perusahaan          │                     │                     │
└─────────────────────┴─────────────────────┴─────────────────────┴─────────────────────┘
```

---

## 🧮 **Contoh Skenario Lengkap**

### **Skenario: 3 Pesanan**

**Pesanan 1: ORD-001**
```
Volume: 50 m³
Total Harga: Rp60.000.000
Margin: 50 × Rp15.000 = Rp750.000

Uang Keluar ke Supplier: Rp60.000.000 - Rp750.000 = Rp59.250.000
Uang Masuk dari Perusahaan: Rp60.000.000
Profit: Rp750.000
```

**Pesanan 2: ORD-002**
```
Volume: 30 m³
Total Harga: Rp36.000.000
Margin: 30 × Rp15.000 = Rp450.000

Uang Keluar ke Supplier: Rp36.000.000 - Rp450.000 = Rp35.550.000
Uang Masuk dari Perusahaan: Rp36.000.000
Profit: Rp450.000
```

**Pesanan 3: ORD-003**
```
Volume: 40 m³
Total Harga: Rp48.000.000
Margin: 40 × Rp15.000 = Rp600.000

Uang Keluar ke Supplier: Rp48.000.000 - Rp600.000 = Rp47.400.000
Uang Masuk dari Perusahaan: Rp48.000.000
Profit: Rp600.000
```

---

### **KPI Gabungan**

**Uang Keluar (ke Supplier):**
```
Total Utang: Rp59.250.000 + Rp35.550.000 + Rp47.400.000 = Rp142.200.000
Sudah Dibayar: Rp59.250.000 (ORD-001)
Margin Total: Rp750.000 + Rp450.000 + Rp600.000 = Rp1.800.000
```

**Uang Masuk (dari Perusahaan):**
```
Total Piutang: Rp60.000.000 + Rp36.000.000 + Rp48.000.000 = Rp144.000.000
Sudah Diterima: Rp60.000.000 (ORD-001)
Profit Total: Rp750.000 + Rp450.000 + Rp600.000 = Rp1.800.000
```

**Ringkasan:**
```
Total Uang Keluar: Rp142.200.000
Total Uang Masuk: Rp144.000.000
─────────────────────────────────
Total Profit: Rp1.800.000 ✅
```

---

## 📋 **Tabel Detail di Halaman Keuangan**

### **Tabel Uang Keluar (ke Supplier)**

| No. Order | Tanggal | Supplier | Volume | Total Harga | Margin | Bayar ke Supplier | Status |
|-----------|---------|----------|--------|-------------|--------|-------------------|--------|
| ORD-001 | 15 Jan | Depo A | 50 m³ | Rp60.000.000 | - Rp750.000 | **Rp59.250.000** | Harus Bayar |
| ORD-002 | 16 Jan | Depo B | 30 m³ | Rp36.000.000 | - Rp450.000 | **Rp35.550.000** | Sudah Bayar |
| ORD-003 | 17 Jan | Depo A | 40 m³ | Rp48.000.000 | - Rp600.000 | **Rp47.400.000** | Harus Bayar |

**Kolom "Bayar ke Supplier":**
- Total Harga - Margin = Yang dibayar ke supplier
- Contoh: Rp60.000.000 - Rp750.000 = Rp59.250.000

---

### **Tabel Uang Masuk (dari Perusahaan)**

| No. Order | Tanggal | Perusahaan | Volume | Total Tagih | Profit | Status |
|-----------|---------|------------|--------|-------------|--------|--------|
| ORD-001 | 15 Jan | PT. XYZ | 50 m³ | **Rp60.000.000** | Rp750.000 | Sudah Dibayar |
| ORD-002 | 16 Jan | PT. ABC | 30 m³ | **Rp36.000.000** | Rp450.000 | Sudah Ditagih |
| ORD-003 | 17 Jan | PT. DEF | 40 m³ | **Rp48.000.000** | Rp600.000 | Sudah Ditagih |

**Kolom "Total Tagih":**
- Total harga pesanan (perusahaan bayar penuh)
- Contoh: Rp60.000.000

**Kolom "Profit":**
- Margin trader (Rp15.000 × volume)
- Contoh: 50 × Rp15.000 = Rp750.000

---

## 🎨 **Visualisasi Profit**

### **Diagram Alur Uang:**

```
┌─────────────────────────────────────────────────────────────────┐
│                    ALUR UANG TRADER                              │
└─────────────────────────────────────────────────────────────────┘

SUPPLIER                          ANDA                           PERUSAHAAN
   │                               │                                │
   │  Rp59.250.000                 │                                │
   │<──────────────────────────────│                                │
   │  (Harga - Margin)             │                                │
   │                               │                                │
   │                               │  Rp60.000.000                  │
   │                               │<───────────────────────────────│
   │                               │  (Total Harga)                 │
   │                               │                                │
   │                               │  PROFIT: Rp750.000             │
   │                               │  (Margin)                      │
   │                               │                                │
```

### **Breakdown Profit per Pesanan:**

```
┌─────────────────────────────────────────────────────────────────┐
│ ORD-001: 50 m³                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Uang Masuk:     ████████████████████████████████████ Rp60.000.000 │
│  Uang Keluar:    ██████████████████████████████████░░ Rp59.250.000 │
│                                           ↑                      │
│                                     Profit: Rp750.000            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 💡 **Tips Monitoring KPI**

### **1. Monitor Utang ke Supplier**
- ✅ Cek KPI "UTANG KE SUPPLIER" di halaman Uang Keluar
- ✅ Prioritaskan pembayaran yang sudah jatuh tempo
- ✅ Upload bukti transfer untuk audit trail

### **2. Monitor Piutang dari Perusahaan**
- ✅ Cek KPI "PIUTANG DARI PERUSAHAAN" di halaman Uang Masuk
- ✅ Follow up perusahaan yang terlambat bayar
- ✅ Cek aging untuk identifikasi masalah

### **3. Monitor Profit**
- ✅ Cek KPI "MARGIN TRADER" atau "PROFIT TRADER"
- ✅ Profit = Volume × Rp15.000
- ✅ Analisis profit per pesanan atau per periode

### **4. Net Cash Flow**
```
Net Cash Flow = Uang Masuk - Uang Keluar
              = Rp144.000.000 - Rp142.200.000
              = Rp1.800.000 (Profit)
```

---

## 📝 **Checklist Harian**

### **Pagi:**
- [ ] Cek KPI "UTANG KE SUPPLIER" - berapa yang harus dibayar hari ini
- [ ] Cek KPI "PIUTANG DARI PERUSAHAAN" - berapa yang harus ditagih
- [ ] Cek KPI "PROFIT TRADER" - total profit bulan ini

### **Siang:**
- [ ] Catat pembayaran ke supplier (jika ada)
- [ ] Catat pembayaran dari perusahaan (jika ada)
- [ ] Follow up invoice yang overdue

### **Sore:**
- [ ] Review KPI hari ini
- [ ] Update status pesanan
- [ ] Siapkan laporan harian

---

## ✅ **Kesimpulan**

### **Logika yang BENAR:**
- ✅ **Uang Keluar** = Total Harga - Margin (bayar ke supplier)
- ✅ **Uang Masuk** = Total Harga (terima dari perusahaan)
- ✅ **Profit** = Margin = Volume × Rp15.000

### **KPI yang Penting:**
- 💸 **Utang ke Supplier** - Yang harus dibayar
- 💰 **Piutang dari Perusahaan** - Yang harus diterima
- 💎 **Profit Trader** - Keuntungan Anda
- 📦 **Total Pesanan/Invoice** - Volume bisnis

### **Monitoring:**
- ✅ Cek KPI setiap hari
- ✅ Prioritaskan pembayaran
- ✅ Follow up piutang
- ✅ Analisis profit

**Sekarang Anda bisa memantau keuntungan dengan jelas melalui KPI di halaman keuangan!** 🚀

---

**Status:** ✅ Selesai dan Build Sukses  
**Build Size:** 738 KB (gzipped: 195 KB)  
**Performance:** Optimal
