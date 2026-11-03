/* Controles ligeros del centro legal. Sin dependencias externas ni datos personales. */
(() => {
 "use strict";
 const tabs=[...document.querySelectorAll('[data-legal-tab]')];
 if(!tabs.length) return;
 function activate(tab, focus=false){
   tabs.forEach(button=>{
     const selected=button===tab;
     const panel=document.getElementById('panel-'+button.dataset.legalTab);
     button.setAttribute('aria-selected',String(selected));
     button.tabIndex=selected?0:-1;
     if(panel)panel.hidden=!selected;
   });
   if(focus)tab.focus();
 }
 tabs.forEach((button,index)=>{
   button.addEventListener('click',()=>activate(button));
   button.addEventListener('keydown',event=>{
     let next;
     if(event.key==='ArrowRight')next=(index+1)%tabs.length;
     else if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
     else if(event.key==='Home')next=0;
     else if(event.key==='End')next=tabs.length-1;
     else return;
     event.preventDefault();
     activate(tabs[next],true);
   });
 });
 const mobileMenu=document.querySelector('.mobile-menu');
 if(mobileMenu){
   mobileMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mobileMenu.open=false}));
   document.addEventListener('keydown',event=>{if(event.key==='Escape')mobileMenu.open=false});
   document.addEventListener('click',event=>{if(mobileMenu.open&&!mobileMenu.contains(event.target))mobileMenu.open=false});
 }
})();
