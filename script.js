const cards = ["🐶", "🐱", "🐭", "🐹", "🐶", "🐱", "🐭", "🐹"];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let matchedPairs = 0;

let bestScore = localStorage.getItem("bestScore") || 0;

const game = document.getElementById("game");
const scoreText = document.getElementById("score");
const restartButton = document.getElementById("restart");

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
    lockBoard = true;

    if (firstCard.dataset.card === secondCard.dataset.card) {
    score++;

        firstCard.disabled = true;
        secondCard.disabled = true;

        matchedPairs++;
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

    updateScore();
}

function gameWon() {

    let newBest = false;

    if (bestScore === 0 || score < bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
        newBest = true;
    }

    updateScore();

    const message = document.createElement("div");

    message.id = "winMessage";

    message.innerHTML = `
        <h2>🎉 Congratulations!</h2>
        <p>You matched all the cards!</p>
        <p>🎯 Your Score: <b>${score}</b></p>
        <p>🏆 Best Score: <b>${bestScore}</b></p>
        ${newBest ? "<p>🌟 NEW BEST SCORE!</p>" : ""}
        <button id="playAgain">🔄 Play Again</button>
    `;

    document.body.appendChild(message);

    document.getElementById("playAgain").onclick = () => {
        message.remove();
        createGame();
    };
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

restartButton.onclick = createGame;

createGame();
