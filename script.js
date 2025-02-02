// script.js

// La combinazione segreta generata casualmente (4 numeri tra 0 e 5)
let secretCombination = [];
let attemptsLeft = 10;

// Funzione per generare una combinazione segreta
function generateSecretCombination() {
    let usedColors = [];
    while (secretCombination.length < 4) {
        let color = Math.floor(Math.random() * 6);
        if (!usedColors.includes(color)) {
            secretCombination.push(color);
            usedColors.push(color);
        }
    }
}

// Funzione per fare un tentativo
function makeAttempt() {
    if (attemptsLeft <= 0) return;

    let input = document.getElementById("attempt").value.trim();
    let attemptArray = input.split(" ").map(num => parseInt(num));

    if (attemptArray.length !== 4 || attemptArray.some(num => num < 0 || num > 5)) {
        alert("Inserisci un tentativo valido con 4 numeri tra 0 e 5.");
        return;
    }

    let feedback = evaluateAttempt(attemptArray);
    displayAttempt(attemptArray, feedback);
    checkGameOver(feedback);

    attemptsLeft--;
    document.getElementById("attempt").value = "";
}

// Funzione per valutare il tentativo
function evaluateAttempt(attempt) {
    let black = 0;
    let white = 0;
    let secretCopy = [...secretCombination];
    let attemptCopy = [...attempt];

    // Controlla le pedine nere (giusto colore e giusta posizione)
    for (let i = 0; i < 4; i++) {
        if (attempt[i] === secretCombination[i]) {
            black++;
            secretCopy[i] = null;
            attemptCopy[i] = null;
        }
    }

    // Controlla le pedine bianche (giusto colore ma posizione sbagliata)
    for (let i = 0; i < 4; i++) {
        if (attemptCopy[i] !== null) {
            let idx = secretCopy.indexOf(attemptCopy[i]);
            if (idx !== -1) {
                white++;
                secretCopy[idx] = null;
            }
        }
    }

    return { black, white };
}

// Funzione per visualizzare il tentativo e il feedback
function displayAttempt(attempt, feedback) {
    let attemptList = document.getElementById("attempt-list");
    let listItem = document.createElement("li");
    listItem.textContent = `Tentativo: ${attempt.join(" ")} | Nere: ${feedback.black} | Bianche: ${feedback.white}`;
    attemptList.appendChild(listItem);
}

// Funzione per controllare se il gioco è finito
function checkGameOver(feedback) {
    if (feedback.black === 4) {
        document.getElementById("feedback").textContent = "Complimenti! Hai indovinato la combinazione!";
        document.getElementById("game-over").style.display = "block";
        document.getElementById("secret-combination").textContent = secretCombination.join(" ");
        document.querySelector(".game-controls").style.display = "none";
    } else if (attemptsLeft === 0) {
        document.getElementById("feedback").textContent = "Hai esaurito i tentativi! La combinazione segreta era: " + secretCombination.join(" ");
        document.getElementById("game-over").style.display = "block";
        document.getElementById("secret-combination").textContent = secretCombination.join(" ");
        document.querySelector(".game-controls").style.display = "none";
    } else {
        document.getElementById("feedback").textContent = `Tentativi rimasti: ${attemptsLeft}`;
    }
}

// Inizializza il gioco
function startGame() {
    generateSecretCombination();
}

startGame();
