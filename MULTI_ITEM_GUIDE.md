# 📋 Panduan Multi-Item Order & Kubikasi

## ✅ Fitur Multi-Item Order

### 🎯 **Apa yang Baru?**

Sekarang Anda bisa input **beberapa jenis kayu** dalam **1 pesanan** sekaligus!

**Contoh:**
```
Pesanan ORD-202501-0001:
├─ Item 1: Meranti 20-30cm Premium → 100 batang
├─ Item 2: Keruing 20-30cm Reguler → 50 batang
└─ Item 3: Akasia 15-25cm Reguler → 75 batang

Total: 225 batang, 3 item kayu
```

### 📝 **Cara Menggunakan:**

1. **Buka halaman Pesanan** → Klik "Buat Pesanan"
2. **Pilih Perusahaan & Supplier**
3. **Klik "Tambah Item"** untuk menambah item kayu
4. **Untuk setiap item:**
   - Pilih spesifikasi kayu
   - Input jumlah batang
   - Sistem auto-kalkulasi volume & harga
5. **Lihat Total Keseluruhan:**
   - Total item
   - Total batang
   - Total kubikasi (m³)
   - Total nilai jual
   - Estimasi profit
6. **Klik "Buat Pesanan"** → Semua item tersimpan dalam 1 order

### 🎨 **Tampilan:**

```
┌─────────────────────────────────────────────┐
│ Item Kayu (3)                    [+ Tambah] │
├─────────────────────────────────────────────┤
│ Item #1                              [🗑️]   │
│ ┌─────────────────┬─────────────────┐       │
│ │ Spesifikasi     │ Jumlah Batang   │       │
│ │ [Meranti 20-30] │ [100] batang    │       │
│ └─────────────────┴─────────────────┘       │
│ Volume: 19.60 m³ | Nilai: Rp4.684.000      │
├─────────────────────────────────────────────┤
│ Item #2                              [🗑️]   │
│ ┌─────────────────┬─────────────────┐       │
│ │ Spesifikasi     │ Jumlah Batang   │       │
│ │ [Keruing 20-30] │ [50] batang     │       │
│ └─────────────────┴─────────────────┘       │
│ Volume: 9.80 m³ | Nilai: Rp945.000         │
├─────────────────────────────────────────────┤
│ Item #3                              [🗑️]   │
│ ┌─────────────────┬─────────────────┐       │
│ │ Spesifikasi     │ Jumlah Batang   │       │
│ │ [Akasia 15-25]  │ [75] batang     │       │
│ └─────────────────┴─────────────────┘       │
│ Volume: 9.45 m³ | Nilai: Rp770.250         │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Total Keseluruhan                           │
├─────────────────────────────────────────────┤
│ Total Item: 3    │ Total Batang: 225       │
│ Total Kubikasi: 38.85 m³                   │
│ Total Nilai: Rp6.399.250                   │
│ Estimasi Profit: Rp573.750                 │
└─────────────────────────────────────────────┘
```

---

## 🧮 **Tentang Perhitungan Kubikasi**

### ⚠️ **PENTING: Klarifikasi Rumus Kubikasi**

Sistem menggunakan **rumus matematis standar** untuk menghitung volume kayu:

```
Volume Silinder = π × r² × L

Dimana:
- π = 3.14159...
- r = jari-jari (diameter / 2)
- L = panjang batang
```

### 📊 **Contoh Perhitungan:**

**Spesifikasi:**
- Diameter: 19-24 cm → Rata-rata: **21.5 cm = 0.215 m**
- Panjang standar: **4 meter**
- Jumlah batang: **18 batang**

**Perhitungan:**
```
Jari-jari (r) = 21.5 cm / 2 = 10.75 cm = 0.1075 m

Volume per batang = π × r² × L
                  = 3.14159 × (0.1075)² × 4
                  = 3.14159 × 0.01156 × 4
                  = 0.1453 m³ per batang

Total volume = 18 × 0.1453
             = 2.615 m³
```

### ❓ **Mengapa Berbeda dengan Tally Fisik?**

Jika di tally fisik Anda menunjukkan **874 m³** untuk 18 batang dengan diameter 19-24cm, ada beberapa kemungkinan:

#### **1. Satuan yang Berbeda**
Mungkin tally fisik menggunakan satuan **cm³** atau **liter**, bukan m³?

```
2.615 m³ = 2,615,000 cm³ = 2,615 liter
```

#### **2. Rumus Industri yang Berbeda**
Beberapa industri kayu menggunakan rumus empiris atau faktor konversi khusus. Contoh:
- Rumus Brereton
- Rumus Doyle
- Rumus International 1/4 Inch
- Rumus lokal Indonesia

#### **3. Diameter yang Diukur Berbeda**
- Diameter tengah vs diameter ujung
- Diameter dengan kulit vs tanpa kulit
- Diameter rata-rata vs diameter terkecil

#### **4. Kesalahan Input**
Mungkin ada kesalahan input diameter atau panjang?

### 🔧 **Solusi:**

Jika rumus sistem tidak sesuai dengan praktik industri Anda, Anda bisa:

#### **Opsi 1: Adjust Volume per Batang Manual**
Edit file `src/data/mockData.ts` dan ubah `volumePerLog`:

```typescript
{
  id: '1',
  woodType: 'Meranti',
  diameterRange: '19-24 cm',
  volumePerLog: 48.56, // Sesuaikan dengan tally fisik Anda
  // ...
}
```

#### **Opsi 2: Tambah Field "Volume Manual"**
Saya bisa tambahkan field untuk input volume manual jika rumus otomatis tidak sesuai.

#### **Opsi 3: Gunakan Rumus Industri Anda**
Beritahu saya rumus yang Anda gunakan, dan saya akan update sistem.

---

## 📐 **Tabel Konversi Volume**

### **Untuk Diameter 19-24 cm (rata-rata 21.5 cm), Panjang 4 m:**

| Jumlah Batang | Volume Sistem (m³) | Jika 874 m³ (m³/batang) |
|---------------|-------------------|-------------------------|
| 1             | 0.145             | 48.56                   |
| 10            | 1.45              | 485.6                   |
| 18            | 2.62              | 874.0                   |
| 50            | 7.27              | 2,428                   |
| 100           | 14.53             | 4,856                   |

### **Untuk Diameter 20-30 cm (rata-rata 25 cm), Panjang 4 m:**

| Jumlah Batang | Volume Sistem (m³) |
|---------------|-------------------|
| 1             | 0.196             |
| 10            | 1.96              |
| 50            | 9.82              |
| 100           | 19.63             |
| 255           | 50.00             |

---

## 💡 **Rekomendasi**

### **Untuk Testing:**
1. Gunakan rumus sistem saat ini (matematis standar)
2. Bandingkan hasil dengan tally fisik Anda
3. Jika berbeda signifikan, beri tahu saya rumus yang Anda gunakan

### **Untuk Production:**
1. Kalibrasi `volumePerLog` sesuai praktik industri Anda
2. Atau tambahkan field "volume manual" untuk fleksibilitas
3. Dokumentasikan rumus yang digunakan untuk audit trail

---

## 🎯 **Kesimpulan**

✅ **Multi-item order** sudah berfungsi penuh  
✅ **Auto-kalkulasi** per item dan total  
✅ **Rumus kubikasi** menggunakan standar matematis  
⚠️ **Jika hasil berbeda** dengan tally fisik, perlu klarifikasi rumus  

**Silakan test fitur multi-item order dan beri feedback!** 🚀
