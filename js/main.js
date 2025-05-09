document.addEventListener("DOMContentLoaded", () => {
  fetch("data/postcards.json")
    .then((res) => res.json())
    .then((data) => {
      const storedPostcards = JSON.parse(localStorage.getItem("postcards")) || [];
      const allPostcards = [...data, ...storedPostcards];
      renderPostcards(allPostcards);
      renderFilters(allPostcards);
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
      <div class="card-info">
        <div class="card-title">${item.title}</div>
        ${item.price ? `<div class="card-price">${item.price} ₽</div>` : ""}
        <button class="buy-btn" data-id="${item.id}" data-title="${item.title}" data-price="${item.price}" data-image="${item.image}">Купить</button>
      </div>
    `;

    card.addEventListener("click", () => openModal(item));
    gallery.appendChild(card);

    // Обработчик события для кнопки "Купить"
    const buyButton = card.querySelector(".buy-btn");
    buyButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Чтобы не открывалось модальное окно при клике на "Купить"
      const newItem = {
        id: buyButton.getAttribute("data-id"),
        title: buyButton.getAttribute("data-title"),
        price: parseFloat(buyButton.getAttribute("data-price")),
        image: buyButton.getAttribute("data-image"),
      };
      addToCart(newItem);
    });
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
