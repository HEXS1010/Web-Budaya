

// ================== hamburger dan sidebar ==================
const hamburgerBtns = document.querySelectorAll(".hamburger-btn");
const sidebar = document.getElementById("mobileSidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const sidebarClose = document.querySelector(".mobile-sidebar-close");
const body = document.body;

function openSidebar() {
  sidebar.classList.add("is-active");
  sidebarOverlay.classList.add("is-active");
  sidebar.setAttribute("aria-hidden", "false");
  body.classList.add("sidebar-open");
  hamburgerBtns.forEach((btn) => {
    btn.classList.add("is-active");
    btn.setAttribute("aria-expanded", "true");
  });
}

function closeSidebar() {
  sidebar.classList.remove("is-active");
  sidebarOverlay.classList.remove("is-active");
  sidebar.setAttribute("aria-hidden", "true");
  body.classList.remove("sidebar-open");
  hamburgerBtns.forEach((btn) => {
    btn.classList.remove("is-active");
    btn.setAttribute("aria-expanded", "false");
  });

  // tutup semua submenu yang lagi kebuka juga
  document.querySelectorAll(".mobile-nav-item.is-open").forEach((item) => {
    item.classList.remove("is-open");
  });
}

hamburgerBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const isOpen = sidebar.classList.contains("is-active");
    isOpen ? closeSidebar() : openSidebar();
  });
});

sidebarClose.addEventListener("click", closeSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

// accordion submenu di dalam sidebar
document.querySelectorAll(".mobile-nav-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const parentItem = toggle.closest(".mobile-nav-item");
    const isOpen = parentItem.classList.contains("is-open");

    // tutup submenu lain yang lagi kebuka (biar cuma 1 yang aktif)
    document.querySelectorAll(".mobile-nav-item.is-open").forEach((item) => {
      if (item !== parentItem) item.classList.remove("is-open");
    });

    parentItem.classList.toggle("is-open", !isOpen);
  });
});

// tutup sidebar otomatis kalau layar di-resize balik ke desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeSidebar();
  }
});

//================ scorll navbar line ==================
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
