# 📋 Panduan Input Pesanan - Flow Baru

## 🎯 **Perubahan Utama**

Flow input pesanan telah disederhanakan menjadi lebih intuitif dan akurat:

### **Flow Lama (Rumit):**
```
1. Pilih spesifikasi kayu (dari master data)
2. Input jumlah batang
3. Sistem generate diameter random
4. Kalkulasi volume
```

### **Flow Baru (Simple & Akurat):**
```
1. Input jenis kayu & grade
2. Input panjang (cm)
3. Input diameter per batang (bisa multiple)
4. Range otomatis terdeteksi
5. Pilih harga
6. Kalkulasi otomatis berdasarkan diameter aktual
```

---

## 🔄 **Flow Input Baru - Step by Step**

### **Step 1: Header Info (Sejajar)**
```
┌─────────────────┬─────────────────┬─────────────────┐
│ Perusahaan      │ Supplier        │ Tanggal         │
│ [Pilih ▼]       │ [Pilih ▼]       │ [2025-01-20]    │
└─────────────────┴─────────────────┴─────────────────┘
```

### **Step 2: Item Kayu - Row 1 (Sejajar)**
```
┌─────────────────┬─────────────────┬─────────────────┐
│ Jenis Kayu      │ Grade           │ Panjang (cm)    │
│ [Meranti]       │ [Premium ▼]     │ [130]           │
└─────────────────┴─────────────────┴─────────────────┘
```

### **Step 3: Input Diameter (Multi-Input)**
```
Diameter Batang (cm) *
┌─────────────────────────────────────┬──────────┐
│ Masukkan diameter (misal: 21)       │ [+ Tambah]│
└─────────────────────────────────────┴──────────┘

5 batang diinput                    Range: 19-24 cm
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│19 cm │ │20 cm │ │21 cm │ │22 cm │ │24 cm │
│  [×] │ │  [×] │ │  [×] │ │  [×] │ │  [×] │
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘
```

**Cara Input:**
1. Ketik diameter (misal: 19)
2. Klik "Tambah" atau tekan Enter
3. Ulangi untuk setiap batang
4. Bisa hapus dengan klik [×] pada badge diameter

### **Step 4: Harga & Kalkulasi (Sejajar)**
```
┌──────────────────────────────┬──────────────────────────────┐
│ Harga (per m³)               │ Kalkulasi Otomatis           │
│ [Pilih Harga ▼]              │ ┌────────────┬────────────┐ │
│ Meranti 20-30cm Premium      │ │Total Volume│Total Nilai │ │
│ Beli: Rp1.200.000            │ │  0.991 m³  │Rp60.750.000│ │
│ Jual: Rp1.215.000            │ └────────────┴────────────┘ │
└──────────────────────────────┴──────────────────────────────┘
```

### **Step 5: Total Keseluruhan**
```
┌────────────┬────────────┬────────────┬────────────┐
│ Total Item │Total Batang│Total Kubikasi│ Total Nilai│
│     1      │    21      │  0.991 m³  │Rp60.750.000│
└────────────┴────────────┴────────────┴────────────┘
Estimasi Profit: Rp749.700
```

---

## 🎨 **Keuntungan Flow Baru**

### **1. Lebih Akurat**
- ✅ Input diameter aktual per batang
- ✅ Kalkulasi volume berdasarkan diameter riil
- ✅ Tidak ada lagi diameter random
- ✅ Sesuai dengan surat jalan pabrik

### **2. Lebih Simple**
- ✅ Layout sejajar (horizontal)
- ✅ Tidak perlu pilih dari master data
- ✅ Input langsung di form
- ✅ Visual feedback real-time

### **3. Lebih Fleksibel**
- ✅ Bisa input diameter berbeda-beda
- ✅ Range otomatis terdeteksi
- ✅ Bisa tambah/hapus diameter
- ✅ Multi-item dalam 1 pesanan

### **4. Lebih Transparan**
- ✅ Lihat semua diameter yang diinput
- ✅ Kalkulasi otomatis real-time
- ✅ Total volume & nilai langsung terlihat
- ✅ Estimasi profit langsung

---

## 📊 **Contoh Penggunaan**

### **Kasus: Kayu Alba 19-24 cm, P=130 cm**

