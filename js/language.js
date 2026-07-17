const languageButtons = document.querySelectorAll(".lang-btn");

// Menyimpan teks Indonesia asli
const defaultLanguage = {};

document.querySelectorAll("[data-i18n]").forEach((element) => {
  defaultLanguage[element.dataset.i18n] = element.textContent.trim();
});

// Mengambil data dari object berdasarkan key
function getTranslation(object, path) {
  return path.split(".").reduce((current, key) => current[key], object);
}

async function loadLanguage(lang) {
  const elements = document.querySelectorAll("[data-i18n]");

  // Kembali ke Bahasa Indonesia
  if (lang === "id") {
    elements.forEach((element) => {
      element.textContent = defaultLanguage[element.dataset.i18n];
    });

    return;
  }

  // Ambil file JSON
  const response = await fetch(`lang/${lang}.json`);
  const language = await response.json();

  // Ganti semua teks
  elements.forEach((element) => {
    const key = element.dataset.i18n;

    const translation = getTranslation(language, key);

    if (translation) {
      element.textContent = translation;
    }
  });
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    loadLanguage(button.dataset.lang);
  });
});
