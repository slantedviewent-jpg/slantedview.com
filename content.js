window.SV = {
 async loadContent(){
   const response = await fetch('content.json');
   if(!response.ok) throw new Error('Unable to load content');
   return response.json();
 },
 escape(value){
   return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
 }
};