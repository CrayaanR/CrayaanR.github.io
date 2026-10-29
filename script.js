const views={current:{src:'assets/website/current-homepage.png',alt:'Current Thresher homepage with lead story, crossword, and editors’ picks',caption:'October 2026 capture, following the redesign. Serif typography, an off-white background, and clear routes to stories and games.'},historical:{src:'assets/website/historical-homepage.png',alt:'Historical Thresher website screenshot dated January 15, 2016',caption:'Historical capture dated January 15, 2016. This illustrates the earlier design, not a capture immediately before my 2024 project. Content and viewport differ.'}};
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{const view=views[button.dataset.view];const image=document.querySelector('#website-image');image.src=view.src;image.alt=view.alt;document.querySelector('#website-caption').textContent=view.caption;document.querySelectorAll('[data-view]').forEach(b=>{const active=b===button;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',String(active));});}));


function revealSection(hash){
 const target=document.getElementById(hash.slice(1));if(!target)return;
 for(let parent=target;parent;parent=parent.parentElement){if(parent.tagName==='DETAILS')parent.open=true;}
 target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
}
document.querySelectorAll('.contents-sidebar a').forEach(link=>link.addEventListener('click',event=>{
 event.preventDefault();history.pushState(null,'',link.hash);revealSection(link.hash);
 document.querySelectorAll('.contents-sidebar a').forEach(a=>a.removeAttribute('aria-current'));link.setAttribute('aria-current','location');
}));
window.addEventListener('hashchange',()=>revealSection(location.hash));
if(location.hash)revealSection(location.hash);
if(matchMedia('(max-width:1100px)').matches)document.querySelector('.contents-panel').open=false;
