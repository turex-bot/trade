# 📋 Panduan Input Pesanan - Flow Terbaru

## 🎯 **Perubahan Utama**

Form input pesanan telah disederhanakan menjadi **layout tabel horizontal** yang compact dan intuitif:

### **Flow Input:**
```
1. Pilih jenis kayu dari dropdown (dari master data)
2. Input diameter (cm) - auto-fill dari master data
3. Input jumlah batang (pcs)
4. Input panjang (cm) - auto-fill dari master data
5. Harga otomatis muncul dari master data
6. Kubikasi & nilai otomatis terhitung
```

---

## 🎨 **Layout Baru - Tabel Horizontal**

### **Tampilan Form:**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Header: Perusahaan | Supplier | Tanggal                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ Item Kayu (3)                                                    [+ Tambah] │
├─────────────────────────────────────────────────────────────────────────────┤
│ Jenis Kayu    │ Diameter │ Jumlah │ Panjang │ Kubikasi      │ Aksi         │
├─────────────────────────────────────────────────────────────────────────────┤
│ [Dropdown ▼]  │ [21] cm  │ [100]  │ [130]   │ 0.472 m³      │ [🗑️]        │
│ Meranti 20-30 │          │ pcs    │ cm      │ Rp121.500     │              │
├─────────────────────────────────────────────────────────────────────────────┤
│ [Dropdown ▼]  │ [25] cm  │ [50]   │ [400]   │ 1.963 m³      │ [🗑️]        │
│ Keruing 20-30 │          │ pcs    │ cm      │ Rp48.250      │              │
├─────────────────────────────────────────────────────────────────────────────┤
│ [Dropdown ▼]  │ [30] cm  │ [25]   │ [400]   │ 0.707 m³      │ [🗑️]        │
│ Alba 19-24    │          │ pcs    │ cm      │ Rp57.375      │              │
├─────────────────────────────────────────────────────────────────────────────┤
│ Total Batang: 175 pcs | Total Kubikasi: 3.142 m³ | Total: Rp227.125       │
│ Estimasi Profit: Rp4.275                                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 **Flow Input Step-by-Step**

### **Step 1: Header Info (1 Baris)**
```
┌─────────────────┬─────────────────┬─────────────────┐
│ Perusahaan      │ Supplier        │ Tanggal         │
│ [Pilih ▼]       │ [Pilih ▼]       │ [2025-01-20]    │
└─────────────────┴─────────────────┴─────────────────┘
```

### **Step 2: Tambah Item**
Klik tombol **"+ Tambah Item"** untuk menambah baris item kayu.

### **Step 3: Pilih Jenis Kayu (Dropdown)**
```
┌─────────────────────────────────┐
│ Pilih Jenis                     │
│ ├─ Meranti 20-30cm Premium      │
│ ├─ Meranti 30-40cm Premium      │
│ ├─ Keruing 20-30cm Reguler      │
│ ├─ Akasia 15-25cm Reguler       │
│ └─ Alba 19-24cm Reguler         │
└─────────────────────────────────┘
```

**Auto-fill setelah pilih:**
- ✅ Diameter otomatis terisi (avgDiameter dari master data)
- ✅ Panjang otomatis terisi (standardLength dari master data)
- ✅ Harga otomatis terdeteksi dari master data

### **Step 4: Input Diameter & Jumlah**
```
┌──────────┬──────────┐
│ 21 cm    │ 100 pcs  │
└──────────┴──────────┘
```

- **Diameter**: Input diameter aktual (bisa diubah dari auto-fill)
- **Jumlah (pcs)**: Input jumlah batang

### **Step 5: Input Panjang**
```
┌──────────┐
│ 130 cm   │
└──────────┘
```

- **Panjang**: Input panjang dalam cm (bisa diubah dari auto-fill)

### **Step 6: Lihat Kalkulasi Otomatis**
```
┌─────────────────┐
│ 0.472 m³        │
│ Rp121.500       │
└─────────────────┘
```

