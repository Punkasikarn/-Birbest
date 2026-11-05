(() => {
  const media = matchMedia('(min-width: 900px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const scenes = ['welcome-overview.png', 'learn-food-types.webp', 'learn-foraging.webp'];
  let frame = 0;
  function update() {
    frame = 0;
    const hub = document.querySelector('.school-scenic');
    if (!hub) return;
    const stages = [...hub.querySelectorAll('.learning-stage')];
    let current = 0;
    stages.forEach((stage, i) => {
      if (stage.getBoundingClientRect().top <= innerHeight * .3) current = i;
    });
    hub.querySelectorAll('.learning-shortcuts a').forEach((link, i) => {
      if (i === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (!media.matches) return;
    const layers = hub.querySelectorAll('.school-backdrop img');
    const line = innerHeight * .65;
    let active = 0;
    for (let i = 1; i < stages.length; i++) {
      if (stages[i].getBoundingClientRect().top < line) active = i;
    }
    const top = stages[active].getBoundingClientRect().top;
    const mix = reduced.matches ? 1 : Math.min(1, Math.max(0, (line - top) / (innerHeight * .4)));
    layers.forEach((img, i) => {
      img.style.opacity = String(i === active ? (active ? mix : 1) : i === active - 1 ? 1 - mix : 0);
      const drift = reduced.matches ? 0 : Math.max(-25, Math.min(25, top * .025));
      img.style.transform = `translateY(${drift}px) scale(1.08)`;
    });
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(update); }
  function sync() {
    const hub = document.querySelector('#route-view');
    if (!hub) return;
    const stages = hub.querySelectorAll('.learning-stage');
    const isHub = !hub.hidden && stages.length === 3;
    hub.classList.toggle('school-scenic', isHub);
    if (!isHub || !media.matches) hub.querySelector('.school-backdrop')?.remove();
    if (!isHub) return;
    const activeScenes = [...stages].map((stage,i) => stage.dataset.scene || scenes[i]);
    if (media.matches && !hub.querySelector('.school-backdrop')) {
      const backdrop = document.createElement('div');
      backdrop.className = 'school-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      activeScenes.forEach(file => {
        const img = document.createElement('img');
        img.src = 'assets/' + file; img.alt = '';
        backdrop.append(img);
      });
      hub.prepend(backdrop);
    }
    // Mobile keeps its in-flow illustrations without requesting desktop layers.
    if (!media.matches) {
      stages.forEach((stage, i) => {
        if (!i || stage.querySelector('.learning-scene')) return;
        const img = document.createElement('img');
        img.className = 'learning-scene';
        img.alt = ''; img.width = 1536; img.height = 1024; img.loading = 'lazy';
        img.src = 'assets/' + activeScenes[i];
        stage.querySelector('.learning-cards').before(img);
      });
    }
    schedule();
  }
  window.addEventListener('hashchange', sync);
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule);
  media.addEventListener('change', sync);
  reduced.addEventListener('change', schedule);
  sync();
})();
