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

const stepper = function () {
  arrowRight.addEventListener("click", rightAction);
  arrowLeft.addEventListener("click", leftAction);
};

stepper();
