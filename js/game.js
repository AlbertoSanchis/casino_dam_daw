import { state, WinOption } from "./state.js";

// Sumador de los numeros
export function sumarNumero() {
  return Number(state.numeroUsuario) + Number(state.numeroMaquina);
}

// Calculador de Numero Random
export function randomNumero() {
  return Math.floor(Math.random() * 6);
}

// Ver si la suma de los numeros es par o inpar
export function comprobadorParONon(total) {
  return total % 2 === 0 ? "pares" : "nones";
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
      document.getElementById("resultado").innerHTML =
        "Resultado: Casino ha Ganado";
      break;
    case WinOption.USUWIN:
      document.getElementById("resultado").innerHTML =
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
    state.sueldo = state.sueldo + state.apuesta * 2;
    localStorage.setItem("sueldo", state.sueldo);
  }
  if (winner === WinOption.CASWIN) {
    state.sueldo -= state.apuesta;
    localStorage.setItem("sueldo", state.sueldo);
  }
}

export function apuestaCantidadvalida(sueldo, apuesta) {
  return state.sueldo - state.apuesta >= 0;
}

export function checkerNoVacio(elemento) {
  if (elemento !== "") {
    return true;
  } else {
    return false;
  }
}

export function tipo(tipo) {
  document.getElementById("typoElegir").style.display = "none";
  document.getElementById("typoElegido").style.display = "block";
  document.getElementById("h2TypoElegido").innerHTML += tipo;
}

export function darBalance() {
  localStorage.setItem(
    "sueldo",
    Number(document.getElementById("inputBalance").value),
  );
  location.reload();
}
