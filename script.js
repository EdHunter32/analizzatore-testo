console.log("Live Server è attivo! 🚀");
const stopwords = ["la", "il", "e", "è", "di", "a", "che", "in", "un", "con", "per", "su", "le", "gli", "della", "delle", "dei", "dal", "dallo", "sul"];
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
        let vieneRimossa = stopwords.includes(parola);
        if (vieneRimossa) console.log(`Rimossa: ${parola}`);
        return !vieneRimossa;
    });

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




// Funzione per gestire l'input dall'utente e mostrare il risultato
function analizzaEVisualizza() {
    let testo = document.getElementById("inputTesto").value;
    let parole = analizzaTesto(testo);
    let totaleParole = contaParole(parole);
    let paroleFiltrate = filtraStopwords(parole);
    let totaleParoleFiltrate = contaParole(paroleFiltrate);
    let frequenza = contaFrequenza(paroleFiltrate);
    let lunghezzaMediaParole = lunghezzaMedia(paroleFiltrate);

    document.getElementById("totaleParole").textContent = totaleParole;
    document.getElementById("totaleParoleFiltrate").textContent = totaleParoleFiltrate;
    document.getElementById("lunghezzaMedia").textContent = lunghezzaMediaParole;

    let listaFrequenza = document.getElementById("listaFrequenza");
    listaFrequenza.innerHTML = "";

    for (let parola in frequenza) {
        let li = document.createElement("li");
        li.textContent = `${parola}: ${frequenza[parola]} volte`;
        listaFrequenza.appendChild(li);
    }

    // Attiviamo l'animazione
    document.getElementById("risultato").classList.add("show");

    // Disegnare il grafico dopo aver aggiornato i risultati
    disegnaGrafico(frequenza);
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









