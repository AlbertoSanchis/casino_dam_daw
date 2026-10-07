const htmlContainer = document.querySelector(".htmlContenidor");

function createElem(tagName, className, text) {
    const elem = document.createElement(tagName);
    if (className) {
        elem.classList.add(className);
    }
    elem.textContent = text;
    return elem
}

function removeValorAnterior(tagName) {
    const previosResult = htmlContainer.querySelector(tagName);
    if (previosResult) {
        previosResult.remove();
    }
}

function tirarMoneda() {
    let currentMoney = 0;
    let textCont = "";
    htmlContainer.addEventListener("click", function (e) {
        const target = e.target;


        if (target.tagName === "BUTTON" && target.classList.contains("btnTirar")) {
            const randomIndex = Math.floor(Math.random() * 2);
            const inputApostar = document.querySelector(".addMoneyInput")
            const ladoSelection = document.querySelector(".ladoSelection")


            if (randomIndex === 0) {
                textCont = "CARA";
            } else {
                textCont = "CRUZ";
            }

            if (textCont.toUpperCase() === ladoSelection.value.toUpperCase()) {
                currentMoney = currentMoney + Number(inputApostar.value) * 2;
            }

            /* console.log(randomIndex)*/

            removeValorAnterior(".resultadoDinero");
            removeValorAnterior(".resultadoMoneda");

            const monedaValue = createElem("h1", "resultadoMoneda", textCont);
            htmlContainer.append(monedaValue);


            const tuGanasValue = createElem("h2", "resultadoDinero", `Tienes: ${currentMoney}`);
            htmlContainer.append(tuGanasValue);

        }

        if (target.classList.contains("btnClear")) {
            currentMoney = 0;
            const dineroElement = htmlContainer.querySelector(".resultadoDinero");
            dineroElement.textContent = `Tienes: ${currentMoney}`;
        }
    })


}


tirarMoneda();