<?php
session_start();
unset($_SESSION['user']);
$_SESSION['flash'] = ['type' => 'success', 'pesan' => 'Anda telah keluar.'];
header('Location: index.php');
exit;
