// === Smooth scroll to ===============================================================================================================================================

const smoothScroll = (target, duration) => {
  const topOffset = document.querySelector('.header').offsetHeight;

  const targetPosition = target.getBoundingClientRect().top + window.scrollY;

  const startPositon = window.pageYOffset;

  const distance = targetPosition - startPositon - topOffset + 5;

  let startTime = null;

  const smoothScrollAnimation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let run = ease(timeElapsed, startPositon, distance, duration);
    console.log(target)
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(smoothScrollAnimation)
  };

  requestAnimationFrame(smoothScrollAnimation);
}

const smoothScrollers = document.querySelectorAll('[data-scroll_to]');
if (smoothScrollers.length > 0) {
  smoothScrollers.forEach((smoothScroller) => {
  console.log(smoothScroller)
    if (smoothScroller.dataset.scroll_to != '') {
      smoothScroller.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(smoothScroller.dataset.scroll_to);
        smoothScroll(target, 700);
      });
    } else {
      console.log('You must type selector in data-scroll_to');
    }
  });
}

// ====================================================================================================================================================================