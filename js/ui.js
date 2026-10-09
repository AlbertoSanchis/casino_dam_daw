import { state } from "./state.js";
import {
  sumarNumero,
  randomNumero,
  resultadoPartida,
  actualizarSueldo,
  mostrarResultadoPartida,
  apuestaCantidadvalida,
  checkerNoVacio,
  tipo,
  darBalance,
} from "./game.js";

document.getElementById("sueldo").textContent += state.sueldo;

// ALL IN BABY
document.getElementById("allIn").addEventListener("click", (e) => {
  e.preventDefault();
  state.apuesta = state.sueldo;
  document.getElementById("sueldo").textContent = "Balance:" + state.sueldo;
  document.getElementById("contenedorApuesta").style.display = "none";
  document.getElementById("contenedorApostado").style.display = "block";
  document.getElementById("h2contenedorApostado").textContent =
    "Cantidad Apostada: " + state.apuesta;
});

// Apuestas
document.getElementById("apostar").addEventListener("click", (e) => {
  e.preventDefault();
  state.apuesta = Number(document.getElementById("apuesta").value);
  if (apuestaCantidadvalida(state.sueldo, state.apuesta)) {
    document.getElementById("sueldo").textContent = "Balance:" + state.sueldo;
    document.getElementById("contenedorApuesta").style.display = "none";
  } else {
    state.apuesta = 0;
    alert("Jugando Sin Balance");
  }
});

// Elegir Tipo y validado
document.getElementById("enviarTipo").addEventListener("click", (e) => {
  e.preventDefault();
  state.valorSelecionado = document.getElementById("tipo").value;
  tipo(state.valorSelecionado);
});

// Juego Empezar
document.getElementById("JuegoEmpezar").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("formJuego").style.display = "none";
  state.numeroUsuario = Number(document.getElementById("numeroElegido").value);
  state.numeroMaquina = randomNumero();

  const total = sumarNumero(state.numeroUsuario + state.numeroMaquina);
  const ganador = resultadoPartida(state.valorSelecionado, total);
  actualizarSueldo(ganador);

  document.getElementById("sueldo").textContent =
    "Balance Disponible: " + state.sueldo;
  mostrarResultadoPartida(ganador);
});

// Reiniciar Juego
document.getElementById("jugarNuevo").addEventListener("click", (e) => {
  e.preventDefault();
  location.reload();
});

document.getElementById("DarBalance").addEventListener("click", (e) => {
  e.preventDefault();
  darBalance();
});
