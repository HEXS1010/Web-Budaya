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
