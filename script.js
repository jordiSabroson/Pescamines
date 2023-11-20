let files = 0, columnes = 0;
let taula = "<table>";
let percentatge;
function iniciarPartida() {
    files = prompt("Introdueix un número de columnes per fer la taula (min 10 i max 30)");
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

    percentatge = ((columnes / files * 100) / 17).toFixed(0);

    alert(percentatge);
    for (let i = 0; i < files; i++) {
        taula += "<tr>";
        for (let a = 0; a < columnes; a++) {
            taula += "<td onclick='obreCasella()'><img src='img/fons.jpg'></td>"
        }
        taula += "</tr>";
    }

    taula += "</table>";
    
    document.getElementById("taulell").innerHTML = taula;
}

function obreCasella() {

}


