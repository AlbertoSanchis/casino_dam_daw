<?php
require "sesion.php";
require "conexion.php";

// Solo el administrador puede entrar
if ($_SESSION['rol'] != 'admin') {
    header("Location: juegos.php");
    exit;
}

$mensaje = "";
$accion  = $_POST['accion'] ?? '';

// ---- ALTA DE USUARIO ----
if ($accion == 'alta') {
    $nombre   = trim($_POST['nombre']);
    $telefono = trim($_POST['telefono']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $saldo    = (float) $_POST['saldo'];
    $rol      = $_POST['rol'] == 'admin' ? 'admin' : 'jugador';

    $stmt = mysqli_prepare($conexion, "INSERT INTO usuarios (nombre, telefono, password, saldo, rol) VALUES (?, ?, ?, ?, ?)");
    mysqli_stmt_bind_param($stmt, "sssds", $nombre, $telefono, $password, $saldo, $rol);
    try {
        mysqli_stmt_execute($stmt);
        $mensaje = "Usuario creado";
    } catch (mysqli_sql_exception $e) {
        $mensaje = "Error: ese teléfono ya existe";
    }
}

// ---- AÑADIR SALDO ----
if ($accion == 'saldo') {
    $id       = (int) $_POST['id'];
    $cantidad = (float) str_replace(',', '.', $_POST['cantidad']);

    $stmt = mysqli_prepare($conexion, "UPDATE usuarios SET saldo = saldo + ? WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "di", $cantidad, $id);
    mysqli_stmt_execute($stmt);
    $mensaje = "Saldo actualizado";
}

// ---- BORRAR USUARIO ----
if ($accion == 'borrar') {
    $id = (int) $_POST['id'];
    if ($id == $_SESSION['id']) {
        $mensaje = "No puedes borrarte a ti mismo";
    } else {
        $stmt = mysqli_prepare($conexion, "DELETE FROM usuarios WHERE id = ?");
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        $mensaje = "Usuario borrado";
    }
}

// Aquí tendremos la información del usuario. Nombre, telefono y saldo disponible.
$usuarios = mysqli_query($conexion, "SELECT id, nombre, telefono, saldo, rol FROM usuarios ORDER BY nombre");
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Casino DAW - Panel de control</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
    <header>
        <h1>⚙️ Panel de control</h1>
        <nav>
            <a href="juegos.php">Juegos</a>
            <a href="logout.php">Salir</a>
        </nav>
    </header>

    <main class="panel">
        <?php if ($mensaje) { ?>
            <p class="aviso"><?= htmlspecialchars($mensaje) ?></p>
        <?php } ?>

        <h2>Usuarios</h2>
        <table>
            <tr>
                <th>Nombre</th><th>Teléfono</th><th>Saldo</th><th>Rol</th><th>Añadir saldo</th><th></th>
            </tr>
            <?php while ($u = mysqli_fetch_assoc($usuarios)) { ?>
            <tr>
                <td><?= htmlspecialchars($u['nombre']) ?></td>
                <td><?= htmlspecialchars($u['telefono']) ?></td>
                <td><?= number_format($u['saldo'], 2, ',', '.') ?> €</td>
                <td><?= $u['rol'] ?></td>
                <td>
                    <!-- Tendremos un botón llamado añadir saldo que permitirá mediante un input text añadir saldo al monedero del usuario. -->
                    <form method="post" class="enlinea">
                        <input type="hidden" name="accion" value="saldo">
                        <input type="hidden" name="id" value="<?= $u['id'] ?>">
                        <input type="text" name="cantidad" placeholder="0,00" required>
                        <button type="submit">Añadir saldo</button>
                    </form>
                </td>
                <td>
                    <form method="post" onsubmit="return confirm('¿Borrar este usuario?')">
                        <input type="hidden" name="accion" value="borrar">
                        <input type="hidden" name="id" value="<?= $u['id'] ?>">
                        <button type="submit" class="peligro">Borrar</button>
                    </form>
                </td>
            </tr>
            <?php } ?>
        </table>

        <h2>Nuevo usuario</h2>
        <form method="post" class="alta">
            <input type="hidden" name="accion" value="alta">
            <input type="text" name="nombre" placeholder="Nombre" required>
            <input type="text" name="telefono" placeholder="Teléfono" required>
            <input type="password" name="password" placeholder="Contraseña" required>
            <input type="text" name="saldo" placeholder="Saldo inicial" value="0">
            <select name="rol">
                <option value="jugador">Jugador</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Crear</button>
        </form>
    </main>
</body>
</html>
