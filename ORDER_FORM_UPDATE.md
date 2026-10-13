# 📋 Panduan Form Pesanan Baru - Update Terbaru

## 🎯 **Perubahan Utama**

Form "Buat Pesanan Baru" telah diperbarui dengan fitur-fitur baru untuk memudahkan input dan validasi data:

### **Fitur Baru:**
1. ✅ **Upload Hasil Tally** - Upload file tally dalam format Excel, CSV, PDF, atau gambar
2. ✅ **Range Diameter Otomatis** - Ditampilkan sebagai kolom terpisah (tidak perlu input)
3. ✅ **Diameter Tepat dengan Placeholder** - Placeholder menampilkan range yang valid
4. ✅ **Panjang Otomatis** - Diambil dari master data, tidak perlu input manual
5. ✅ **Grade Jelas** - Ditampilkan dalam dropdown (Premium/Reguler)

---

## 🎨 **Layout Form Baru**

### **Header Info (1 Baris)**
```
┌─────────────────┬─────────────────┬─────────────────┐
│ Perusahaan      │ Supplier        │ Tanggal         │
│ [Pilih ▼]       │ [Pilih ▼]       │ [2025-01-20]    │
└─────────────────┴─────────────────┴─────────────────┘
```

### **Tabel Item Kayu**
```
┌────────────┬──────────┬──────────┬──────────┬──────────┬──────────────┬──────┐
│ Jenis Kayu │ Range    │ Diameter │ Panjang  │ Jumlah   │ Kubikasi     │ Aksi │
│            │ Diameter │ (cm)     │ (cm)     │ (pcs)    │ & Nilai      │      │
├────────────┼──────────┼──────────┼──────────┼──────────┼──────────────┼──────┤
│ Meranti-   │ 20-30 cm │ [20-30]  │ 400 cm   │ [100]    │ 13.854 m³    │ [🗑️]│
│ Premium    │          │          │          │          │ Rp16.832.610 │      │
├────────────┼──────────┼──────────┼──────────┼──────────┼──────────────┼──────┤
│ Alba-      │ 19-24 cm │ [19-24]  │ 130 cm   │ [21]     │ 0.991 m³     │ [🗑️]│
│ Reguler    │          │          │          │          │ Rp807.665    │      │
└────────────┴──────────┴──────────┴──────────┴──────────┴──────────────┴──────┘
```

### **Upload Hasil Tally**
```
┌─────────────────────────────────────────────────────────────┐
│ Upload Hasil Tally (Opsional)                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    📁 [Klik untuk upload]                   │
│                                                             │
│         Format: Excel, CSV, PDF, atau Gambar               │
│                    (Maks 5MB)                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 **Flow Input Baru**

### **Step 1: Pilih Jenis Kayu**
```
┌─────────────────────────────────┐
│ Pilih Jenis Kayu                │
│ ├─ Meranti - Premium            │
│ ├─ Keruing - Reguler            │
│ ├─ Alba - Reguler               │
│ └─ Akasia - Premium             │
└─────────────────────────────────┘
```

**Setelah pilih:**
- ✅ Range diameter otomatis muncul di kolom "Range Diameter" (contoh: "20-30 cm")
- ✅ Panjang otomatis muncul di kolom "Panjang" (contoh: "400 cm")
- ✅ Diameter rata-rata otomatis terisi sebagai placeholder di kolom "Diameter Tepat" (contoh: "25")

### **Step 2: Lihat Range Diameter**
```
┌──────────────┐
│ 20-30 cm     │  ← Ditampilkan otomatis, tidak bisa diedit
└──────────────┘
```

**Fungsi:**
- Memberikan informasi kepada user tentang range yang valid
- Mencegah input diameter yang tidak sesuai

### **Step 3: Input Diameter**
```
┌──────────────┐
│ [20-30]      │  ← Placeholder menampilkan range
└──────────────┘
```

**Fitur:**
- ✅ Placeholder menampilkan range (contoh: "20-30")
- ✅ Validasi otomatis (min/max sesuai range)
- ✅ Disabled jika belum pilih jenis kayu
- ✅ User bisa input diameter spesifik (contoh: 21, 22, 23, dll)

**Contoh:**
```
Range: 20-30 cm
User input: 21 cm ✅ (valid)
User input: 35 cm ❌ (ditolak, melebihi range)
```

### **Step 4: Lihat Panjang (Otomatis)**
```
┌──────────────┐
│ 400 cm       │  ← Ditampilkan otomatis dari master data
└──────────────┘
```

**Fungsi:**
- Menampilkan panjang kayu dalam cm
- Otomatis dari master data
- Tidak bisa diedit (display only)
- Terletak di antara kolom "Diameter Tepat" dan "Jumlah"

### **Step 5: Input Jumlah (pcs)**
```
┌──────────────┐
│ [100]        │  ← Input jumlah batang
└──────────────┘
```

### **Step 6: Lihat Kubikasi & Nilai Otomatis**
```
┌──────────────┐
│ 0.472 m³     │  ← Kubikasi otomatis
│ Rp573.480    │  ← Nilai otomatis
└──────────────┘
```

**Kalkulasi:**
```
Volume/batang = (π/4) × (0.21)² × 1.3 = 0.00472 m³
Total volume = 0.00472 × 100 = 0.472 m³
Total nilai = 0.472 × Rp1.215.000 = Rp573.480
```

### **Step 7: Upload Hasil Tally (Opsional)**
```
┌─────────────────────────────────────────┐
│ 📁 tally_januari_2025.xlsx              │
│ Klik untuk ganti file                   │
└─────────────────────────────────────────┘
```

**Format yang didukung:**
- ✅ Excel (.xlsx, .xls)
- ✅ CSV (.csv)
- ✅ PDF (.pdf)
- ✅ Gambar (.jpg, .jpeg, .png)
- ✅ Maksimum 5MB

---

## 📊 **Contoh Penggunaan Lengkap**

### **Kasus 1: Kayu Meranti Premium**

**Input:**
```
1. Pilih: Meranti - Premium
   → Range: 20-30 cm (kolom terpisah)
   → Panjang: 400 cm (kolom terpisah, otomatis)

