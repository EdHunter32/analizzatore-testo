console.log("Live Server è attivo! 🚀");
const stopwords = [
    "la", "le", "il", "lo", "gli", "i", "un", "uno", "una", "delle", "dei", "della", "dal", "dallo",
    "di", "a", "da", "in", "con", "su", "per", "tra", "fra", "e", "è", "che", "come", "quando", "dove",
    "mentre", "chi", "quale", "quanto", "quanti", "quanta", "questa", "questo", "quelle", "quelli",
    "ma", "se", "allora", "anche", "poi", "così", "adesso", "oltre", "ancora", "proprio", "quindi"
];
// Funzione per analizzare il testo e restituire l'array di parole pulite
function analizzaTesto(testo) {
    console.log("Testo ricevuto:", testo);

    let parole = testo
        .toLowerCase()
        .replace(/[.,!?;:]/g, '')  // Rimuove la punteggiatura
        .trim() // Rimuove spazi iniziali e finali
        .split(/\s+/) // Divide in parole evitando doppi spazi
        .filter(parola => parola.length > 0); // Rimuove parole vuote

    console.log("Array di parole pulite:", parole);
    return parole;
}


function filtraStopwords(parole) {
    let paroleFiltrate = parole.filter(parola => {
        let parolaFiltrata = parola.toLowerCase(); // Convertiamo tutto in minuscolo
        let vieneRimossa = stopwords.includes(parolaFiltrata); // Controlliamo se è una stopword
        if (vieneRimossa) console.log(`Rimossa: ${parola}`); // Log per debug
        return !vieneRimossa; // Manteniamo solo le parole non stopwords
    });

    console.log("Parole finali dopo il filtraggio:", paroleFiltrate); // Log per debug finale
    return paroleFiltrate;
}




function contaParole(parole) {
    return parole.length; // Il numero di elementi nell'array di parole
}

function contaFrequenza(parole) {
    return parole.reduce((acc, parola) => {
        acc[parola] = (acc[parola] || 0) + 1; // Se la parola esiste, incrementa; altrimenti inizia da 1
        return acc;
    }, {});
}

function lunghezzaMedia(parole) {
    if (parole.length === 0) return 0; // Evita divisione per 0

    let totaleLettere = parole.reduce((acc, parola) => acc + parola.length, 0);
    return (totaleLettere / parole.length).toFixed(2); // Due decimali
}

function lunghezzaMediaFrasi(testo) {
    let frasi = testo
        .split(/[.!?]+/)  // Divide il testo su ., ! e ?
        .map(frase => frase.trim())  // Rimuove spazi iniziali e finali da ogni frase
        .filter(frase => frase.length > 0); // Elimina eventuali frasi vuote

    let numeroFrasi = frasi.length;

    console.log("Frasi trovate (dopo pulizia):", frasi); // Debug: stampa le frasi senza spazi iniziali
    console.log("Numero di frasi:", numeroFrasi);

    if (numeroFrasi === 0) return 0;

    let totaleParole = frasi.reduce((acc, frase) => {
        let numeroParole = frase.split(/\s+/).length; // Conta le parole nella frase
        console.log(`Parole nella frase "${frase}":`, numeroParole); // Debug: mostra parole per frase
        return acc + numeroParole;
    }, 0);

    console.log("Totale parole:", totaleParole);
    return (totaleParole / numeroFrasi).toPrecision(3); // Mantiene due decimali
}

function trovaParolaPiuLunga(parole) {
    if (parole.length === 0) return ""; // Se non ci sono parole, restituisce stringa vuota
    return parole.reduce((max, parola) => parola.length > max.length ? parola : max, "");
}

function trovaParolaPiuCorta(parole) {
    let paroleFiltrate = parole.filter(parola => !stopwords.includes(parola)); // Rimuove stopwords
    if (paroleFiltrate.length === 0) return ""; // Se tutte le parole sono stopwords, restituisce stringa vuota
    return paroleFiltrate.reduce((min, parola) => parola.length < min.length ? parola : min, paroleFiltrate[0]);
}






