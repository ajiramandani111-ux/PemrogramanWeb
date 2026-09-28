<?php
// Data laptop & bestseller kini disimpan di database PostgreSQL (lihat includes/koneksi.php
// dan sql/01_laptop_bestseller.sql), jadi tidak perlu di-seed ke session lagi.
//
// Data akun (login/registrasi) tetap memakai session sederhana seperti sebelumnya.

if (!isset($_SESSION['users'])) {
    $_SESSION['users'] = []; // menampung akun yang mendaftar lewat register.php
}
