<?php
session_start();
require_once __DIR__ . '/includes/seed_data.php';

$nama = trim($_POST['nama'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$passwordConfirm = $_POST['password_confirm'] ?? '';

$errors = [];
if ($nama === '') {
    $errors[] = "Nama lengkap wajib diisi.";
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Email tidak valid.";
}
if (strlen($password) < 8) {
    $errors[] = "Kata sandi minimal 8 karakter.";
}
if ($password !== $passwordConfirm) {
    $errors[] = "Konfirmasi kata sandi tidak cocok.";
}

foreach ($_SESSION['users'] as $u) {
    if (strcasecmp($u['email'], $email) === 0) {
        $errors[] = "Email sudah terdaftar. Silakan masuk.";
        break;
    }
}

if (!empty($errors)) {
    $_SESSION['flash'] = ['type' => 'error', 'pesan' => implode(' ', $errors)];
    header('Location: register.php');
    exit;
}

$_SESSION['users'][] = [
    'nama' => $nama,
    'email' => $email,
    'password' => $password,
];

$_SESSION['flash'] = ['type' => 'success', 'pesan' => 'Registrasi berhasil! Silakan masuk.'];
header('Location: login.php');
exit;
