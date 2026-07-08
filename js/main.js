// scorll navbar line
const scrollLine = document.querySelector(".scroll-line");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  const percent = (scrollTop / docHeight) * 100;

  scrollLine.style.width = `${percent}%`;
});

// saat scroll navbar, akan ada backgroundnya
const navbarScroll = document.querySelector(".navbar-scroll");

window.addEventListener("scroll", () => {
  if (window.scrollY > 120) {
    navbarScroll.classList.add("show");
  } else {
    navbarScroll.classList.remove("show");
  }
});

// slider img
const slides = document.querySelectorAll(".slide");

let current = 0;

setInterval(() => {
  slides[current].classList.remove("active");

  current = (current + 1) % slides.length;

  slides[current].classList.add("active");
}, 5000);

// animasi untuk shape dot
const parallaxItems = document.querySelectorAll(".parallax");

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;

const strength = 10;

window.addEventListener("mousemove", (e) => {
  targetX = (e.clientX / window.innerWidth - 0.5) * strength * 2;
  targetY = (e.clientY / window.innerHeight - 0.5) * strength * 2;
});

function animateParallax() {
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;

  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.speed) || 1;

    item.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
  });

  requestAnimationFrame(animateParallax);
}

animateParallax();

// agenda
const agendaScroll = document.getElementById("agendaList");
const prevBtn = document.querySelector(".agenda-nav-btn.is-prev");
const nextBtn = document.querySelector(".agenda-nav-btn.is-next");

function getCardStep() {
  const firstCard = agendaScroll.querySelector(".agenda-item");
  if (!firstCard) return 300;
  const gap = parseFloat(getComputedStyle(agendaScroll).gap) || 16;
  return firstCard.getBoundingClientRect().width + gap;
}

function snapToNearest() {
  const step = getCardStep();
  const index = Math.round(agendaScroll.scrollLeft / step);
  agendaScroll.scrollTo({ left: index * step, behavior: "smooth" });
}

prevBtn.addEventListener("click", () => {
  agendaScroll.scrollBy({ left: -getCardStep() * 3, behavior: "smooth" });
});

nextBtn.addEventListener("click", () => {
  agendaScroll.scrollBy({ left: getCardStep() * 3, behavior: "smooth" });
});

agendaScroll.querySelectorAll("img").forEach((img) => {
  img.setAttribute("draggable", "false");
  img.addEventListener("dragstart", (e) => e.preventDefault());
});

let isDown = false;
let startX = 0;
let scrollLeftStart = 0;

agendaScroll.addEventListener("pointerdown", (e) => {
  isDown = true;
  agendaScroll.classList.add("is-dragging");
  agendaScroll.setPointerCapture(e.pointerId);
  startX = e.clientX;
  scrollLeftStart = agendaScroll.scrollLeft;
});

agendaScroll.addEventListener("pointermove", (e) => {
  if (!isDown) return;
  const delta = e.clientX - startX;
  agendaScroll.scrollLeft = scrollLeftStart - delta;
});

function endDrag(e) {
  if (!isDown) return;
  isDown = false;
  agendaScroll.classList.remove("is-dragging");
  agendaScroll.releasePointerCapture(e.pointerId);
  snapToNearest();
}

agendaScroll.addEventListener("pointerup", endDrag);
agendaScroll.addEventListener("pointercancel", endDrag);

let isWheeling = false;

agendaScroll.addEventListener(
  "wheel",
  (e) => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();
    if (isWheeling) return;
    isWheeling = true;

    const direction = e.deltaY > 0 ? 1 : -1;
    agendaScroll.scrollBy({
      left: direction * getCardStep(),
      behavior: "smooth",
    });

    setTimeout(() => {
      isWheeling = false;
    }, 350);
  },
  { passive: false },
);
