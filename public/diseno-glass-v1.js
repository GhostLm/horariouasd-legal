const IMGS={"agenda-dia-claro":"/imagenes/agenda-dia-claro.jpg","agenda-dia-oscuro":"/imagenes/agenda-dia-oscuro.jpg","agenda-semana-claro":"/imagenes/agenda-semana-claro.jpg","agenda-semana-oscuro":"/imagenes/agenda-semana-oscuro.jpg","dia-claro":"/imagenes/horario-dia-claro.jpg","dia-oscuro":"/imagenes/horario-dia-oscuro.jpg","historial-claro":"/imagenes/historial-claro.jpg","historial-oscuro":"/imagenes/historial-oscuro.jpg","pensum-claro":"/imagenes/pensum-claro.jpg","pensum-oscuro":"/imagenes/pensum-oscuro.jpg","semana-claro":"/imagenes/horario-semana-claro.jpg","semana-oscuro":"/imagenes/horario-semana-oscuro.jpg","semestres-claro":"/imagenes/semestres-claro.jpg","semestres-oscuro":"/imagenes/semestres-oscuro.jpg","semestres-todos-claro":"/imagenes/semestres-todos-claro.jpg","semestres-todos-oscuro":"/imagenes/semestres-todos-oscuro.jpg"};
const state={view:'dia',theme:'claro',agendaFrom:'dia',filter:'principales'};
const photo=document.getElementById('photo'),areas=document.getElementById('touchAreas');
const nice={dia:'Horario · Día',semana:'Horario · Semana',agenda:'Agenda del día',historial:'Historial de inscripción',pensum:'Pensum',semestres:'Seleccionar semestre'};
function setView(v){if(v==='agenda'){if(state.view==='dia'||state.view==='semana')state.agendaFrom=state.view;}state.view=v;render();}
function render(){let key=state.view;if(key==='agenda')key='agenda-'+state.agendaFrom;if(key==='semestres'&&state.filter==='todos')key='semestres-todos';let p=key+'-'+state.theme;if(photo.getAttribute('src')!==IMGS[p])photo.src=IMGS[p];photo.alt='Captura de '+(nice[state.view]||state.view)+' en tema '+state.theme;
 document.querySelectorAll('#views button').forEach(b=>b.classList.toggle('active',b.dataset.view===state.view));document.querySelectorAll('.theme button').forEach(b=>{let a=b.id==='light'?(state.theme==='claro'):(state.theme==='oscuro');b.classList.toggle('active',a);b.setAttribute('aria-pressed',a)});
 document.getElementById('caption').textContent=(nice[state.view]||state.view)+' · Tema '+state.theme;
 areas.textContent='';const touch=(name,l,t,w,h,click)=>{const b=document.createElement('button');b.className='hotspot';b.type='button';b.setAttribute('aria-label',name);b.style.left=l+'%';b.style.top=t+'%';b.style.width=w+'%';b.style.height=h+'%';b.onclick=click;areas.append(b)};
 if(state.view==='dia'||state.view==='semana'){
 touch('Cambiar a Día',52,5,23,6,()=>setView('dia'));
 touch('Cambiar a Semana',75,5,25,6,()=>setView('semana'));
 if(state.view==='dia'){touch('Abrir agenda del día',2,19,96,7,()=>setView('agenda'));
 }else{touch('Abrir agenda semanal',2,25,96,54,()=>setView('agenda'))}
 }
 if(state.view==='semestres'){touch('Ver períodos principales',4,20,46,7,()=>{state.filter='principales';render()});touch('Ver todos los períodos',50,20,48,7,()=>{state.filter='todos';render()})}
 if(state.view==='agenda')touch('Volver al horario',87,40,12,10,()=>setView(state.agendaFrom));
 if(state.view!=='agenda'&&state.view!=='semestres'){touch('Abrir Pensum',0,90,20,10,()=>setView('pensum'));touch('Abrir Historial',20,90,20,10,()=>setView('historial'));touch('Abrir Horario',40,90,20,10,()=>setView('dia'))}
 }
 document.querySelectorAll('#views button').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));
 const root=document.documentElement;
function setSiteTheme(theme){
 state.theme=theme;
 root.dataset.theme=theme==='oscuro'?'dark':'light';
 render();
}
document.getElementById('light').onclick=()=>setSiteTheme('claro');
document.getElementById('dark').onclick=()=>setSiteTheme('oscuro');
setSiteTheme('claro');
