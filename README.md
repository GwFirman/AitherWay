## Struktur Direktori

### `lib/`
Berisi fungsi utilitas, helper, atau modul TypeScript yang digunakan secara umum di seluruh aplikasi. Folder ini menyimpan kode yang tidak spesifik untuk logika bisnis utama. Contoh fungsionalitas yang mungkin ada:
- Format data
- Autentikasi
- Pengelolaan error

### `prisma/`
Berisi konfigurasi Prisma, termasuk file `schema.prisma` yang mendefinisikan model database dan relasinya. Prisma digunakan sebagai ORM (Object-Relational Mapping) untuk berinteraksi dengan database (misalnya, PostgreSQL, MySQL) secara type-safe dan efisien. Contoh file:
- `schema.prisma`: Mendefinisikan struktur database

### `src/`
Folder utama aplikasi, berisi kode sumber untuk logika bisnis, rute API, middleware, dan controller. Ini adalah inti dari aplikasi tempat eksekusi utama berlangsung. Folder ini mungkin berisi:
- `routes/`: Mendefinisikan rute API
- `controllers/`: Berisi logika kontrol utama
- `middleware/`: Berisi middleware untuk aplikasi

### `scrapt/`
Beda pemakaian soalnya bakal di jalankannya kalo mau generate dataset nya.

## Panduan Penggunaan
1. Pastikan semua dependensi sudah terinstal dengan perintah:
   ```bash
   bun install
   bun run build
   bun scrapt