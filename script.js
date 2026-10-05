const cards = ["🐶", "🐱", "🐭", "🐹", "🐶", "🐱", "🐭", "🐹"];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let matchedPairs = 0;

let bestScore = localStorage.getItem("bestScore") || 0;

const game = document.getElementById("game");

const scoreText = document.createElement("p");
scoreText.id = "score";
game.parentElement.insertBefore(scoreText, game);

function updateScore() {
    scoreText.textContent =
        "Score: " + score + " | Best Score: " + bestScore;
}

function shuffle() {
    cards.sort(() => Math.random() - 0.5);
}

function createGame() {
    game.innerHTML = "";
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    score = 0;
    matchedPairs = 0;

    shuffle();
    updateScore();

    cards.forEach((card) => {
        const button = document.createElement("button");

        button.textContent = "❓";
        button.dataset.card = card;

        button.style.fontSize = "35px";
        button.style.width = "80px";
        button.style.height = "80px";

        button.onclick = () => flipCard(button);

        game.appendChild(button);
    });
}

function flipCard(button) {
    if (lockBoard || button === firstCard || button.disabled) {
        return;
    }

    button.textContent = button.dataset.card;

    if (!firstCard) {
        firstCard = button;
        return;
    }

    secondCard = button;
    score++;
    lockBoard = true;

    if (firstCard.dataset.card === secondCard.dataset.card) {
        firstCard.disabled = true;
        secondCard.disabled = true;

        matchedPairs++;
        resetTurn();

        if (matchedPairs === 4) {
            if (bestScore === 0 || score < bestScore) {
                bestScore = score;
                localStorage.setItem("bestScore", bestScore);
            }

            updateScore();

            setTimeout(() => {
                alert("🎉 You won! Best Score: " + bestScore);
            }, 300);
        }
    } else {
        setTimeout(() => {
            firstCard.textContent = "❓";
            secondCard.textContent = "❓";
            resetTurn();
        }, 800);
    }

    updateScore();
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

createGame();
