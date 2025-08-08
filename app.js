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
const desktopToggle = document.getElementById("desktop-view-toggle");

if (searchInput && searchButton) {
  
  searchInput.addEventListener("input", (e) => filterMovies(e.target.value));

  searchButton.addEventListener("click", () => filterMovies(searchInput.value));
}

// Desktop View toggle (forces desktop-like styling on phones)
if (desktopToggle) {
  const key = 'forceDesktopView';
  function applyState() {
    const on = localStorage.getItem(key) === 'true';
    document.body.classList.toggle('force-desktop', on);
    desktopToggle.setAttribute('aria-pressed', String(on));
  }
  desktopToggle.addEventListener('click', () => {
    const next = !(localStorage.getItem(key) === 'true');
    localStorage.setItem(key, String(next));
    applyState();
  });
  applyState();
}


const homeIcon = document.querySelector('.left-menu-icon.fa-home');
if (homeIcon) {
  homeIcon.setAttribute('title', 'Home');
  homeIcon.addEventListener('click', () => {
    window.location.reload();
  });
}

// ========== Simple Auth (localStorage) ==========
const profileText = document.getElementById('profile-label');
const profileDropdown = document.getElementById('profile-dropdown');
const openAuthBtn = document.getElementById('open-auth');
const logoutBtn = document.getElementById('logout-btn');
const authModal = document.getElementById('auth-modal');
const authClose = document.getElementById('auth-close');
const tabButtons = document.querySelectorAll('.tab-button');
const tabLogin = document.getElementById('tab-login');
const tabSignup = document.getElementById('tab-signup');

// Seed demo users once
function seedDemoUsers() {
  const exists = localStorage.getItem('users');
  if (exists) return;
  const users = {
    demo: { username: 'demo', password: 'demo123' },
    admin: { username: 'admin', password: 'admin123' }
  };
  localStorage.setItem('users', JSON.stringify(users));
}

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '{}');
}

function setUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

function setCurrentUser(username) {
  if (username) localStorage.setItem('currentUser', username);
  else localStorage.removeItem('currentUser');
}

function updateProfileUI() {
  const user = getCurrentUser();
  if (profileText) profileText.textContent = user ? user : 'Profile';
  if (openAuthBtn) openAuthBtn.style.display = user ? 'none' : 'block';
  if (logoutBtn) logoutBtn.style.display = user ? 'block' : 'none';
}

seedDemoUsers();
updateProfileUI();

// Toggle dropdown
const profileTextContainer = document.querySelector('.profile-text-container');
if (profileTextContainer && profileDropdown) {
  profileTextContainer.addEventListener('click', () => {
    profileDropdown.classList.toggle('show');
  });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.profile-container')) {
    if (profileDropdown) profileDropdown.classList.remove('show');
  }
});

// Open auth modal
if (openAuthBtn && authModal) {
  openAuthBtn.addEventListener('click', () => {
    profileDropdown.classList.remove('show');
    authModal.classList.remove('hidden');
    authModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  });
}

// Close auth modal
if (authClose && authModal) {
  authClose.addEventListener('click', () => {
    authModal.classList.add('hidden');
    authModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  });
}

// Tabs
tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    if (tab === 'login') {
      tabLogin.classList.remove('hidden');
      tabSignup.classList.add('hidden');
    } else {
      tabSignup.classList.remove('hidden');
      tabLogin.classList.add('hidden');
    }
  });
});

// Handle login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const users = getUsers();
    if (users[username] && users[username].password === password) {
      setCurrentUser(username);
      updateProfileUI();
      authModal.classList.add('hidden');
      authModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      alert('Logged in as ' + username);
    } else {
      alert('Invalid credentials');
    }
  });
}

// Handle signup
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value;
    if (!username || !password) return alert('Enter username and password');
    const users = getUsers();
    if (users[username]) return alert('Username already exists');
    users[username] = { username, password };
    setUsers(users);
    setCurrentUser(username);
    updateProfileUI();
    authModal.classList.add('hidden');
    authModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    alert('Account created. Signed in as ' + username);
  });
}

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    setCurrentUser(null);
    updateProfileUI();
    profileDropdown.classList.remove('show');
  });
}