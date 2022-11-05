"use strict";

const cardsNat = document.querySelector(".produits-naturels-presentation");
const cardPics = document.querySelectorAll(".cardpic");

const contact = document.querySelector(".contact");
const scrollToContact = document.querySelectorAll(".scroll-to-contact");

// Nav sticky
const navHeight = navBar.getBoundingClientRect().height;

const obsCallback = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) navBar.classList.add("nav-sticky");
  else navBar.classList.remove("nav-sticky");
};

const obsOptionsNat = {
  root: null,
  threshold: 0.6,
  rootMargin: `-${navHeight + 30}px`,
};

const navObserverNat = new IntersectionObserver(obsCallback, obsOptionsNat);

navObserverNat.observe(cardsNat);

// Lien contact sur les pages 2 et 3

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Faire apparaître la grid

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.add("trans");
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const loadImage = function (img) {
  img.src = img.dataset.src;
  img.classList.remove("icone-lazy");
};

const revealPdtsNat = function (entries, observer) {
  revealSection(entries, observer);
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  cardPics.forEach(loadImage);
};

const pdtsNatOptions = {
  root: null,
  threshold: 0.3,
};

const pdtsNatObserver = new IntersectionObserver(revealPdtsNat, pdtsNatOptions);

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

  cardsNat.classList.add("section-hidden");
  cardPics.forEach(addLazyClass);
};

notIfMobile();

pdtsNatObserver.observe(cardsNat);
