document.addEventListener("DOMContentLoaded", () => {
  const checkoutList = document.getElementById("checkout-list");
  const checkoutTotal = document.getElementById("checkout-total");
  const confirmOrderButton = document.getElementById("confirm-order");

  const contactForm = document.getElementById("contact-form");
  const clientNameInput = document.getElementById("client-name");
  const clientPhoneInput = document.getElementById("client-phone");
  const clientEmailInput = document.getElementById("client-email");

  const TELEGRAM_BOT_TOKEN = "7549512928:AAG4ChQzTDH9c5zzo2D1KofIKtekwqNM4bg";
  const TELEGRAM_CHAT_ID = "5059431264";

  function getCart() {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      return cart;
    } catch (error) {
      console.error("Ошибка при чтении данных из localStorage:", error);
      return [];
    }
  }

  function renderCheckout() {
    const cart = getCart();
    checkoutList.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      checkoutList.innerHTML = "<p>Ваша корзина пуста. Добавьте товары для оформления заказа.</p>";
      return;
    }

    cart.forEach((item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      const itemTotal = price * quantity;

      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-image"/>
        <div class="item-info">
          <strong>${item.title}</strong>
          <p>Цена: ${price} ₽</p>
          <p>Количество: ${quantity}</p>
          <p>Сумма: ${itemTotal.toFixed(2)} ₽</p>
        </div>
      `;
      checkoutList.appendChild(li);
      total += itemTotal;
    });

    checkoutTotal.textContent = total.toFixed(2);
  }

  async function sendTextToTelegram(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML"
        }),
      });
      if (!response.ok) {
        throw new Error("Ошибка при отправке текста в Telegram");
      }
    } catch (error) {
      console.error("Ошибка отправки текста в Telegram:", error);
    }
  }

  async function sendPhotoToTelegram(photoUrl, caption) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;

    if (!photoUrl || !photoUrl.startsWith("http")) {
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          photo: photoUrl,
          caption: caption,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(`Ошибка при отправке фото: ${responseData.description}`);
      }
    } catch (error) {
      console.error("Ошибка отправки фото в Telegram:", error);
    }
  }

  confirmOrderButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const cart = getCart();

    if (cart.length === 0) {
      alert("Ваш заказ пуст. Пожалуйста, добавьте товары в корзину.");
      return;
    }

    if (!contactForm.checkValidity()) {
      alert("Пожалуйста, заполните все поля формы.");
      return;
    }

    const clientData = {
      name: clientNameInput.value.trim(),
      phone: clientPhoneInput.value.trim(),
      email: clientEmailInput.value.trim(),
    };

    let total = 0;
    const itemLines = cart.map((item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      const sum = price * quantity;
      total += sum;
      return `- ${item.title} (${quantity} x ${price} ₽): ${sum.toFixed(2)} ₽`;
    });

    const message = [
      "🛒 <b>Новый заказ</b>",
      `👤 Имя: ${clientData.name}`,
      `📞 Телефон: ${clientData.phone}`,
      `📧 Email: ${clientData.email}`,
      `💰 Сумма заказа: ${total.toFixed(2)} ₽`,
      "",
      "📦 <b>Товары:</b>",
      ...itemLines
    ].join("\n");

    await sendTextToTelegram(message);

    for (const item of cart) {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      const sum = price * quantity;
      const caption = `${item.title}\nЦена: ${price} ₽\nКоличество: ${quantity}\nСумма: ${sum.toFixed(2)} ₽`;
      const absoluteImageUrl = item.image.startsWith("http")
        ? item.image
        : `${window.location.origin}/${item.image.replace(/^\.?\/*/, "")}`;
      await sendPhotoToTelegram(absoluteImageUrl, caption);
    }

    localStorage.removeItem("cart");
    window.location.href = "thank-you.html";
  });

  renderCheckout();
});
