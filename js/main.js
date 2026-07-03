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
