console.log("Cara o Cruz cargado correctamente");

const botonCara = document.getElementById("cara");
const botonCruz = document.getElementById("cruz");
const botonCanto = document.getElementById("canto");
const botonJugar = document.getElementById("jugar");

let eleccionJugador = "";

botonCara.addEventListener("click", function () {
    eleccionJugador = "cara";
    console.log("Has elegido Cara");
});
botonCruz.addEventListener("click", function () {
    eleccionJugador = "cruz";
    console.log("Has elegido Cruz");
});
botonCanto.addEventListener("click", function () {
    eleccionJugador = "canto";
    console.log("Has elegido Canto");
});
botonJugar.addEventListener("click", function () {
    console.log("Has pulsado Jugar");
    console.log("Tu elección es: " + eleccionJugador);
});


/* Mirar si esta funcion se puede hacer a parte y modificarla */

let resultadoMoneda = Math.floor(Math.random() * 3);

if (resultadoMoneda === 0) {
    resultadoMoneda = "cara";
} else if (resultadoMoneda === 1) {
    resultadoMoneda = "cruz";
} else {
    resultadoMoneda = "canto";
}

console.log("Resultado de la moneda: " + resultadoMoneda);

if (eleccionJugador === resultadoMoneda) {
    console.log("¡Has ganado!");
} else {
    console.log("Has perdido");
}