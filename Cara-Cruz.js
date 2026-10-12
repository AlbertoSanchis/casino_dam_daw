
"use strict";

// ==========================================
// 1. ELEMENTOS DEL HTML
// ==========================================

const botonCara = document.getElementById("cara");
const botonCruz = document.getElementById("cruz");
const botonCanto = document.getElementById("canto");
const botonJugar = document.getElementById("jugar");
const botonConfirmarSaldo = document.getElementById("confirmarSaldo");

const campoSaldoInicial = document.getElementById("saldoInicial");
const campoApuesta = document.getElementById("apuesta");

const textoSaldo = document.getElementById("saldo");
const textoResultadoMoneda = document.getElementById("resultadoMoneda");
const textoResultadoPartida = document.getElementById("resultadoPartida");

const opciones = document.querySelectorAll(".seleccion button");

// ==========================================
// 2. VARIABLES DEL JUEGO
// ==========================================

let saldo = 0;
let eleccionJugador = "";

// ==========================================
// 3. GESTIÓN DEL SALDO
// ==========================================

function actualizarSaldo() {
    textoSaldo.textContent = "Saldo: " + saldo + " €";
    botonJugar.disabled = saldo <= 0;

    if (saldo <= 0) {
        textoResultadoPartida.textContent =
            "Te has quedado sin saldo. Introduce un nuevo saldo inicial.";
    }
}

function confirmarSaldoInicial() {
    const valor = campoSaldoInicial.value;
    const nuevoSaldo = Number(valor);

    if (
        valor.trim() === "" ||
        !Number.isFinite(nuevoSaldo) ||
        nuevoSaldo <= 0 ||
        !Number.isInteger(nuevoSaldo)
    ) {
        textoResultadoPartida.textContent =
            "Introduce un saldo inicial positivo en euros enteros.";
        return;
    }

    saldo = nuevoSaldo;
    campoApuesta.value = "";
    textoResultadoPartida.textContent = "";

    reiniciarSeleccion();
    actualizarSaldo();
}

// ==========================================
// 4. SELECCIÓN DEL JUGADOR
// ==========================================

function seleccionarOpcion(boton) {
    if (saldo <= 0) {
        textoResultadoPartida.textContent =
            "No tienes saldo. Introduce un nuevo saldo inicial.";
        return;
    }

    eleccionJugador = boton.id;

    opciones.forEach(function (opcion) {
        opcion.classList.remove("seleccionada");
    });

    boton.classList.add("seleccionada");

    textoResultadoPartida.textContent = "";
    textoResultadoMoneda.textContent =
        "Preparado: " + eleccionJugador;
}

function reiniciarSeleccion() {
    eleccionJugador = "";

    opciones.forEach(function (opcion) {
        opcion.classList.remove("seleccionada");
    });

    textoResultadoMoneda.textContent =
        saldo > 0 ? "Elige tu siguiente opción" : "Sin saldo";
}

// ==========================================
// 5. VALIDACIÓN DE LA APUESTA
// ==========================================

function validarApuesta() {
    if (eleccionJugador === "") {
        textoResultadoPartida.textContent =
            "¡Elige Cara, Cruz o Canto!";
        return false;
    }

    const valor = campoApuesta.value;
    const apuesta = Number(valor);

    if (
        valor.trim() === "" ||
        !Number.isFinite(apuesta) ||
        apuesta <= 0 ||
        !Number.isInteger(apuesta)
    ) {
        textoResultadoPartida.textContent =
            "Introduce una apuesta positiva en euros enteros.";
        return false;
    }

    if (apuesta > saldo) {
        textoResultadoPartida.textContent =
            "No tienes suficiente dinero para esa apuesta.";
        return false;
    }

    return true;
}

// ==========================================
// 6. LANZAMIENTO DE LA MONEDA
// ==========================================

function lanzarMoneda() {
    const numero = Math.random();

    if (numero < 0.03) return "canto";
    if (numero < 0.515) return "cara";

    return "cruz";
}

// ==========================================
// 7. CÁLCULO DE GANANCIAS
// ==========================================

function calcularGanancias(apuesta, resultadoMoneda) {
    if (eleccionJugador === resultadoMoneda) {
        saldo += apuesta;

        textoResultadoPartida.textContent =
            "¡Has ganado! Beneficio: " + apuesta + " €";
    } else {
        saldo -= apuesta;

        textoResultadoPartida.textContent =
            "Has perdido " + apuesta + " €.";
    }
}

// ==========================================
// 8. DESARROLLO DE LA PARTIDA
// ==========================================

function jugarPartida() {
    if (saldo <= 0) {
        actualizarSaldo();
        return;
    }

    if (!validarApuesta()) {
        return;
    }

    const apuesta = Number(campoApuesta.value);
    const resultadoMoneda = lanzarMoneda();

    textoResultadoMoneda.textContent =
        "Ha salido: " + resultadoMoneda;

    calcularGanancias(apuesta, resultadoMoneda);
    actualizarSaldo();
    reiniciarSeleccion();
}

// ==========================================
// 9. EVENTOS DE LOS BOTONES
// ==========================================

opciones.forEach(function (boton) {
    boton.addEventListener("click", function () {
        seleccionarOpcion(boton);
    });
});

botonConfirmarSaldo.addEventListener(
    "click",
    confirmarSaldoInicial
);

botonJugar.addEventListener("click", jugarPartida);

// ==========================================
// 10. INICIALIZACIÓN DEL JUEGO
// ==========================================

actualizarSaldo();
