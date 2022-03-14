// Pour le slider des produits du moment

const arrowLeft = document.querySelector(".arrows__arrow--left");
const arrowRight = document.querySelector(".arrows__arrow--right");
let i = 1;

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
  console.log("current image", currentImage);
  currentImage.classList.remove(`translate--${i - 1}00`);
  currentImage.classList.add("hidden");
};

const moveimagesLeft = function () {
  const nextImage = document.querySelector(`.product__pic--${i + 1}`);
  nextImage.classList.add(`translate--${i}00`);
  nextImage.classList.remove("hidden");
};

const leftAction = function () {
  console.log("trig");
  // On met une guard si on est sur la première slide
  if (i === 1) return;
  // Si on était sur la  dernière slide on remet la flèche de droite entièrement visible
  if (i === 4) arrowRight.style.opacity = 1;
  moveTitlesRight();
  moveDescriptionsRight();
  moveImagesRight();

  i--;
  // Si on est sur la première slide, on rend la flèche de gauche transparente.
  if (i === 1) arrowLeft.style.opacity = 0.5;
};

const rightAction = function () {
  // On met une guard arrivé au bout des slides
  if (i === 4) return;
  // Si c'est le premier appui sur la flèche on remet la flèche de gauche à la bonne couleur.
  if (i === 1) arrowLeft.style.opacity = 1;
  moveTitlesLeft();
  moveDescriptionsLeft();
  moveimagesLeft();

  i++;
  // On met la flèche en transparence une fois arrivé au bout des slides.
  if (i === 4) arrowRight.style.opacity = 0.5;
};

const stepper = function () {
  arrowRight.addEventListener("click", rightAction);
  arrowLeft.addEventListener("click", leftAction);
};

stepper();
