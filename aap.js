let animes = JSON.parse(localStorage.getItem("animeTracker")) || [];
let selectedGenres = [];

function toggleGenre(btn){
  btn.classList.toggle("active");
  const g = btn.innerText;

  if(selectedGenres.includes(g)){
    selectedGenres = selectedGenres.filter(x => x !== g);
  } else {
    selectedGenres.push(g);
  }
}

function addAnime(){
  const title = document.getElementById("title").value.trim();
  const rating = parseFloat(document.getElementById("rating").value);
  const completed = document.getElementById("completed").checked;

  if(!title || isNaN(rating) || selectedGenres.length === 0){
    alert("Fill all fields bro");
    return;
  }

  animes.push({title, rating, genres:[...selectedGenres], completed});
  save();
  resetForm();
  render();
}

function resetForm(){
  title.value="";
  rating.value="";
  completed.checked=false;
  selectedGenres=[];
  document.querySelectorAll(".genres button")
    .forEach(b=>b.classList.remove("active"));
}

function render(){
  const box = document.getElementById("list");
  box.innerHTML="";

  animes.forEach((a,i)=>{
    box.innerHTML += `
      <div class="card">
        <b>${a.title}</b><br>
        ⭐ ${a.rating}<br>
        ${a.completed ? "✅ Completed<br>" : ""}
        ${a.genres.map(g=>`<span class="badge ${g}">${g}</span>`).join("")}
        <br>
        <button class="delete" onclick="remove(${i})">Delete</button>
      </div>
    `;
  });
}

function remove(i){
  animes.splice(i,1);
  save();
  render();
}

function sortByRating(){
  animes.sort((a,b)=>b.rating - a.rating);
  render();
}

function save(){
  localStorage.setItem("animeTracker", JSON.stringify(animes));
}

render();
