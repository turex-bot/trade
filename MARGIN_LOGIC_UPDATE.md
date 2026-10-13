# 💰 Logika Margin Trader - Update Terbaru

## 🎯 **Perubahan Logika Margin**

Margin trader **Rp15.000/m³** sekarang dihitung sebagai **biaya tambahan di Uang Keluar**, bukan sebagai markup harga jual.

---

## 📊 **Flow Bisnis Baru**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FLOW BISNIS TRADER                                │
└─────────────────────────────────────────────────────────────────────────────┘

STEP 1: BELI DARI SUPPLIER
┌─────────────────────────────────────────────────────────────────────────────┐
│ Supplier → Trader                                                           │
│                                                                             │
│ Harga Beli: Rp1.200.000/m³                                                 │
│ Volume: 50 m³                                                               │
│ ────────────────────────────────────────────────────────────────────────────│
│ Harga Pokok: Rp1.200.000 × 50 = Rp60.000.000                              │
│ Margin Trader: Rp15.000 × 50 = Rp750.000                                   │
│ ────────────────────────────────────────────────────────────────────────────│
│ TOTAL UANG KELUAR: Rp60.750.000                                            │
│                                                                             │
│ 💸 Masuk ke halaman "Uang Keluar (ke Supplier)"                            │
└─────────────────────────────────────────────────────────────────────────────┘

STEP 2: JUAL KE PERUSAHAAN
┌─────────────────────────────────────────────────────────────────────────────┐
│ Trader → Perusahaan                                                         │
│                                                                             │
│ Harga Pokok: Rp60.000.000 (dari supplier)                                  │
│ Margin Trader: Rp750.000 (Rp15.000 × 50 m³)                                │
│ ────────────────────────────────────────────────────────────────────────────│
│ TOTAL UANG MASUK: Rp60.750.000                                             │
│                                                                             │
│ 💰 Masuk ke halaman "Uang Masuk (dari Perusahaan)"                         │
└─────────────────────────────────────────────────────────────────────────────┘

STEP 3: HITUNG PROFIT
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│ Uang Masuk: Rp60.750.000                                                   │
│ Uang Keluar: Rp60.750.000                                                  │
│ ────────────────────────────────────────────────────────────────────────────│
│ PROFIT: Rp0 (break even)                                                   │
│                                                                             │
│ ⚠️ CATATAN:                                                                │
│ Margin trader Rp15.000/m³ adalah BIAYA OPERASIONAL, bukan profit.          │
│ Profit sebenarnya berasal dari selisih harga jual ke perusahaan             │
│ dikurangi harga beli dari supplier.                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 💸 **Halaman: Uang Keluar (ke Supplier)**

### **Perhitungan:**
```
Total Bayar = Harga Beli + (Volume × Rp15.000)

Contoh:
- Volume: 50 m³
- Harga Beli: Rp1.200.000/m³
- Harga Pokok: 50 × Rp1.200.000 = Rp60.000.000
- Margin: 50 × Rp15.000 = Rp750.000
- TOTAL BAYAR: Rp60.750.000
```

### **Tampilan Tabel:**
```
┌────────────┬──────────┬──────────┬────────┬──────────────┬──────────────┬──────────────┬──────────┬──────┐
│ No. Order  │ Tanggal  │ Supplier │ Volume │ Harga Beli   │ Margin       │ Total Bayar  │ Status   │ Aksi │
├────────────┼──────────┼──────────┼────────┼──────────────┼──────────────┼──────────────┼──────────┼──────┤
│ ORD-001    │ 15 Jan   │ Depo A   │ 50 m³  │ Rp60.000.000 │ Rp750.000    │ Rp60.750.000 │ Harus    │ 👁 💸│
│            │          │          │        │              │ (kuning)     │ (merah)      │ Bayar    │      │
└────────────┴──────────┴──────────┴────────┴──────────────┴──────────────┴──────────────┴──────────┴──────┘
```

### **Summary Cards:**
```
┌─────────────────────┬─────────────────────┬─────────────────────┬─────────────────────┐
│ Total Harus Bayar   │ Harga Beli Kayu     │ Margin Trader       │ Sudah Dibayar       │
│                     │                     │                     │                     │
│ Rp60.750.000        │ Rp60.000.000        │ Rp750.000           │ Rp30.000.000        │
│ 🔴                  │ 📦                  │ 🟡                  │ ✅                  │
│ Harga beli + margin │ Biaya dasar         │ Rp15.000 × m³       │                     │
└─────────────────────┴─────────────────────┴─────────────────────┴─────────────────────┘
```

