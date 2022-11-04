const carrousel = document.querySelector(".carrousel");
const titleSpace = document.querySelector(".title-space");
const slides = document.querySelectorAll(".carrousel-slide");
const slide = document.querySelector(".carrousel-slide");
// Il y a un décalage sur les slides parce que j'ai un peu fait nimp avec les z-index mais ça fontionne bien
const slide1 = document.querySelector(".slide--2");
const slide2 = document.querySelector(".slide--3");
const slide3 = document.querySelector(".slide--4");
let index = 2;

const categories = document.querySelector(".categories");
const catImgTargets = document.querySelectorAll(".item");
const stickyPic = document.querySelector(".sticky-pic__container");
const products = document.querySelector(".moment-products");
const productsTitle = document.querySelector(".product-title");
const allProducts = document.querySelectorAll(".product");
const [...prodImgTargets] = document.querySelectorAll(".product__pic");
let allowKey;
const contact = document.getElementById("contact");
const scrollToContact = document.querySelectorAll(".scroll-to-contact");
const scrollToProduct = document.querySelector(".scroll-to-products");

const rightBlock = document.querySelector(".right-bloc");
const allAfter = document.querySelectorAll(".mark");

const allHorairesBtn = document.querySelectorAll(".horaires-btn");
const btnContainer = document.querySelector(".horaires-btn-container");
const horairesContent = document.querySelectorAll(".horaires-content");

const loading = document.querySelector(".loading");
const loadingGif = document.querySelector(".loading__gif");

///////////////////////////////////////////////////////////////////////////////////////////////
// Loader

// We display a loading wheel so that we have time to load the categories images

const dontDisplayBodyAndBlurImages = function () {
  loading.classList.remove("no-display");
  main.classList.add("no-display");
  carrousel.classList.add("no-display");
  titleSpace.classList.add("no-display");
  addLazyClass(slide1.firstElementChild);
  catImgTargets.forEach((img) => {
    addLazyClass(img);
  });
};

const displayBody = function () {
  loading.classList.add("no-display");
  main.classList.remove("no-display");
  carrousel.classList.remove("no-display");
  titleSpace.classList.remove("no-display");
};

// display the loading circle and hide the body for two seconds then do the opposite
dontDisplayBodyAndBlurImages();
setTimeout(displayBody, 2000);

const loadFirstSlideImage = function () {
  slide1.firstElementChild.src = "src/images/inside_pharma.jpg";
  slide1.firstElementChild.classList.remove("icone-lazy");
};

const loadCategoriesImages = function () {
  catImgTargets.forEach((img) => {
    img.style = img.dataset.style;
    img.classList.remove("icone-lazy");
  });
};

const LoadFirstSlideAndCatImages = function () {
  loadFirstSlideImage();
  loadCategoriesImages();
};

// We wait until the loading of the loading wheel to authorize the loading of the images
setTimeout(LoadFirstSlideAndCatImages, 800);

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
}, 5000);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lazy loading des images du carrousel et de la sticky picture

// Loading Sticky Pic
const loadStickyPic = function () {
  stickyPic.classList.add("sticky-pic__background-style");
};

function DelayloadingImages1() {
  const imgDiv = document.querySelector(".slide--4");
  imgDiv.innerHTML = `<img src=src/images/opera_nuit.jpg class="carrousel-image" alt="Opéra de Rennes" />`;
  loadStickyPic();
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
};

const changeBackground = function (item) {
  item.style = item.dataset.style;
  item.classList.remove("icone-lazy");
};

const loadImage = function (img) {
  img.src = img.dataset.src;
  img.classList.remove("icone-lazy");
};

const revealCategories = function (entries, observer) {
  revealSection(entries, observer);
  // observer.unobserve();
};

// On utilise l'observer pour autoriser ou non via la variable allowKey la possibilité d'utiliser le clavier pour faire
// défiler le stepper. C'est pour ça que l'on arrête pas l'observer une fois qu'il a permis de révéler la section: on en a encore besoin.
const revealProducts = function (entries, observer) {
  revealSection(entries, observer);
  const [entry] = entries;
  if (!entry.isIntersecting) {
    allowKey = false;
    return;
  }
  prodImgTargets.forEach(loadImage);
  allowKey = true;
  // À noter que l'on a ci-après (mais chronologiquement avant dans l'exécution du script) enlevé l'image qui apparaît la première dans le slider pour ne pas qu'on la voit en train de se charger quand l'observer se lance.
};

const revealAdress = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  allAfter.forEach((div) => div.classList.add("erase-after"));
  observer.unobserve(categories);
};

const categoriesImagesOptions = {
  root: null,
  threshold: 0.05,
};

const categoriesOptions = {
  root: null,
  threshold: 0.9,
};

const productsOptions = {
  root: null,
  threshold: 0.2,
};

const contactOptions = {
  root: null,
  threshold: 0.01,
};

const adressOptions = {
  root: null,
  threshold: 0.65,
};

const categoriesObserver = new IntersectionObserver(revealCategories, categoriesOptions);
const productsObserver = new IntersectionObserver(revealProducts, productsOptions);
const contactObserver = new IntersectionObserver(revealSection, contactOptions);
const adressObserver = new IntersectionObserver(revealAdress, adressOptions);

// On charge la première image des produits au chargement de la page pour laisser aux autres le temps de se charger quand l'observer intersect. En conséquence, on enlève la première image du tableau où on a rassemblé les trois autres et qui nous servira à gérer les lazy pictures.
const letFirstProductImageAppart = function () {
  prodImgTargets.shift();
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
  prodImgTargets.forEach(addLazyClass);
  allAfter.forEach((div) => div.classList.add("after"));
};

