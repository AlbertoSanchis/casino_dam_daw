<?php
session_start();
// Si ya está logueado, directo a los juegos
if (isset($_SESSION['id'])) {
    header("Location: juegos.php");
    exit;
}
$error = isset($_GET['error']);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Casino DAW - Login</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body class="centrado">
    <form class="caja" action="usuario.php" method="post">
        <h1>🎰 Casino DAW</h1>
        <?php if ($error) { ?>
            <p class="error">Teléfono o contraseña incorrectos</p>
        <?php } ?>
        <label>Teléfono</label>
        <input type="text" name="telefono" required>
        <label>Contraseña</label>
        <input type="password" name="password" required>
        <button type="submit">Entrar</button>
    </form>
</body>
</html>
