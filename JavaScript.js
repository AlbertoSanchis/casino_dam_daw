const OpcionesJuego = Object.freeze({
    PIEDRA: 0,
    PAPEL: 1,
    TIJERA: 2,

})

document.getElementById('formulario').addEventListener('submit', function (e) {
    if (!valida()) {
        e.preventDefault();
    }
});


document.addEventListener('DOMContentLoaded', () => {

    let random = Math.floor(Math.random() * 3);
    let palabra;
    let opc1, opc2;



    function CodificarPalabra(palabra) {

        switch (palabra) {
            case piedra: return OpcionesJuego.PIEDRA;
            case papel: return OpcionesJuego.PAPEL;
            case tijera: return OpcionesJuego.TIJERA;
        }
    }

    function Piedra(opc1, opc2) {
        if (opc1 == OpcionesJuego.PIEDRA && opc2 == OpcionesJuego.PAPEL) {
            console.log("has perdido");
        } else {
            console.log("has ganado")
        }
        if (opc1 == OpcionesJuego.PIEDRA && opc2 == OpcionesJuego.Tijera) {
            console.log("has has ganado");
        } else {
            console.log("has perdido")
        }
    }

    function Papel(opc1, opc2) {
        if (opc1 == OpcionesJuego.PAPEL && opc2 == OpcionesJuego.PIEDRA) {
            console.log("has ganado");
        } else {
            console.log("has perdido")
        }
        if (opc1 == OpcionesJuego.PAPEL && opc2 == OpcionesJuego.Tijera) {
            console.log("has perdido");
        } else {
            console.log("has ganado")
        }

    function Tijera(opc1, opc2) {
        if (opc1 == OpcionesJuego.TIJERA && opc2 == OpcionesJuego.PAPEL) {
            console.log("has ganado");
        } else {
            console.log("has perdido")
        }
        if (opc1 == OpcionesJuego.TIJERA && opc2 == OpcionesJuego.PIEDRA) {
            console.log("has perdido");
        } else {
            console.log("has ganado")
        }
    }


});