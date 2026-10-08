// let resultado;
// document.getElementById("sueldo").innerHTML += " " + sueldo;
// const typo = document.getElementById("typoElegir");
// const typoElegido = document.getElementById("typoElegido");
// const h2typoElegido = document.getElementById("h2TypoElegido");

// document.getElementById("numeroEnviar").addEventListener("click", (e) => {
//   e.preventDefault(); // previene la accion de default
//   // Coge el numero del Usuario
//   numeroUsuario = document.getElementById("numeroElegido").value;
//   // Crea el numero aleatorio para la máquina y la almacena
//   numeroMaquina = randomNumero();
//   // Modifica el html para mostrar el numero del usuario y de la maquina seleccionadas
//   document.getElementById("tuNumero").innerHTML = "Tu Número: " + numeroUsuario;
//   document.getElementById("numeroMaquina").innerHTML =
//     "Número Maquina: " + numeroMaquina;
//   // Esto es el total de la suma de los numeros elejidos
//   total = sumarNumero(numeroUsuario, numeroMaquina);
//   // resultado de quien ha ganado
//   resultado = resultadoPartida(valorSelecionado, total);
//   // Actualizamos el sueldo que se ve por pantalla del jugador
//   actualizarSueldo(resultado);
//   document.getElementById("sueldo").innerHTML = "Balance Disponible: " + sueldo;
//   console.log(sueldo);
//   // Muestra quien ha ganado
//   mostrarResultadoPartida(resultado);
// });

// document.getElementById("jugarNuevo").addEventListener("click", (e) => {
//   e.preventDefault();
// });

// document.getElementById("apostar").addEventListener("click", (e) => {
//   e.preventDefault();
//   apuesta = document.getElementById("apuesta").value;
//   let apostado = document.getElementById("apostado");
//   if (apuestaCantidadvalida(sueldo, apuesta) && checkerNoVacio(apuesta)) {
//     apuesta = Number(apuesta);
//     apostado.innerHTML = "Cantidad Apostado: " + apuesta;
//     apostado.style.display = "block";
//     document.getElementById("Apuestas").style.display = "none";
//     document.getElementById("juego").style.display = "block";
//   } else {
//     apuesta = 0;
//     alert("Apuesta Invalida Intenta de nuevo");
//   }
// });
