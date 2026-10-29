const views={current:{src:'assets/website/current-homepage.png',alt:'Current Thresher homepage with lead story, crossword, and editors’ picks',caption:'October 2026 capture, following the redesign. Serif typography, an off-white background, and clear routes to stories and games.'},historical:{src:'assets/website/before-november-2024.png',alt:'The Rice Thresher homepage on November 15, 2024, before the redesign',caption:'Before the redesign · November 15, 2024. The previous homepage used a dense navigation bar and competing story layouts.'}};
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
const contentsToggle=document.querySelector('.contents-toggle');
const contentsSidebar=document.querySelector('.contents-sidebar');
const compactContents=matchMedia('(max-width:1100px)');
function setContentsOpen(open){
 document.body.classList.toggle('contents-open',open);
 contentsToggle.setAttribute('aria-expanded',String(open));
 contentsToggle.setAttribute('aria-label',open?'Hide contents':'Show contents');
 contentsSidebar.inert=!open;
}
setContentsOpen(!compactContents.matches);
contentsToggle.addEventListener('click',()=>setContentsOpen(!document.body.classList.contains('contents-open')));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.body.classList.contains('contents-open')){setContentsOpen(false);contentsToggle.focus();}});
compactContents.addEventListener('change',event=>setContentsOpen(!event.matches));
document.querySelectorAll('.contents-sidebar a').forEach(link=>link.addEventListener('click',()=>{if(compactContents.matches){setContentsOpen(false);const target=document.getElementById(link.hash.slice(1));if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}}}));
document.querySelector('.page').addEventListener('click',()=>{if(compactContents.matches)setContentsOpen(false);});
