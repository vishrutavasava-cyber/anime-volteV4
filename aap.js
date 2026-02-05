let data = JSON.parse(localStorage.getItem("vault")) || [];
let deferredPrompt;

function save() {
  localStorage.setItem("vault", JSON.stringify(data));
}

function addItem() {
  if (!name.value) return alert("Name required");

  data.push({
    name: name.value,
    type: type.value,
    rating: +rating.value || 0,
    genres: genres.value.split(",").map(g=>g.trim()),
    watched: watched.checked,
    fav: fav.checked
  });

  save();
  renderAll();
}

function renderAll() {
  renderList();
  renderStats();
  renderTopRated();
  renderTopGenres();
}

function renderList() {
  list.innerHTML = "";
  const q = search.value.toLowerCase();

  data.filter(x=>x.name.toLowerCase().includes(q))
      .forEach(x=>{
        list.innerHTML += `
        <div class="card">
          <b>${x.name}</b> (${x.type}) ⭐${x.rating}<br>
          ${x.genres.map(g=>`<span class="badge ${g}">${g}</span>`).join("")}
          <br>
          ${x.watched?"👀 Watched":""} ${x.fav?"❤️":" "}
        </div>`;
      });
}

function renderStats() {
  const watchedCount = data.filter(x=>x.watched).length;
  stats.innerText = `Watched: ${watchedCount} / ${data.length}`;
}

function renderTopRated() {
  topRated.innerHTML="";
  [...data].sort((a,b)=>b.rating-a.rating)
    .slice(0,5)
    .forEach(x=>{
      topRated.innerHTML+=`⭐ ${x.name} (${x.rating})<br>`;
    });
}

function renderTopGenres() {
  const g={};
  data.forEach(x=>{
    if(x.watched)
      x.genres.forEach(z=>g[z]=(g[z]||0)+1);
  });

  topGenres.innerHTML="";
  Object.entries(g)
    .sort((a,b)=>b[1]-a[1])
    .forEach(([k,v])=>{
      topGenres.innerHTML+=`🔥 ${k}: ${v}<br>`;
    });
}

/* 📲 INSTALL BUTTON */
window.addEventListener("beforeinstallprompt", e=>{
  e.preventDefault();
  deferredPrompt=e;
  installBtn.hidden=false;
});

installBtn.onclick=async()=>{
  deferredPrompt.prompt();
};

renderAll();
