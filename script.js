let currentHeroSlide = 0;
let currentGallerySlide = 0;
let currentTestimonial = 0;
let heroInterval;
let galleryInterval;
let testimonialInterval;
let isGalleryAutoplay = true;
let AOS;

const loadingScreen = document.getElementById("loading-screen");
const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const backToTop = document.getElementById("back-to-top");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroNavButtons = document.querySelectorAll(".hero-nav-btn");
const gallerySlides = document.querySelectorAll(".carousel-slide");
const galleryIndicators = document.querySelectorAll(".indicator");
const playPauseButton = document.getElementById("play-pause-icon");
const contactForm = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");

document.addEventListener("DOMContentLoaded", () => {
  // Ocultar pantalla de carga después de 2 segundos
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 2000);

  // Inicializar AOS (animaciones)
  AOS.init({
    duration: 1000,
    once: true,
  });

  // Activar/desactivar menú hamburguesa
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Cerrar menú al hacer clic en un enlace
  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Navegación del carrusel hero
  heroNavButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      changeHeroSlide(index);
    });
  });

  // Iniciar autoplay del carrusel hero
  startHeroAutoplay();

  // Navegación del carrusel de galería
  document.querySelector(".carousel-prev").addEventListener("click", () => changeGallerySlide(-1));
  document.querySelector(".carousel-next").addEventListener("click", () => changeGallerySlide(1));
  galleryIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => goToGallerySlide(index));
  });
  startGalleryAutoplay();

  // Toggle autoplay de galería
  playPauseButton.addEventListener("click", toggleCarouselAutoplay);

  // Formulario de contacto
  contactForm.addEventListener("submit", handleFormSubmit);

  // Botón de regresar al inicio
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  // Modal de política y términos
  document.querySelectorAll("[onclick^='openModal']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const modalType = e.target.getAttribute("onclick").replace("openModal('", "").replace("')", "");
      openModal(modalType);
    });
  });
});

// Función para cambiar diapositiva del hero
function changeHeroSlide(index) {
  heroSlides[currentHeroSlide].classList.remove("active");
  heroNavButtons[currentHeroSlide].classList.remove("active");
  currentHeroSlide = index;
  heroSlides[currentHeroSlide].classList.add("active");
  heroNavButtons[currentHeroSlide].classList.add("active");
  resetHeroAutoplay();
}

// Función para iniciar autoplay del hero
function startHeroAutoplay() {
  heroInterval = setInterval(() => {
    const nextSlide = (currentHeroSlide + 1) % heroSlides.length;
    changeHeroSlide(nextSlide);
  }, 5000);
}

// Función para reiniciar autoplay del hero
function resetHeroAutoplay() {
  clearInterval(heroInterval);
  startHeroAutoplay();
}

// Función para cambiar diapositiva de la galería
function changeGallerySlide(direction) {
  gallerySlides[currentGallerySlide].classList.remove("active");
  galleryIndicators[currentGallerySlide].classList.remove("active");
  currentGallerySlide = (currentGallerySlide + direction + gallerySlides.length) % gallerySlides.length;
  gallerySlides[currentGallerySlide].classList.add("active");
  galleryIndicators[currentGallerySlide].classList.add("active");
  resetGalleryAutoplay();
}

// Función para ir a una diapositiva específica de la galería
function goToGallerySlide(index) {
  gallerySlides[currentGallerySlide].classList.remove("active");
  galleryIndicators[currentGallerySlide].classList.remove("active");
  currentGallerySlide = index;
  gallerySlides[currentGallerySlide].classList.add("active");
  galleryIndicators[currentGallerySlide].classList.add("active");
  resetGalleryAutoplay();
}

// Función para iniciar autoplay de la galería
function startGalleryAutoplay() {
  if (isGalleryAutoplay) {
    galleryInterval = setInterval(() => changeGallerySlide(1), 5000);
    playPauseButton.classList.remove("fa-play");
    playPauseButton.classList.add("fa-pause");
  }
}

// Función para reiniciar autoplay de la galería
function resetGalleryAutoplay() {
  clearInterval(galleryInterval);
  startGalleryAutoplay();
}

// Función para alternar autoplay de la galería
function toggleCarouselAutoplay() {
  isGalleryAutoplay = !isGalleryAutoplay;
  if (isGalleryAutoplay) {
    playPauseButton.classList.remove("fa-play");
    playPauseButton.classList.add("fa-pause");
    startGalleryAutoplay();
  } else {
    clearInterval(galleryInterval);
    playPauseButton.classList.remove("fa-pause");
    playPauseButton.classList.add("fa-play");
  }
}

// Función para manejar el envío del formulario
function handleFormSubmit(e) {
  e.preventDefault();
  // Simulación de envío (puedes reemplazar con API real)
  const formData = new FormData(contactForm);
  console.log("Datos enviados:", Object.fromEntries(formData));
  contactForm.reset();
  successMessage.classList.add("active");
  setTimeout(() => successMessage.classList.remove("active"), 5000);
}

// Función para abrir modal
function openModal(type) {
  modal.classList.add("active");
  switch (type) {
    case "privacy":
      modalTitle.textContent = "Política de Privacidad";
      modalBody.innerHTML = `
        <p>Nos comprometemos a proteger tu privacidad. Los datos que nos proporcionas serán utilizados únicamente para gestionar tu cita y comunicarnos contigo.</p>
        <ul>
          <li>No compartimos tu información con terceros.</li>
          <li>Puedes solicitar la eliminación de tus datos en cualquier momento.</li>
        </ul>
      `;
      break;
    case "terms":
      modalTitle.textContent = "Términos y Condiciones";
      modalBody.innerHTML = `
        <p>Al usar este sitio, aceptas nuestros términos. Consulta regularmente para actualizaciones.</p>
        <ul>
          <li>El contenido es solo informativo y no sustituye atención médica.</li>
          <li>Reservas sujetas a disponibilidad.</li>
        </ul>
      `;
      break;
  }
}


function closeModal() {
  modal.classList.remove("active");
}

// Función para desplazarse al inicio
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}


function switchTab(tabId) {
  document.querySelectorAll(".tab-pane").forEach((pane) => pane.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  document.querySelector(`.tab-btn[onclick="switchTab('${tabId}')"]`).classList.add("active");
}


function showService(serviceId) {
  document.querySelectorAll(".service-detail").forEach((detail) => detail.classList.remove("active"));
  document.querySelectorAll(".service-nav-item").forEach((item) => item.classList.remove("active"));
  document.getElementById(serviceId).classList.add("active");
  document.querySelector(`.service-nav-item[onclick="showService('${serviceId}')"]`).classList.add("active");
}

// Función para abrir direcciones (simulación)
function openDirections() {
  alert("Abrir Google Maps para dirección: Barrio Urbari - Calle Igmiri Nro. 555, Santa Cruz, Bolivia");
}


function animateCount(element, target) {
  let current = 0;
  const duration = 2000;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

document.querySelectorAll("[data-count]").forEach((element) => {
  const target = parseInt(element.getAttribute("data-count"));
  animateCount(element, target);
});
