const cards = document.querySelectorAll('.card');

let isFirstCardFlipped = false;
let firstCard, secondCard;

let totalFlippedCards = 14;
const totalCards = 16;

let timeleft = 30;
let timerIsRunning = true;
let countdownTimer;

function startCountdown() {
  countdownTimer = setInterval(function(){
    timeleft--;
    document.getElementById("countdown").textContent = timeleft;
    if(timeleft <= 0) 
      window.open('loss.html', '_self');
  }, 1000);
}

startCountdown();

document.getElementById("pause").addEventListener("click", function() {
  if (timerIsRunning) {
    clearInterval(countdownTimer);
    timerIsRunning = false;
  } else {
    startCountdown();
    timerIsRunning = true;
  }
});

cards.forEach(card => {
  card.style.order = Math.floor(Math.random() * totalCards);
});

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
  totalFlippedCards += 2;

  if(totalFlippedCards == totalCards)
    window.open('win.html', '_self');
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