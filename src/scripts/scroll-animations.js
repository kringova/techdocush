// Аккуратные анимации при скролле для блоков

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer для анимации при скролле
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Отключаем наблюдение после появления
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Находим все элементы для анимации
  const animatedElements = document.querySelectorAll('.animate-on-scroll, .card-animate');
  animatedElements.forEach(el => observer.observe(el));
});

