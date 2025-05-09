function openModal(postcard) {
  const modal = document.getElementById("modal");
  const modalContent = document.querySelector(".modal-content");

  let images = [postcard.image];
  if (postcard.backImage) images.push(postcard.backImage);
  let currentIndex = 0;

  function renderContent(index) {
    modalContent.innerHTML = `
      <span class="modal-close">&times;</span>
      <h2>${postcard.title}</h2>
      <div class="modal-slider">
        <button class="slide-btn prev" ${images.length < 2 ? "disabled" : ""}>&#10094;</button>
        <img src="${images[index]}" alt="Изображение ${index + 1}" class="modal-image" />
        <button class="slide-btn next" ${images.length < 2 ? "disabled" : ""}>&#10095;</button>
      </div>
      <p><strong>Категория:</strong> ${postcard.category}</p>
      ${postcard.description ? `<p>${postcard.description}</p>` : ""}
      ${postcard.price ? `<p><strong>Цена:</strong> ${postcard.price}</p>` : ""}
    `;

    modal.querySelector(".modal-close").onclick = () => {
      modal.style.display = "none";
    };

    if (images.length > 1) {
      modal.querySelector(".prev").onclick = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        renderContent(currentIndex);
      };
      modal.querySelector(".next").onclick = () => {
        currentIndex = (currentIndex + 1) % images.length;
        renderContent(currentIndex);
      };
    }
  }

  renderContent(currentIndex);
  modal.style.display = "flex";

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}



