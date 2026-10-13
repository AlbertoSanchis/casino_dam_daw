// ===== ARRAYS DE COLORES (ruleta europea) =====
const VERDE = [0];
const ROJO  = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const NEGRO = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];


// ===== GIRAR LA RULETA (número aleatorio de 0 a 36) =====
function girarRuleta() {
  const resultado = Math.floor(Math.random() * 37);

  // Quitar el marcado anterior y marcar el número ganador por su id
  document.querySelectorAll(".numero").forEach(n => n.classList.remove("ganador"));
  document.getElementById("num-" + resultado).classList.add("ganador");

  return resultado;
}


// ===== MOSTRAR MENSAJE =====
function mostrar(texto) {
  document.getElementById("resultado").textContent = texto;
}


// ===== JUGAR POR NÚMERO (switch con 37 cases) =====
function jugarNumero() {
  const valor = document.getElementById("inputNumero").value;

  if (valor === "") {
    mostrar("Escribe un número del 0 al 36");
    return;
  }

  const numeroJugador = parseInt(valor);

  switch (numeroJugador) {
    case 0:  case 1:  case 2:  case 3:  case 4:  case 5:  case 6:
    case 7:  case 8:  case 9:  case 10: case 11: case 12: case 13:
    case 14: case 15: case 16: case 17: case 18: case 19: case 20:
    case 21: case 22: case 23: case 24: case 25: case 26: case 27:
    case 28: case 29: case 30: case 31: case 32: case 33: case 34:
    case 35: case 36:
      const resultado = girarRuleta();

      if (numeroJugador === resultado) {
        mostrar("Ha salido el " + resultado + ". ¡HAS GANADO!");
      } else {
        mostrar("Ha salido el " + resultado + ". Has perdido.");
      }
      break;

    default:
      mostrar("Número no válido. Debe estar entre 0 y 36");
  }
}


// ===== JUGAR POR COLOR (3 condiciones + 3 arrays) =====
function jugarColor(colorJugador) {
  const resultado = girarRuleta();
  let colorSalido = "";

  if (VERDE.includes(resultado)) {
    colorSalido = "verde";
  } else if (ROJO.includes(resultado)) {
    colorSalido = "rojo";
  } else if (NEGRO.includes(resultado)) {
    colorSalido = "negro";
  }

  if (colorJugador === colorSalido) {
    mostrar("Ha salido el " + resultado + " (" + colorSalido + "). ¡HAS GANADO!");
  } else {
    mostrar("Ha salido el " + resultado + " (" + colorSalido + "). Has perdido.");
  }
}
