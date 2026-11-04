(() => {
  const root = document.querySelector('.learn-dropdown');
  if (!root) return;
  const toggle = root.querySelector('button');
  const panel = root.querySelector('.learn-species');
  const hover = matchMedia('(hover: hover) and (pointer: fine)');
  let leaveTimer;
  function setOpen(open) {
    clearTimeout(leaveTimer);
    toggle.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  }
  toggle.addEventListener('click', () => setOpen(panel.hidden));
  root.addEventListener('focusin', () => clearTimeout(leaveTimer));
  root.addEventListener('pointerenter', () => {
    if (hover.matches) setOpen(true);
  });
  root.addEventListener('pointerleave', () => {
    if (hover.matches && !root.contains(document.activeElement)) {
      leaveTimer = setTimeout(() => setOpen(false), 180);
    }
  });
  root.addEventListener('focusout', event => {
    if (!root.contains(event.relatedTarget)) setOpen(false);
  });
  toggle.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      panel.querySelector('a').focus();
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) {
      const restoreFocus = root.contains(document.activeElement);
      setOpen(false);
      if (restoreFocus) toggle.focus();
    }
  });
  document.addEventListener('pointerdown', event => {
    if (!root.contains(event.target)) setOpen(false);
  });
  root.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.querySelector('.menu-toggle').addEventListener('click', () => setOpen(false));
  window.addEventListener('hashchange', () => setOpen(false));
})();
