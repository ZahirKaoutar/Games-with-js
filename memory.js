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

function stopFlipping() {
  container.classList.add("non-click");
  setTimeout(() => {
    container.classList.remove("non-click");
  }, duration);
}

function checkCards(firstCard, secondCard) {

  tries++;
  triesElement.textContent = tries;

  if (firstCard.dataset.technology === secondCard.dataset.technology) {
   
    firstCard.classList.add("has-match");
    secondCard.classList.add("has-match");

    firstCard.classList.remove("is--flipped");
    secondCard.classList.remove("is--flipped");

    matches++; 
    if (matches === totalPairs) {
      showVictory();
    }

  } else {
    
    setTimeout(() => {
      firstCard.classList.remove("is--flipped");
      secondCard.classList.remove("is--flipped");
    }, duration);
  }
}

function showVictory() {
 
  if (bestScore === 0 || tries < bestScore) {
    bestScore = tries;
    localStorage.setItem("bestScore", bestScore);
  }

  bestScoreElement.textContent = bestScore;

 
  messageElement.innerHTML = `
    <div class="victory-message">
      <h1>Bravo 🎉 tu es gagné</h1>
    </div>
  `;
  messageElement.style.color = "green";

 
}

