let num1 = 0

function lanzarDado(){
    return Math.floor(Math.random() *6 + 1)
}

function jugar(){
    num1=lanzarDado();
    document.getElementById('dado1').textContent = num1;
    document.getElementById('dado2').textContent = "?";
    document.getElementById('mensaje').textContent = "";

    document.getElementById('botonJugar').disabled = true;
    document.getElementById('botonMayor').disabled = false;
    document.getElementById('botonMenor').disabled = false;
    document.getElementById('botonReiniciar').disabled = true;
}

//Tengo que hacer que vayan los if cuando le de al boton pq de momento va cn el empate unicamente
function adivinar(){
    let num2 = lanzarDado();
    document.getElementById('dado2').textContent = num2;

    let mensaje = document.getElementById("mensaje");

    if(num2 == num1){
        mensaje.textContent = "EMPATE!";

    } else if ( falta= mayor && num2 > num1){
        mensaje.textContent = "GANASTE!";
    } else if ( falta = menor && num2 < num1){
        mensaje.textContent = "GANASTE!";
    } else {
        mensaje.textContent = "PERDISTE"
    }

    document.getElementById('botonMayor').disabled = true;
    document.getElementById('botonMenor').disabled = true;
    document.getElementById('botonReiniciar').disabled = false;

}


function reiniciar(){
    document.getElementById("dado1").textContent = "?";
    document.getElementById("dado2").textContent = "?"; 
    document.getElementById('mensaje').textContent = "";

    document.getElementById('botonJugar').disabled = false;
    document.getElementById('botonMayor').disabled = true;
    document.getElementById('botonMenor').disabled = true;
    document.getElementById('botonReiniciar').disabled = true;
}