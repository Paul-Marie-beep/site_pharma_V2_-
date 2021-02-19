"use strict";

//
const crossLogo = document.querySelector(".cross-logo");
const navBar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
const logo = document.querySelector(".cross-logo");
const allSections = document.querySelectorAll("section");
const header = document.querySelector("header");
const main = document.querySelector("main");

const slides = document.querySelectorAll(".carrousel-slide");
const slide = document.querySelector(".carrousel-slide");
let index = 1;

const categories = document.querySelector(".categories");
const products = document.querySelector(".moment-products");
const productsTitle = document.querySelector(".product-title");
const allProducts = document.querySelectorAll(".product");
const contact = document.querySelector(".contact");
const scrollToContact = document.querySelectorAll(".scroll-to-contact");

const allHorairesBtn = document.querySelectorAll(".horaires-btn");
const btnContainer = document.querySelector(".horaires-btn-container");
const horairesContent = document.querySelectorAll(".horaires-content");

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
// const slideHeight = slide.getBoundingClientRect().height;

const obsCallback = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) navBar.classList.add("nav-sticky");
  else navBar.classList.remove("nav-sticky");
};

const obsOptions = {
  root: null,
  threshold: 0.25,
  rootMargin: `-${navHeight * 2}px`,
};

const navObserver = new IntersectionObserver(obsCallback, obsOptions);

navObserver.observe(main);

// Fade in out photo intro

let j = 0;
let currentSlide;
setInterval(() => {
  slides.forEach((slide) => {
    slide.classList.remove("carrousel-slide-fadeInOut");
  });
  index++;
  j++;
  if (index === 4) index = 1;

  currentSlide = document.querySelector(`.slide--${index}`);

  console.log(`index: ${index}`);

  setTimeout(() => {
    console.log("Timer 2");
    currentSlide.classList.add("carrousel-slide-fadeInOut");
    currentSlide.style.zIndex = j;
  }, 4000);
}, 10000);

// Faire apparaître les catégories et les produits
const revealSection = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section-hidden");
};

const categoriesOptions = {
  root: null,
  threshold: 0.2,
};

const contactOptions = {
  root: null,
  threshold: 0.025,
};

const categoriesObserver = new IntersectionObserver(
  revealSection,
  categoriesOptions
);
// const titleObserver = new IntersectionObserver(revealSection, titleOptions);
const contactObserver = new IntersectionObserver(revealSection, contactOptions);

categories.classList.add("section-hidden");
products.classList.add("section-hidden");
contact.classList.add("section-hidden");

categoriesObserver.observe(categories);
categoriesObserver.observe(products);
contactObserver.observe(contact);

//  Scroller vers contact

scrollToContact.forEach((s) =>
  s.addEventListener("click", function (e) {
    console.log("pouet");
    contact.scrollIntoView({ behavior: "smooth" });
  })
);

// Tabbed compenent horaires
btnContainer.addEventListener("click", function (e) {
  const clicked = e.target;
  if (!clicked.classList.contains("horaires-btn")) return;

  allHorairesBtn.forEach((a) => {
    a.classList.remove("horaires-btn-active");
  });
  clicked.classList.add("horaires-btn-active");

  horairesContent.forEach((h) => {
    h.classList.add("horaires-content-hidden");
  });

  document
    .querySelector(`.horaires-content--${clicked.dataset.tab}`)
    .classList.remove("horaires-content-hidden");
});
