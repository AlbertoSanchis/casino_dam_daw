<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Cara o Cruz</title>
    <link rel="stylesheet" href="css/Cara-Cruz.css">
</head>

<body>

    <div class="juego">

        <h1>Cara o Cruz</h1>

        <div class="moneda">

            <p id="resultadoMoneda"></p>

        </div>


        <div class="seleccion">

            <p>Elige una opción:</p>

            <button id="cara">Cara</button>
            <button id="cruz">Cruz</button>
            <button id="canto">Canto</button>

            <label for="apuesta">Cantidad a apostar:</label>

            <input type="number" id="apuesta" min="1" step="1">

        </div>

        <button id="jugar">Jugar</button>

        <div class="resultado">

            <p id="resultadoMoneda"></p>

            <p id="resultadoPartida"></p>

        </div>

    </div>
    <script src="js/cara-cruz.js"></script>
</body>

</html>