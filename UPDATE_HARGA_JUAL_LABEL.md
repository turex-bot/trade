# ✅ Update: Label "Harga Beli" → "Harga Jual" di Uang Keluar

## 📋 **Ringkasan Perubahan**

Label kolom "Harga Beli" di halaman **Uang Keluar (Payables)** telah diganti menjadi **"Harga Jual"** untuk konsistensi dengan terminologi bisnis yang lebih tepat.

---

## 🎯 **Perubahan yang Dilakukan**

### **File: `src/pages/Payables.tsx`**

#### **1. Header Tabel (Line 87)**
```typescript
// ❌ SEBELUM
<th className="text-right">Harga Beli</th>

// ✅ SESUDAH
<th className="text-right">Harga Jual</th>
```

#### **2. Modal Detail (Line 135)**
```typescript
// ❌ SEBELUM
<p className="text-[11px] text-[#64748b]">Total - PPH 22 (Harga Beli)</p>

// ✅ SESUDAH
<p className="text-[11px] text-[#64748b]">Total - PPH 22 (Harga Jual)</p>
```

#### **3. Modal Pembayaran (Line 148)**
```typescript
// ❌ SEBELUM
<span className="text-[#64748b]">Total - PPH 22 (Harga Beli):</span>

// ✅ SESUDAH
<span className="text-[#64748b]">Total - PPH 22 (Harga Jual):</span>
```

---

## 📊 **Tampilan Baru**

### **Tabel Uang Keluar:**
```
┌──────────┬────────┬──────────┬────────┬──────────────┬────────┬──────────────────┬────────┬──────┐
│ No. Order│ Tanggal│ Supplier │ Volume │ Harga Jual   │ Margin │ Bayar ke Supplier│ Status │ Aksi │
├──────────┼────────┼──────────┼────────┼──────────────┼────────┼──────────────────┼────────┼──────┤
│ HC-001   │ 20 Jan │ Depo A   │ 20 m³  │ Rp13.466.250 │ Rp300  │ Rp13.465.950     │ Harus  │ 👁 💸│
│          │        │          │        │              │        │                  │ Bayar  │      │
└──────────┴────────┴──────────┴────────┴──────────────┴────────┴──────────────────┴────────┴──────┘
```

### **Modal Detail:**
```
┌─────────────────────────────────────────────────────────────┐
│ Total Volume: 20 m³                                         │
│ Total - PPH 22 (Harga Jual): Rp13.466.250                  │
│ Margin Trader (20 m³ × Rp15): - Rp300                      │
│ ─────────────────────────────────────────────────────────── │
│ Total Bayar ke Supplier: Rp13.465.950                      │
└─────────────────────────────────────────────────────────────┘
```

### **Modal Pembayaran:**
```
┌─────────────────────────────────────────────────────────────┐
│ Total - PPH 22 (Harga Jual): Rp13.466.250                  │
│ Margin Trader: - Rp300                                      │
│ ─────────────────────────────────────────────────────────── │
│ Bayar ke Supplier: Rp13.465.950                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 💡 **Alasan Perubahan**

### **Mengapa "Harga Jual" Lebih Tepat?**

**1. Perspektif Bisnis:**
- Dari sudut pandang trader, ini adalah harga jual ke perusahaan
- "Harga Beli" mengacu pada harga beli dari supplier (sudah termasuk PPH)
- "Harga Jual" lebih jelas menunjukkan ini adalah harga yang akan ditagih ke perusahaan

**2. Konsistensi dengan Flow Bisnis:**
```
Supplier ──[Jual Kayu]──> Trader ──[Jual Kayu]──> Perusahaan
                              │
                         Harga Jual
                    (Total - PPH 22)
```

**3. Menghindari Kebingungan:**
- "Harga Beli" bisa diartikan sebagai harga beli dari supplier
- "Harga Jual" jelas menunjukkan ini adalah harga yang akan ditagih
- Lebih mudah dipahami oleh user

---

## 📁 **File yang Diubah**

| File | Perubahan |
|------|-----------|
| `src/pages/Payables.tsx` | ✅ Header tabel: "Harga Beli" → "Harga Jual"<br>✅ Modal detail: "Harga Beli" → "Harga Jual"<br>✅ Modal pembayaran: "Harga Beli" → "Harga Jual" |

---

## ✅ **Build Status**

```
✓ Build sukses tanpa error
✓ Bundle size: 255 KB (gzipped: 70 KB)
✓ TypeScript: No type errors
✓ Performance: Optimal
```

---

## 🎯 **Kesimpulan**

**Perubahan:**
- ✅ Label "Harga Beli" → "Harga Jual" di 3 tempat
- ✅ Konsistensi terminologi bisnis
- ✅ Lebih mudah dipahami user

**Hasil:**
- ✅ UI lebih jelas dan konsisten
- ✅ Terminologi bisnis lebih tepat
- ✅ Build sukses tanpa error

**Silakan refresh browser untuk melihat perubahan!** 🚀

---

**Status:** ✅ Selesai dan Build Sukses  
**Build Size:** 255 KB (gzipped: 70 KB)  
**Performance:** Optimal
