"use strict";

//
const crossLogo = document.querySelector(".cross-logo");
const navBar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
const logo = document.querySelector(".cross-logo");
const allSections = document.querySelectorAll("section");

const slides = document.querySelectorAll(".carrousel-slide");

const categories = document.querySelector(".categories");
const products = document.querySelector(".moment-products");
const productsTitle = document.querySelector(".product-title");
const allProducts = document.querySelectorAll(".product");
const contact = document.querySelector(".contact");
const scrollToContact = document.querySelectorAll(".scroll-to-contact");

const allHorairesBtn = document.querySelectorAll(".horaires-btn");
const btnContainer = document.querySelector(".horaires-btn-container");
const horairesContent = document.querySelectorAll(".horaires-content");
// console.log(navLinks);

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

// Animation automatique du carrousel
let curSlide = 0;

const goToSlide = function (slideNumber) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slideNumber)}%)`)
  );
};

setInterval(() => {
  const maxSlide = slides.length;

  if (curSlide === maxSlide - 1) curSlide = 0;
  else curSlide++;
  goToSlide(curSlide);
}, 6000);

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

const titleOptions = {
  root: null,
  threshold: 0.6,
};

const contactOptions = {
  root: null,
  threshold: 0.05,
};

const categoriesObserver = new IntersectionObserver(
  revealSection,
  categoriesOptions
);
const titleObserver = new IntersectionObserver(revealSection, titleOptions);
const contactObserver = new IntersectionObserver(revealSection, contactOptions);

categories.classList.add("section-hidden");
productsTitle.classList.add("section-hidden");
contact.classList.add("section-hidden");

categoriesObserver.observe(categories);
titleObserver.observe(productsTitle);
contactObserver.observe(contact);

// allProducts.forEach(function (product) {
//   product.classList.add("section-hidden");
//   categoriesObserver.observe(product);
// });

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
