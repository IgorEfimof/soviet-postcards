// js/modal.js

function openModal(item) {
  const modal = document.getElementById("modal");
  document.getElementById("modal-img").src = item.image;
  document.getElementById("modal-title").textContent = item.title;
  document.getElementById("modal-description").textContent = item.description;
  modal.classList.remove("hidden");
}

document.getElementById("modal-close").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});

document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    document.getElementById("modal").classList.add("hidden");
  }
});
