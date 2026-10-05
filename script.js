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

        button.textContent = "❓";
        button.dataset.card = card;

        button.style.fontSize = "35px";
        button.style.width = "80px";
        button.style.height = "80px";
        button.style.margin = "5px";
        button.style.cursor = "pointer";

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

    // Score increases ONLY for a correct match
    if (firstCard.dataset.card === secondCard.dataset.card) {

        score++;
        matchedPairs++;

        firstCard.disabled = true;
        secondCard.disabled = true;

        resetTurn();
        updateScore();

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

    let newBest = false;

    if (score > Number(bestScore)) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
        newBest = true;
    }

    updateScore();

    const message = document.createElement("div");

    message.innerHTML = `
        <h2>🎉 Congratulations!</h2>
        <p>You found all 4 pairs!</p>
        <p>🎯 Score: ${score}</p>
        <p>🏆 Best Score: ${bestScore}</p>
        ${newBest ? "<p>🌟 NEW BEST SCORE!</p>" : ""}
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
