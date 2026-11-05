(() => {
  'use strict';
  const home = document.querySelector('#home-view');
  const hero = home?.querySelector('.hero');
  const header = document.querySelector('.site-header');
  if (!hero || home.querySelector('.cloud-journey')) return;
  const journey = document.createElement('div');
  journey.className = 'cloud-journey';
  hero.before(journey);
  journey.append(hero);
  ['upper-left', 'upper-right'].forEach(side => {
    const cloud = document.createElement('img');
    cloud.className = 'opening-cloud ' + side;
    cloud.src = 'assets/hero-cloud.webp';
    cloud.alt = '';
    cloud.setAttribute('aria-hidden', 'true');
    hero.append(cloud);
  });
  const skip = document.createElement('button');
  skip.type = 'button';
  skip.className = 'cloud-enter';
  skip.textContent = 'เข้าเมือง ↓';
  hero.append(skip);
  // Keep the phone seam in the city's own clipped layer, not above a sibling.
  const edge = document.createElement('img');
  edge.className = 'city-cloud-edge';
  edge.src = 'assets/transition-chapter-white.svg';
  edge.alt = '';
  edge.setAttribute('aria-hidden', 'true');
  hero.append(edge);
  let frame = 0;
  let focused = false;
  const progress = (top, travel) => Math.max(0, Math.min(1, -top / Math.max(1, travel)));
  function update() {
    frame = 0;
    if (document.hidden) return;
    if (!home.getClientRects().length) {
      if (header) { header.removeAttribute('data-cloud-nav'); header.inert = false; }
      return;
    }
    const height = hero.offsetHeight;
    journey.style.setProperty('--scene-height', height + 'px');
    const travel = journey.offsetHeight - height;
    const paused = home.dataset.motion === 'paused';
    const p = paused || focused ? 1 : progress(journey.getBoundingClientRect().top, travel);
    // Smoothstep preserves exact fully covered / fully open endpoints.
    const eased = p * p * (3 - 2 * p);
    hero.style.setProperty('--reveal-shift', (eased * 85) + '%');
    hero.style.setProperty('--reveal-opacity', String(1 - eased));
    // Brand exit and navigation entrance share one timeline, not sticky hero bounds.
    const brandProgress = Math.min(1, p / .6);
    const brandFade = brandProgress * brandProgress * (3 - 2 * brandProgress);
    hero.style.setProperty('--brand-opacity', String(paused ? 1 : 1 - brandFade));
    hero.style.setProperty('--brand-rise', (paused ? 0 : -40 * brandFade) + 'px');
    hero.style.setProperty('--enter-opacity', String(paused ? 0 : 1 - brandFade));
    const visible = paused || brandProgress >= 1;
    if (header) {
      header.dataset.cloudNav = visible ? 'visible' : 'hidden';
      header.inert = !visible;
    }
    skip.hidden = visible;
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(update); }
  skip.addEventListener('click', () => {
    focused = true;
    update();
    hero.querySelector('.mascot-spot')?.focus({ preventScroll: true });
    const target = window.scrollY + journey.getBoundingClientRect().top + journey.offsetHeight - hero.offsetHeight;
    window.scrollTo({ top: target, behavior: home.dataset.motion === 'paused' ? 'auto' : 'smooth' });
  });
  // Keyboard navigation must never land behind the decorative curtain.
  hero.addEventListener('focusin', event => {
    if (event.target !== skip) { focused = true; schedule(); }
  });
  hero.addEventListener('focusout', event => {
    if (!hero.contains(event.relatedTarget)) { focused = false; schedule(); }
  });
  // Focus may reveal the scene for keyboard access, but must not latch it open
  // after an Enter City click or a subsequent reverse scroll.
  function resumeScroll() { focused = false; schedule(); }
  window.addEventListener('scroll', resumeScroll, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('hashchange', resumeScroll);
  window.addEventListener('pageshow', resumeScroll);
  document.addEventListener('visibilitychange', schedule);
  new MutationObserver(schedule).observe(home, { attributes: true, attributeFilter: ['data-motion','hidden','class'] });
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(hero);
  update();
})();
