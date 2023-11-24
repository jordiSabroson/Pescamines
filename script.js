let files = 0, columnes = 0;
let taula = "<table>";
let percentatge, total;
let aleatori;
let minesArray;

function iniciarPartida() {
    files = prompt("Introdueix un número de files per fer la taula (min 10 i max 30)");
    columnes = prompt("Ara un número de columnes (min 10 i max 30)");

    if (files < 10) {
        files = 10;
    } else if (files > 30) {
        files = 30;
    }

    if (columnes < 10) {
        columnes = 10;
    } else if (columnes > 30) {
        columnes = 30;
    }

    crearTaulell(columnes, files);
    document.querySelector("#iniciar").remove();
}

function crearTaulell(columnes, files) {

    for (let i = 0; i < files; i++) {
        taula += "<tr>";
        for (let a = 0; a < columnes; a++) {
            taula += "<td id='" + i + "," + a +"' onclick='obreCasella(" + i + "," + a +")' data-mina='false'><img src='img/fons.jpg'></td>"
        }
        taula += "</tr>";
    }

    taula += "</table>";

    document.getElementById("taulell").innerHTML = taula;

    setMines();
}

function setMines() {
    total = columnes * files;
    percentatge = Math.floor(total * 0.17);

    calculaAdjacents();
}

function obreCasella(x, y) {
    let casella = document.getElementById(x, y);
    let teMina = casella.getAttribute("data-mina") === "true";

    teMina ? casella.innerHTML = "<img src='img/mina.jpg'></img>" : casella.innerHTML = "1";
}


function calculaAdjacents() {

}


