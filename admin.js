const form = document.getElementById("postcard-form");
const jsonOutput = document.getElementById("jsonOutput");
const preview = document.getElementById("preview");
let postcards = [];

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

document.getElementById("image").addEventListener("input", () => {
  const filename = document.getElementById("image").value.trim();
  if (filename) {
    preview.innerHTML = `<img src="images/${filename}" alt="preview">`;
  } else {
    preview.innerHTML = "";
  }
});

function updateOutput() {
  jsonOutput.value = JSON.stringify(postcards, null, 2);
}

