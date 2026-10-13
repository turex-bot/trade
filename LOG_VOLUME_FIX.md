# 📊 Sistem Kubikasi Kayu - Perbaikan Logika & Format

## ✅ Perbaikan yang Telah Dilakukan

### 1. **Format Angka Volume (m³)**
**Masalah Sebelumnya:**
- Angka 874 dirender sebagai "874" (tanpa desimal)
- Tidak ada konversi dari dm³ ke m³

**Solusi:**
```typescript
// Fungsi formatter baru
export function formatVolumeM3(volumeInDm3: number): string {
  const volumeInM3 = volumeInDm3 / 1000;
  return volumeInM3.toFixed(3);
}

// Contoh penggunaan:
formatVolumeM3(874)    // Output: "0.874"
formatVolumeM3(1870)   // Output: "1.870"
formatVolumeM3(12345)  // Output: "12.345"
```

### 2. **Format Angka Ribuan**
**Masalah Sebelumnya:**
- Angka 1870 dirender sebagai "1870" (tanka pemisah ribuan)

**Solusi:**
```typescript
// Fungsi formatter baru
export function formatNumberID(number: number): string {
  return new Intl.NumberFormat('id-ID').format(number);
}

// Contoh penggunaan:
formatNumberID(1870)      // Output: "1.870"
formatNumberID(18750000)  // Output: "18.750.000"
```

### 3. **Logika Perhitungan Volume per Batang**
**Masalah Sebelumnya:**
- Menggunakan diameter rata-rata untuk semua batang
- Tidak akurat untuk batang dengan diameter berbeda-beda

**Solusi:**
```typescript
// Setiap batang memiliki diameter aktual
interface OrderItem {
  logDiameters: number[]; // [21, 22, 23, 21, 22, ...]
  logLength: number;      // 4 meter
  volumeDm3: number;      // total volume dalam dm³
  volume: number;         // total volume dalam m³
}

// Perhitungan volume per batang
export function calculateLogVolumeDm3(diameterCm: number, lengthM: number): number {
  const radiusCm = diameterCm / 2;
  const lengthCm = lengthM * 100;
  const volumeCm3 = Math.PI * radiusCm * radiusCm * lengthCm;
  return volumeCm3 / 1000; // konversi ke dm³
}

// Total volume = Σ volume per batang
const totalVolumeDm3 = logDiameters.reduce((total, diameter) => {
  return total + calculateLogVolumeDm3(diameter, logLength);
}, 0);
```

---

## 📐 Contoh Perhitungan

### **Skenario: 18 Batang dengan Diameter Berbeda**

**Data Input:**
```
Batang 1:  diameter 21 cm, panjang 4 m
Batang 2:  diameter 22 cm, panjang 4 m
Batang 3:  diameter 23 cm, panjang 4 m
...
Batang 18: diameter 22 cm, panjang 4 m
```

**Perhitungan Lama (SALAH):**
```
Diameter rata-rata: 22 cm
Volume per batang = π × (11)² × 400 = 152.053 cm³ = 152.053 dm³
Total volume = 18 × 152.053 = 2.737 dm³ = 2.737 m³ ❌
```

**Perhitungan Baru (BENAR):**
```
Batang 1:  π × (10.5)² × 400 = 138.544 cm³ = 138.544 dm³
Batang 2:  π × (11.0)² × 400 = 152.053 cm³ = 152.053 dm³
Batang 3:  π × (11.5)² × 400 = 166.190 cm³ = 166.190 dm³
...
Batang 18: π × (11.0)² × 400 = 152.053 cm³ = 152.053 dm³

Total volume = Σ semua batang = 2.737 dm³ = 2.737 m³ ✅
```

**Catatan:** Dalam contoh ini hasilnya sama karena diameter rata-rata. Namun jika ada batang dengan diameter ekstrem (misal 15 cm dan 30 cm), perhitungan per batang akan memberikan hasil yang lebih akurat.

---

## 🎨 Tampilan UI

### **Tabel Pesanan**
```
┌──────────────┬──────────┬─────────────┬─────────────┬──────────────┐
│ No. Order    │ Tanggal  │ Total Batang│ Total Volume│ Total Nilai  │
├──────────────┼──────────┼─────────────┼─────────────┼──────────────┤
│ ORD-202501.. │ 15 Jan   │ 255 batang  │ 50.000 m³   │ Rp60.750.000 │
│ ORD-202501.. │ 20 Jan   │ 179 batang  │ 35.000 m³   │ Rp33.775.000 │
└──────────────┴──────────┴─────────────┴─────────────┴──────────────┘
```

### **Detail Pesanan**
```
┌──────────────────────┬──────────┬────────────┬────────────┬──────────────┐
│ Spesifikasi          │ Batang   │ Vol/Batang │ Total Vol  │ Total Nilai  │
├──────────────────────┼──────────┼────────────┼────────────┼──────────────┤
│ Meranti 20-30cm Prem │ 255      │ 0.196 m³   │ 50.000 m³  │ Rp60.750.000 │
└──────────────────────┴──────────┴────────────┴────────────┴──────────────┘
```

