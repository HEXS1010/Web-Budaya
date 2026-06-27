// scorll navbar line
const scrollLine = document.querySelector(".scroll-line");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  const percent = (scrollTop / docHeight) * 100;

  scrollLine.style.width = `${percent}%`;
});
