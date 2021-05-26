"use strict";

const crossLogo = document.querySelector(".cross-logo");
const navBar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
const logo = document.querySelector(".cross-logo");
const allSections = document.querySelectorAll("section");
const header = document.querySelector("header");
const main = document.querySelector("main");

const cardsPara = document.querySelector(".produits-naturels-presentation");

const contact = document.querySelector(".contact");
const scrollToContact = document.querySelectorAll(".scroll-to-contact");

// Mute link when hover another link
navBar.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav-mute")) {
    const link = e.target;
    const siblings = e.target.closest("nav").querySelectorAll(".nav-mute");

    siblings.forEach((s) => {
      if (s !== link) {
        s.classList.add("muted");
        s.classList.remove("nav-white");
      }
    });
  }
});

navBar.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav-mute")) {
    const link = e.target;
    const siblings = e.target.closest("nav").querySelectorAll(".nav-mute");

    siblings.forEach((s) => {
      if (s !== link) {
        s.classList.remove("muted");
        s.classList.add("nav-white");
      }
    });
  }
});

// Effet appui sur le bouton
logo.addEventListener("click", function () {
  logo.classList.toggle("cross-logo-press");
});

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

// Lien contact sur les pages 2 et 3

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Nav responsive

const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navbBar__links = document.querySelectorAll(".for-opac");

  const burgerPress = function () {
    // Toggle nav
    nav.classList.toggle("nav-active");
    nav.classList.add("nav-visible");
    // Reveal the links
    navbBar__links.forEach((link, index) => {
      // index incrémente à chaque fois qu'un truc se passe
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.3s ease forwards ${
          index / 7 + 1
        }s`;
      }
    });
    // Burger animation
    burger.classList.toggle("toggle");
  };
  // Event handler on the burger
  burger.addEventListener("click", burgerPress);
};

navSlide();

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
