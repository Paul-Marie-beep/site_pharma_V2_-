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
const catImgTargets = document.querySelectorAll(".cat-icone");
const products = document.querySelector(".moment-products");
const productsTitle = document.querySelector(".product-title");
const allProducts = document.querySelectorAll(".product");
const [...prodImgTargets] = document.querySelectorAll(".testimonial-pic");
const contact = document.getElementById("contact");
const scrollToContact = document.querySelectorAll(".scroll-to-contact");
const scrollToProduct = document.querySelector(".scroll-to-products");

const allHorairesBtn = document.querySelectorAll(".horaires-btn");
const btnContainer = document.querySelector(".horaires-btn-container");
const horairesContent = document.querySelectorAll(".horaires-content");

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lazy loading des images du carrousel

function DelayloadingImages1() {
  const imgDiv = document.querySelector(".slide--4");
  imgDiv.innerHTML = `<img src=Images/opera_nuit.jpg class="carrousel-image" alt="Opéra de Rennes" />`;
}
setTimeout("DelayloadingImages1()", 3000);

function DelayloadingImages2() {
  const imgDiv = document.querySelector(".slide--3");
  imgDiv.innerHTML = `<img src=Images/parlement_2.jpg class="carrousel-image" alt="Parlement de Bretagne" />`;
}
setTimeout("DelayloadingImages2()", 6000);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Faire apparaître les catégories (avec lazy loading des icones) et les produits

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const loadImage = function (img) {
  img.src = img.dataset.src;
  img.classList.remove("icone-lazy");
};

const revealCategories = function (entries, observer) {
  revealSection(entries, observer);
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  catImgTargets.forEach(loadImage);
};

const revealProducts = function (entries, observer) {
  revealSection(entries, observer);
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  prodImgTargets.forEach(loadImage);
  // À noter que l'on a ci-après (mais chronologiquement avant dans l'exécution du script) enlevé l'image qui apparaît la première dans le
  //  slider pour ne pas qu'on la voit en train de se charger quand l'observer se lance.
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
  threshold: 0.01,
};

const categoriesObserver = new IntersectionObserver(
  revealCategories,
  categoriesOptions
);
const productsObserver = new IntersectionObserver(
  revealProducts,
  productsOptions
);
const contactObserver = new IntersectionObserver(revealSection, contactOptions);

const addLazyClass = function (image) {
  image.classList.add("icone-lazy");
};

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

  categories.classList.add("section-hidden");
  products.classList.add("section-hidden");
  contact.classList.add("section-hidden");
  catImgTargets.forEach(addLazyClass);
  prodImgTargets.shift();
  prodImgTargets.forEach(addLazyClass);
};

notIfMobile();

categoriesObserver.observe(categories);
productsObserver.observe(products);
contactObserver.observe(contact);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Scroller vers contact

scrollToContact.forEach((s) =>
  s.addEventListener("click", function () {
    contact.scrollIntoView({ behavior: "smooth" });
  })
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  Scroller vers produits du moment

scrollToProduct.addEventListener("click", function () {
  products.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pour le slider des produits du moment

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // On va créer les points en bas du slider. On les numérotes en leur donnant un numéro dans l'attribut data-slide.
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // On met le point de la slide à l'écran en surbrillance par rapport aux autres. On fait ça grâce à une classe CSS .
  // dots__dot--active qui change la background color.
  // On commence par enlever toutes les classes active pour que notre point soit le seul à être en surbrillance.
  const activateDots = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((d) => d.classList.remove("dots__dot--active"));
    // On met le point de la slide à l'écran en surbrillance.
    // .dots__dot[data-slide="${slide} ou tous les éléments qui comme classe dots__dot et comme attribut data-slide.
    // L'argument slide est donné au moment de l'appel de la fonction.
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  // goToSlide fait glisser chaque slide quand on veut en changer (Elle repositionne toutes les slides grâce à un  transform)
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  // On initialise pour que, quand on charge on ait bien la première slide avec les points crées et mis en surbrillance.
  const init = function () {
    goToSlide(0);
    createDots();
    activateDots(0);
  };
  init();

  // On passe à la slide suivant en le faisant revenir au début si on est arrivé à la fin.
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;
    goToSlide(curSlide);
    activateDots(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    goToSlide(curSlide);
    activateDots(curSlide);
  };

  // On rajoute les event handlers pour les boutons
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  // Pour les event listeners sur le clavier, on les attache toujours sur le docucment en entier
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  //On rajoute le fait de changer de slide en cliquant sur les points
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      // On déstructure
      goToSlide(slide);
      activateDots(slide);
    }
  });
};

//On met les variables dans une fonction que l'on active maintenant.
slider();

///////////////////////////////////////////////////////////////////////////////////////////////////////////

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
