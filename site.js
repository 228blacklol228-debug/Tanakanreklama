
(() => {
  const loader = document.querySelector('.site-loader');
  if (loader) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldShow = document.documentElement.classList.contains('loader-new') && !reduceMotion;
    try { window.sessionStorage.setItem('aa-loader-seen', '1'); } catch (_) {}

    if (shouldShow) {
      window.setTimeout(() => loader.classList.add('site-loader-exit'), 1550);
      window.setTimeout(() => {
        loader.remove();
        document.documentElement.classList.remove('loader-new');
        document.documentElement.classList.add('loader-seen');
      }, 2150);
    } else {
      loader.remove();
      document.documentElement.classList.remove('loader-new');
      document.documentElement.classList.add('loader-seen');
    }
  }

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

  document.querySelectorAll('[data-lead-form]').forEach((form) => {
    const button = form.querySelector('button[type="submit"]');
    const status = form.querySelector('.form-status');
    const page = form.querySelector('input[name="page"]');
    if (page) page.value = window.location.href;

    const showStatus = (message, type) => {
      if (!status) return;
      status.textContent = message;
      status.hidden = false;
      status.classList.toggle('is-success', type === 'success');
      status.classList.toggle('is-error', type === 'error');
    };

    form.addEventListener('submit', async (event) => {
      if (!form.reportValidity()) return;
      event.preventDefault();
      if (page) page.value = window.location.href;
      if (button) {
        button.disabled = true;
        button.setAttribute('aria-busy', 'true');
      }
      showStatus('Отправляем заявку…', 'pending');

      try {
        const response = await window.fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.ok) throw new Error(result.message || 'Не удалось отправить заявку.');
        form.reset();
        if (page) page.value = window.location.href;
        showStatus('Спасибо! Заявка отправлена. Мы ответим в течение рабочего дня.', 'success');
      } catch (error) {
        const reason = error instanceof Error ? error.message : 'Не удалось отправить заявку.';
        showStatus(`${reason} Попробуйте ещё раз позднее.`, 'error');
      } finally {
        if (button) {
          button.disabled = false;
          button.removeAttribute('aria-busy');
        }
      }
    });
  });

  if (new URLSearchParams(window.location.search).get('sent') === '1') {
    const status = document.querySelector('[data-lead-form] .form-status');
    if (status) {
      status.textContent = 'Спасибо! Заявка отправлена. Мы ответим в течение рабочего дня.';
      status.hidden = false;
      status.classList.add('is-success');
    }
  }
})();