letFirstProductImageAppart();
notIfMobile();

categoriesObserver.observe(categories);
productsObserver.observe(products);
contactObserver.observe(contact);
adressObserver.observe(rightBlock);

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Pour le slider des produits du moment

const arrowLeft = document.querySelector(".arrows__arrow--left");
const arrowRight = document.querySelector(".arrows__arrow--right");
let i = 1;
let carryOn = true;

const moveTitlesRight = function () {
  const currentTitle = document.querySelector(`.titles__title--${i}`);
  const newtitle = document.querySelector(`.titles__title--${i - 1}`);
  const allTitles = document.querySelectorAll(".titles__title");

  currentTitle.classList.add("hidden");
  newtitle.classList.remove("hidden");
  // On doit bien mettre i-1 car l'incrémentation se fait après qu'on est ajouté la classe que l'on veut enlever, donc on a un décalage
  allTitles.forEach((el) => el.classList.remove(`translate--${i - 1}00`));
};

const moveTitlesLeft = function () {
  const currentTitle = document.querySelector(`.titles__title--${i}`);
  const newtitle = document.querySelector(`.titles__title--${i + 1}`);
  const allTitles = document.querySelectorAll(".titles__title");

  currentTitle.classList.add("hidden");
  newtitle.classList.remove("hidden");
  allTitles.forEach((el) => el.classList.add(`translate--${i}00`));
};

const moveDescriptionsRight = function () {
  const currentDescription = document.querySelector(`.descriptions__description--${i}`);
  const newDescription = document.querySelector(`.descriptions__description--${i - 1}`);
  const allDescriptions = document.querySelectorAll(".descriptions__description");

  currentDescription.classList.add("hidden");
  newDescription.classList.remove("hidden");
  // On doit bien mettre i-1 car l'incrémentation se fait après qu'on est ajouté la classe que l'on veut enlever, donc on a un décalage
  allDescriptions.forEach((el) => el.classList.remove(`translate--${i - 1}00`));
};

const moveDescriptionsLeft = function () {
  const currentDescription = document.querySelector(`.descriptions__description--${i}`);
  const newDescription = document.querySelector(`.descriptions__description--${i + 1}`);
  const allDescriptions = document.querySelectorAll(".descriptions__description");

  currentDescription.classList.add("hidden");
  newDescription.classList.remove("hidden");
  allDescriptions.forEach((el) => el.classList.add(`translate--${i}00`));
};

const moveImagesRight = function () {
  const currentImage = document.querySelector(`.product__pic--${i}`);
  currentImage.classList.remove(`translate--${i - 1}00`);
  currentImage.classList.add("hidden");
};

const moveimagesLeft = function () {
  const nextImage = document.querySelector(`.product__pic--${i + 1}`);
  nextImage.classList.add(`translate--${i}00`);
  nextImage.classList.remove("hidden");
};

const retreatProgressBar = function (index) {
  setTimeout(function () {
    const currentBall = document.querySelector(`.stepper__ball--${index - 1}`);
    currentBall.classList.add("unscale");
    carryOn = true;
  }, 200);
};

const advanceProgressBar = function () {
  const treatedBall = document.querySelector(`.stepper__ball--${i}`);
  treatedBall.classList.remove("unscale");
};

const atrophyGreenBall = function () {
  const nextGreenBall = document.querySelector(`.green--${i}`);
  nextGreenBall.classList.add("atrophy");
  // On bloque la possibilité de cliquer sur une autre slide avant que la barre verte ne soit rétractée.
  carryOn = false;
};

const revealGreenBall = function (index) {
  // On met une paramètre dans la fonction pour être sûr que l'incrémentation du timer ne sera pas effectuée avant la fin de l'intervalle.
  carryOn = false;
  setTimeout(function () {
    const nextGreenBall = document.querySelector(`.green--${index + 1}`);
    nextGreenBall.classList.remove("atrophy");
    carryOn = true;
  }, 300);
};

const leftAction = function () {
  // On met une guard si on est sur la première slide
  if (i === 1) return;
  // On met une guard pour être sûr que l'on ne change pas de slide avant la fin de l'intervalle
  if (!carryOn) return;
  // Si on était sur la  dernière slide on remet la flèche de droite entièrement visible
  if (i === 4) arrowRight.style.opacity = 1;
  moveTitlesRight();
  moveDescriptionsRight();
  moveImagesRight();
  retreatProgressBar(i);
  atrophyGreenBall();

  i--;
  // Si on est sur la première slide, on rend la flèche de gauche transparente.
  if (i === 1) arrowLeft.style.opacity = 0.5;
};

const rightAction = function () {
  // On met une guard arrivé au bout des slides
  if (i === 4) return;
  // Si c'est le premier appui sur la flèche on remet la flèche de gauche à la bonne couleur.
  // On met une guard pour être sûr que l'on ne change pas de slide avant la fin de l'intervalle
  if (!carryOn) return;
  if (i === 1) arrowLeft.style.opacity = 1;
  moveTitlesLeft();
  moveDescriptionsLeft();
  moveimagesLeft();
  advanceProgressBar();
  revealGreenBall(i);

  i++;
  // On met la flèche en transparence une fois arrivé au bout des slides.
  if (i === 4) arrowRight.style.opacity = 0.5;
};

// function to handle the user's order via the keyboard
const stepperKey = function () {
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" && allowKey) {
      leftAction();
    }
    if (event.key === "ArrowRight" && allowKey) {
      rightAction();
    }
  });
};
stepperKey();

// function to handle the user's order via the mouse
const stepperClick = function () {
  arrowRight.addEventListener("click", rightAction);
  arrowLeft.addEventListener("click", leftAction);
};
stepperClick();
