// Lista de símbolos que pueden aparecer en cada rodillo.
const emoji = ["cereza", "limon", "naranja", 7];

// Elige y devuelve un elemento aleatorio de la lista recibida.
function resultado(emoji) {
  // Math.random genera un número aleatorio; Math.floor lo convierte en un índice entero.
  let indice = Math.floor(Math.random() * emoji.length);
  return emoji[indice];
}

// Busca en el HTML los rodillos, el botón y el espacio donde aparecerá el resultado.
const rodillos = document.querySelectorAll(".slot");
const boton = document.querySelector("#girar");
const mensaje = document.querySelector("#mensaje");

// Relaciona cada valor de la lista con el símbolo que verá el jugador.
const simbolosVisibles = {
  cereza: "🍒",
  limon: "🍋",
  naranja: "🍊",
  7: "7️⃣",
};

// Ejecuta una partida: obtiene tres resultados y actualiza los rodillos.
function jugar() {
  let slot1 = resultado(emoji);
  let slot2 = resultado(emoji);
  let slot3 = resultado(emoji);

  // Convierte cada resultado en su símbolo visible y lo coloca en su rodillo.
  rodillos[0].textContent = simbolosVisibles[slot1];
  rodillos[1].textContent = simbolosVisibles[slot2];
  rodillos[2].textContent = simbolosVisibles[slot3];

  // Se gana únicamente cuando los tres valores obtenidos son iguales.
  if (slot1 === slot2 && slot2 === slot3) {
    mensaje.textContent = "¡Has ganado!";
  } else {
    mensaje.textContent = "Has perdido. ¡Inténtalo otra vez!";
  }
}

// Al pulsar GIRAR, empieza una nueva partida.
boton.addEventListener("click", jugar);
