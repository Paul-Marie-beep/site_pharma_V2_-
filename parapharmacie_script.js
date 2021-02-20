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
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const siblings = e.target.closest("nav").querySelectorAll(".nav-link");
    // console.log(siblings[0]);

    siblings.forEach((s) => {
      // console.log(s !== link);
      if (s !== link) {
        s.classList.add("muted");
        s.classList.remove("nav-white");
      }
    });
  }
});

navBar.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const siblings = e.target.closest("nav").querySelectorAll(".nav-link");
    // console.log(siblings[0]);

    siblings.forEach((s) => {
      // console.log(s !== link);
      if (s !== link) {
        s.classList.remove("muted");
        s.classList.add("nav-white");
      }
    });
  }
});

// Effet appui sur le bouton
let press = false;
logo.addEventListener("click", function () {
  logo.classList.toggle("cross-logo-press");
  press = !press;
});

document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("cross-logo") && press === true) {
    logo.classList.remove("cross-logo-press");
    press = !press;
  }
});

// Nav sticky
const navHeight = navBar.getBoundingClientRect().height;

const obsCallback = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (entry.isIntersecting) navBar.classList.add("nav-sticky");
  else navBar.classList.remove("nav-sticky");
};

const obsOptionsPara = {
  root: null,
  threshold: 0.5,
  rootMargin: `-${navHeight + 8}px`,
};

const navObserverPara = new IntersectionObserver(obsCallback, obsOptionsPara);

navObserverPara.observe(cardsPara);

console.log(cardsPara);
console.log(navObserverPara);

// Lien contact sur les pages 2 et 3
