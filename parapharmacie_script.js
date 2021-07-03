"use strict";

const cardsPara = document.querySelector(".produits-naturels-presentation");

const contact = document.querySelector(".contact");
const scrollToContact = document.querySelectorAll(".scroll-to-contact");

// Nav sticky
const navHeight = navBar.getBoundingClientRect().height;

const obsCallback = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) navBar.classList.add("nav-sticky");
  else navBar.classList.remove("nav-sticky");
};

const obsOptionsPara = {
  root: null,
  threshold: 0.48,
  rootMargin: `-${navHeight + 3}px`,
};

const navObserverPara = new IntersectionObserver(obsCallback, obsOptionsPara);

navObserverPara.observe(cardsPara);

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Faire apparaître la grid

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.add("trans");
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const paraOptions = {
  root: null,
  threshold: 0.1,
};

const paraObserver = new IntersectionObserver(revealSection, paraOptions);

const notIfMobile = function () {
  // On ne le fait pas sur tel
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  )
    return;

  cardsPara.classList.add("section-hidden");
};

notIfMobile();

paraObserver.observe(cardsPara);
