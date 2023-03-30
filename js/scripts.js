const cards = document.querySelectorAll('.card');

let isFirstCardFlipped = false;
let firstCard, secondCard;

(function shuffle() {
  cards.forEach(card => {
    card.style.order = Math.floor(Math.random() * 16);
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
  if (firstCard != null && secondCard != null) 
    return;

  if (this === firstCard) 
    return;

  flipCardAnimation(this);

  if (! isFirstCardFlipped) 
  {
    isFirstCardFlipped = true;
    firstCard = this;
  }
  else 
  {
    secondCard = this;
  }
  
  checkForMatch();
}

function flipCardAnimation(card) {
  card.classList.add('flip');
}

function checkForMatch() {
  if(firstCard == null || secondCard == null)
    return;

  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCardPair() : unflipCardPair();
}

function disableCardPair() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetVariables();
}

function unflipCardPair() {
  setTimeout(() => {
    unflipCardPairAnimation();
    resetVariables();
  }, 1500);
}

function unflipCardPairAnimation() {
  firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');
}

function resetVariables() {
  isFirstCardFlipped = false;
  [firstCard, secondCard] = [null, null];
}