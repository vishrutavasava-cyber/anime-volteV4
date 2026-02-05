/* ===== GENRES + SUB GENRES ===== */
const GENRES = {
  Action: ["Super Power", "Martial Arts", "Military"],
  Romance: ["School Romance", "Rom-Com", "Drama"],
  Shounen: ["Battle", "Adventure"],
  Seinen: ["Psychological", "Dark"],
  Ecchi: ["Fanservice", "Comedy"],
  Isekai: ["Reincarnation", "Game World"],
  Slice_of_Life: ["School", "Workplace"],
  Fantasy: ["Magic", "Demons"],
  Horror: ["Thriller", "Psychological"],
  Sports: ["School Sports", "Professional"],
  Hentai: ["Uncensored", "OVA"]
};

/* ===== DEFAULT DATA ===== */
const DEFAULT_DATA = [
  {
    name: "Horimiya",
    rating: 9.2,
    genres: ["Romance", "Slice_of_Life"],
    subGenres: ["School Romance", "School"],
    fav: false
  },
  {
    name: "Naruto",
    rating: 9.6,
    genres: ["Action", "Shounen"],
    subGenres: ["Battle", "Adventure"],
    fav: false
  },
  {
    name: "Redo of Healer",
    rating: 6.3,
    genres: ["Ecchi", "Hentai", "Fantasy"],
    subGenres: ["Uncensored", "Magic"],
    fav: false
  }
];

/* ===== STATE ===== */
let data = JSON.parse(localStorage.getItem("animeVault")) || DEFAULT_DATA;
let selectedGenres = [];
let selectedSubGenres = [];

/* ===== ELEMENTS ===== */
const genreBox = document.getElementById("genres");
const subBox = document.getElementById("subgenres");
const list = document.getElementById("anime-list");
const search = document.getElementById("search");

/* ===== RENDER GENRES ===== */
function renderGenres() {
  genreBox.innerHTML = "";
  Object.keys(GENRES).forEach(g => {
    const div = document.createElement("div");
    div.className = "genre";
    div.textContent = g.replace("_", " ");
    div.onclick = () => {
      div.classList.toggle("active");
      selectedGenres.includes(g)
        ? selectedGenres = selectedGenres.filter(x => x !== g)
        : selectedGenres.push(g);
      selectedSubGenres = [];
      renderSubGenres();
      renderAnime();
    };
    genreBox.appendChild(div);
  });
}

/* ===== RENDER SUB GENRES ===== */
function renderSubGenres() {
  subBox.innerHTML = "";
  selectedGenres.forEach(g => {
    GENRES[g].forEach(sub => {
      const div = document.createElement("div");
      div.className = "genre sub";
      div.textContent = sub;
      div.onclick = () => {
        div.classList.toggle("active");
        selectedSubGenres.includes(sub)
          ? selectedSubGenres = selectedSubGenres.filter(x => x !== sub)
          : selectedSubGenres.push(sub);
        renderAnime();
      };
      subBox.appendChild(div);
    });
  });
}

/* ===== RENDER ANIME ===== */
function renderAnime() {
  list.innerHTML = "";
  const q = search.value.toLowerCase();

  data
    .filter(a =>
      a.name.toLowerCase().includes(q) &&
      (selectedGenres.length === 0 ||
        selectedGenres.every(g => a.genres.includes(g))) &&
      (selectedSubGenres.length === 0 ||
        selectedSubGenres.every(s => a.subGenres.includes(s)))
    )
    .forEach(a => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${a.name}</h3>
        <p>⭐ ${a.rating}</p>
        <p>${a.genres.join(", ")}</p>
        <p>${a.subGenres.join(", ")}</p>
        <span class="star">${a.fav ? "★" : "☆"}</span>
      `;
      card.querySelector(".star").onclick = () => {
        a.fav = !a.fav;
        save();
        renderAnime();
      };
      list.appendChild(card);
    });
}

/* ===== SAVE ===== */
function save() {
  localStorage.setItem("animeVault", JSON.stringify(data));
}

search.oninput = renderAnime;

/* INIT */
renderGenres();
renderAnime();
