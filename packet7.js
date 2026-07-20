
document.addEventListener('DOMContentLoaded',async()=>{
 let data={};try{data=await fetch('content.json',{cache:'no-store'}).then(r=>r.json())}catch(e){console.error(e)}
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

 const showGrid=document.querySelector('[data-show-grid]');
 if(showGrid)showGrid.innerHTML=(data.channels||[]).map(s=>`<a class="show-card" href="shows.html?show=${encodeURIComponent(s.slug)}"><img src="${esc(s.image)}" alt=""><div class="show-card-copy"><span>${esc(s.cadence)}</span><h3>${esc(s.name)}</h3><p>${esc(s.description)}</p></div></a>`).join('');

 const episodeGrid=document.querySelector('[data-episode-grid]');
 if(episodeGrid)episodeGrid.innerHTML=(data.episodes||[]).map(ep=>`<article class="episode-card"><img src="${esc(ep.image)}" alt=""><div class="episode-copy"><span>${esc(ep.show)}</span><h3>${esc(ep.title)}</h3><p>${esc(ep.description)}</p><div class="episode-meta"><b>${esc(ep.duration)}</b><b>${esc(ep.date)}</b></div><div class="episode-actions"><a class="button button-outline button-small" href="episode.html?slug=${encodeURIComponent(ep.slug)}">Open Episode</a></div></div></article>`).join('');

 const newsletter=document.querySelector('[data-newsletter-form]');
 newsletter?.addEventListener('submit',e=>{e.preventDefault();const email=new FormData(newsletter).get('email');localStorage.setItem('sv-newsletter-email',email||'');document.querySelector('[data-newsletter-status]').textContent='You are on the local preview list. Connect this form to Kit, Mailchimp or your CRM before launch.'});

 const support=document.querySelector('[data-support-grid]');
 if(support)support.innerHTML=(data.support?.tiers||[]).map((tier,i)=>`<article class="support-card ${i===1?'featured':''}"><h3>${esc(tier.name)}</h3><div class="support-price">${esc(tier.price)} <span>/${esc(tier.period)}</span></div><ul>${tier.benefits.map(b=>`<li>${esc(b)}</li>`).join('')}</ul><button class="button ${i===1?'button-primary':'button-outline'}" type="button" data-support-tier="${esc(tier.name)}">Choose ${esc(tier.name)}</button></article>`).join('');
 document.querySelectorAll('[data-support-tier]').forEach(b=>b.onclick=()=>alert(`${b.dataset.supportTier} is a preview tier. Connect Stripe or Patreon before launch.`));

 const episodeHost=document.querySelector('[data-episode-host]');
 if(episodeHost){const slug=new URLSearchParams(location.search).get('slug');const ep=(data.episodes||[]).find(x=>x.slug===slug)||data.episodes?.[0];if(ep){document.title=`${ep.title} | Slanted View`;episodeHost.innerHTML=`<section class="episode-hero"><img src="${esc(ep.image)}" alt=""><div class="episode-hero-copy"><span class="eyebrow">${esc(ep.show)}</span><h1>${esc(ep.title)}</h1><p>${esc(ep.description)}</p><div class="episode-meta"><b>Season ${esc(ep.season)}</b><b>Episode ${esc(ep.episode)}</b><b>${esc(ep.duration)}</b></div><div class="episode-player"><button type="button" data-player-toggle>▶</button><div class="player-line"></div><div class="player-meta"><span>0:00</span><span>${esc(ep.duration)}</span></div></div></div></section>`;const btn=document.querySelector('[data-player-toggle]');btn.onclick=()=>{btn.textContent=btn.textContent==='▶'?'Ⅱ':'▶'}}}

 const showHost=document.querySelector('[data-show-host]');
 if(showHost){const slug=new URLSearchParams(location.search).get('show');const show=(data.channels||[]).find(x=>x.slug===slug)||data.channels?.[0];if(show){document.title=`${show.name} | Slanted View`;const eps=(data.episodes||[]).filter(x=>x.show===show.name);showHost.innerHTML=`<section class="page-hero"><div><span class="eyebrow">${esc(show.cadence)}</span><h1>${esc(show.name)}</h1><p>${esc(show.description)}</p></div></section><section class="episode-grid" style="width:min(1500px,94vw);margin:20px auto 70px">${eps.map(ep=>`<article class="episode-card"><img src="${esc(ep.image)}" alt=""><div class="episode-copy"><span>${esc(ep.show)}</span><h3>${esc(ep.title)}</h3><p>${esc(ep.description)}</p><a class="button button-outline button-small" href="episode.html?slug=${encodeURIComponent(ep.slug)}">Open Episode</a></div></article>`).join('')}</section>`}}
});
