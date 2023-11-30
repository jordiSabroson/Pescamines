/** Declaració de les variables principals que s'utilitzen durant l'script **/
// Files i columnes inicialitzades a 0
let files = 0, columnes = 0;

// String on generarem la taula que anirà al HTML
let taula = "<table>";

// 
let percentatge, total;
let casella;
let minesArray;

// Aquesta funció s'executa al clicar el botó d'iniciar partida
function iniciarPartida() {
    // Demanem el número de files i columnes que tindrà la taula del pescamines
    files = prompt("Introdueix un número de files per fer la taula (min 10 i max 30)");
    columnes = prompt("Ara un número de columnes (min 10 i max 30)");

    // Com que el mínim de files és 10 i el màxim 30, aquests condicionals controlen que no s'introdueixin altres valors
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

    // Cridem a la funció per crear el taulell amb el nombre definitiu de files i columnes
    crearTaulell(columnes, files);

    // Eliminem el botó d'iniciar partida de l'HTML
    document.querySelector("#iniciar").remove();
}

function crearTaulell(columnes, files) {

    // Bucle aniuat que recorre el número de files i afegeix un <tr> a l'string taula per cada iteració
    for (let i = 0; i < files; i++) {
        taula += "<tr>";

        // Bucle que per cada iteració de files crea les columnes corresponents afegint un <td> a l'string taula amb els atributs
        for (let a = 0; a < columnes; a++) {

            /**  Les cel·les de la taula tenen un id amb la seva posició, un onclick que invoca a la funció obreCasella amb la seva posició i 
            *    una custom propertie "data-mina" a false. El contingut de la cel·la de moment és el mateix per totes que és un fons vermell.*/
            taula += "<td id='" + i + "," + a + "' onclick='obreCasella(" + i + "," + a + ")' data-mina='false'><img src='img/fons.jpg'></td>"
        }

        // Tanquem el <tr> quan el segon bucle acaba d'iterar
        taula += "</tr>";
    }

    // Quan els dos bucles acaben tanquem la taula
    taula += "</table>";

    // Posem la string taula al div "taulell" de l'HTML
    document.getElementById("taulell").innerHTML = taula;

    // Invoquem a la funció setMines() per distribuïr les mines pel taulell
    setMines();
}

function setMines() {
    // Calcul del total de caselles de la taula
    total = columnes * files;

    // Com que el 17% de la taula ha de tenir mines, calculem el total de les mines per 0.17
    percentatge = Math.floor(total * 0.17);

    // Inicialitzem l'array de mines on aniran les coordenades de les caselles amb mines per no tenir repetits
    minesArray = [];

    // Bucle que recorre el número de mines que haurà de tenir el taulell i les assigna
    for (let i = 0; i < percentatge; i++) {

        // Aconseguim un valor aleatori entre 0 i el nombre de nombre de files -1 que seran la fila i la columna on estara la mina
        let filaRandom = Math.floor(Math.random() * files);
        let columnaRandom = Math.floor(Math.random() * columnes);

        // Assignem els valors a una variable que sera l'id d'on estarà la mina
        let idMina = filaRandom + "," + columnaRandom;

        // Si la id de la mina coincideix amb una que ja s'ha generat abans, es torna a generar una fila i columna aleatòria
        while (minesArray.includes(idMina)) {
            filaRandom = Math.floor(Math.random() * files);
            columnaRandom = Math.floor(Math.random() * columnes);
            idMina = filaRandom + "," + columnaRandom;
        }

        // Afegim l'id de la mina a l'array
        minesArray.push(idMina);

        // Recuperem la casella amb l'ID que ha sortit aleatòriament i li canviem el custom propertie "data-mina" a true
        casella = document.getElementById(idMina);
        casella.setAttribute("data-mina", "true");
    }
}

function esMina(x, y) {
    // Variable booleana que agafa la casella pel seu ID i si el propertie "data-mina" és true, s'assigna a true
    let teMina = document.getElementById(x + "," + y).getAttribute("data-mina") == "true";

    // Retornem el booleà. Si hi ha mina retorna true, si no retorna false
    return teMina;
}

// Funció que s'invoca al clicar una casella
function obreCasella(x, y) {
    // // Assignem la casella amb l'id a una variable "casella"
    casella = document.getElementById(x + "," + y);

    // // Variable booleana que si el propertie "data-mina" és true, s'assigna a true
    // let teMina = casella.getAttribute("data-mina") == "true";

    // Si la casella té mina, es canvia el seu contingut per la imatge de la mina
    if (esMina(x, y)) {
        casella.innerHTML = "<img src='img/mina.jpg'></img>";

        // A més, s'invoca a la funció revelarMines() per revelar totes les mines del taulell
        revelarMines();
        // Es mostra un alert indicant que s'ha perdut la partida amb una mica de delay
        setTimeout(function () { alert("Has perdut :("); }, 50);

    } else {

        // Si la casella no té mina, invoquem la funció calculaAdjacents amb la posició de la mina
        let minesAdjacents = calculaAdjacents(x, y);


        if (minesAdjacents == 0) {
            // No he aconseguit fer la recursivitat :(
            // for (let i = x - 1; i <= x + 1; i++) {
            //     for (let a = y - 1; a <= y + 1; a++) {
            //         if (i < 0 || i >= files || a < 0 || a >= columnes) {
            //             continue;
            //         }
            //         obreCasella(i, a);
            //     }
            // }
            casella.innerHTML = "0";
        } else {
            casella.innerHTML = minesAdjacents;
        }
        // S'elimina l'atribut onclick de la casella
        casella.setAttribute("onclick", "");
    }
}

// Funció que itera sobre tot el tauler i agafa les caselles amb "data-mina" = true i les revela
function revelarMines() {
    for (let i = 0; i < files; i++) {
        for (let a = 0; a < columnes; a++) {
            casella = document.getElementById(i + "," + a);

            // Amb la funció esMina, si dóna true es revelen totes les mines
            if (esMina(i, a)) {
                casella.innerHTML = "<img src='img/mina.jpg'></img>";
            }
        }
    }
}

// Funció per calcular les mines adjacents a la casella clicada
function calculaAdjacents(x, y) {

    // Inicialitzem el nombre de mines adjacents a 0
    let minesAdjacents = 0;

    // Bucle que utilitza dos bucles for simples per recórrer les caselles adjacents a la casella clicada
    for (let i = x - 1; i <= x + 1; i++) {
        for (let a = y - 1; a <= y + 1; a++) {
            if (i < 0 || i >= files || a < 0 || a >= columnes) {
                continue; // Ignorar les caselles fora del tauler
            }

            // Si la casella actual té l'atribut "data-mina" == true, s'incrementa la variable que es retornarà
            if (document.getElementById(i + "," + a).getAttribute("data-mina") == "true") {
                minesAdjacents++;
            }
        }
    }
    return minesAdjacents;
}

