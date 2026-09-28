<?php
session_start();
require_once __DIR__ . '/includes/seed_data.php';

$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

$errors = [];
if ($email === '') {
    $errors[] = "Email wajib diisi.";
}
if ($password === '') {
    $errors[] = "Kata sandi wajib diisi.";
}

if (!empty($errors)) {
    $_SESSION['flash'] = ['type' => 'error', 'pesan' => implode(' ', $errors)];
    header('Location: login.php');
    exit;
}

$userDitemukan = null;
foreach ($_SESSION['users'] as $u) {
    if (strcasecmp($u['email'], $email) === 0 && $u['password'] === $password) {
        $userDitemukan = $u;
        break;
    }
}

if (!$userDitemukan) {
    $_SESSION['flash'] = ['type' => 'error', 'pesan' => 'Email atau kata sandi salah, atau akun belum terdaftar.'];
    header('Location: login.php');
    exit;
}

$_SESSION['user'] = ['nama' => $userDitemukan['nama'], 'email' => $userDitemukan['email']];
$_SESSION['flash'] = ['type' => 'success', 'pesan' => 'Login berhasil. Selamat datang, ' . $userDitemukan['nama'] . '!'];
header('Location: index.php');
exit;
