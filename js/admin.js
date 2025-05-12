document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("postcard-form");
  const savedPostcards = document.getElementById("saved-postcards");
  const cart = document.getElementById("cart");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  // Обработчик отправки формы для добавления новой открытки
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const price = parseFloat(document.getElementById("price").value); // Преобразуем в число
    const image = document.getElementById("image").value;
    const backImage = document.getElementById("backImage").value;

    if (!title || !description || !category || isNaN(price) || !image) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

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

  // Загружаем сохранённые открытки при старте
  const storedPostcards = JSON.parse(localStorage.getItem("postcards")) || [];
  renderSavedPostcards(storedPostcards);

  // 🔄 Кнопка "Скопировать JSON"
  const copyBtn = document.getElementById("copy-json-btn");
  const jsonOutput = document.getElementById("json-output");

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // Избегаем прокрутки страницы
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      alert("JSON скопирован в буфер обмена!");
    } catch (err) {
      console.error("Ошибка копирования:", err);
      alert("Не удалось скопировать JSON.");
    }

    document.body.removeChild(textArea);
  };

  if (copyBtn && jsonOutput) {
    copyBtn.addEventListener("click", () => {
      try {
        const postcards = JSON.parse(localStorage.getItem("postcards")) || [];
        if (postcards.length === 0) {
          alert("Нет данных для копирования! Добавьте открытки.");
          return;
        }

        const jsonString = JSON.stringify(postcards, null, 2);

        // Отображаем JSON на странице
        jsonOutput.textContent = jsonString;
        jsonOutput.style.display = "block";

        // Копирование в буфер обмена
        if (!navigator.clipboard) {
          fallbackCopyTextToClipboard(jsonString);
        } else {
          navigator.clipboard.writeText(jsonString).then(() => {
            alert("JSON успешно скопирован!");
          }, (err) => {
            console.error("Ошибка копирования через clipboard:", err);
            fallbackCopyTextToClipboard(jsonString);
          });
        }
      } catch (error) {
        console.error("Ошибка обработки JSON:", error);
        alert("Ошибка при формировании JSON. Проверьте данные.");
      }
    });
  } else {
    console.error("Кнопка или элемент для отображения JSON не найдены!");
  }
});
