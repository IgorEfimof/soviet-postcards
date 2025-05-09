// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/postcards.json")
    .then((res) => res.json())
    .then((data) => {
      renderPostcards(data);
      renderFilters(data);
    });
});

function renderPostcards(data) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-category", item.category);
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="card-title">${item.title}</div>
    `;
    card.addEventListener("click", () => openModal(item));
    gallery.appendChild(card);
  });
}

function renderFilters(data) {
  const filters = document.getElementById("filters");
  const categories = [...new Set(data.map((item) => item.category))];
  filters.innerHTML = '<button data-filter="Все">Все</button>';
  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category;
    btn.setAttribute("data-filter", category);
    filters.appendChild(btn);
  });

  filters.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const selected = e.target.getAttribute("data-filter");
      document.querySelectorAll(".card").forEach((card) => {
        card.style.display =
          selected === "Все" || card.dataset.category === selected ? "block" : "none";
      });
    }
  });
}
