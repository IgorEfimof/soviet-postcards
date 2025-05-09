document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart-container");
  const cartList = document.querySelector(".cart-list");
  const cartSummary = document.querySelector(".cart-summary");
  const cartActions = document.querySelector(".cart-actions");
  const emptyCartButton = document.querySelector(".empty-cart-btn");

  // Функция для получения корзины из localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  // Функция для сохранения корзины в localStorage
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Функция для обновления корзины
  function renderCart() {
    const cart = getCart();
    cartList.innerHTML = "";
    let total = 0;

    // Отображаем все товары в корзине
    cart.forEach(item => {
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-image"/>
        <div class="item-info">
          <strong>${item.title}</strong>
          <p>Цена: ${item.price} ₽</p>
          <button class="remove-item-btn" data-id="${item.id}">Удалить</button>
        </div>
      `;
      cartList.appendChild(li);
      total += parseFloat(item.price);
    });

    // Показать общую стоимость корзины
    cartSummary.innerHTML = `Итого: ${total.toFixed(2)} ₽`;

    // Если корзина пуста, показать сообщение
    if (cart.length === 0) {
      cartContainer.innerHTML = `<p>Ваша корзина пуста. Добавьте товары в корзину.</p>`;
    }

    // Добавление обработчиков для удаления товаров
    document.querySelectorAll(".remove-item-btn").forEach(button => {
      button.addEventListener("click", removeItemFromCart);
    });
  }

  // Функция для добавления товара в корзину
  function addToCart(item) {
    const cart = getCart();
    const existingItem = cart.find(i => i.id === item.id);

    // Если товар уже есть в корзине, не добавляем
    if (!existingItem) {
      cart.push(item);
      saveCart(cart);
      renderCart();
    }
  }

  // Функция для удаления товара из корзины
  function removeItemFromCart(event) {
    const id = event.target.getAttribute("data-id");
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== id);
    saveCart(updatedCart);
    renderCart();
  }

  // Функция для очистки корзины
  function emptyCart() {
    saveCart([]);
    renderCart();
  }

  // Обработчик для кнопки очистки корзины
  emptyCartButton.addEventListener("click", emptyCart);

  // Инициализация корзины при загрузке страницы
  renderCart();

  // Добавление товара в корзину через локальные события или вызовы (например, с главной страницы)
  window.addToCart = addToCart;
});

