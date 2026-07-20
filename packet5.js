
document.addEventListener('DOMContentLoaded', async () => {
  let data = {};
  try {
    const response = await fetch('content.json', {cache:'no-store'});
    data = await response.json();
  } catch (error) {
    console.error('Packet 5 content error:', error);
  }

  const articleGrid = document.querySelector('[data-article-grid]');
  if (articleGrid && Array.isArray(data.articles)) {
    articleGrid.innerHTML = data.articles.map(article => `
      <article class="article-card">
        <a href="article.html?slug=${encodeURIComponent(article.slug)}">
          <img loading="lazy" decoding="async" src="${article.image}" alt="">
          <div class="article-card-copy">
            <span>${article.category}</span>
            <h3>${article.title}</h3>
            <p>${article.dek}</p>
            <div class="article-card-meta">
              <span>${article.author}</span>
              <span>${article.readTime}</span>
            </div>
          </div>
        </a>
      </article>`).join('');
  }

  const body = document.body;
  const toolbar = document.querySelector('[data-a11y-toolbar]');
  const toast = document.querySelector('[data-toast]');
  const showToast = message => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.__svToastTimer);
    window.__svToastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  };

  toolbar?.querySelector('[data-toggle-motion]')?.addEventListener('click', () => {
    body.classList.toggle('reduced-motion');
    localStorage.setItem('sv-reduced-motion', body.classList.contains('reduced-motion') ? '1' : '0');
    showToast(body.classList.contains('reduced-motion') ? 'Motion reduced' : 'Motion restored');
  });

  toolbar?.querySelector('[data-toggle-contrast]')?.addEventListener('click', () => {
    body.classList.toggle('high-contrast');
    localStorage.setItem('sv-high-contrast', body.classList.contains('high-contrast') ? '1' : '0');
    showToast(body.classList.contains('high-contrast') ? 'High contrast on' : 'High contrast off');
  });

  toolbar?.querySelector('[data-font-up]')?.addEventListener('click', () => {
    const current = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const next = Math.min(current + 1, 20);
    document.documentElement.style.fontSize = `${next}px`;
    localStorage.setItem('sv-font-size', String(next));
    showToast(`Text size ${next}px`);
  });

  if (localStorage.getItem('sv-reduced-motion') === '1') body.classList.add('reduced-motion');
  if (localStorage.getItem('sv-high-contrast') === '1') body.classList.add('high-contrast');
  const savedFont = localStorage.getItem('sv-font-size');
  if (savedFont) document.documentElement.style.fontSize = `${savedFont}px`;

  document.querySelectorAll('img:not([loading])').forEach(img => {
    if (!img.closest('.hero')) img.loading = 'lazy';
    img.decoding = 'async';
  });

  // Lightweight analytics placeholder: stored locally only.
  const pageKey = `sv-pageviews:${location.pathname}`;
  const count = Number(localStorage.getItem(pageKey) || 0) + 1;
  localStorage.setItem(pageKey, String(count));
  document.querySelector('[data-local-pageviews]')?.replaceChildren(document.createTextNode(String(count)));
});
