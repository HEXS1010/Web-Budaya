document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item img");
  const overlay = document.getElementById("lightboxOverlay");
  const lightboxImg = document.getElementById("lightboxImg");
  const imgWrapper = document.getElementById("lightboxImgWrapper");
  const btnClose = document.getElementById("lightboxClose");
  const btnPrev = document.getElementById("lightboxPrev");
  const btnNext = document.getElementById("lightboxNext");
  const btnZoomIn = document.getElementById("zoomIn");
  const btnZoomOut = document.getElementById("zoomOut");
  const btnZoomReset = document.getElementById("zoomReset");

  let currentIndex = 0;
  const images = Array.from(galleryItems);

  // ==== state zoom & pan ====
  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  const MIN_SCALE = 1;
  const MAX_SCALE = 4;

  function applyTransform() {
    lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    lightboxImg.classList.toggle("zoomed", scale > 1);
    lightboxImg.style.cursor = scale > 1 ? "grab" : "zoom-in";
  }

  function resetZoom() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    applyTransform();
  }

  function setZoom(newScale) {
    scale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
    if (scale === 1) {
      translateX = 0;
      translateY = 0;
    }
    applyTransform();
  }

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    resetZoom();
  }

  function closeLightbox() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    resetZoom();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
    resetZoom();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
    resetZoom();
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  btnClose.addEventListener("click", closeLightbox);
  btnNext.addEventListener("click", showNext);
  btnPrev.addEventListener("click", showPrev);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "+") setZoom(scale + 0.3);
    if (e.key === "-") setZoom(scale - 0.3);
  });

  // ==== tombol zoom ====
  btnZoomIn.addEventListener("click", () => setZoom(scale + 0.5));
  btnZoomOut.addEventListener("click", () => setZoom(scale - 0.5));
  btnZoomReset.addEventListener("click", resetZoom);

  // ==== scroll mouse buat zoom ====
  imgWrapper.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    setZoom(scale + delta);
  });

  // ==== double click buat zoom cepat ====
  lightboxImg.addEventListener("dblclick", () => {
    if (scale === 1) {
      setZoom(2.5);
    } else {
      resetZoom();
    }
  });

  // ==== drag buat geser gambar pas di-zoom (mouse) ====
  lightboxImg.addEventListener("mousedown", (e) => {
    if (scale === 1) return;
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    lightboxImg.classList.add("dragging");
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    applyTransform();
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    lightboxImg.classList.remove("dragging");
  });

  // ==== pinch zoom & drag buat touch (HP) ====
  let touchStartDist = 0;
  let touchStartScale = 1;

  function getTouchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  lightboxImg.addEventListener("touchstart", (e) => {
    if (e.touches.length === 2) {
      touchStartDist = getTouchDistance(e.touches);
      touchStartScale = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      isDragging = true;
      startX = e.touches[0].clientX - translateX;
      startY = e.touches[0].clientY - translateY;
    }
  });

  lightboxImg.addEventListener("touchmove", (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const newDist = getTouchDistance(e.touches);
      const ratio = newDist / touchStartDist;
      setZoom(touchStartScale * ratio);
    } else if (e.touches.length === 1 && isDragging) {
      translateX = e.touches[0].clientX - startX;
      translateY = e.touches[0].clientY - startY;
      applyTransform();
    }
  });

  lightboxImg.addEventListener("touchend", () => {
    isDragging = false;
  });
});
