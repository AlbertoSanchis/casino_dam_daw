<!DOCTYPE html> <!-- Indica al navegador que este documento utiliza HTML5. -->
<html lang="es"> <!-- Inicia el documento HTML e indica que el idioma es español. -->

<head> <!-- Empieza la sección de configuración de la página. -->
    <meta charset="UTF-8"> <!-- Permite mostrar correctamente tildes, eñes y otros caracteres. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Adapta la página al ancho de móviles y otros dispositivos. -->
    <title>Cara o Cruz</title> <!-- Establece el título que aparece en la pestaña del navegador. -->

    <link rel="stylesheet" href="Cara-Cruz.css"> <!-- Conecta este HTML con el archivo CSS que define su apariencia. -->
</head> <!-- Termina la sección de configuración. -->

<body> <!-- Empieza el contenido visible de la página. -->

    <div class="juego"> <!-- Crea el panel principal que contiene todo el juego. -->

        <h1>Cara o Cruz</h1> <!-- Muestra el título principal del juego. -->

        <div class="configuracionSaldo"> <!-- Agrupa los elementos para establecer el saldo inicial. -->

            <label for="saldoInicial">Saldo inicial (€):</label> <!-- Indica al usuario qué cantidad debe introducir. -->

            <input
                type="number"
                id="saldoInicial"
                min="1"
                step="1"
                value="100"> <!-- Permite escribir el saldo inicial; comienza mostrando 100 euros y sugiere números enteros positivos. -->

            <button type="button" id="confirmarSaldo">Confirmar saldo</button> <!-- Crea el botón que aplicará el nuevo saldo. -->

        </div> <!-- Termina la sección para configurar el saldo. -->

        <p id="saldo">Saldo: 100 €</p> <!-- Muestra el saldo actual del jugador; JavaScript actualizará este texto. -->

        <div class="moneda"> <!-- Crea el espacio circular que representa la moneda. -->

            <p id="resultadoMoneda">Elige tu apuesta</p> <!-- Muestra el mensaje inicial y después el resultado de la moneda. -->

        </div> <!-- Termina el espacio de la moneda. -->

        <div class="seleccion"> <!-- Agrupa las opciones que puede elegir el jugador. -->

            <p>Elige una opción:</p> <!-- Indica que el jugador debe seleccionar un resultado. -->

            <button type="button" id="cara">Cara</button> <!-- Crea el botón para elegir Cara. -->

            <button type="button" id="cruz">Cruz</button> <!-- Crea el botón para elegir Cruz. -->

            <button type="button" id="canto">Canto</button> <!-- Crea el botón para elegir Canto. -->

            <label for="apuesta">Cantidad a apostar:</label> <!-- Explica qué cantidad debe introducirse en el campo siguiente. -->

            <input
                type="number"
                id="apuesta"
                min="1"
                step="1"
                placeholder="Introduce tu apuesta"> <!-- Permite introducir la cantidad que se quiere apostar. -->

        </div> <!-- Termina el grupo de opciones y apuesta. -->

        <button type="button" id="jugar">Jugar</button> <!-- Crea el botón que inicia una partida. -->

        <div class="resultado"> <!-- Reserva un espacio para los mensajes de la partida. -->

            <p id="resultadoPartida"></p> <!-- Muestra avisos, ganancias o pérdidas. -->

        </div> <!-- Termina el espacio de resultados. -->

    </div> <!-- Termina el panel principal del juego. -->

    <script src="Cara-Cruz.js"></script> <!-- Carga el JavaScript que controla las elecciones, las apuestas y el saldo. -->

</body> <!-- Termina el contenido visible de la página. -->

</html> <!-- Termina el documento HTML. -->