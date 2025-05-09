document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("postcard-form");
  const savedPostcards = document.getElementById("saved-postcards");

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

    const storedPostcards = JSON.parse(localStorage.getItem("postcards")) || [];
    storedPostcards.push(newPostcard);
    localStorage.setItem("postcards", JSON.stringify(storedPostcards));

    renderSavedPostcards(storedPostcards);
    form.reset();
  });

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
        <button class="delete-btn" data-id="${postcard.id}">Удалить</button>
        <hr />
      `;
      savedPostcards.appendChild(li);
    });

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

