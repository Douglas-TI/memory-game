const cards = document.querySelectorAll('.card');

let isFirstCardFlipped = false;
let firstCard, secondCard;

let totalFlippedCards = 0;
const totalCards = 12;

let timeleft = 40;
let timerIsRunning = true;
let countdownTimer;

function startCountdown() {
  countdownTimer = setInterval(function(){
    timeleft--;

    let minutes = Math.floor(timeleft / 60);
    let seconds = timeleft % 60;
    let formattedTime = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

    let countdown = document.getElementById("countdown")
    countdown.textContent = formattedTime;

    if(timeleft == 10)
      countdown.classList.add("piscar-tempo");

    if(timeleft <= 0) 
      window.open('loss.html', '_self');
  }, 1000);
}

startCountdown();

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

  let lion = document.getElementById("lion");
  lion.classList.add("jump");
  let owl = document.getElementById("owl");
  owl.classList.add("jump");
  setTimeout(() => {
    lion.classList.remove("jump");
    owl.classList.remove("jump");
  }, 700);

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