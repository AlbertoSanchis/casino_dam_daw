import { state, WinOption, TypeOptions } from "./state.js";

// Sumador de los numeros
export function sumarNumero(numero1, numero2) {
  return Number(numero1) + Number(numero2);
}

// Calculador de Numero Random
export function randomNumero() {
  return Math.floor(Math.random() * 6);
}

// Ver si la suma de los numeros es par o inpar
export function comprobadorParONon(total) {
  return total % 2 === 0 ? TypeOptions.PARES : TypeOptions.NONES;
}
// Nos devuelve el enum que necesitamos que es si ha ganado el usuario o casino y se utiliza para actualizar el sueldo del usuario
export function resultadoPartida(valorSelecionado, total) {
  if (valorSelecionado === comprobadorParONon(total)) {
    return WinOption.USUWIN;
  } else {
    return WinOption.CASWIN;
  }
}
// Simplemente Nos muestra quien gana la partida por pantalla
export function mostrarResultadoPartida(ganador) {
  switch (ganador) {
    case WinOption.CASWIN:
      document.getElementById("resultadoh3").innerHTML =
        "Resultado: Casino ha Ganado";
      break;
    case WinOption.USUWIN:
      document.getElementById("resultadoh3").innerHTML =
        "Resultado: Usuario ha Ganado";
      break;
    default:
      alert("error al mostrar los resultados de la partida");
  }
  document.getElementById("tuNumero").textContent =
    "Tu Numero: " + state.numeroUsuario;
  document.getElementById("numeroMaquina").textContent =
    "Numero Casino: " + state.numeroMaquina;
}
// Actualiza el sueldo del jugador si gana
export function actualizarSueldo(winner) {
  if (winner === WinOption.USUWIN) {
    state.sueldo += state.apuesta;
    localStorage.setItem("sueldo", state.sueldo);
  }
  if (winner === WinOption.CASWIN) {
    state.sueldo -= state.apuesta;
    localStorage.setItem("sueldo", state.sueldo);
  }
}

// No permite que la apuesta sea mayor al sueldo disponible
export function apuestaCantidadvalida(sueldo, apuesta) {
  return sueldo - apuesta >= 0;
}

// Actualmente no se utiliza pero se va a implementar más tarde
export function checkerNoVacio(elemento) {
  if (elemento !== "") {
    return true;
  } else {
    return false;
  }
}

// Utilizada Para Mostrar Que ha elegido el usuario si pares o nones
export function mostrarTipoElegido(tipo) {
  document.getElementById("typoElegir").style.display = "none";
  document.getElementById("typoElegido").style.display = "block";
  document.getElementById("h2TypoElegido").innerHTML += tipo;
}

export function mostrarElegirNumero() {
  document.getElementById("elegirNumero").style.display = "block";
}

// Este validador lo utlizamos para que los número que se introduzcan no puedan ser negativos
export function validarNumero(numero) {
  if (numero > 0) {
    return true;
  } else {
    return false;
  }
}

export function darBalance() {
  const balanceSumar = Number(document.getElementById("inputBalance").value);
  if (Number.isFinite(balanceSumar) && balanceSumar > 0) {
    localStorage.setItem("sueldo", balanceSumar + state.sueldo);
    location.reload();
  } else {
    alert("Error al intentar añadir balance");
  }
}

export function apuestasUi() {
  document.getElementById("sueldo").textContent = "Balance:" + state.sueldo;
  document.getElementById("contenedorApuesta").style.display = "none";
  document.getElementById("contenedorApostado").style.display = "block";
  document.getElementById("h2contenedorApostado").textContent =
    "Cantidad Apostada: " + state.apuesta;
  document.getElementById("typoElegir").style.display = "block";
  document.getElementById("mandanga").style.display = "none";
}

// Un número de jugada es válido si es entero y está entre 0 y 5
export function numeroJugadaValido(numero) {
  return EsEntero(numero) && entreCeroCinco(numero);
}

export function EsEntero(numero) {
  return Number.isInteger(numero);
}

export function entreCeroCinco(numero) {
  return numero >= 0 && numero <= 5;
}