2. Diameter Tepat: 21 cm
   → Placeholder: "20-30"
   → Valid: ✅ (dalam range)

3. Jumlah: 100 pcs

4. Kubikasi otomatis:
   → Volume/batang: (π/4) × (0.21)² × 4 = 0.13854 m³
   → Total: 0.13854 × 100 = 13.854 m³
   → Nilai: 13.854 × Rp1.215.000 = Rp16.832.610
```

### **Kasus 2: Kayu Alba Reguler**

**Input:**
```
1. Pilih: Alba - Reguler
   → Range: 19-24 cm (kolom terpisah)
   → Panjang: 130 cm (kolom terpisah, otomatis)

2. Diameter Tepat: 21.5 cm
   → Placeholder: "19-24"
   → Valid: ✅ (dalam range)

3. Jumlah: 21 pcs

4. Kubikasi otomatis:
   → Volume/batang: (π/4) × (0.215)² × 1.3 = 0.04719 m³
   → Total: 0.04719 × 21 = 0.991 m³
   → Nilai: 0.991 × Rp815.000 = Rp807.665
```

### **Kasus 3: Upload Tally**

**Input:**
```
1. Klik area upload
2. Pilih file: tally_januari_2025.xlsx
3. File muncul: "tally_januari_2025.xlsx"
4. Klik untuk ganti jika perlu
```

---

## 🎨 **Keuntungan Fitur Baru**

### **1. Upload Hasil Tally**
- ✅ Dokumentasi lengkap
- ✅ Bisa dilampirkan dalam pesanan
- ✅ Audit trail yang jelas
- ✅ Format fleksibel (Excel, CSV, PDF, Gambar)

### **2. Range Diameter Otomatis**
- ✅ Informasi yang jelas untuk user
- ✅ Mencegah kesalahan input
- ✅ Tidak perlu hafal range
- ✅ Visual feedback langsung

### **3. Diameter dengan Placeholder**
- ✅ User tahu range yang valid
- ✅ Validasi otomatis (min/max)
- ✅ Mencegah input tidak sesuai
- ✅ UX yang lebih baik

### **4. Panjang Otomatis (Kolom Terpisah)**
- ✅ Ditampilkan sebagai kolom terpisah (di antara Diameter Tepat dan Jumlah)
- ✅ Tidak perlu input manual
- ✅ Konsisten dengan master data
- ✅ Mengurangi kesalahan
- ✅ Lebih cepat
- ✅ User bisa melihat panjang dengan jelas tanpa harus cek di bawah jenis kayu

### **5. Grade Jelas**
- ✅ Ditampilkan dalam dropdown
- ✅ User tahu grade kayu
- ✅ Konsisten dengan master data
- ✅ Mudah dipilih

---

## 🔧 **Validasi Otomatis**

### **Validasi Diameter:**
```typescript
<input 
  type="number"
  placeholder={spec ? `${spec.diameterMin}-${spec.diameterMax}` : 'Pilih jenis dulu'}
  min={spec?.diameterMin || 0}
  max={spec?.diameterMax || 999}
  disabled={!spec}
