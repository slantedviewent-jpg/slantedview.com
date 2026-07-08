(function(){
  const btn=document.querySelector('.hamb');
  const menu=document.querySelector('.menu');
  if(btn&&menu){btn.addEventListener('click',()=>menu.classList.toggle('open'));}
  const forms=document.querySelectorAll('form');
  forms.forEach(form=>form.addEventListener('submit',e=>{e.preventDefault(); alert('Thanks for joining The View. Email capture will be connected in Release 1.1.');}));
  if('IntersectionObserver' in window){
    document.querySelectorAll('section,.pillar,.feature-card,.newsletter-box').forEach(el=>el.classList.add('fade-in'));
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
    document.querySelectorAll('.fade-in').forEach(el=>io.observe(el));
  }
})();
