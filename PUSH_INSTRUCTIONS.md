# 🚀 PANDUAN PUSH KE 2 REPOSITORY - LENGKAP

## ⚠️ **PENTING: Saya Tidak Bisa Jalankan Git**

Saya hanya bisa membuat file, tidak bisa menjalankan command `git`. Anda perlu menjalankan command di terminal Anda sendiri.

---

## 📋 **LANGKAH 1: Copy Semua File**

### **Option A: Gunakan Script (Recommended)**

```bash
# Di terminal, jalankan:
chmod +x copy-files.sh
./copy-files.sh
```

### **Option B: Manual Copy**

Jika script tidak bisa dijalankan, copy manual:

```bash
# FRONTEND
mkdir -p timberflow-web/src/{components,pages,context,data,utils}
cp -r src/* timberflow-web/src/
cp index.html package.json package-lock.json tsconfig.json vite.config.js timberflow-web/

# BACKEND
cp -r trade-api/* timberflow-api/
```

---

## 📋 **LANGKAH 2: Push timberflow-web**

```bash
# Masuk ke folder frontend
cd timberflow-web

# Initialize git
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit: TimberFlow Frontend"

# Rename branch
git branch -M main

# Add remote
git remote add origin https://github.com/turex-bot/timberflow-web.git

# Push
git push -u origin main
```

---

## 📋 **LANGKAH 3: Push timberflow-api**

```bash
# Kembali ke root
cd ..

# Masuk ke folder backend
cd timberflow-api

# Initialize git
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit: TimberFlow Backend API"

# Rename branch
git branch -M main

# Add remote
git remote add origin https://github.com/turex-bot/timberflow-api.git

# Push
git push -u origin main
```

---

## ✅ **VERIFIKASI**

Setelah push berhasil, cek di GitHub:

- **Frontend**: https://github.com/turex-bot/timberflow-web
- **Backend**: https://github.com/turex-bot/timberflow-api

Kedua repository harus memiliki file lengkap.

---

## 🔧 **SETUP DEVELOPMENT**

### **Frontend:**
```bash
cd timberflow-web
npm install
npm run dev
# Buka http://localhost:5173
```

### **Backend:**
```bash
cd timberflow-api
go mod download
make migrate
make run
# Buka http://localhost:8080
```

---

## 🆘 **TROUBLESHOOTING**

### **Error: "fatal: remote origin already exists"**
```bash
# Hapus remote lama
git remote remove origin

# Add remote baru
git remote add origin https://github.com/turex-bot/timberflow-web.git
```

### **Error: "Updates were rejected"**
```bash
# Force push (HATI-HATI!)
git push -u origin main --force
```

### **Error: "Permission denied"**
```bash
# Setup SSH key atau gunakan HTTPS
git remote set-url origin https://github.com/turex-bot/timberflow-web.git
```

---

## 📞 **NEED HELP?**

Jika ada masalah:
1. Check error message di terminal
2. Lihat troubleshooting di atas
3. Pastikan repository sudah dibuat di GitHub
4. Pastikan Anda punya akses write ke repository

---

**Status:** 📝 Ready to push!

**Silakan jalankan command di atas satu per satu!** 🚀
