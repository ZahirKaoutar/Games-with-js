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


let orderRange = [...Array(cards.length).keys()];
rand(orderRange);

cards.forEach((card, index) => {
  card.style.order = orderRange[index];
  card.addEventListener("click", function () {
    flipCard(card);
  });
});
function rand(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
function flipCard(selectedCard) {
  
  if (selectedCard.classList.contains("is--flipped")) return;

  selectedCard.classList.add("is--flipped");


  let allFlipCards = cards.filter(card =>
    card.classList.contains("is--flipped")
  );

  if (allFlipCards.length === 2) {
    stopFlipping();
    checkCards(allFlipCards[0], allFlipCards[1]);
  }
}


