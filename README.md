# SimpleTop — Toko Jual Beli Laptop

Website toko laptop sederhana berbasis PHP native, dikembangkan dari struktur jobsheet SIMPUS-Mini namun dengan tema dan tata letak yang dibuat berbeda agar terasa seperti toko online yang sesungguhnya.

## Struktur Folder

```
SimpleTop-php/
├── index.php                  # Beranda (hero, kartu statistik dari COUNT(*), produk pilihan)
├── includes/
│   ├── header.php             # Topbar promo + navbar
│   ├── footer.php             # Footer
│   ├── koneksi.php            # Koneksi PDO ke PostgreSQL
│   └── seed_data.php          # Inisialisasi session untuk akun login (bukan data produk)
├── sql/
│   └── 01_laptop_bestseller.sql   # Skema + data awal tabel laptop & bestseller
├── assets/
│   ├── css/style.css          # Tema gradien putih-silver-biru muda
│   └── js/app.js              # Hamburger menu, filter pencarian, konfirmasi hapus, toggle password
├── laptop/
│   ├── list.php                # Katalog laptop (kartu produk) — SELECT * FROM laptop
│   ├── tambah.php              # Form tambah laptop
│   └── proses_tambah.php       # Validasi & INSERT via prepared statement
├── bestseller/
│   ├── list.php                # Produk terlaris (ranking list) — SELECT * FROM bestseller
│   ├── tambah.php              # Form tambah data terlaris
│   └── proses_tambah.php       # Validasi & INSERT via prepared statement
├── login.php                   # Halaman masuk (tetap berbasis session)
├── register.php                # Halaman daftar akun (tetap berbasis session)
├── proses_login.php
├── proses_register.php
├── logout.php
├── docs/wireframe.md
├── README.md
└── Dokumentasi/
    └── perbedaan-simpus.md
```

## Cara Menjalankan

1. **Buat database PostgreSQL** lalu jalankan skema:
   ```
   createdb simpletop
   psql -d simpletop -f sql/01_laptop_bestseller.sql
   ```
2. **Untuk dev lokal**, `includes/koneksi.php` otomatis jatuh ke nilai default (`localhost`, `5432`, `simpletop`, user `postgres`/`postgres`) kalau tidak ada environment variable Railway — edit langsung di file itu kalau kredensial lokalmu beda. **Untuk deploy ke Railway**, tidak perlu edit apa pun, lihat bagian "Deploy ke Railway" di bawah.
3. Salin folder `SimpleTop-railway` ke direktori web server (htdocs XAMPP/Laragon, atau folder proyek PHP built-in server) untuk uji lokal. Pastikan ekstensi PHP `pdo_pgsql` sudah aktif.
4. Jalankan dengan PHP built-in server untuk uji cepat:
   ```
   php -S localhost:8000
   ```
5. Buka `http://localhost:8000/index.php` di browser.

## Fitur Utama

- **Autentikasi sederhana** — registrasi & login berbasis session (`$_SESSION['users']`), navbar berubah otomatis menampilkan "Halo, {nama}" saat sudah login.
- **Katalog Laptop & Produk Terlaris** — data disimpan permanen di **PostgreSQL** (tabel `laptop` & `bestseller`), diambil dengan `SELECT * FROM ...` dan ditambah lewat form dengan validasi server + `INSERT` via prepared statement (`proses_tambah.php`).
- **Kartu statistik di beranda** — total model laptop, total unit stok, dan total produk terlaris dihitung langsung dari database memakai `SELECT COUNT(*)` / `SUM()`.
- **Pencarian** — kolom cari di setiap halaman katalog memfilter kartu/list secara langsung (client-side).

## Deploy ke Railway

Folder ini sudah siap deploy ke [Railway](https://railway.app) memakai `Dockerfile` yang sudah disertakan.

1. Push project ini (folder `SimpleTop-railway`) ke repo GitHub.
2. Di dashboard Railway, klik **New Project → Deploy from GitHub repo**, pilih repo tersebut. Railway otomatis mendeteksi `Dockerfile` dan build image dari situ.
3. Tambahkan database: klik **New → Database → Add PostgreSQL** di project yang sama.
4. Buka service PostgreSQL yang baru dibuat → tab **Variables**, salin nilai `DATABASE_URL` (atau biarkan saja — Railway otomatis membagikan variabel ini ke service lain di project yang sama lewat "Reference Variables").
5. Di service PHP kamu, pastikan variabel `DATABASE_URL` (atau `PGHOST`/`PGPORT`/`PGDATABASE`/`PGUSER`/`PGPASSWORD`) sudah ter-reference dari service PostgreSQL — biasanya otomatis kalau dibuat dalam satu project yang sama.
6. Jalankan skema database: buka tab **Data** pada service PostgreSQL di Railway (ada query editor bawaan), atau pakai [Railway CLI](https://docs.railway.app/guides/cli): `railway connect postgres` lalu tempel isi `sql/01_laptop_bestseller.sql`.
7. Railway otomatis kasih domain publik (`*.up.railway.app`) — bisa dicek di tab **Settings → Networking** pada service PHP kamu.
8. `includes/koneksi.php` sudah otomatis membaca `DATABASE_URL`/variabel `PG*` yang disuntikkan Railway — tidak perlu edit kredensial manual seperti di InfinityFree.

**Catatan:** `Dockerfile` memakai `php -S` (built-in server PHP), cukup untuk project skala latihan/jobsheet seperti ini. Untuk trafik produksi sungguhan, sebaiknya diganti ke PHP-FPM + Nginx/Apache.

## Catatan

- Data **laptop & bestseller** tersimpan permanen di PostgreSQL (tidak hilang saat service di-restart, selama volume database Railway tidak dihapus).
- Data **akun login** tetap memakai PHP session (belum dipindah ke database), jadi akun akan hilang saat session berakhir atau service di-restart.
- Tombol "Hapus" di tampilan katalog/ranking masih bersifat tampilan (menghapus dari DOM lewat JavaScript), belum terhubung ke `DELETE` di database.
