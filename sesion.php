<?php
// Incluir al principio de cualquier página protegida.
// Si no hay sesión iniciada, vuelve al login.
session_start();

if (!isset($_SESSION['id'])) {
    header("Location: index.php");
    exit;
}
?>