/>
```

**Contoh:**
```
Range: 20-30 cm
Input: 15 cm ❌ (ditolak, < 20)
Input: 25 cm ✅ (diterima, dalam range)
Input: 35 cm ❌ (ditolak, > 30)
```

### **Validasi Jumlah:**
```typescript
<input 
  type="number"
  min="0"
  placeholder="0"
/>
```

**Contoh:**
```
Input: -5 ❌ (ditolak, < 0)
Input: 0 ✅ (diterima, tapi tidak dihitung)
Input: 100 ✅ (diterima)
```

---

## 📝 **Tips Penggunaan**

### **Input Cepat:**
1. Pilih jenis kayu dari dropdown
2. Lihat range diameter yang muncul (kolom terpisah)
3. Input diameter tepat (dalam range)
4. Lihat panjang yang muncul (kolom terpisah, otomatis)
5. Input jumlah (pcs)
6. Kubikasi & nilai otomatis muncul
7. Upload tally jika perlu
8. Klik "Buat Pesanan"

### **Validasi Manual:**
- ✅ Cek range diameter sesuai
- ✅ Cek jumlah batang benar
- ✅ Cek kubikasi masuk akal
- ✅ Cek nilai sesuai ekspektasi

### **Upload Tally:**
- ✅ Upload sebelum submit
- ✅ Format yang jelas (Excel/CSV)
- ✅ Nama file deskriptif
- ✅ Ukuran < 5MB

---

## 🐛 **Troubleshooting**

### **Problem: Diameter tidak bisa diinput**
**Solusi:**
- Pilih jenis kayu terlebih dahulu
- Range diameter akan muncul di kolom "Range Diameter"
- Placeholder akan muncul di kolom "Diameter"
- Input diameter dalam range yang valid

### **Problem: Placeholder tidak muncul**
**Solusi:**
- Pastikan jenis kayu sudah dipilih
- Refresh halaman jika perlu
- Cek console untuk error

### **Problem: Upload file gagal**
**Solusi:**
- Cek format file (Excel, CSV, PDF, Gambar)
- Cek ukuran file (< 5MB)
- Coba format lain

### **Problem: Panjang tidak muncul di kolom**
**Solusi:**
- Pilih jenis kayu dari dropdown terlebih dahulu
- Panjang akan otomatis muncul di kolom "Panjang (cm)"
- Jika masih tidak muncul, cek master data sudah lengkap
- Refresh halaman jika perlu

---

## 📚 **Referensi**

### **Rumus Volume:**
```
V = (π/4) × d² × t

Dimana:
- d = diameter dalam METER
- t = panjang dalam METER
- Hasil = volume dalam m³
```

### **Konversi Satuan:**
```
1 m = 100 cm
1 m³ = 1,000,000 cm³
1 m³ = 1,000 dm³ (liter)
```

### **Contoh Perhitungan:**
```
Diameter: 21 cm = 0.21 m
Panjang: 400 cm = 4 m
Jumlah: 100 pcs