/**
 * Analizza il testo e aggiorna i risultati nella UI.
 */
function analizzaEVisualizza() {
    let testo = document.getElementById("inputTesto").value;
    let parole = analizzaTesto(testo);
    let totaleParole = contaParole(parole);
    let paroleFiltrate = filtraStopwords(parole);
    let totaleParoleFiltrate = contaParole(paroleFiltrate);
    let frequenza = contaFrequenza(paroleFiltrate);
    let lunghezzaMediaParole = lunghezzaMedia(paroleFiltrate);
    let lunghezzaMediaFrasiVal = lunghezzaMediaFrasi(testo); // Nuovo valore
    let parolaPiuLunga = trovaParolaPiuLunga(parole);
    let parolaPiuCorta = trovaParolaPiuCorta(parole);

    aggiornaUI({
        totaleParole,
        totaleParoleFiltrate,
        lunghezzaMediaParole,
        lunghezzaMediaFrasiVal,
        parolaPiuLunga,
        parolaPiuCorta,
        frequenza
    });

    disegnaGrafico(frequenza);
}

// 🔹 Funzione separata per aggiornare l'interfaccia utente
function aggiornaUI(dati) {
    document.getElementById("totaleParole").textContent = dati.totaleParole;
    document.getElementById("totaleParoleFiltrate").textContent = dati.totaleParoleFiltrate;
    document.getElementById("lunghezzaMedia").textContent = dati.lunghezzaMediaParole;
    document.getElementById("lunghezzaMediaFrasi").textContent = dati.lunghezzaMediaFrasiVal;
    document.getElementById("parolaPiuLunga").textContent = dati.parolaPiuLunga;
    document.getElementById("parolaPiuCorta").textContent = dati.parolaPiuCorta;

    let listaFrequenza = document.getElementById("listaFrequenza");
    listaFrequenza.innerHTML = "";

    for (let parola in dati.frequenza) {
        let li = document.createElement("li");
        li.textContent = `${parola}: ${dati.frequenza[parola]} volte`;
        listaFrequenza.appendChild(li);
    }
}

function pulisciTesto() {
    document.getElementById("inputTesto").value = ""; // Cancella l'input

    let elementiDaSvuotare = [
        "totaleParole", "totaleParoleFiltrate", "lunghezzaMedia", "lunghezzaMediaFrasi",
        "parolaPiuLunga", "parolaPiuCorta", "contaCaratteri", "contaParole"
    ];

    elementiDaSvuotare.forEach(id => document.getElementById(id).textContent = "0");

    document.getElementById("listaFrequenza").innerHTML = "";

    if (window.graficoFrequenza instanceof Chart) {
        window.graficoFrequenza.destroy();
    }
}


function aggiornaContatori() {
    let testo = document.getElementById("inputTesto").value;

    let numeroCaratteri = testo.length;
    let numeroParole = testo.trim().length > 0 ? testo.trim().split(/\s+/).length : 0; // Contiamo le parole evitando spazi doppi

    document.getElementById("contaCaratteri").textContent = numeroCaratteri;
    document.getElementById("contaParole").textContent = numeroParole;
}



function disegnaGrafico(frequenza) {
    let ctx = document.getElementById("graficoFrequenza").getContext("2d");

    let parole = Object.keys(frequenza); // Estrarre le parole
    let valori = Object.values(frequenza); // Estrarre la frequenza di ogni parola

    // Controlliamo se il grafico esiste e distruggiamolo solo se è stato creato prima
    if (window.graficoFrequenza instanceof Chart) {
        window.graficoFrequenza.destroy();
    }

    // Creiamo un nuovo grafico a barre
    window.graficoFrequenza = new Chart(ctx, {
        type: "bar",
        data: {
            labels: parole,
            datasets: [{
                label: "Frequenza",
                data: valori,
                backgroundColor: "rgba(0, 123, 255, 0.5)", // Blu trasparente
                borderColor: "rgba(0, 123, 255, 1)", // Bordo blu
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}









