
document.addEventListener('DOMContentLoaded', () => { // Espera a que el HTML esté cargado antes de buscar elementos y preparar el juego.

    let jugador, crupier; // Declara variables para las elecciones

    const objeto = { // Array asociativo que relaciona los índices numéricos con los nombres de las jugadas.
        0: "piedra", // Asocia el índice 0 con piedra.
        1: "papel", // Asocia el índice 1 con papel.
        2: "tijera" // Asocia el índice 2 con tijera.
    }; 

    const formulario = document.getElementById("formulario"); // Obtiene el formulario donde el jugador selecciona una jugada.
    const ncrupier = document.getElementById("crupier"); // Obtiene el elemento donde se mostrará la jugada del crupier.
    const resultado = document.getElementById("resultado"); // Obtiene el elemento donde se mostrará quién gana.

    formulario.addEventListener("submit", (e) => { // Ejecuta esta función cuando se envía el formulario al pulsar el botón.
        e.preventDefault(); // Cancela el envío y la recarga predeterminados del formulario.
        const random = Math.floor(Math.random() * 3); // Genera al azar un índice entero entre 0 y 2.
        ncrupier.textContent = objeto[random]; // Muestra la elección del crupier.

        Juego(objeto[formulario.opciones.selectedIndex - 1], objeto[random]); // Se hace uso de la función Juego y se le asigna como parámetros las jugadas del jugador y del crupier.

    });

// Recibe las jugadas y decide el resultado de la partida.
function Juego(jugador, crupier) { 
    if (jugador === crupier) { // Comprueba si los dos han elegido la misma jugada.
        resultado.textContent = "empate"; 
    } else if ( // Si no hay empate, comprueba si se cumple alguna combinación ganadora del jugador.
        (jugador === "piedra" && crupier === "tijera") || // Piedra gana cuando el crupier ha elegido tijera.
        (jugador === "papel" && crupier === "piedra") || // Papel gana cuando el crupier ha elegido piedra.
        (jugador === "tijera" && crupier === "papel") // Tijera gana cuando el crupier ha elegido papel.
    ) { 
        resultado.textContent = "has ganado"; 
    } else { // Si no hay empate ni una combinación ganadora, gana el crupier.
        resultado.textContent = "has perdido"; 
    } // Finaliza la decisión del resultado.
} 
}); 