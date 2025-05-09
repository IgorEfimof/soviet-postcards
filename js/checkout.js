document.addEventListener("DOMContentLoaded", () => {
  const checkoutList = document.getElementById("checkout-list");
  const checkoutTotal = document.getElementById("checkout-total");
  const confirmOrderButton = document.getElementById("confirm-order");

  const contactForm = document.getElementById("contact-form");
  const clientNameInput = document.getElementById("client-name");
  const clientPhoneInput = document.getElementById("client-phone");
  const clientEmailInput = document.getElementById("client-email");

  // Получение данных корзины из localStorage
  function getCart() {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      return cart;
    } catch (error) {
      console.error("Ошибка при чтении данных из localStorage:", error);
      return [];
    }
  }

  // Отображение данных на странице оформления заказа
  function renderCheckout() {
    const cart = getCart();
    checkoutList.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      checkoutList.innerHTML = "<p>Ваша корзина пуста. Добавьте товары для оформления заказа.</p>";
      return;
    }

    cart.forEach((item) => {
      if (!item.quantity) item.quantity = 1; // Значение по умолчанию
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
  confirmOrderButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (getCart().length === 0) {
      alert("Ваш заказ пуст. Пожалуйста, добавьте товары в корзину.");
      return;
    }

    if (!contactForm.checkValidity()) {
      alert("Пожалуйста, заполните все поля формы.");
      return;
    }

    const clientData = {
      name: clientNameInput.value,
      phone: clientPhoneInput.value,
      email: clientEmailInput.value,
    };

    alert("Спасибо за ваш заказ! Мы свяжемся с вами для подтверждения.");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });

  renderCheckout();
});
