document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card img");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const imgWindow = window.open("", "_blank");
      imgWindow.document.write(
        `<html><head><title>${card.alt}</title></head><body style='margin:0;text-align:center;background:#000;'>` +
        `<img src='${card.src}' style='max-width:100%;max-height:100vh;'>` +
        `</body></html>`
      );
    });
  });
});

