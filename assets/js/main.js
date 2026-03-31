const translations = {
  en: {
    bookNow: 'Book Appointment',
    heroText: 'Premium family dentistry in Moscow with modern technology and gentle care.',
    servicesTitle: 'Our Dental Services',
    testimonialsTitle: 'Patient Stories',
    newsletterTitle: 'Join Our Smile Newsletter',
    newsletterBtn: 'Subscribe',
    contactUs: 'Contact Us',
    home: 'Home',
    services: 'Services',
    about: 'About',
    blog: 'Blog',
    contact: 'Contact',
    appointment: 'Appointment',
    portal: 'Patient Portal'
  },
  ru: {
    bookNow: 'Записаться на прием',
    heroText: 'Семейная стоматология премиум-класса в Москве с современными технологиями и бережным подходом.',
    servicesTitle: 'Наши услуги',
    testimonialsTitle: 'Отзывы пациентов',
    newsletterTitle: 'Подпишитесь на рассылку Smile',
    newsletterBtn: 'Подписаться',
    contactUs: 'Свяжитесь с нами',
    home: 'Главная',
    services: 'Услуги',
    about: 'О нас',
    blog: 'Блог',
    contact: 'Контакты',
    appointment: 'Запись',
    portal: 'Личный кабинет'
  }
};

function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll('.flag-switch button').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function initAnimations() {
  const sections = document.querySelectorAll('.fade-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.transition = 'all .8s ease';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  sections.forEach((section) => observer.observe(section));

  if (window.gsap) {
    gsap.utils.toArray('.hover-anim').forEach((card) => {
      card.addEventListener('mouseenter', () => gsap.to(card, { scale: 1.02, duration: 0.25 }));
      card.addEventListener('mouseleave', () => gsap.to(card, { scale: 1, duration: 0.25 }));
    });
  }
}

function initChatbot() {
  const toggle = document.getElementById('chatbotToggle');
  const panel = document.getElementById('chatbotPanel');
  const send = document.getElementById('chatbotSend');
  const input = document.getElementById('chatbotInput');
  const log = document.getElementById('chatbotLog');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => panel.classList.toggle('active'));

  if (send && input && log) {
    send.addEventListener('click', () => {
      if (!input.value.trim()) return;
      const question = input.value.trim();
      const item = document.createElement('p');
      item.className = 'small mb-2';
      item.innerHTML = `<strong>You:</strong> ${question}<br><strong>Bot:</strong> Thank you! Our coordinator will reply shortly.`;
      log.prepend(item);
      input.value = '';
    });
  }
}

function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('newsletterMsg');
    msg.textContent = 'Thanks! You are subscribed.';
    form.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'en';
  setLanguage(savedLang);

  document.querySelectorAll('.flag-switch button').forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  initAnimations();
  initChatbot();
  initNewsletter();
});
