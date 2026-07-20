
document.addEventListener('DOMContentLoaded', async () => {
  const loader = document.querySelector('[data-loader]');
  window.addEventListener('load', () => setTimeout(() => loader?.classList.add('hidden'), 250));

  let data;
  try {
    data = await window.SV.loadContent();
  } catch (error) {
    console.error('Packet 3 content error:', error);
    return;
  }

  const ticker = document.querySelector('[data-ticker-track]');
  if (ticker && Array.isArray(data.ticker)) {
    const repeated = [...data.ticker, ...data.ticker];
    ticker.innerHTML = repeated.map(item => `<span class="ticker-item">${window.SV.escape(item)}</span>`).join('');
  }

  const featured = data.featured;
  if (featured) {
    const image = document.querySelector('[data-featured-image]');
    document.querySelector('[data-featured-kicker]').textContent = featured.eyebrow || 'Featured Story';
    document.querySelector('[data-featured-title]').textContent = featured.title || '';
    document.querySelector('[data-featured-summary]').textContent = featured.summary || '';
    document.querySelector('[data-featured-cta]').textContent = featured.cta || 'Read More';
    if (image) image.src = featured.image;
  }

  const categoryGrid = document.querySelector('[data-category-grid]');
  if (categoryGrid && Array.isArray(data.categories)) {
    categoryGrid.innerHTML = data.categories.map(category => `
      <a class="category-card" href="#trending">
        <span class="category-icon">${window.SV.escape(category.icon)}</span>
        <h3>${window.SV.escape(category.name)}</h3>
        <p>${window.SV.escape(category.description)}</p>
      </a>`).join('');
  }

  const dialog = document.querySelector('[data-video-dialog]');
  const title = document.querySelector('[data-video-title]');
  document.querySelectorAll('.content-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    const openPreview = () => {
      const cardTitle = card.querySelector('h3')?.textContent || 'Slanted View';
      if (title) title.textContent = cardTitle;
      dialog?.showModal();
      card.classList.add('previewing');
      dialog?.addEventListener('close', () => card.classList.remove('previewing'), {once:true});
    };
    card.addEventListener('click', openPreview);
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openPreview();
      }
    });
  });

  document.querySelector('[data-video-close]')?.addEventListener('click', () => dialog?.close());

  const topicLinks = [...document.querySelectorAll('.topic-chip')];
  topicLinks.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    topicLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
    document.querySelector('#trending')?.scrollIntoView({behavior:'smooth'});
  }));
});