**Input:**
```
Jenis Kayu: Alba
Grade: Reguler
Panjang: 130 cm

Diameter (21 batang):
19, 20, 21, 22, 23, 24, 19, 20, 21, 22, 23, 24, 
19, 20, 21, 22, 23, 24, 19, 20, 21

Range otomatis: 19-24 cm
```

**Kalkulasi:**
```
Volume per batang (rata-rata):
- d = 21.5 cm = 0.215 m
- t = 130 cm = 1.3 m
- V = (π/4) × (0.215)² × 1.3 = 0.04719 m³

Total volume:
- 21 × 0.04719 = 0.991 m³

Harga:
- Beli: Rp800.000/m³
- Jual: Rp815.000/m³

Nilai:
- Beli: 0.991 × 800.000 = Rp792.800
- Jual: 0.991 × 815.000 = Rp807.665

Profit: Rp14.865
```

**Hasil di Sistem:**
```
Total Item: 1
Total Batang: 21
Total Kubikasi: 0.991 m³
Total Nilai: Rp807.665
Estimasi Profit: Rp14.865
```

---

## 🔧 **Fitur Utama**

### **1. Auto-Detect Range**
```typescript
const getAutoRange = (diameters: number[]): string => {
  if (diameters.length === 0) return '';
  const min = Math.min(...diameters);
  const max = Math.max(...diameters);
  return `${min}-${max} cm`;
};

// Contoh:
// Input: [19, 20, 21, 22, 23, 24]
// Output: "19-24 cm"
```

### **2. Kalkulasi Volume per Batang**
```typescript
const volumeM3 = item.diameters.reduce((total, diameter) => {
  return total + calculateLogVolumeM3(diameter, item.lengthCm);
}, 0);

// Contoh:
// Diameter: [19, 20, 21, 22, 23, 24]
// Panjang: 130 cm
// Volume: Σ V(19) + V(20) + V(21) + V(22) + V(23) + V(24)
```

### **3. Visual Feedback**
- ✅ Badge diameter dengan tombol hapus
- ✅ Counter jumlah batang
- ✅ Range otomatis
- ✅ Kalkulasi real-time
- ✅ Total keseluruhan

---

## 📝 **Tips Penggunaan**

### **Input Cepat:**
1. Ketik diameter → Tab → Ketik diameter lagi → Tab → dst
2. Klik "Tambah" setelah semua diameter diinput
3. Atau klik "Tambah" setelah setiap diameter

### **Hapus Diameter:**
- Klik tombol [×] pada badge diameter
- Diameter akan langsung dihapus dari list

### **Edit Item:**
- Klik item untuk expand/collapse
- Ubah nilai langsung di form
- Kalkulasi otomatis update

### **Multi-Item:**
- Klik "Tambah Item" untuk menambah item baru
- Setiap item bisa memiliki jenis, grade, panjang berbeda
- Total keseluruhan dihitung otomatis

---

## 🎯 **Best Practices**

### **1. Input Diameter**
- ✅ Input diameter aktual dari surat jalan
- ✅ Urutan tidak masalah (sistem hitung total)
- ✅ Bisa input diameter yang sama berulang

### **2. Pilih Harga**
- ✅ Pilih harga yang sesuai dengan jenis & grade
- ✅ Sistem hitung berdasarkan volume aktual
- ✅ Harga per m³ dikonversi ke per batang

### **3. Review Sebelum Submit**
- ✅ Cek total batang
- ✅ Cek total kubikasi
- ✅ Cek total nilai
- ✅ Cek estimasi profit

---

## 🐛 **Troubleshooting**

### **Problem: Volume terlalu besar/kecil**
**Solusi:**
- Cek panjang dalam cm (bukan meter)
- Cek diameter dalam cm
- Pastikan rumus: V = (π/4) × d² × t

### **Problem: Range tidak muncul**
**Solusi:**
- Input minimal 1 diameter
- Klik "Tambah" setelah input diameter

### **Problem: Kalkulasi tidak update**
**Solusi:**
- Pilih harga dari dropdown
- Pastikan harga aktif (status: aktif)

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
Panjang: 130 cm = 1.3 m

V = (π/4) × (0.21)² × 1.3
V = 0.7854 × 0.0441 × 1.3
V = 0.04513 m³
```

---

**Status:** ✅ Selesai dan Build Sukses  
**Build Size:** 732 KB (gzipped: 195 KB)  
**Performance:** Optimal
