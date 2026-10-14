
(() => {
  const menu = document.querySelector('.menu-button');
  const nav = document.querySelector('.nav');
  const mobile = window.matchMedia('(max-width: 900px)');

  if (menu && nav) {
    const links = [...nav.querySelectorAll('a')];
    const setNavInteractive = (enabled) => {
      nav.toggleAttribute('inert', !enabled);
      nav.toggleAttribute('aria-hidden', !enabled);
      links.forEach((link) => enabled
        ? link.removeAttribute('tabindex')
        : link.setAttribute('tabindex', '-1'));
    };
    const setMenu = (open, restoreFocus = false) => {
      const isOpen = Boolean(open && mobile.matches);
      nav.classList.toggle('open', isOpen);
      menu.setAttribute('aria-expanded', String(isOpen));
      menu.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
      setNavInteractive(!mobile.matches || isOpen);
      if (restoreFocus) menu.focus();
    };

    menu.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
    links.forEach((link) => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('click', (event) => {
      if (nav.classList.contains('open') && !event.target.closest('.site-header')) setMenu(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('open')) setMenu(false, true);
    });
    mobile.addEventListener?.('change', () => setMenu(false));
    setMenu(false);

    const currentPath = window.location.pathname.replace(/index\.html$/, '').replace(/\/+$/, '/');
    links.forEach((link) => {
      const linkPath = new URL(link.href, window.location.href).pathname.replace(/\/+$/, '/');
      const isCurrent = linkPath === currentPath
        || (linkPath.endsWith('/uslugi/') && currentPath.startsWith(linkPath));
      if (isCurrent) link.setAttribute('aria-current', 'page');
    });
  }

  const nodes = document.querySelectorAll('[data-reveal]');
  nodes.forEach((node) => node.classList.add('reveal-ready'));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
  } else {
    nodes.forEach((node) => node.classList.add('is-visible'));
  }

  if (window.matchMedia('(pointer: fine)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let framePending = false;
    let pointerX = 0;
    let pointerY = 0;
    document.addEventListener('pointermove', (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (framePending) return;
      framePending = true;
      window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mx', `${pointerX}px`);
        document.documentElement.style.setProperty('--my', `${pointerY}px`);
        framePending = false;
      });
    }, { passive: true });
  }
})();
