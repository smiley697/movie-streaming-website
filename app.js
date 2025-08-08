const arrows = document.querySelectorAll(".arrow");
const arrowLefts = document.querySelectorAll(".arrow-left");
// Select all lists, not just the first one
const movieLists = document.querySelectorAll(".movie-list");

// Right arrow functionality
arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      const computed = movieLists[i].computedStyleMap && movieLists[i].computedStyleMap();
      const currentX = computed && computed.get("transform") && computed.get("transform")[0]
        ? computed.get("transform")[0].x.value
        : parseFloat((movieLists[i].style.transform.match(/-?\d+(?:\.\d+)?/g) || ["0"])[0]);
      movieLists[i].style.transform = `translateX(${currentX - 300}px)`;
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
    const computed = movieLists[i].computedStyleMap && movieLists[i].computedStyleMap();
    const currentTransform = computed && computed.get("transform") && computed.get("transform")[0]
      ? computed.get("transform")[0].x.value
      : parseFloat((movieLists[i].style.transform.match(/-?\d+(?:\.\d+)?/g) || ["0"])[0]);
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


function normalize(text) {
  return (text || "").toString().trim().toLowerCase();
}

function filterMovies(query) {
  const q = normalize(query);
  const items = document.querySelectorAll(".movie-list-item");
  items.forEach((item) => {
    const titleEl = item.querySelector(".movie-list-item-title");
    const title = normalize(titleEl ? titleEl.textContent : item.getAttribute("data-title"));
    const match = q === "" || title.includes(q);
    item.style.display = match ? "block" : "none";
  });
}

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

if (searchInput && searchButton) {
  
  searchInput.addEventListener("input", (e) => filterMovies(e.target.value));

  searchButton.addEventListener("click", () => filterMovies(searchInput.value));
}


const homeIcon = document.querySelector('.left-menu-icon.fa-home');
if (homeIcon) {
  homeIcon.setAttribute('title', 'Home');
  homeIcon.addEventListener('click', () => {
    window.location.reload();
  });
}