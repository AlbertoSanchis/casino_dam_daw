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

export function apuestaCantidadvalida(sueldo, apuesta) {
  return sueldo - apuesta >= 0;
}

export function checkerNoVacio(elemento) {
  if (elemento !== "") {
    return true;
  } else {
    return false;
  }
}

export function mostrarTipoElegido(tipo) {
  document.getElementById("typoElegir").style.display = "none";
  document.getElementById("typoElegido").style.display = "block";
  document.getElementById("h2TypoElegido").innerHTML += tipo;
}

export function mostrarElegirNumero() {
  document.getElementById("elegirNumero").style.display = "block";
}

export function validarNumero(numero) {
  if (numero > 0) {
    return true;
  }
}

export function darBalance() {
  localStorage.setItem(
    "sueldo",
    Number(document.getElementById("inputBalance").value) + state.sueldo,
  );
  location.reload();
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
