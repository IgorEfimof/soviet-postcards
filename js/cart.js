document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart-container");
  const cartList = document.querySelector(".cart-list");
  const cartSummary = document.querySelector(".cart-summary");
  const emptyCartButton = document.getElementById("clear-cart");

  // Функция для получения данных корзины из localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  // Функция для сохранения данных корзины в localStorage
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Функция для обновления отображения корзины
  function renderCart() {
    const cart = getCart();
    cartList.innerHTML = "";
    let total = 0;

    // Отображаем все товары в корзине
    cart.forEach(item => {
      // Проверка: если quantity отсутствует, устанавливаем значение по умолчанию
      if (!item.quantity) {
        item.quantity = 1;
      }
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-image"/>
        <div class="item-info">
          <strong>${item.title}</strong>
          <p>Цена: ${item.price} ₽</p>
          <p>Количество: ${item.quantity}</p> <!-- Отображение количества -->
          <button class="remove-item-btn" data-id="${item.id}">Удалить</button>
        </div>
      `;
      cartList.appendChild(li);
      total += parseFloat(item.price) * item.quantity;
    });

    // Отображаем общую сумму
    cartSummary.innerHTML = `<p><strong>Итого:</strong> ${total.toFixed(2)} ₽</p>`;

    // Если корзина пуста, отображаем сообщение
    if (cart.length === 0) {
      cartContainer.innerHTML = `<p>Ваша корзина пуста. Добавьте товары в корзину.</p>`;
    }

    updateCartCounter();

    // Добавляем обработчики для кнопок удаления
    document.querySelectorAll(".remove-item-btn").forEach(button => {
      button.addEventListener("click", removeItemFromCart);
    });
  }

  // Функция для добавления товара в корзину
  function addToCart(item) {
    const cart = getCart();
    const existingItem = cart.find(i => i.id === item.id);

    if (existingItem) {
      // Увеличиваем количество, если товар уже есть
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      // Добавляем новый товар
      item.quantity = 1;
      cart.push(item);
    }
    saveCart(cart);
    renderCart();
  }

  // Функция для удаления товара из корзины
  function removeItemFromCart(event) {
    const id = event.target.getAttribute("data-id");
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== id);
    saveCart(updatedCart);
    renderCart();
  }

  // Функция для очистки всей корзины
  function emptyCart() {
    saveCart([]); // Очищаем localStorage
    renderCart(); // Обновляем интерфейс
  }

  // Обработчик для кнопки очистки корзины
  emptyCartButton?.addEventListener("click", emptyCart);

  // Функция для обновления счетчика товаров в шапке
  function updateCartCounter() {
    const cart = getCart();
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
  }

  // Инициализация корзины при загрузке страницы
  renderCart();

  // Экспорт функции addToCart для использования в других модулях
  window.addToCart = addToCart;
});
