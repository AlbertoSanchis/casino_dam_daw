(() => {
// Rutas de imágenes y saldo inicial de la demostración, expresado en céntimos.
const CARD_IMAGE_BASE = "https://deckofcardsapi.com/static/img/";
const CARD_BACK_IMAGE = `${CARD_IMAGE_BASE}back.png`;
const INITIAL_BALANCE = 125000;

// Referencias a los elementos HTML que la lógica de la partida actualiza.
const elements = {
  betInput: document.querySelector("#bet-amount"),
  dealButton: document.querySelector("#deal-button"),
  turnButtons: document.querySelector("#turn-buttons"),
  hitButton: document.querySelector("#hit-button"),
  standButton: document.querySelector("#stand-button"),
  balance: document.querySelector("#balance-amount"),
  dealerCards: document.querySelector("#dealer-cards"),
  playerCards: document.querySelector("#player-cards"),
  dealerScore: document.querySelector("#dealer-score"),
  playerScore: document.querySelector("#player-score"),
  message: document.querySelector("#game-message"),
  round: document.querySelector(".round-label strong"),
  balanceWhole: document.querySelector("#balance-whole"),
  balanceCents: document.querySelector("#balance-cents"),
};

// Estado volátil del juego. Se reinicia al recargar y no se guarda en el servidor.
const state = {
  balance: INITIAL_BALANCE,
  bet: Number(elements.betInput.value),
  deck: [],
  dealer: [],
  player: [],
  hiddenPlayerCard: null,
  hiddenPlayerCardRevealed: false,
  round: 0,
  status: "ready",
  imageError: false,
};

// Construye una baraja estándar de 52 cartas y la mezcla con Fisher-Yates.
function createDeck() {
  const suits = ["S", "H", "D", "C"];
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"];
  const deck = suits.flatMap((suit) =>
    ranks.map((rank) => ({
      code: `${rank}${suit}`,
      image: `${CARD_IMAGE_BASE}${rank}${suit}.png`,
    })),
  );

  for (let index = deck.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [deck[index], deck[randomIndex]] = [deck[randomIndex], deck[index]];
  }

  return deck;
}

// Extrae la siguiente carta del mazo o comunica que ya no quedan cartas.
function drawCard() {
  const card = state.deck.pop();
  if (!card) {
    throw new Error("No quedan cartas en el mazo para continuar la partida.");
  }
  return card;
}

// Convierte el código del rango de la carta en su valor de blackjack.
function cardValue(code) {
  const rank = code.slice(0, -1);
  if (rank === "A") return 11;
  if (["J", "Q", "K", "0"].includes(rank)) return 10;
  return Number(rank);
}

// Suma una mano y convierte los ases de 11 a 1 cuando la puntuación se pasa de 21.
function handScore(cards) {
  let score = cards.reduce((total, card) => total + cardValue(card.code), 0);
  let aces = cards.filter((card) => card.code.startsWith("A")).length;

  while (score > 21 && aces > 0) {
    score -= 10;
    aces -= 1;
  }

  return score;
}

// Presenta una cantidad en formato monetario español, con dos decimales.
function formatMoney(value) {
  return value.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Actualiza el saldo visible y bloquea la apuesta mientras la ronda está activa.
function updateBalance() {
  const [whole, cents] = formatMoney(state.balance / 100).split(",");
  elements.balanceWhole.textContent = whole;
  elements.balanceCents.textContent = `,${cents ?? "00"}`;
  elements.betInput.disabled = state.status === "playing";
}

// Muestra un mensaje y, si corresponde, aplica una clase visual de resultado.
function setMessage(message, result = "") {
  elements.message.textContent = message;
  elements.message.className = `table-note${result ? ` result-${result}` : ""}`;
}

// Crea una imagen de carta; ante un fallo de red muestra una alternativa textual.
function createCardImage(card, hidden = false) {
  const image = document.createElement("img");
  image.className = `card-placeholder playing-card${hidden ? " card-back" : ""}`;
  image.src = hidden ? CARD_BACK_IMAGE : card.image;
  image.alt = hidden ? "Carta boca abajo" : `Carta ${card.code}`;
  image.draggable = false;
  image.addEventListener("error", () => {
    const fallback = document.createElement("div");
    fallback.className = "card-placeholder playing-card card-error";
    fallback.setAttribute("role", "img");
    fallback.setAttribute("aria-label", image.alt);
    fallback.textContent = hidden ? "Reverso no disponible" : `Carta ${card.code}`;
    image.replaceWith(fallback);
    if (!state.imageError) {
      state.imageError = true;
      setMessage("No se pudo cargar una imagen de carta. Comprueba tu conexión a internet.");
    }
  });
  return image;
}

// Vuelve a dibujar las cartas y las puntuaciones de ambas manos en el HTML.
function renderHands() {
  elements.dealerCards.replaceChildren();
  elements.playerCards.replaceChildren();

  state.dealer.forEach((card) => {
    elements.dealerCards.append(createCardImage(card));
  });

  if (state.hiddenPlayerCard && !state.hiddenPlayerCardRevealed) {
    elements.playerCards.append(createCardImage(state.hiddenPlayerCard, true));
  }

  state.player.forEach((card) => {
    elements.playerCards.append(createCardImage(card));
  });

  elements.playerScore.textContent = state.player.length
    ? String(handScore(state.player))
    : "—";
  elements.dealerScore.textContent = state.dealer.length
    ? String(handScore(state.dealer))
    : "—";
}

// Valida la apuesta: más de $5, hasta dos decimales y no mayor que el saldo.
// Devuelve el importe en céntimos para evitar cálculos monetarios con decimales binarios.
function validateBet() {
  const value = elements.betInput.value;
  const amount = Number(value);
  if (!/^\d+(?:\.\d{1,2})?$/.test(value) || !Number.isFinite(amount) || amount <= 5) {
    setMessage("Introduce una apuesta con hasta dos decimales y mayor que $5.");
    elements.betInput.focus();
    return null;
  }
  const bet = Math.round(amount * 100);
  if (bet > state.balance) {
    setMessage("Tu apuesta no puede superar el saldo disponible.");
    elements.betInput.focus();
    return null;
  }
  return bet;
}

// Cierra la ronda, calcula el pago según el resultado y ofrece iniciar otra.
function finishRound(result, message) {
  state.status = "finished";
  if (result === "win") state.balance += state.bet * 2;
  if (result === "draw") state.balance += state.bet;
  updateBalance();
  elements.dealButton.hidden = false;
  elements.dealButton.querySelector("span:nth-child(2)").textContent = "Nueva partida";
  elements.turnButtons.hidden = true;
  setMessage(message, result);
}

// Cierra la ronda por error y devuelve la apuesta al saldo de demostración.
function abortRound(message) {
  state.status = "finished";
  state.balance += state.bet;
  updateBalance();
  elements.dealButton.hidden = false;
  elements.dealButton.querySelector("span:nth-child(2)").textContent = "Reintentar";
  elements.turnButtons.hidden = true;
  setMessage(message);
}

// Revela una sola vez la carta que comenzó boca abajo y la añade a la mano del jugador.
function revealPlayerCard() {
  if (state.hiddenPlayerCard && !state.hiddenPlayerCardRevealed) {
    state.player.push(state.hiddenPlayerCard);
    state.hiddenPlayerCardRevealed = true;
  }
}

// Comprueba si el jugador ya ha ganado con 21 o perdido por superar 21.
function settlePlayerHand() {
  const score = handScore(state.player);
  renderHands();

  if (score > 21) {
    finishRound("loss", `Te has pasado con ${score}. Has perdido la apuesta.`);
    return true;
  }
  if (score === 21) {
    finishRound("win", "¡21! Has ganado la partida.");
    return true;
  }
  return false;
}

// Valida la apuesta, prepara una baraja y reparte las cartas iniciales.
function startRound() {
  const bet = validateBet();
  if (bet === null) return;

  state.bet = bet;
  state.balance -= bet;
  state.deck = createDeck();
  state.dealer = [drawCard()];
  state.player = [drawCard()];
  state.hiddenPlayerCard = drawCard();
  state.hiddenPlayerCardRevealed = false;
  state.round += 1;
  state.status = "playing";
  state.imageError = false;

  elements.round.textContent = String(state.round).padStart(2, "0");
  elements.dealButton.hidden = true;
  elements.turnButtons.hidden = false;
  renderHands();
  updateBalance();

  const openingScore = handScore([...state.player, state.hiddenPlayerCard]);
  if (openingScore >= 21) {
    revealPlayerCard();
    renderHands();
    if (openingScore === 21) {
      finishRound("win", "¡21! Has ganado la partida.");
    } else {
      finishRound("loss", `Te has pasado con ${openingScore}. Has perdido la apuesta.`);
    }
    return;
  }

  setMessage("Tu turno: pulsa Hit para revelar tu carta y pedir otra al crupier, o plántate.");
}

// Ejecuta la acción Hit y comprueba inmediatamente el resultado de las manos.
function hit() {
  if (state.status !== "playing") return;

  try {
    if (!state.hiddenPlayerCardRevealed) {
      revealPlayerCard();
      state.dealer.push(drawCard());
    } else {
      state.player.push(drawCard());
      state.dealer.push(drawCard());
    }
    renderHands();

    if (settlePlayerHand()) return;
    const dealerScore = handScore(state.dealer);
    if (dealerScore > 21) {
      finishRound("win", `El crupier se ha pasado con ${dealerScore}. ¡Has ganado!`);
      return;
    }
    setMessage(`Tu puntuación es ${handScore(state.player)}. Puedes pedir otra carta o plantarte.`);
  } catch (error) {
    abortRound(`${error.message} Tu apuesta ha sido devuelta.`);
  }
}

// Revela la carta del jugador y hace que el crupier robe hasta superar su puntuación.
function stand() {
  if (state.status !== "playing") return;

  try {
    revealPlayerCard();
    renderHands();
    const playerScore = handScore(state.player);

    if (playerScore > 21) {
      finishRound("loss", `Te has pasado con ${playerScore}. Has perdido la apuesta.`);
      return;
    }
    if (playerScore === 21) {
      finishRound("win", "¡21! Has ganado la partida.");
      return;
    }

    while (handScore(state.dealer) <= playerScore) {
      state.dealer.push(drawCard());
    }
    renderHands();

    const dealerScore = handScore(state.dealer);
    if (dealerScore > 21) {
      finishRound("win", `El crupier se ha pasado con ${dealerScore}. ¡Has ganado!`);
    } else {
      finishRound("loss", `El crupier tiene ${dealerScore}, más que tus ${playerScore}. Has perdido.`);
    }
  } catch (error) {
    renderHands();
    abortRound(`${error.message} Tu apuesta ha sido devuelta.`);
  }
}

// Conecta los botones del HTML con las acciones y muestra el saldo inicial.
elements.dealButton.addEventListener("click", startRound);
elements.hitButton.addEventListener("click", hit);
elements.standButton.addEventListener("click", stand);
updateBalance();
})();