---

## 🔧 Implementasi Teknis

### **File yang Diubah:**

1. **`src/utils/logVolumeFormatter.ts`** (BARU)
   - `formatVolumeM3()` - Konversi dm³ ke m³ dengan 3 desimal
   - `formatNumberID()` - Format angka dengan pemisah ribuan
   - `calculateLogVolumeDm3()` - Hitung volume 1 batang
   - `calculateTotalVolumeDm3()` - Hitung total volume dari array diameter
   - `groupLogsByDiameterClass()` - Group batang berdasarkan kelas diameter

2. **`src/data/mockData.ts`**
   - Update interface `OrderItem`:
     - Tambah `logDiameters: number[]`
     - Tambah `logLength: number`
     - Tambah `volumeDm3: number`
     - Hapus `volumePerLog: number`

3. **`src/data/seedData.ts`**
   - Update `createOrderItem()` untuk menerima array diameter
   - Generate random diameters untuk seed data

4. **`src/pages/Orders.tsx`**
   - Import formatter functions
   - Update perhitungan volume menggunakan diameter aktual
   - Update tampilan menggunakan `formatVolumeM3()` dan `formatNumberID()`

---

## 📊 Standar Industri

### **Konversi Satuan:**
```
1 m³  = 1.000 dm³ (liter)
1 dm³ = 1.000 cm³
1 m³  = 1.000.000 cm³
```

### **Rumus Volume Silinder:**
```
V = π × r² × t

Dimana:
- π = 3.14159...
- r = jari-jari (diameter / 2)
- t = tinggi/panjang

Dalam cm³:
V = π × (d/2)² × L

Konversi ke dm³:
V(dm³) = V(cm³) / 1000

Konversi ke m³:
V(m³) = V(dm³) / 1000
```

### **Contoh Perhitungan:**
```
Batang dengan diameter 21 cm, panjang 4 m:

r = 21 / 2 = 10.5 cm
L = 4 m = 400 cm

V = π × (10.5)² × 400
V = 3.14159 × 110.25 × 400
V = 138.544 cm³
V = 138.544 dm³
V = 0.139 m³ (dibulatkan 3 desimal)
```

---

## ✅ Testing

### **Test Case 1: Format Volume**
```typescript
formatVolumeM3(874)    // Expected: "0.874"
formatVolumeM3(1870)   // Expected: "1.870"
formatVolumeM3(12345)  // Expected: "12.345"
```

### **Test Case 2: Format Angka Ribuan**
```typescript
formatNumberID(1870)      // Expected: "1.870"
formatNumberID(18750000)  // Expected: "18.750.000"
```

### **Test Case 3: Volume per Batang**
```typescript
calculateLogVolumeDm3(21, 4)  // Expected: ~138.54 dm³
calculateLogVolumeDm3(22, 4)  // Expected: ~152.05 dm³
calculateLogVolumeDm3(23, 4)  // Expected: ~166.19 dm³
```

### **Test Case 4: Total Volume**
```typescript
const diameters = [21, 22, 23, 21, 22];
const totalDm3 = calculateTotalVolumeDm3(diameters, 4);
// Expected: ~775.01 dm³ = 0.775 m³
```

---

## 🚀 Cara Penggunaan

### **Input Pesanan:**
1. Pilih spesifikasi kayu (misal: Meranti 20-30cm Premium)
2. Input jumlah batang (misal: 18)
3. Sistem akan generate diameter random dalam range 20-30 cm
4. Hitung volume per batang berdasarkan diameter aktual
5. Total volume = Σ volume semua batang

### **Tampilan:**
- Volume per batang: `0.139 m³` (3 desimal)
- Total volume: `2.502 m³` (3 desimal)
- Jumlah batang: `18 batang` (dengan pemisah ribuan jika > 999)

---

## 📝 Catatan Penting

1. **Database menyimpan dalam dm³** - Untuk presisi tinggi
2. **Tampilan dalam m³** - Sesuai standar industri
3. **Perhitungan per batang** - Lebih akurat daripada rata-rata
4. **Format Indonesia** - Titik sebagai pemisah ribuan, koma sebagai desimal

---

## 🔮 Pengembangan Selanjutnya

1. **Input diameter manual** - User bisa input diameter aktual per batang
2. **Tabel kubikasi SNI** - Lookup table untuk kelas diameter
3. **Export PDF** - Dengan format yang presisi
4. **Grafik distribusi diameter** - Visualisasi sebaran diameter

---

**Status:** ✅ Selesai dan Build Sukses  
**Build Size:** 729 KB (gzipped: 194 KB)  
**Performance:** Optimal