**Kalkulasi otomatis:**
```
Volume per batang = (π/4) × (0.21)² × 1.3 = 0.00472 m³
Total volume = 0.00472 × 100 = 0.472 m³
Total nilai = 0.472 × Rp1.215.000 = Rp121.500
```

---

## 📊 **Contoh Penggunaan Lengkap**

### **Kasus: 3 Item Kayu Berbeda**

**Item 1: Meranti 20-30cm Premium**
```
Jenis: Meranti 20-30cm Premium (dari dropdown)
Diameter: 21 cm
Jumlah: 100 pcs
Panjang: 130 cm

Kalkulasi:
- Volume/batang: (π/4) × (0.21)² × 1.3 = 0.00472 m³
- Total volume: 0.00472 × 100 = 0.472 m³
- Harga jual: Rp1.215.000/m³
- Total nilai: 0.472 × 1.215.000 = Rp573.480
```

**Item 2: Keruing 20-30cm Reguler**
```
Jenis: Keruing 20-30cm Reguler (dari dropdown)
Diameter: 25 cm
Jumlah: 50 pcs
Panjang: 400 cm

Kalkulasi:
- Volume/batang: (π/4) × (0.25)² × 4 = 0.19635 m³
- Total volume: 0.19635 × 50 = 9.817 m³
- Harga jual: Rp965.000/m³
- Total nilai: 9.817 × 965.000 = Rp9.473.405
```

**Item 3: Alba 19-24cm Reguler**
```
Jenis: Alba 19-24cm Reguler (dari dropdown)
Diameter: 21.5 cm
Jumlah: 21 pcs
Panjang: 130 cm

Kalkulasi:
- Volume/batang: (π/4) × (0.215)² × 1.3 = 0.04719 m³
- Total volume: 0.04719 × 21 = 0.991 m³
- Harga jual: Rp815.000/m³
- Total nilai: 0.991 × 815.000 = Rp807.665
```

**Total Keseluruhan:**
```
Total Batang: 171 pcs
Total Kubikasi: 11.280 m³
Total Nilai Jual: Rp10.854.550
Total Nilai Beli: Rp10.627.550
Estimasi Profit: Rp227.000
```

---

## 🎨 **Keuntungan Layout Baru**

### **1. Lebih Compact**
- ✅ 1 baris = 1 item
- ✅ Bisa lihat banyak item sekaligus
- ✅ Tidak perlu scroll vertikal
- ✅ Hemat ruang layar

### **2. Lebih Cepat**
- ✅ Dropdown jenis kayu (tidak perlu ketik)
- ✅ Auto-fill diameter & panjang
- ✅ Harga otomatis dari master data
- ✅ Kalkulasi real-time

### **3. Lebih Jelas**
- ✅ Header kolom jelas
- ✅ Data sejajar horizontal
- ✅ Mudah dibandingkan antar item
- ✅ Total langsung terlihat

### **4. Lebih Akurat**
- ✅ Data dari master data (tidak ada typo)
- ✅ Kalkulasi otomatis (tidak ada salah hitung)
- ✅ Harga sesuai master data (tidak ada salah input)

---

## 🔧 **Fitur Utama**

### **1. Dropdown Jenis Kayu**
```typescript
<select value={item.woodSpecId} onChange={...}>
  <option value="">Pilih Jenis</option>
  {woodSpecs.map(spec => (
    <option key={spec.id} value={spec.id}>
      {spec.woodType} {spec.diameterRange} {spec.grade}
    </option>
  ))}
</select>
```

**Keuntungan:**
- ✅ Data dari master data (konsisten)
- ✅ Tidak ada typo
- ✅ Auto-fill diameter & panjang

### **2. Auto-Fill Diameter & Panjang**
```typescript
if (field === 'woodSpecId' && value) {
  const spec = woodSpecs.find(s => s.id === value);
  if (spec) {
    newItems[index].lengthCm = spec.standardLength;
    newItems[index].diameter = spec.avgDiameter;
  }
}
```

