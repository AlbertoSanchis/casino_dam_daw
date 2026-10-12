<?php
session_start();

//aqui hacemos la conexion
require "conexion.php";

// Aquí hacemos el select para el login de los usuarios. Los campos que vamos a usar son telefono y contraseña
$telefono = trim($_POST['telefono'] ?? '');
$password = $_POST['password'] ?? '';

$sql  = "SELECT id, nombre, password, rol FROM usuarios WHERE telefono = ?";
$stmt = mysqli_prepare($conexion, $sql);
mysqli_stmt_bind_param($stmt, "s", $telefono);
mysqli_stmt_execute($stmt);
$resultado = mysqli_stmt_get_result($stmt);
$fila = mysqli_fetch_assoc($resultado);

// Aquí crearemos la variable sesión si el usuario está logueado y nos llevara a la página "juegos.php" donde tendremos la landing de todos los juegos
if ($fila && password_verify($password, $fila['password'])) {
    $_SESSION['id']     = $fila['id'];
    $_SESSION['nombre'] = $fila['nombre'];
    $_SESSION['rol']    = $fila['rol'];

    if ($fila['rol'] == 'admin') {
        header("Location: panelcontrol.php");
    } else {
        header("Location: juegos.php");
    }
} else {
    header("Location: index.php?error=1");
}
exit;
?>
