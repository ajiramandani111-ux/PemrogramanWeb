<?php
// Koneksi PDO ke PostgreSQL.
//
// Di Railway, tambahkan plugin "PostgreSQL" lewat dashboard, lalu Railway
// otomatis menyuntikkan environment variable berikut ke service PHP ini
// (asal sudah di-"reference" / satu project yang sama):
//   DATABASE_URL, PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD
//
// Kode di bawah otomatis memakainya kalau ada. Kalau dijalankan di lokal
// (php -S) tanpa env var itu, dia jatuh ke nilai default di bagian "fallback lokal".

$databaseUrl = getenv('DATABASE_URL');

if ($databaseUrl) {
    // Railway menyediakan format: postgresql://user:pass@host:port/dbname
    $bagian = parse_url($databaseUrl);
    $db_host = $bagian['host'];
    $db_port = $bagian['port'] ?? 5432;
    $db_name = ltrim($bagian['path'], '/');
    $db_user = $bagian['user'];
    $db_pass = $bagian['pass'];
} elseif (getenv('PGHOST')) {
    // Alternatif: pakai variabel PG* individual (juga disediakan Railway)
    $db_host = getenv('PGHOST');
    $db_port = getenv('PGPORT') ?: 5432;
    $db_name = getenv('PGDATABASE');
    $db_user = getenv('PGUSER');
    $db_pass = getenv('PGPASSWORD');
} else {
    // Fallback lokal (dev di komputer sendiri, di luar Railway)
    $db_host = 'localhost';
    $db_port = '5432';
    $db_name = 'simpletop';
    $db_user = 'postgres';
    $db_pass = 'postgres';
}

try {
    $pdo = new PDO(
        "pgsql:host={$db_host};port={$db_port};dbname={$db_name}",
        $db_user,
        $db_pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    die("Koneksi database gagal: " . $e->getMessage() .
        " — cek plugin PostgreSQL di Railway sudah aktif & di-reference ke service ini.");
}
