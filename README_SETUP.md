# KOLLAB Project Setup Guide

Panduan ini akan membantu Anda mengonfigurasi database cloud Neon PostgreSQL, menjalankan migrasi database dengan Prisma, dan menjalankan environment local untuk web KOLLAB ini.

---

## 1. Prasyarat & Persiapan

Pastikan Anda memiliki:
- **Node.js** terinstal (versi 16 atau yang lebih baru).
- Akun di **[Neon.tech](https://neon.tech/)** (gratis untuk database PostgreSQL serverless).

---

## 2. Konfigurasi Database Neon

1. Masuk ke dashboard **Neon** Anda dan buat project baru (atau gunakan project yang sudah ada).
2. Di halaman Dashboard Neon, salin **Connection String** PostgreSQL Anda. Tampilannya seperti ini:
   ```env
   postgresql://neondb_owner:xxxxxxxxxxxx@ep-cool-butterfly-a1bc2def.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```
3. Buka file `.env` di root folder proyek KOLLAB ini.
4. Ganti baris `DATABASE_URL` dengan Connection String Neon Anda:
   ```env
   DATABASE_URL="postgresql://neondb_owner:xxxxxxxxxxxx@ep-cool-butterfly-a1bc2def.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
   ```

---

## 3. Jalankan Prisma Client & Pushes Database

Setelah Anda menyimpan file `.env` dengan kredensial Neon Anda, jalankan perintah berikut di PowerShell atau Command Prompt Anda:

1. **Push schema ke database cloud Neon:**
   ```bash
   npx prisma db push
   ```
   Perintah ini akan membuat semua tabel (`User`, `Event`, `RSVP`) di database Neon Anda secara otomatis berdasarkan file [schema.prisma](file:///c:/Users/LENOVO/Downloads/KOLLAB/prisma/schema.prisma).

2. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```
   Perintah ini menghasilkan TypeScript compiler types untuk berinteraksi dengan database.

---

## 4. Cara Menjalankan Project

Di folder proyek ini, jalankan perintah berikut untuk memulai client dan server backend secara bersamaan:

```bash
npm run dev
```

Ini akan mengaktifkan:
- **Frontend Client (Vite):** di `http://localhost:5173`
- **Backend API Server (Express):** di `http://localhost:5000`

---

## 5. Fitur Demo & Sandbox Pengujian

### A. Fitur RSVP & Email Konfirmasi (Nodemailer Sandbox)
Ketika Anda melakukan RSVP pada suatu event:
1. Server akan menyimpan status RSVP sebagai `PENDING`.
2. Server mengirimkan email konfirmasi ke alamat email pendaftar.
3. **PENTING (Sandbox Dev):** Karena default SMTP di `.env` dikosongkan, server akan otomatis membuat akun **Ethereal Mail** secara dinamis saat start:
   - Tautan email konfirmasi akan **dicetak di jendela terminal/console server**!
   - Di modal sukses RSVP di web, akan muncul tombol **"Open Mock Mail Box"** berwarna kuning. Anda dapat mengkliknya untuk melihat sandbox email Anda secara langsung dan mengklik tombol **"Confirm My RSVP"** di dalamnya.
   - Setelah mengklik tombol konfirmasi, browser Anda akan di-redirect kembali ke halaman **Dashboard** dengan notifikasi sukses, dan event tersebut akan langsung terdaftar di kalender Anda.

### B. Akun SMTP Produksi
Jika ingin menggunakan email asli (seperti Gmail, Outlook, atau Mailgun), isi variabel berikut di file `.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=email-anda@gmail.com
SMTP_PASS=app-password-anda-dari-google
EMAIL_FROM="KOLLAB RSVP <email-anda@gmail.com>"
```
*(Catatan: Untuk Gmail, Anda harus membuat "App Password" terlebih dahulu di pengaturan Akun Google Anda).*
