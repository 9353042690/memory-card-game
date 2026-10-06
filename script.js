const cards = [
    "🐶", "🐱", "🐭", "🐹",
    "🐶", "🐱", "🐭", "🐹"
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let matchedPairs = 0;

let bestScore = Number(localStorage.getItem("bestScore")) || 0;

const game = document.getElementById("game-board");
const scoreText = document.getElementById("score");
const bestText = document.getElementById("best");
const restartButton = document.getElementById("restart");

function updateScore() {
    scoreText.textContent = score;
    bestText.textContent = bestScore;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createGame() {
    game.innerHTML = "";

    firstCard = null;
    secondCard = null;
    lockBoard = false;
    score = 0;
    matchedPairs = 0;

    const shuffledCards = shuffle([...cards]);

    shuffledCards.forEach((card) => {
        const button = document.createElement("button");

        button.className = "card";
        button.textContent = "❓";
        button.dataset.card = card;

        button.onclick = () => flipCard(button);

        game.appendChild(button);
    });

    updateScore();
}

function flipCard(button) {

    if (lockBoard || button === firstCard || button.disabled) {
        return;
    }

    button.textContent = button.dataset.card;

    if (firstCard === null) {
        firstCard = button;
        return;
    }

    secondCard = button;
    lockBoard = true;

    if (firstCard.dataset.card === secondCard.dataset.card) {

        score++;
        matchedPairs++;

        firstCard.disabled = true;
        secondCard.disabled = true;

        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem("bestScore", bestScore);
        }

        updateScore();
        resetTurn();

        if (matchedPairs === 4) {
            gameWon();
        }

    } else {

        setTimeout(() => {
            firstCard.textContent = "❓";
            secondCard.textContent = "❓";

            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function gameWon() {
    const message = document.createElement("div");

    message.innerHTML = `
        <h2>🎉 Congratulations!</h2>
        <p>You found all 4 pairs!</p>
        <p>🎯 Score: ${score}</p>
        <button id="playAgain">🔄 Play Again</button>
    `;

    message.style.textAlign = "center";
    message.style.marginTop = "20px";

    document.body.appendChild(message);

    document.getElementById("playAgain").onclick = () => {
        message.remove();
        createGame();
    };
}

restartButton.onclick = createGame;

createGame();
