<?php
// Conexión a la base de datos (XAMPP por defecto: root sin contraseña)
$servidor = "db5021584983.hosting-data.io";
$usuario  = "dbu2130259";
$clave    = "Camara2627.";
$bd       = "dbs16198852";

$conexion = mysqli_connect($servidor, $usuario, $clave, $bd);

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}
mysqli_set_charset($conexion, "utf8mb4");
?>
