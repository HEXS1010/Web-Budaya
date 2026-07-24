// Accordion untuk card program kerja
// document.querySelectorAll(".proker-card-head").forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const card = btn.closest(".proker-card");
//     const body = card.querySelector(".proker-card-body");
//     const isOpen = card.classList.toggle("is-open");
//     btn.setAttribute("aria-expanded", String(isOpen));
//     body.hidden = !isOpen;
//   });
// });


document.querySelectorAll(".proker-card-head").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".proker-card");
    const isOpen = card.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });
});