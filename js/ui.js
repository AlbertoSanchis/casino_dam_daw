import { state } from "./state.js";
import {
  sumarNumero,
  randomNumero,
  resultadoPartida,
  actualizarSueldo,
  mostrarResultadoPartida,
  apuestaCantidadvalida,
  darBalance,
  mostrarTipoElegido,
  mostrarElegirNumero,
  validarNumero,
  apuestasUi,
} from "./game.js";

document.getElementById("sueldo").textContent += state.sueldo;

// ALL IN BABY
document.getElementById("allIn").addEventListener("click", (e) => {
  e.preventDefault();
  state.apuesta = state.sueldo;
  apuestasUi();
});

// Apuestas
document.getElementById("apostar").addEventListener("click", (e) => {
  e.preventDefault();
  state.apuesta = Number(document.getElementById("apuesta").value);
  if (
    apuestaCantidadvalida(state.sueldo, state.apuesta) &&
    validarNumero(state.apuesta)
  ) {
    apuestasUi();
  } else {
    state.apuesta = 0;
    alert("Jugando Sin Balance");
  }
});

// Elegir Tipo y validado
document.getElementById("enviarTipo").addEventListener("click", (e) => {
  e.preventDefault();
  state.valorSelecionado = document.getElementById("tipo").value;
  mostrarTipoElegido(state.valorSelecionado);
  mostrarElegirNumero();
});

// Juego Empezar
document.getElementById("formJuego").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("formJuego").style.display = "none";
  state.numeroUsuario = Number(document.getElementById("numeroElegido").value);
  state.numeroMaquina = randomNumero();

  const total = sumarNumero(state.numeroUsuario, state.numeroMaquina);
  const ganador = resultadoPartida(state.valorSelecionado, total);
  actualizarSueldo(ganador);

  document.getElementById("sueldo").textContent = "Balance: " + state.sueldo;
  mostrarResultadoPartida(ganador);
  document.getElementById("resultado").style.display = "block";
  document.getElementById("jugarNuevo").style.display = "block";
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