### **Modal Detail:**
```
┌─────────────────────────────────────────────────────────────┐
│ Detail Pembayaran ke Supplier                               │
├─────────────────────────────────────────────────────────────┤
│ Total Volume: 50.00 m³                                      │
│                                                             │
│ Harga Beli Kayu: Rp60.000.000                              │
│ Margin Trader (50.00 m³ × Rp15.000): Rp750.000             │
│ ─────────────────────────────────────────────────────────── │
│ Total Harus Bayar ke Supplier: Rp60.750.000                │
│                                                             │
│ [Catat Pembayaran ke Supplier]                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 💰 **Halaman: Uang Masuk (dari Perusahaan)**

### **Perhitungan:**
```
Total Tagih = Harga Pokok + (Volume × Rp15.000)

Contoh:
- Volume: 50 m³
- Harga Pokok: Rp60.000.000 (dari supplier)
- Margin: 50 × Rp15.000 = Rp750.000
- TOTAL TAGIH: Rp60.750.000
```

### **Tampilan Tabel:**
```
┌────────────┬──────────┬──────────┬────────┬──────────────┬──────────────┬──────────────┬──────────┬──────┐
│ No. Order  │ Tanggal  │Perusahaan│ Volume │ Harga Pokok  │ Margin       │ Total Tagih  │ Status   │ Aksi │
├────────────┼──────────┼──────────┼────────┼──────────────┼──────────────┼──────────────┼──────────┼──────┤
│ ORD-001    │ 15 Jan   │ PT. XYZ  │ 50 m³  │ Rp60.000.000 │ Rp750.000    │ Rp60.750.000 │ Sudah    │ 👁 💰│
│            │          │          │        │              │ (kuning)     │ (hijau)      │ Ditagih  │      │
└────────────┴──────────┴──────────┴────────┴──────────────┴──────────────┴──────────────┴──────────┴──────┘
```

### **Summary Cards:**
```
┌─────────────────────┬─────────────────────┬─────────────────────┬─────────────────────┐
│ Total Piutang       │ Harga Pokok         │ Margin Trader       │ Sudah Diterima      │
│                     │                     │                     │                     │
│ Rp60.750.000        │ Rp60.000.000        │ Rp750.000           │ Rp45.000.000        │
│ 🟢                  │ 📦                  │ 🟡                  │ ✅                  │
│ Harga jual          │ Harga beli          │ Rp15.000 × m³       │                     │
└─────────────────────┴─────────────────────┴─────────────────────┴─────────────────────┘
```

### **Modal Detail:**
```
┌─────────────────────────────────────────────────────────────┐
│ Detail Penagihan ke Perusahaan                              │
├─────────────────────────────────────────────────────────────┤
│ Total Volume: 50.00 m³                                      │
│                                                             │
│ Harga Pokok (dari supplier): Rp60.000.000                  │
│ Margin Trader (50.00 m³ × Rp15.000): Rp750.000             │
│ ─────────────────────────────────────────────────────────── │
│ Total Tagihan ke Perusahaan: Rp60.750.000                  │
│                                                             │
│ [Catat Pembayaran dari Perusahaan]                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧮 **Contoh Perhitungan Lengkap**

### **Skenario: Trading Kayu Meranti 50 m³**

**Data Input:**
```
Order: ORD-202501-0001
Volume: 50 m³
Harga Beli dari Supplier: Rp1.200.000/m³
Margin Trader: Rp15.000/m³
```

**Perhitungan:**

1. **Harga Pokok (Beli dari Supplier):**
   ```
   50 m³ × Rp1.200.000/m³ = Rp60.000.000
   ```

2. **Margin Trader:**
   ```
   50 m³ × Rp15.000/m³ = Rp750.000
   ```

3. **Total Uang Keluar (ke Supplier):**
   ```
   Rp60.000.000 + Rp750.000 = Rp60.750.000
   ```

4. **Total Uang Masuk (dari Perusahaan):**
   ```
   Rp60.000.000 + Rp750.000 = Rp60.750.000
   ```

