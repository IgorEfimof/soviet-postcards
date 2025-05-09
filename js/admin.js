const form = document.getElementById("postcard-form");
const jsonOutput = document.getElementById("jsonOutput");
const preview = document.getElementById("preview");
const downloadJsonBtn = document.getElementById("downloadJson");

let postcards = [];

// Обработка формы и добавление данных
form.addEventListener("submit", e => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value;
  const image = document.getElementById("image").value.trim();

  if (!title || !category || !image) return;

  postcards.push({ title, category, image });
  updateOutput();
  form.reset();
  preview.innerHTML = "";
});

// Предпросмотр изображения
document.getElementById("image").addEventListener("input", () => {
  const filename = document.getElementById("image").value.trim();
  if (filename) {
    preview.innerHTML = `<img src="images/${filename}" alt="preview">`;
  } else {
    preview.innerHTML = "";
  }
});

// Обновление отображаемого JSON
function updateOutput() {
  jsonOutput.value = JSON.stringify(postcards, null, 2);
}

// Функция для скачивания JSON
downloadJsonBtn.addEventListener("click", () => {
  const blob = new Blob([jsonOutput.value], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "postcards.json";
  link.click();
});


