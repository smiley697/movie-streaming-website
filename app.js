const arrows = document.querySelectorAll(".arrow");
const arrowLefts = document.querySelectorAll(".arrow-left");
const movieLists = document.querySelectorAll(".movie-list");

// Right arrow functionality
arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });
});

// Left arrow functionality
arrowLefts.forEach((arrowLeft, i) => {
  let clickCounter = 0;
  arrowLeft.addEventListener("click", () => {
    const currentTransform = movieLists[i].computedStyleMap().get("transform")[0].x.value;
    if (currentTransform < 0) {
      movieLists[i].style.transform = `translateX(${currentTransform + 300}px)`;
      clickCounter--;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });
});

//TOGGLE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});