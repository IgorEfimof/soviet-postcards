document.addEventListener("DOMContentLoaded", () => {
  const checkoutList = document.getElementById("checkout-list");
  const checkoutTotal = document.getElementById("checkout-total");
  const confirmOrderButton = document.getElementById("confirm-order");

  // Получение данных корзины из localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  // Отображение данных на странице оформления заказа
  function renderCheckout() {
    const cart = getCart();
    checkoutList.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-image"/>
        <div class="item-info">
          <strong>${item.title}</strong>
          <p>Цена: ${item.price} ₽</p>
          <p>Количество: ${item.quantity}</p>
          <p>Сумма: ${(item.price * item.quantity).toFixed(2)} ₽</p>
        </div>
      `;
      checkoutList.appendChild(li);
      total += item.price * item.quantity;
    });

    checkoutTotal.textContent = total.toFixed(2);
  }

  // Подтверждение заказа
  confirmOrderButton.addEventListener("click", () => {
    if (getCart().length === 0) {
      alert("Ваш заказ пуст. Пожалуйста, добавьте товары в корзину.");
      return;
    }
    alert("Спасибо за ваш заказ! Мы свяжемся с вами для подтверждения.");
    localStorage.removeItem("cart"); // Очистка корзины после подтверждения заказа
    window.location.href = "index.html"; // Возврат на главную страницу
  });

  // Инициализация
  renderCheckout();
});
