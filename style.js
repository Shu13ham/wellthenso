//text reveal down to top
document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  observeAnimationTrigger();
});

let timelines = [];

function initAnimations() {
  // Setup GSAP timeline for .style-5
  const tl5 = gsap.timeline({ paused: true });

  tl5.set(".style-5 .line-inner", { y: 50, opacity: 0 }); // Start from below + invisible

  tl5.to(".style-5 .line-inner", {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power4.out",
    delay: 1.1,
    stagger: {
      amount: 0.3,
    },
  });

  timelines.push(tl5);
}

function playAll() {
  timelines.forEach((tl) => tl.restart());
}

function resetAll() {
  timelines.forEach((tl) => tl.pause(0));
}

function observeAnimationTrigger() {
  const target = document.querySelector(".style-5");
  if (!target) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playAll();
          observer.unobserve(entry.target); // Run only once
        }
      });
    },
    {
      threshold: 0.4, // Trigger when 40% visible
    }
  );

  observer.observe(target);
}

//text reveal down to top

//word by word appearing animation
document.addEventListener("DOMContentLoaded", () => {
  let letters = document.getElementsByClassName("title-letter");

  setTimeout(() => {
    const tl = gsap.timeline({
      onComplete: showSubTitle,
    });

    for (let i = 0; i < letters.length; i++) {
      tl.to(
        letters[i],
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power1.in",
        },
        i * 0.05
      ); // delay between letters (like delay: 60 * i ms)
    }
  }, 0);
});

function showSubTitle() {
  gsap.to("#sub-title", {
    opacity: 1,
    duration: 0.3,
    ease: "power1.in",
    delay: 0.1,
  });
}

//word by word appearing animation

// fade left right animation
document.addEventListener("DOMContentLoaded", function () {
  const html = document.documentElement;

  // Touch detection
  if (!("ontouchstart" in window)) {
    html.classList.add("noTouch");
  } else {
    html.classList.add("isTouch");
  }

  // Browser detection
  const ua = navigator.userAgent;
  const appVersion = navigator.appVersion;

  if (document.documentMode || /Edge/.test(ua)) {
    if (appVersion.indexOf("Trident") === -1) {
      html.classList.add("isEDGE");
    } else {
      html.classList.add("isIE", "isIE11");
    }
  }

  if (appVersion.indexOf("MSIE") !== -1) {
    html.classList.add("isIE");
  }

  if (ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1) {
    html.classList.add("isSafari");
  }

  // isOnScreen function
  function isOnScreen(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowTop = 0;
    const windowBottom = windowHeight;

    const elTop = rect.top;
    const elBottom = rect.bottom;

    return elBottom > windowTop && elTop < windowBottom;
  }

  const items = document.querySelectorAll(
    "[data-animate-in], [data-detect-viewport]"
  );
  let waiting = false;

  function detection() {
    items.forEach((el) => {
      if (isOnScreen(el)) {
        el.classList.add("in-view");
      } else {
        el.classList.remove("in-view");
      }
    });
  }

  function handleScrollResize() {
    if (waiting) return;
    waiting = true;
    detection();
    setTimeout(() => {
      waiting = false;
    }, 100);
  }

  window.addEventListener("scroll", handleScrollResize);
  window.addEventListener("resize", handleScrollResize);

  setTimeout(() => {
    detection();

    items.forEach((el) => {
      const delayAttr = el.getAttribute("data-animate-in-delay");
      const delay = delayAttr ? `${parseFloat(delayAttr) / 1000}s` : "0s";
      el.style.transitionDelay = delay;
    });
  }, 500);
});

// fade left right animation
