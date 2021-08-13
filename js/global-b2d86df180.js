// ==== Глобальные скрипты ============================================================================================================================================

// === Анимации, данный скрипт лучше всего оставить подключённым. Без него не работают некоторые скрипты ==============================================================

// === Тут хранятся все JS анимации ===================================================================================================================================

// === Плавная прокрутка ==============================================================================================================================================

const ease = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
}

// ====================================================================================================================================================================


// === Скольжение вверх и вниз ========================================================================================================================================

let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}

// ====================================================================================================================================================================

;

// ====================================================================================================================================================================


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

// ====================================================================================================================================================================; // Плавная прокрутка до элемента. ТРЕБУЕТ _animation.js
// === Scroll disabling ===============================================================================================================================================

const scrollDisabling = (element, positon) => {
  if (!element.classList.contains('_scroll-disabled') && !element.classList.contains('_scroll-disabled_horizontal') && !element.classList.contains('_scroll-disabled_vertical')) {
    if (positon == "verical") {
      element.classList.add('_scroll-disabled_vertical');
    } else if (positon == "horizontal") {
      element.classList.add('_scroll-disabled_horizontal');
    } else {
      element.classList.add('_scroll-disabled');
    }
  }
};

const scrollDisablers = document.querySelectorAll('[data-scroll_disable]');
if (scrollDisablers.length > 0) {
  for (scrollDisabler of scrollDisablers) {
    positon = scrollDisabler.dataset.scroll_disable;
    scrollDisabling(scrollDisabler, positon);
  }
}

// ====================================================================================================================================================================; // Полное отключение прокрутки у элемента.
// === spoilerCreator =================================================================================================================================================

const initSpoilerBody = (spoilersBlock, hideSpoilerBody = true) => {
  const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
  if (spoilerTitles.length > 0) {
    spoilerTitles.forEach(spoilerTitle => {
      if (hideSpoilerBody) {
        spoilerTitle.removeAttribute('tabindex');
        if (!spoilerTitle.classList.contains('_active')) {
          spoilerTitle.nextElementSibling.hidden = true;
        }
      } else {
        spoilerTitle.setAttribute('tabindex', '-1');
        spoilerTitle.nextElementSibling.hidden = false;
      }
    });
  }
}

const setSpoilerAction = (e) => {
  const el = e.target;
  if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
    const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
    const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
    const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
    if (!spoilersBlock.querySelectorAll('._slide').length) {
      if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
        hideSpoilersBody(spoilersBlock);
      }
      spoilerTitle.classList.toggle('_active');
      _slideToggle(spoilerTitle.nextElementSibling, 500);
    }
    e.preventDefault();
  }
}
const hideSpoilersBody = (spoilersBlock) => {
  const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
  if (spoilerActiveTitle) {
    spoilerActiveTitle.classList.remove('_active');
    _slideUp(spoilerActiveTitle.nextElementSibling, 500);
  }
}

const initSpoilers = (spoilersArray, matchMedia = false) => {
  spoilersArray.forEach(spoilersBlock => {
    spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
    if (matchMedia.matches || !matchMedia) {
      spoilersBlock.classList.add('_init');
      initSpoilerBody(spoilersBlock);
      spoilersBlock.addEventListener('click', setSpoilerAction);
    } else {
      spoilersBlock.classList.remove('_init');
      initSpoilerBody(spoilersBlock, false);
      spoilersBlock.removeEventListener('click', setSpoilerAction)
    }
  });
}

const spoilersArray = document.querySelectorAll('[data-spoilers]')
if (spoilersArray.length > 0) {
  const spoilersRegular = Array.from(spoilersArray).filter((item) => {
    return !item.dataset.spoilers;
  })

  if (spoilersRegular.length > 0) {
    initSpoilers(spoilersRegular);
  }

  const spoilersMedia = Array.from(spoilersArray).filter((item) => {
    return item.dataset.spoilers;
  });

  if (spoilersMedia.length > 0) {
    const breakpointsArray = [];
    spoilersMedia.forEach(item => {
      const params = item.dataset.spoilers;
      const breakpoint = {};
      const paramsArray = params.split(", ");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });

    let mediaQuaries = breakpointsArray.map((item) => {
      return `(${item.type}-width: ${item.value}px), ${item.value}, ${item.type}`;
    });

    mediaQuaries = mediaQuaries.filter((item, index, self) => {
      return self.indexOf(item) === index;
    });

    mediaQuaries.forEach(breakpoint => {
      const paramsArray = breakpoint.split(", ");
      const mediaBreakpoint = paramsArray[1];
      const mediaType = paramsArray[2];
      const matchMedia = window.matchMedia(paramsArray[0]);

      const spoilersArray = breakpointsArray.filter((item) => {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });
      matchMedia.addListener(() => {
        initSpoilers(spoilersArray, matchMedia);
      });
      initSpoilers(spoilersArray, matchMedia);
    });
  }
}

// ====================================================================================================================================================================; // Спойлеры и аккордионы. ТРЕБУЕТ _animation.js

// ====================================================================================================================================================================
//# sourceMappingURL=global.js.map
