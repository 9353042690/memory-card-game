let cards = ["🐶", "🐱", "🐭", "🐹", "🐶", "🐱", "🐭", "🐹"];

cards.sort(() => Math.random() - 0.5);

let game = document.getElementById("game");

cards.forEach((card) => {
    let button = document.createElement("button");
    button.textContent = "❓";
    button.style.fontSize = "35px";
    button.style.width = "80px";
    button.style.height = "80px";

    button.onclick = function () {
        button.textContent = card;
    };

    game.appendChild(button);
});
