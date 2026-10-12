<?php
require "sesion.php";
require "conexion.php";

$stmt = mysqli_prepare($conexion, "SELECT nombre, saldo FROM usuarios WHERE id = ?");
mysqli_stmt_bind_param($stmt, "i", $_SESSION['id']);
mysqli_stmt_execute($stmt);
$usuario = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Casino DAW - Juegos</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
    <header>
        <h1>🎰 Casino DAW</h1>
        <nav>
            <?php if ($_SESSION['rol'] == 'admin') { ?>
                <a href="panelcontrol.php">Panel</a>
            <?php } ?>
            <a href="logout.php">Salir</a>
        </nav>
    </header>

    <section class="bienvenida">
        <h2>Bienvenido <?= htmlspecialchars($usuario['nombre']) ?></h2>
        <p>Tu saldo es <strong><?= number_format($usuario['saldo'], 2, ',', '.') ?> €</strong></p>
    </section>

    <main class="juegos">
        <a class="juego" href="caraocruz.php">
            <span class="icono">🪙</span>
            <h3>Cara o cruz</h3>
            <p>Elige cara o cruz y dobla tu apuesta.</p>
        </a>
        <a class="juego" href="ruleta.php">
            <span class="icono">🎡</span>
            <h3>La ruleta</h3>
            <p>Apuesta a número, color o par/impar.</p>
        </a>
        <a class="juego" href="piedrapapeltijera.php">
            <span class="icono">✊</span>
            <h3>Piedra, papel o tijera</h3>
            <p>Gánale a la máquina.</p>
        </a>
        <a class="juego" href="tragaperras.php">
            <span class="icono">🎰</span>
            <h3>Tragaperras</h3>
            <p>Tres iguales y te llevas el premio.</p>
        </a>
    </main>
</body>
</html>
