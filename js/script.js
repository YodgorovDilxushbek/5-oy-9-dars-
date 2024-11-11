const form = document.querySelector("#form");
const cardContainer = document.querySelector("#card");
const field = document.querySelector("#search");
const clearAllButton = document.querySelector("#clearAll"); 

function createCard(data) {
  return `
    <div class="card" data-id="${data.id}">
      <h2>${data.name}</h2>
      <div class="image">
        <img src="./image/pen-solid.svg" width="15px" alt="">
        <img src="./image/trash-solid.svg" width="15px" alt="" class="delete-button" data-id="${data.id}">
      </div>
    </div>`;
}

function getData() {
  let storage = [];
  if (localStorage.getItem("data")) {
    storage = JSON.parse(localStorage.getItem("data"));
  }
  return storage;
}

document.addEventListener("DOMContentLoaded", function () {
  const data = getData();
  data.forEach(item => {
    cardContainer.innerHTML += createCard(item);
  });
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  
  const todo = {
    id: Date.now(),
    name: field.value
  };

  const block = createCard(todo);
  cardContainer.innerHTML += block;
  field.value = "";

  let data = getData();
  data.push(todo);
  localStorage.setItem("data", JSON.stringify(data));
});

cardContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-button")) {
    const isDelete = confirm("Rostdan ham o'chirmoqchimisiz?");
    if (isDelete) {
      const id = event.target.getAttribute("data-id");

      const card = document.querySelector(`.card[data-id="${id}"]`);
      if (card) {
        card.remove();
      }

      let data = getData();
      data = data.filter(item => item.id != id);
      localStorage.setItem("data", JSON.stringify(data));
    }
  }
});

clearAllButton.addEventListener("click", function (event) {
  event.preventDefault();

  const isClear = confirm("Rostdan ham hammasini o'chirmoqchimisiz?");
  if (isClear) {
    cardContainer.innerHTML = '';
    localStorage.removeItem("data");
  }
});
