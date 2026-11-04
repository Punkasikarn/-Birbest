(() => {
  'use strict';
  const home = document.querySelector('#home-view');
  const entry = home?.querySelector('#today');
  if (!entry || home.dataset.motion) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set();
  let paused = reduced.matches;
  let frame = 0;
  const control = document.createElement('button');
  control.type = 'button';
  control.className = 'motion-toggle';
  control.setAttribute('aria-label', 'หยุดโมชั่นในหน้าโฮม');
  entry.querySelector('.section-heading').append(control);

  function sync() {
    home.dataset.motion = paused ? 'paused' : 'playing';
    control.setAttribute('aria-pressed', String(paused));
    control.textContent = paused ? 'เปิดโมชั่น' : 'หยุดโมชั่น';
    if (paused) {
      animations.forEach(animation => animation.cancel());
      animations.clear();
      home.style.setProperty('--cloud-arrival', '1');
    }
    schedule();
  }
  control.addEventListener('click', () => { paused = !paused; sync(); });
  reduced.addEventListener('change', () => { paused = reduced.matches; sync(); });

  // Event-driven frames only. No scroll interception or perpetual render loop.
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  function update() {
    frame = 0;
    if (paused || document.hidden || !home.getClientRects().length) return;
    const top = entry.getBoundingClientRect().top;
    const height = Math.max(1, window.innerHeight);
    const progress = Math.max(0, Math.min(1, (height - top) / height));
    home.style.setProperty('--cloud-arrival', String(1.3 - progress * .3));
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('hashchange', schedule);
  document.addEventListener('visibilitychange', () => {
    animations.forEach(animation => document.hidden ? animation.pause() : animation.play());
    schedule();
  });

  // Content is visible by default, including unsupported browsers and no JS.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        if (paused || document.hidden || !target.animate) return;
        const animation = target.animate([
          { opacity: .35, transform: 'translateY(22px) scale(.98)' },
          { opacity: 1, transform: 'translateY(0) scale(1)' }
        ], { duration: 680, delay: Number(target.dataset.motionDelay || 0), easing: 'cubic-bezier(.22,1,.36,1)' });
        animations.add(animation);
        const clear = () => animations.delete(animation);
        animation.addEventListener('finish', clear, { once: true });
        animation.addEventListener('cancel', clear, { once: true });
      });
    }, { threshold: .12 });
    const groups = ['.world-path img', '.school-feature>img', '.school-topics img', '.story-journal img', '.shop-editorial img', '.product-shot img', '.home-product-selection img'];
    groups.forEach(selector => home.querySelectorAll(selector).forEach((node, i) => {
      node.dataset.motionDelay = String((i % 3) * 90);
      observer.observe(node);
    }));
  }
  sync();
})();
