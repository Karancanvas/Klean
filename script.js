const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const homeView = document.getElementById('homeView');
    const privacyView = document.getElementById('privacyView');

    menuButton.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    function closeMenu() {
      mobileMenu.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }

    document.querySelectorAll('#mobileMenu a').forEach((link) => link.addEventListener('click', closeMenu));

    document.querySelectorAll('[data-install]').forEach((button) => {
      button.addEventListener('click', () => {
        window.open('https://chromewebstore.google.com/search/KLEAN', '_blank', 'noopener,noreferrer');
      });
    });

    const clearButton = document.getElementById('clearClutter');
    const demoShell = document.getElementById('demoShell');
    const clearLabel = document.querySelector('[data-template-id="clear-clutter-label"]');
    const restoreLabel = document.querySelector('[data-template-id="restore-clutter-label"]');

    clearButton.addEventListener('click', () => {
      const hasCleared = demoShell.classList.toggle('cleared');
      clearLabel.classList.toggle('hidden', hasCleared);
      restoreLabel.classList.toggle('hidden', !hasCleared);
      clearButton.setAttribute('aria-pressed', String(hasCleared));
    });

    function updateView() {
      const privacyRoute = window.location.hash === '#privacy' || window.location.hash.startsWith('#privacy-');
      homeView.classList.toggle('is-active', !privacyRoute);
      privacyView.classList.toggle('is-active', privacyRoute);

      document.querySelectorAll('[data-nav]').forEach((link) => {
        const navName = link.dataset.nav;
        const active = privacyRoute ? navName === 'privacy' : window.location.hash === '#' + navName;
        link.classList.toggle('active', active);
      });

      if (privacyRoute && window.location.hash === '#privacy') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      revealOnScroll();
    }

    window.addEventListener('hashchange', updateView);

    const revealElements = [...document.querySelectorAll('.reveal')];
    function revealOnScroll() {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      revealElements.forEach((element) => {
        if (element.offsetParent === null || element.classList.contains('visible')) return;
        const bounds = element.getBoundingClientRect();
        if (bounds.top < viewportHeight * .92 && bounds.bottom > 0) element.classList.add('visible');
      });
    }

    window.addEventListener('scroll', revealOnScroll, { passive: true });
    window.addEventListener('resize', revealOnScroll, { passive: true });

    const policySections = [...document.querySelectorAll('.policy-section')];
    const tocLinks = [...document.querySelectorAll('[data-toc]')];

    function updateToc() {
      if (!privacyView.classList.contains('is-active')) return;
      let currentId = policySections[0]?.id;
      const marker = 140;
      policySections.forEach((section) => {
        if (section.getBoundingClientRect().top <= marker) currentId = section.id;
      });
      tocLinks.forEach((link) => link.classList.toggle('active', link.dataset.toc === currentId));
    }

    window.addEventListener('scroll', updateToc, { passive: true });
    window.addEventListener('hashchange', updateToc);

    if (window.matchMedia('(pointer: fine)').matches) {
      const cursor = document.querySelector('.custom-cursor');
      const ring = document.querySelector('.cursor-ring');

      window.addEventListener('pointermove', (event) => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
        ring.style.left = `${event.clientX}px`;
        ring.style.top = `${event.clientY}px`;
        document.body.classList.add('cursor-ready');
      });

      document.querySelectorAll('a, button').forEach((element) => {
        element.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        element.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });
    }

    updateView();
    revealOnScroll();
    updateToc();
    lucide.createIcons();

/* ===== KLEAN NEW HERO INTERACTION ===== */
const heroStage = document.getElementById('heroStage');
const browserShell = document.getElementById('browserShell');

if (heroStage && browserShell) {
  heroStage.addEventListener('pointermove', (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = heroStage.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width - .5;
    const offsetY = (event.clientY - rect.top) / rect.height - .5;

    browserShell.style.transform =
      `translate(${offsetX * 11}px, ${offsetY * 8}px) rotate(${-3 + offsetX * 2}deg)`;
  });

  heroStage.addEventListener('pointerleave', () => {
    browserShell.style.transform = '';
  });
}


/* ===== KLEAN STATIC TEMPLATE TEXT ===== */
document.documentElement.classList.add('klean-static-content');
