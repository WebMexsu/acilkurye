(() => {
  const overlay = document.querySelector('#mobile-menu');
  const originalToggle = document.querySelector('#menu-toggle');
  const originalClose = document.querySelector('#menu-close');

  if (!overlay || !originalToggle || !originalClose) return;

  // Replace the controls to remove page-specific listeners from the previous inline scripts.
  const toggle = originalToggle.cloneNode(true);
  const close = originalClose.cloneNode(true);
  originalToggle.replaceWith(toggle);
  originalClose.replaceWith(close);

  overlay.classList.add('mobile-nav-overlay');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Mobil ana menü');
  overlay.hidden = true;

  if (!overlay.querySelector('.mobile-nav-backdrop')) {
    const backdrop = document.createElement('span');
    backdrop.className = 'mobile-nav-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    overlay.prepend(backdrop);
  }

  let lastFocusedElement = null;

  const setMenuState = (isOpen) => {
    lastFocusedElement = isOpen ? document.activeElement : lastFocusedElement;
    overlay.hidden = !isOpen;
    overlay.setAttribute('aria-hidden', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
    document.body.classList.toggle('mobile-nav-open', isOpen);

    if (isOpen) {
      close.focus({ preventScroll: true });
    } else if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus({ preventScroll: true });
    }
  };

  toggle.addEventListener('click', () => setMenuState(true));
  close.addEventListener('click', () => setMenuState(false));
  overlay.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuState(false)));
  overlay.addEventListener('click', (event) => {
    if (event.target.classList.contains('mobile-nav-backdrop')) setMenuState(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !overlay.hidden) setMenuState(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && !overlay.hidden) setMenuState(false);
  });
})();
