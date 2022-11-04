//
const crossLogo = document.querySelector(".cross-logo");
const navBar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
const logo = document.querySelector(".cross-logo");
const allSections = document.querySelectorAll("section");
const header = document.querySelector("header");
const main = document.querySelector("main");

///////////////////////////////////////////////////////////////////////////////////////////////
// Generic functions

const addLazyClass = function (image) {
  image.classList.add("icone-lazy");
};

///////////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////////

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
        link.style.animation = `navLinkFade 0.3s ease forwards ${index / 7 + 1}s`;
      }
    });
    // Burger animation
    burger.classList.toggle("toggle");
  };
  // Event handler on the burger
  burger.addEventListener("click", burgerPress);
};

navSlide();

///////////////////////////////////////////////////////////////////////////////////////////////////////////
