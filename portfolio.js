'use strict';
(() => {
  const cards = [...document.querySelectorAll('.project-card')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  const search = document.querySelector('#project-search');
  const count = document.querySelector('#project-count');
  const empty = document.querySelector('#empty-state');
  const reset = document.querySelector('#reset-filters');
  let category = 'all';
  const searchable = cards.map(card => ({card, text: card.textContent.toLocaleLowerCase()}));
  const update = () => {
    const query = search.value.trim().toLocaleLowerCase();
    const terms = query.split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const item of searchable) {
      const matches = (category === 'all' || item.card.dataset.category === category) && terms.every(term => item.text.includes(term));
      item.card.hidden = !matches;
      if (matches) visible++;
    }
    count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}${category === 'all' && !query ? '' : ' found'}`;
    empty.hidden = visible !== 0;
    reset.hidden = category === 'all' && !search.value;
    for (const button of filters) {
      const selected = button.dataset.filter === category;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    }
  };
  const clear = () => { category = 'all'; search.value = ''; update(); search.focus(); };
  for (const button of filters) button.addEventListener('click', () => { category = button.dataset.filter; update(); });
  search.addEventListener('input', update);
  reset.addEventListener('click', clear);
  document.querySelector('#empty-reset').addEventListener('click', clear);
  document.querySelector('.project-controls').hidden = false;
  document.querySelector('.results-line').hidden = false;
  update();
})();

(() => {
  const visual = document.querySelector('.hero-visual');
  const toggle = document.querySelector('#motion-toggle');
  if (!visual || !toggle) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  const updateMotion = () => {
    visual.classList.toggle('motion-enabled', !reducedMotion.matches);
    visual.classList.toggle('motion-paused', paused);
    toggle.hidden = reducedMotion.matches;
    toggle.textContent = paused ? 'Resume motion' : 'Pause motion';
  };
  toggle.addEventListener('click', () => { paused = !paused; updateMotion(); });
  reducedMotion.addEventListener('change', updateMotion);
  updateMotion();
})();