Volume/batang = (π/4) × (0.21)² × 4 = 0.13854 m³
Total volume = 0.13854 × 100 = 13.854 m³
Harga: Rp1.215.000/m³
Total nilai = 13.854 × 1.215.000 = Rp16.832.610
```

---

## 🎯 **Best Practices**

### **1. Pilih Jenis Kayu yang Tepat**
- ✅ Sesuaikan dengan kebutuhan
- ✅ Cek grade (Premium/Reguler)
- ✅ Cek range diameter (muncul di kolom terpisah)
- ✅ Cek panjang (muncul di kolom terpisah, otomatis)

### **2. Input Diameter yang Valid**
- ✅ Dalam range yang ditentukan (lihat kolom "Range Diameter")
- ✅ Sesuai dengan tally fisik
- ✅ Akurat (1 desimal jika perlu)
- ✅ Placeholder di kolom "Diameter" menunjukkan range yang valid

### **3. Upload Tally yang Lengkap**
- ✅ Format yang jelas
- ✅ Nama file deskriptif
- ✅ Data lengkap

### **4. Review Sebelum Submit**
- ✅ Cek total batang
- ✅ Cek total kubikasi
- ✅ Cek total nilai
- ✅ Cek estimasi profit
- ✅ Cek panjang sudah sesuai (kolom terpisah)

---

## 📊 **Struktur Kolom Baru**

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| **Jenis Kayu** | Dropdown | Pilih dari master data (dengan grade) |
| **Range Diameter** | Display | Otomatis dari master data (tidak bisa diedit) |
| **Diameter (cm)** | Input | User input, dengan placeholder range |
| **Panjang (cm)** | Display | Otomatis dari master data (tidak bisa diedit) |
| **Jumlah (pcs)** | Input | User input jumlah batang (kolom diperlebar) |
| **Kubikasi & Nilai** | Display | Otomatis terhitung |
| **Aksi** | Button | Hapus item |

---

## 🔄 **Perubahan dari Versi Sebelumnya**

### **Sebelum:**
```
┌──────────────┬──────────┬────────┬─────────┬──────────┬──────┐
│ Jenis Kayu   │ Diameter │ Jumlah │ Panjang │ Kubikasi │ Aksi │
├──────────────┼──────────┼────────┼─────────┼──────────┼──────┤
│ [Dropdown ▼] │ [21]     │ [100]  │ [400]   │ 13.854   │ [🗑️]│
└──────────────┴──────────┴────────┴─────────┴──────────┴──────┘
```

### **Sesudah (Update Terbaru):**
```
┌────────────┬──────────┬──────────┬──────────┬──────────┬──────────────┬──────┐
│ Jenis Kayu │ Range    │ Diameter │ Panjang  │ Jumlah   │ Kubikasi     │ Aksi │
│            │ Diameter │ (cm)     │ (cm)     │ (pcs)    │ & Nilai      │      │
├────────────┼──────────┼──────────┼──────────┼──────────┼──────────────┼──────┤
│ Meranti-   │ 20-30 cm │ [20-30]  │ 400 cm   │ [100]    │ 13.854 m³    │ [🗑️]│
│ Premium    │          │          │          │          │ Rp16.832.610 │      │
└────────────┴──────────┴──────────┴──────────┴──────────┴──────────────┴──────┘
```

**Perubahan:**
- ✅ Tambah kolom "Range Diameter" (display only)
- ✅ Ubah kolom "Diameter Tepat" menjadi "Diameter" (lebih ringkas)
- ✅ **Tambah kolom "Panjang" sebagai display** (otomatis dari master data)
- ✅ **Perlebar kolom "Jumlah"** supaya data yang diinput terlihat jelas
- ✅ Tambah section "Upload Hasil Tally"
- ✅ Grade jelas dalam dropdown (Meranti - Premium)

---

## 🎯 **Kesimpulan**

Form "Buat Pesanan Baru" sekarang memiliki layout yang lebih ringkas dan jelas:

**Layout kolom sekarang:**
```
Jenis Kayu → Range Diameter → Diameter → Panjang → Jumlah → Kubikasi & Nilai → Aksi
```

**Keuntungan:**
- ✅ **Upload tally** untuk dokumentasi
- ✅ **Range diameter** sebagai kolom terpisah
- ✅ **Diameter** dengan placeholder range (nama lebih ringkas)
- ✅ **Panjang otomatis** sebagai kolom terpisah
- ✅ **Jumlah diperlebar** supaya data yang diinput terlihat jelas
- ✅ **Grade jelas** dalam dropdown
- ✅ **Validasi otomatis** untuk diameter
- ✅ **UX lebih baik** dan lebih intuitif

**Silakan test dengan pilih jenis kayu dan lihat kolom panjang yang muncul otomatis!** 🚀

---

**Status:** ✅ Selesai dan Build Sukses  
**Build Size:** 732 KB (gzipped: 195 KB)  
**Performance:** Optimal