**Keuntungan:**
- ✅ Hemat waktu input
- ✅ Data konsisten dengan master
- ✅ Bisa diubah jika perlu

### **3. Harga Otomatis**
```typescript
const price = prices.find(p => p.woodSpecId === item.woodSpecId && p.isActive);
const totalValue = price ? totalVolume * price.sellPrice : 0;
```

**Keuntungan:**
- ✅ Harga dari master data (konsisten)
- ✅ Tidak perlu pilih harga manual
- ✅ Auto-update saat ganti jenis kayu

### **4. Kalkulasi Real-Time**
```typescript
const volumePerLog = calculateLogVolumeM3(item.diameter, item.lengthCm);
const totalVolume = volumePerLog * item.numberOfLogs;
const totalValue = totalVolume * price.sellPrice;
```

**Keuntungan:**
- ✅ Instant feedback
- ✅ Tidak perlu klik "hitung"
- ✅ Akurat berdasarkan rumus

---

## 📝 **Tips Penggunaan**

### **Input Cepat:**
1. Klik **"+ Tambah Item"**
2. Pilih jenis kayu dari dropdown
3. Tab ke kolom diameter → ubah jika perlu
4. Tab ke kolom jumlah → input pcs
5. Tab ke kolom panjang → ubah jika perlu
6. Ulangi untuk item berikutnya

### **Edit Item:**
- Klik dropdown untuk ganti jenis kayu
- Edit diameter/jumlah/panjang langsung
- Kalkulasi otomatis update

### **Hapus Item:**
- Klik icon 🗑️ di kolom Aksi
- Item langsung dihapus
- Total otomatis update

### **Review Sebelum Submit:**
- Cek total batang
- Cek total kubikasi
- Cek total nilai
- Cek estimasi profit

---

## 🐛 **Troubleshooting**

### **Problem: Dropdown kosong**
**Solusi:**
- Pastikan sudah tambah spesifikasi kayu di Master Data
- Cek status spesifikasi (harus aktif)

### **Problem: Harga tidak muncul**
**Solusi:**
- Pastikan sudah tambah harga di Master Data
- Cek status harga (harus aktif)
- Cek woodSpecId sesuai

### **Problem: Kubikasi salah**
**Solusi:**
- Cek diameter dalam cm (bukan meter)
- Cek panjang dalam cm (bukan meter)
- Rumus: V = (π/4) × d² × t

### **Problem: Total tidak update**
**Solusi:**
- Input minimal 1 diameter
- Input minimal 1 jumlah
- Pilih jenis kayu dari dropdown

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
Jumlah: 100 pcs

Volume/batang = (π/4) × (0.21)² × 1.3 = 0.00472 m³
Total volume = 0.00472 × 100 = 0.472 m³
Harga: Rp1.215.000/m³
Total nilai = 0.472 × 1.215.000 = Rp573.480
```

---

## 🎯 **Best Practices**

### **1. Gunakan Master Data**
- ✅ Tambah spesifikasi kayu di Master Data
- ✅ Tambah harga di Master Data
- ✅ Gunakan dropdown untuk konsistensi

### **2. Input Diameter Aktual**
- ✅ Input diameter dari surat jalan
- ✅ Bisa ubah dari auto-fill jika perlu
- ✅ Pastikan dalam cm

### **3. Review Sebelum Submit**
- ✅ Cek total batang
- ✅ Cek total kubikasi
- ✅ Cek total nilai
- ✅ Cek estimasi profit

### **4. Simpan Draft**
- ✅ Status "draft" untuk review
- ✅ Bisa edit nanti
- ✅ Bisa hapus jika salah

---

**Status:** ✅ Selesai dan Build Sukses  
**Build Size:** 730 KB (gzipped: 195 KB)  
**Performance:** Optimal
