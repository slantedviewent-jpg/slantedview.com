window.SVRender = {
 card(item, latest=false){
   const e = window.SV.escape;
   return `<article class="content-card">
     <div class="card-image">
       <img loading="lazy" src="${e(item.image)}" alt="">
       <span class="play-badge">▶</span>
       ${latest ? `<span class="duration">${e(item.duration)}</span>` : ''}
     </div>
     <div class="card-body">
       ${latest ? '' : `<span class="card-kicker">${e(item.category)}</span>`}
       <h3>${e(item.title)}</h3>
       <p class="card-meta">${latest ? e(item.date) : e(item.views + ' views')}</p>
     </div>
   </article>`;
 },
 podcast(item){
   const e = window.SV.escape;
   return `<article class="podcast-card"><div><span class="episode">${e(item.episode)}</span><h3>${e(item.title)}</h3><span class="length">${e(item.length)}</span></div><span>▶</span></article>`;
 }
};