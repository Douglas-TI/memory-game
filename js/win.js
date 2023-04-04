confettiAnimation();

function confettiAnimation() {
    const duration = 3 * 1000,
      animationEnd = Date.now() + duration,
      defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
  
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
  
      const particleCount = 50 * (timeLeft / duration);
  
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  }

const logo = document.getElementById("logo-win");
let holdTimeout = null;
let isPressed = false;

logo.addEventListener("mousedown", () => {
  holdTimeout = setTimeout(startLogoRotation, 5000);
});

function startLogoRotation() {
  if(isPressed)
    return;

  isPressed = true;

  logo.classList.add('logo-3d');
  confettiAnimation();
  confettiAnimation();
  confettiAnimation();
  confettiAnimation();
  confettiAnimation();
  confettiAnimation();
}

function stopLogoRotation() {
  logo.classList.remove('logo-3d');
  isPressed = false;
}