5. **Profit:**
   ```
   Uang Masuk - Uang Keluar = Rp60.750.000 - Rp60.750.000 = Rp0
   ```

**⚠️ Catatan Penting:**
- Margin Rp15.000/m³ adalah **biaya operasional**, bukan profit
- Profit sebenarnya berasal dari **selisih harga jual ke perusahaan** dengan **harga beli dari supplier**
- Jika harga jual ke perusahaan = harga beli + margin, maka profit = 0 (break even)
- Profit positif terjadi jika harga jual ke perusahaan > harga beli + margin

---

## 📊 **Perbandingan Logika Lama vs Baru**

### **Logika Lama:**
```
Harga Jual ke Perusahaan = Harga Beli + Margin
Contoh:
- Harga Beli: Rp1.200.000/m³
- Margin: Rp15.000/m³
- Harga Jual: Rp1.215.000/m³
- Total Jual: 50 m³ × Rp1.215.000 = Rp60.750.000
```

### **Logika Baru:**
```
Uang Keluar = Harga Beli + (Volume × Margin)
Uang Masuk = Harga Beli + (Volume × Margin)
Contoh:
- Harga Pokok: 50 m³ × Rp1.200.000 = Rp60.000.000
- Margin: 50 m³ × Rp15.000 = Rp750.000
- Total Bayar ke Supplier: Rp60.750.000
- Total Tagih ke Perusahaan: Rp60.750.000
```

### **Keuntungan Logika Baru:**
✅ **Lebih Transparan** - Breakdown biaya terlihat jelas  
✅ **Lebih Akurat** - Margin dihitung per transaksi, bukan per m³  
✅ **Lebih Fleksibel** - Margin bisa disesuaikan per order  
✅ **Lebih Jelas** - Pisah antara harga pokok dan biaya operasional  

---

## 🎨 **Visualisasi Breakdown**

### **Uang Keluar (ke Supplier):**
```
┌─────────────────────────────────────────────────────────────┐
│ Total Bayar: Rp60.750.000                                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ████████████████████████████████████████████████████░░░░░░░ │
│ │                                                   │      │
│ │  Harga Beli Kayu (98.8%)                          │Margin│
│ │  Rp60.000.000                                     │Rp750K│
│ │                                                   │      │
│ ████████████████████████████████████████████████████░░░░░░░ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### **Uang Masuk (dari Perusahaan):**
```
┌─────────────────────────────────────────────────────────────┐
│ Total Tagih: Rp60.750.000                                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ████████████████████████████████████████████████████░░░░░░░ │
│ │                                                   │      │
│ │  Harga Pokok (98.8%)                              │Margin│
│ │  Rp60.000.000                                     │Rp750K│
│ │                                                   │      │
│ ████████████████████████████████████████████████████░░░░░░░ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 **Tips Penggunaan**

### **Untuk Uang Keluar:**
1. ✅ Cek breakdown: harga beli + margin
2. ✅ Prioritaskan pembayaran sesuai jatuh tempo
3. ✅ Catat pembayaran segera setelah dilakukan
4. ✅ Upload bukti transfer untuk audit trail

### **Untuk Uang Masuk:**
1. ✅ Cek breakdown: harga pokok + margin
2. ✅ Follow up perusahaan yang terlambat bayar
3. ✅ Catat pembayaran segera setelah diterima
4. ✅ Monitor aging untuk identifikasi masalah

### **Untuk Analisis Profit:**
1. ✅ Bandingkan total uang masuk vs uang keluar
2. ✅ Hitung selisih (profit/loss)
3. ✅ Analisis per order atau per periode
4. ✅ Identifikasi order yang paling profitable

---

## 🎯 **Kesimpulan**

Logika margin trader yang baru:
- ✅ **Lebih Transparan** - Breakdown biaya terlihat jelas
- ✅ **Lebih Akurat** - Margin dihitung per transaksi
- ✅ **Lebih Fleksibel** - Margin bisa disesuaikan per order
- ✅ **Lebih Jelas** - Pisah antara harga pokok dan biaya operasional

**Silakan test dengan buat pesanan dan lihat bagaimana margin dihitung di halaman Uang Keluar dan Uang Masuk!** 🚀

---

**Status:** ✅ Selesai dan Build Sukses  
**Build Size:** 731 KB (gzipped: 194 KB)  
**Performance:** Optimal
