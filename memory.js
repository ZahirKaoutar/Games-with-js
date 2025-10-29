let duration = 1000;
let container = document.querySelector(".continer");
let cards = Array.from(container.children);


let tries = 0;
let matches = 0;
let totalPairs = cards.length / 2;


let bestScore = localStorage.getItem("bestScore");
if (bestScore === null) bestScore = 0;


let triesElement = document.querySelector(".tries");
let bestScoreElement = document.querySelector(".best-score");
let messageElement = document.querySelector(".message");

triesElement.textContent = tries;
bestScoreElement.textContent = bestScore;


