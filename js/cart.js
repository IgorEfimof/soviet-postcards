document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart-container");
  const cartList = document.querySelector(".cart-list");
  const cartSummary = document.querySelector(".cart-summary");
  const emptyCartButton = document.getElementById("clear-cart");
  const checkoutButton = document.getElementById("checkout");

  // Получение данных корзины из localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  // Сохранение данных корзины в localStorage
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Обновление отображения корзины
  function renderCart() {
    const cart = getCart();
    cartList.innerHTML = "";
    let total = 0;
    let itemCount = 0;

    // Отображение товаров в корзине
    cart.forEach((item) => {
      if (!item.quantity) item.quantity = 1;
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-image"/>
        <div class="item-info">
          <strong>${item.title}</strong>
          <p>Цена: ${item.price} ₽</p>
          <p>Количество: ${item.quantity}</p>
          <button class="remove-item-btn" data-id="${item.id}">Удалить</button>
        </div>
      `;
      cartList.appendChild(li);
      total += item.price * item.quantity;
      itemCount += item.quantity;
    });

    // Обновление общей суммы и количества
    cartSummary.innerHTML = `
      <p><strong>Общая сумма:</strong> ${total.toFixed(2)} ₽</p>
      <p><strong>Количество товаров:</strong> ${itemCount}</p>
    `;

    if (cart.length === 0) {
      cartContainer.innerHTML = `
        <p>Ваша корзина пуста. Добавьте товары в корзину.</p>
      `;
    }

    updateCartCounter();

    // Добавление обработчиков на кнопки "Удалить"
    document.querySelectorAll(".remove-item-btn").forEach((button) => {
      button.addEventListener("click", removeItemFromCart);
    });
  }

  // Удаление товара из корзины
  function removeItemFromCart(event) {
    const id = event.target.getAttribute("data-id");
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.id !== id);
    saveCart(updatedCart);
    renderCart();
  }

  // Очистка корзины
  function emptyCart() {
    saveCart([]);
    renderCart();
  }

  // Переход на страницу оформления заказа
  function proceedToCheckout() {
    if (getCart().length === 0) {
      alert("Ваша корзина пуста. Добавьте товары перед оформлением заказа.");
      return;
    }
    window.location.href = "checkout.html";
  }

  // Обновление счетчика товаров
  function updateCartCounter() {
    const cart = getCart();
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
  }

  // Инициализация
  emptyCartButton?.addEventListener("click", emptyCart);
  checkoutButton?.addEventListener("click", proceedToCheckout);
  renderCart();
});
