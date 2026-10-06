const cards = [
    "🐶", "🐱", "🐭", "🐹",
    "🐶", "🐱", "🐭", "🐹"
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let matchedPairs = 0;

const game = document.getElementById("game-board");
const scoreText = document.getElementById("score");
const restartButton = document.getElementById("restart");

let bestScore = Number(localStorage.getItem("bestScore")) || 0;

function updateScore() {
    scoreText.textContent = "Score: " + score;
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

    shuffle([...cards]).forEach((emoji) => {

        const button = document.createElement("button");

        button.textContent = "❓";
        button.dataset.card = emoji;

        button.style.width = "70px";
        button.style.height = "70px";
        button.style.fontSize = "30px";
        button.style.margin = "5px";
        button.style.background = "#4f46e5";
        button.style.border = "none";
        button.style.borderRadius = "10px";
        button.style.cursor = "pointer";

        button.onclick = function () {
            flipCard(button);
        };

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
            setTimeout(() => {
                alert("🎉 Congratulations! You found all 4 pairs!");
            }, 300);
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

restartButton.onclick = createGame;

createGame();
