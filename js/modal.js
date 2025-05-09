function openModal(postcard) {
  const modal = document.getElementById("modal");
  const modalContent = document.querySelector(".modal-content");

  modalContent.innerHTML = `
    <span class="modal-close">&times;</span>
    <h2>${postcard.title}</h2>
    <img src="${postcard.image}" alt="${postcard.title}" />
    ${postcard.backImage ? `<p><strong>Оборотная сторона:</strong></p><img src="${postcard.backImage}" alt="Оборотная сторона" />` : ""}
    <p><strong>Категория:</strong> ${postcard.category}</p>
    ${postcard.description ? `<p>${postcard.description}</p>` : ""}
    ${postcard.price ? `<p><strong>Цена:</strong> ${postcard.price}</p>` : ""}
  `;

  modal.style.display = "flex";

  document.querySelector(".modal-close").onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}


