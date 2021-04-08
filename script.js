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
// Il y a un décalage sur les slides parce que j'ai un peu fait nimp avec les z-index mais ça fontionne bien
const slide1 = document.querySelector(".slide--2");
const slide2 = document.querySelector(".slide--3");
const slide3 = document.querySelector(".slide--4");
let index = 2;

const categories = document.querySelector(".categories");
const products = document.querySelector(".moment-products");
const productsTitle = document.querySelector(".product-title");
const allProducts = document.querySelectorAll(".product");
const contact = document.getElementById("contact");
const scrollToContact = document.querySelectorAll(".scroll-to-contact");
const scrollToProduct = document.querySelector(".scroll-to-products");

const allHorairesBtn = document.querySelectorAll(".horaires-btn");
const btnContainer = document.querySelector(".horaires-btn-container");
const horairesContent = document.querySelectorAll(".horaires-content");

// Mute link when hover another link
navBar.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const siblings = e.target.closest("nav").querySelectorAll(".nav-link");

    siblings.forEach((s) => {
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

    siblings.forEach((s) => {
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
  if (entry.isIntersecting) navBar.classList.add("nav-sticky");
  else navBar.classList.remove("nav-sticky");
};

const obsOptions = {
  root: null,
  threshold: 0.22,
  rootMargin: `-${navHeight + 3}px`,
};

const navObserver = new IntersectionObserver(obsCallback, obsOptions);

navObserver.observe(main);

// Fade in out photo intro

let currentSlide;

// On enlève toutes les classes fadeInOut qui s'occupe de la transition
setInterval(() => {
  slides.forEach((slide) => {
    slide.classList.remove("carrousel-slide-fadeInOut");
  });

  index++;
  if (index === 5) index = 2;

  currentSlide = document.querySelector(`.slide--${index}`);

  // On rajoute la classe qui gère le fadeout
  currentSlide.classList.add("carrousel-slide-fadeInOut");

  // On gère les zindex pour que les images s'affichent bien
  if (index === 2) {
    currentSlide.style.zIndex = 4;
    slide2.style.zIndex = 2;
    slide3.style.zIndex = 3;
  }

  if (index === 3) {
    currentSlide.style.zIndex = 4;
    slide1.style.zIndex = 3;
    slide3.style.zIndex = 2;
  }

  if (index === 4) {
    currentSlide.style.zIndex = 4;
    slide1.style.zIndex = 2;
    slide2.style.zIndex = 3;
  }
}, 10000);

// Faire apparaître les catégories et les produits
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const categoriesOptions = {
  root: null,
  threshold: 0.5,
};

const productsOptions = {
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
const productsObserver = new IntersectionObserver(
  revealSection,
  productsOptions
);
const contactObserver = new IntersectionObserver(revealSection, contactOptions);

categories.classList.add("section-hidden");
products.classList.add("section-hidden");
contact.classList.add("section-hidden");

categoriesObserver.observe(categories);
productsObserver.observe(products);
contactObserver.observe(contact);

//  Scroller vers contact

scrollToContact.forEach((s) =>
  s.addEventListener("click", function () {
    contact.scrollIntoView({ behavior: "smooth" });
  })
);

//  Scroller vers produits du moment

scrollToProduct.addEventListener("click", function () {
  products.scrollIntoView({ behavior: "smooth" });
});

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
