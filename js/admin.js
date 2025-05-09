document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("postcard-form");
  const savedPostcards = document.getElementById("saved-postcards");
  const cart = document.getElementById("cart");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  // Обработчик отправки формы для добавления новой открытки
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;
    const backImage = document.getElementById("backImage").value;

    const newPostcard = {
      id: Date.now(),
      title,
      description,
      category,
      price,
      image,
      backImage
    };

    // Сохранение новой открытки в localStorage
    const storedPostcards = JSON.parse(localStorage.getItem("postcards")) || [];
    storedPostcards.push(newPostcard);
    localStorage.setItem("postcards", JSON.stringify(storedPostcards));

    renderSavedPostcards(storedPostcards);
    form.reset();
  });

  // Функция для отображения всех сохраненных открыток
  function renderSavedPostcards(postcards) {
    savedPostcards.innerHTML = "";
    postcards.forEach((postcard) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${postcard.title}</strong><br />
        <em>${postcard.category}</em><br />
        Цена: ${postcard.price} ₽<br />
        <img src="${postcard.image}" alt="${postcard.title}" style="width: 100px; height: auto;" />
        ${postcard.backImage ? `<br /><span style="font-size: 0.9em;">Оборот:</span><br /><img src="${postcard.backImage}" alt="Оборот" style="width: 100px; height: auto;" />` : ""}
        <br />
        <button class="add-to-cart-btn" data-id="${postcard.id}">Добавить в корзину</button>
        <button class="delete-btn" data-id="${postcard.id}">Удалить</button>
        <hr />
      `;
      savedPostcards.appendChild(li);
    });

    // Обработчик добавления в корзину
    document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const postcards = JSON.parse(localStorage.getItem("postcards")) || [];
        const selectedPostcard = postcards.find((item) => item.id == id);
        addToCart(selectedPostcard);
      });
    });

    // Обработчик удаления
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const updatedPostcards = postcards.filter((item) => item.id != id);
        localStorage.setItem("postcards", JSON.stringify(updatedPostcards));
        renderSavedPostcards(updatedPostcards);
      });
    });
  }

  // Функция для добавления товара в корзину
  function addToCart(postcard) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cartItems.findIndex((item) => item.id === postcard.id);

    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += 1; // Увеличиваем количество
    } else {
      postcard.quantity = 1;
      cartItems.push(postcard); // Добавляем товар в корзину
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCart();
  }

  // Функция для обновления отображения корзины
  function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cart.innerHTML = "";
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${item.title}</strong> x${item.quantity} - ${item.price * item.quantity} ₽
        <button class="remove-from-cart-btn" data-id="${item.id}">Удалить</button>
      `;
      cart.appendChild(li);
    });

    // Обновляем количество товаров в корзине и общую сумму
    cartCount.textContent = cartItems.length;
    cartTotal.textContent = total.toFixed(2);

    // Обработчик удаления товара из корзины
    document.querySelectorAll(".remove-from-cart-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        removeFromCart(id);
      });
    });
  }

  // Функция для удаления товара из корзины
  function removeFromCart(id) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems = cartItems.filter((item) => item.id != id);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCart();
  }

  // Загружаем сохранённые открытки при старте
  const storedPostcards = JSON.parse(localStorage.getItem("postcards")) || [];
  renderSavedPostcards(storedPostcards);

  // Загружаем корзину при старте
  updateCart();

  // 🔄 Кнопка "Скопировать JSON"
  const copyBtn = document.getElementById("copy-json-btn");
  const jsonOutput = document.getElementById("json-output");

  if (copyBtn && jsonOutput) {
    copyBtn.addEventListener("click", () => {
      const postcards = JSON.parse(localStorage.getItem("postcards")) || [];
      const jsonString = JSON.stringify(postcards, null, 2);
      jsonOutput.textContent = jsonString;
      jsonOutput.style.display = "block";

      // Копирование в буфер
      navigator.clipboard.writeText(jsonString).then(() => {
        copyBtn.textContent = "Скопировано!";
        setTimeout(() => (copyBtn.textContent = "Скопировать JSON для products.json"), 2000);
      });
    });
  }
});


