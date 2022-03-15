const slides = document.querySelectorAll(".carrousel-slide");
const slide = document.querySelector(".carrousel-slide");
// Il y a un décalage sur les slides parce que j'ai un peu fait nimp avec les z-index mais ça fontionne bien
const slide1 = document.querySelector(".slide--2");
const slide2 = document.querySelector(".slide--3");
const slide3 = document.querySelector(".slide--4");
let index = 2;

const categories = document.querySelector(".categories");
const catImgTargets = document.querySelectorAll(".item");
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

// Nav sticky
const navHeight = navBar.getBoundingClientRect().height;

const obsCallback = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) navBar.classList.add("nav-sticky");
  else navBar.classList.remove("nav-sticky");
};

const obsOptions = {
  root: null,
  threshold: 0.23,
};

const navObserver = new IntersectionObserver(obsCallback, obsOptions);

navObserver.observe(main);

///////////////////////////////////////////////////////////////////////////////////////////////
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
  imgDiv.innerHTML = `<img src=src/images/opera_nuit.jpg class="carrousel-image" alt="Opéra de Rennes" />`;
}
setTimeout("DelayloadingImages1()", 3000);

function DelayloadingImages2() {
  const imgDiv = document.querySelector(".slide--3");
  imgDiv.innerHTML = `<img src=src/images/parlement_2.jpg class="carrousel-image" alt="Parlement de Bretagne" />`;
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

const changeBackground = function (item) {
  item.style = item.dataset.style;
};

const revealCategories = function (entries, observer) {
  revealSection(entries, observer);
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  catImgTargets.forEach(changeBackground);
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
  threshold: 0.07,
};

const productsOptions = {
  root: null,
  threshold: 0.2,
};

const contactOptions = {
  root: null,
  threshold: 0.01,
};

const categoriesObserver = new IntersectionObserver(revealCategories, categoriesOptions);
const productsObserver = new IntersectionObserver(revealProducts, productsOptions);
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

  document.querySelector(`.horaires-content--${clicked.dataset.tab}`).classList.remove("horaires-content-hidden");
});
