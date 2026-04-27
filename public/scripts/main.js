const header = document.getElementById('header');
const burgerBtn = document.getElementById('burger-btn');
const navMenu = document.getElementById('nav-menu');

burgerBtn.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('nav__menu--open');
  burgerBtn.classList.toggle('nav__burger--open');
  burgerBtn.setAttribute('aria-expanded', String(isOpen));
  burgerBtn.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('nav__menu--open');
    burgerBtn.classList.remove('nav__burger--open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    burgerBtn.setAttribute('aria-label', 'Ouvrir le menu');
    document.body.style.overflow = '';
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

window.addEventListener('scroll', () => {
  header.classList.toggle('header--scrolled', window.scrollY > 60);
}, { passive: true });

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const carousel = document.getElementById('hero-carousel');
if (carousel) {
  const slides = carousel.querySelectorAll('.hero__slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  const prevBtn = carousel.querySelector('.carousel-btn--prev');
  const nextBtn = carousel.querySelector('.carousel-btn--next');
  let current = 0;
  let autoplayTimer;

  function goTo(index) {
    slides[current].classList.remove('hero__slide--active');
    slides[current].setAttribute('aria-hidden', 'true');
    dots[current].classList.remove('carousel-dot--active');
    dots[current].setAttribute('aria-selected', 'false');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('hero__slide--active');
    slides[current].setAttribute('aria-hidden', 'false');
    dots[current].classList.add('carousel-dot--active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function startAutoplay() {
    autoplayTimer = setInterval(() => goTo(current + 1), 4500);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAutoplay(); }));

  carousel.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  carousel.addEventListener('mouseleave', startAutoplay);

  let touchStartX = 0;
  carousel.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); resetAutoplay(); }
  }, { passive: true });

  startAutoplay();
}
