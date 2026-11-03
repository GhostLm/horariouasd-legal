/* Vista previa autónoma: no autentica, no accede a Banner y no guarda datos.
   Materias, créditos, fechas, calificaciones, períodos y docentes son ficticios. */
(() => {
  "use strict";
  const days = [
    {short:"Lun", name:"Lunes", color:"#0D47A1"},
    {short:"Mar", name:"Martes", color:"#2E7D32"},
    {short:"Mié", name:"Miércoles", color:"#9E9D24"},
    {short:"Jue", name:"Jueves", color:"#6A1B9A"},
    {short:"Vie", name:"Viernes", color:"#5D4037"},
    {short:"Sáb", name:"Sábado", color:"#263238"},
    {short:"Dom", name:"Domingo", color:"#AD1457"}
  ];
  const classData = [
    {name:"Química Básica",code:"QUI 0140 - 01",nrc:"00001",prof:"Docente no mostrado",day:1,time:"2:00 PM - 3:50 PM",room:"Laboratorio 102",location:"Recinto universitario",credits:3},
    {name:"Laboratorio de Química",code:"QUI 0141 - 01",nrc:"00002",prof:"Docente no mostrado",day:1,time:"4:00 PM - 6:50 PM",room:"Laboratorio 104",location:"Recinto universitario",credits:1},
    {name:"Estadística Básica",code:"EST 2110 - 01",nrc:"00003",prof:"Docente no mostrado",day:1,time:"7:00 PM - 9:50 PM",room:"Aula 301",location:"Recinto universitario",credits:5},
    {name:"Estadística Básica",code:"EST 2110 - 01",nrc:"00003",prof:"Docente no mostrado",day:3,time:"5:00 PM - 7:50 PM",room:"Aula 210",location:"Recinto universitario",credits:5},
    {name:"Cálculo I",code:"MAT 3560 - 02",nrc:"00004",prof:"Docente no mostrado",day:4,time:"8:00 AM - 10:50 AM",room:"Aula 201",location:"Recinto universitario",credits:5},
    {name:"Ciencias Sociales",code:"SOC 0100 - 01",nrc:"00005",prof:"Docente no mostrado",day:4,time:"1:00 PM - 3:50 PM",room:"Aula 105",location:"Recinto universitario",credits:3},
    {name:"Inglés Elemental",code:"IDI 0130 - 01",nrc:"00006",prof:"Docente no mostrado",day:4,time:"6:00 PM - 7:50 PM",room:"Aula 202",location:"Recinto universitario",credits:4},
    {name:"Inglés Elemental",code:"IDI 0130 - 01",nrc:"00006",prof:"Docente no mostrado",day:5,time:"9:00 AM - 11:50 AM",room:"Aula 202",location:"Recinto universitario",credits:4},
    {name:"Cálculo I",code:"MAT 3560 - 02",nrc:"00004",prof:"Docente no mostrado",day:5,time:"2:00 PM - 4:50 PM",room:"Aula 201",location:"Recinto universitario",credits:5}
  ];
  const termData = [
    {title:"Primer Semestre 2027",tag:"Catálogo de ejemplo"},
    {title:"Segundo Semestre 2026",tag:"Catálogo de ejemplo"},
    {title:"Verano 2026",tag:"Catálogo de ejemplo"},
    {title:"Primer Semestre 2026",tag:"Catálogo de ejemplo"},
    {title:"Segundo Semestre 2025",tag:"Catálogo de ejemplo"},
    {title:"Verano 2025",tag:"Catálogo de ejemplo"}
  ];
  const historic = [
    {term:"Segundo Semestre 2025",subjects:[{name:"Investigación de Operaciones",code:"MAT 3940",nrc:"00007",cr:5,grade:85}]},
    {term:"Primer Semestre 2025",subjects:[{name:"Algoritmos Computacionales",code:"INF 3220",nrc:"00008",cr:5,grade:95},{name:"Matemática Financiera",code:"MAT 1430",nrc:"00009",cr:5,grade:84},{name:"Matemática Discreta",code:"MAT 3920",nrc:"00010",cr:4,grade:91}]}
  ];
  const planSubjects = [
    ["Biología Básica","BIO 0140",3],["Orientación Institucional","DOP 1000",1],
    ["Historia Social Dominicana","HIS 0110",3],["Computación Esencial","INF 2060",4],
    ["Laboratorio de Computación","INF 2070",1],["Lengua Española Básica I","LET 0110",3],
    ["Introducción a las Ciencias Sociales","SOC 0100",3]
  ];
  const state = {screen:"horario",view:"dia",day:3,week:0,theme:"light",termFilter:"principales",selectedTerm:-1};
  const viewport=document.getElementById("demo-viewport");
  const sheet=document.getElementById("phone-sheet-layer");
  const phone=document.getElementById("demo-phone");
  if(!viewport || !sheet || !phone) return;
  const dayCards=()=>{
    const selected=[1,2,3,4,5,6,7,8,9];
    return '<div class="phone-days" aria-label="Seleccionar día">'+selected.map((d)=>{
      const idx=(d-1)%7;
      const meta=days[idx], active=state.day===d;
      const color=classData.some(c=>c.day===idx)?meta.color:null;
      return '<button type="button" class="day-pill'+(active?' active':'')+'" data-day="'+d+'" aria-pressed="'+active+'" style="--day-color:'+(color||'transparent')+'"><span>'+d+'</span><small>'+meta.short+'</small>'+(color?'<span class="day-line"></span>':'')+'</button>';
    }).join("")+'</div>';
  };
  const weekCards=()=>{
    return '<div class="phone-weeks" aria-label="Seleccionar semana">'+["1–7","8–14","15–21","22–28","1–7"].map((period,i)=>'<button type="button" class="week-pill'+(state.week===i?' active':'')+'" data-week="'+i+'" aria-pressed="'+(state.week===i)+'"><span>'+period+'</span><small>'+(i===4?'Mar':'Feb')+'</small></button>').join("")+'</div>';
  };
  const card=(it, color)=>'<article class="phone-card schedule-card" style="--card-day:'+color+'"><div class="schedule-card-top"><div><h4>'+it.name+'</h4><div class="schedule-teacher">'+it.prof+'</div></div><div class="schedule-meta">'+it.code+'<br>NRC: '+it.nrc+'</div></div><div class="schedule-meeting"><p><span class="meeting-icon" aria-hidden="true">▦</span><strong>'+days[it.day].name+' · '+it.time+'</strong></p><p><span class="meeting-icon" aria-hidden="true">◆</span>'+it.room+'</p></div><div class="schedule-footer"><span class="tag-neutral">Presencial</span><span>·</span><span>'+it.location+'</span></div></article>';
  function renderHorario(){
    const isDay=state.view==="dia";
    const heading='<div class="app-screen-head"><h3>Febrero 2022</h3><div class="phone-mode-tabs" role="group" aria-label="Vista de horario"><button data-view="dia" aria-pressed="'+isDay+'" class="'+(isDay?'is-active':'')+'">Día</button><button data-view="semana" aria-pressed="'+(!isDay)+'" class="'+(!isDay?'is-active':'')+'">Semana</button></div></div>';
    if(isDay){
      const index=(state.day-1)%7, selected=classData.filter(c=>c.day===index);
      const body=selected.length?selected.map(it=>card(it,days[it.day].color)).join(""):'<div class="phone-card phone-empty">No hay clases para este día en la demostración.</div>';
      viewport.innerHTML=heading+dayCards()+'<div class="phone-content"><button type="button" data-open-agenda="'+index+'" class="schedule-summary" style="width:100%;text-align:left;cursor:pointer"><span><strong>'+((state.day===3)?"Hoy":days[index].name)+'</strong> · '+selected.length+' clase'+(selected.length===1?'':'s')+' · 0 recordatorios</span><span aria-hidden="true">›</span></button>'+body+'</div>';
    }else{
      const rows=days.map((day,i)=>{
        const num=i+1, data=state.week===0?classData.filter(c=>c.day===i):[];
        const subjects=data.slice(0,3).map(c=>'<div class="weekday-subject"><strong>'+c.name+'</strong><small>'+c.time+'</small></div>').join("");
        return '<div class="weekday-row'+(!data.length?' has-no-classes':'')+'" style="--card-day:'+day.color+'"><div class="weekday-cell">'+day.short+'<strong>'+num+'</strong></div><div class="weekday-subjects">'+subjects+'</div><button type="button" class="weekday-more" data-open-agenda="'+i+'" aria-label="Ver agenda del '+day.name+'">›</button></div>';
      }).join("");
      viewport.innerHTML=heading+weekCards()+'<div class="phone-content">'+rows+'</div>';
    }
  }
  function renderHistorial(){
    const groups=historic.map(g=>'<h4 class="academic-section-title">'+g.term+'</h4>'+g.subjects.map(s=>'<article class="phone-card course-card"><h4>'+s.name+'</h4><div class="course-details"><span>'+s.code+'<br>Créditos: '+s.cr+'</span><div class="course-detail-right"><span>NRC: '+s.nrc+'</span><br><span class="grade-pill">Calificación: '+s.grade+'</span></div></div></article>').join("")).join("");
    viewport.innerHTML='<div class="app-screen-head"><h3>Historial de inscripción</h3><span aria-hidden="true" style="color:var(--p-accent)">⌕　☰</span></div><div class="phone-content" style="padding-top:17px"><section class="phone-card academic-summary"><div class="phone-card-title"><h4>Resumen académico</h4></div><div class="academic-summary-grid"><div class="academic-number"><span class="academic-icon">◇</span><span class="academic-value">128<small>Créditos</small></span></div><div class="academic-number"><span class="academic-icon">☆</span><span class="academic-value">86.25<small>Índice</small></span></div></div></section>'+groups+'</div>';
  }
  function renderPensum(){
    viewport.innerHTML='<div class="app-screen-head"><div><h3>Pensum</h3><p class="app-subtitle">Licenciatura en Informática</p></div><span style="color:var(--p-accent)" aria-hidden="true">⌕　▤</span></div><div class="phone-content" style="padding-top:16px"><section class="phone-card pensum-overview"><div class="phone-card-title"><h4>Resumen del plan</h4><span class="plan-progress-tag">Progreso por créditos</span></div><div class="academic-summary-grid"><div class="academic-number"><span class="academic-icon">▤</span><span class="academic-value">40/51<small>Materias</small></span></div><div class="academic-number"><span class="academic-icon">◇</span><span class="academic-value">145/186<small>Créditos</small></span></div></div><div class="progress-row"><div class="progress-track"><span></span></div><span>78.0%</span></div></section><div class="phone-card-title" style="margin:17px 5px 8px"><h4>Primer Semestre</h4><small style="color:var(--p-secondary)">7/7</small></div><div class="pensum-group">'+planSubjects.map(([name,code,cr])=>'<div class="pensum-course"><div><strong>'+name+'</strong><small>Clave: '+code+'</small></div><span class="course-complete">✓ CR '+cr+'</span></div>').join("")+'</div></div>';
  }
  function renderSemestres(){
    let terms=state.termFilter==="principales"?termData.slice(0,4):termData;
    viewport.innerHTML='<div class="app-screen-head"><div><h3>Seleccionar semestre</h3><p class="app-subtitle">Elige qué período quieres consultar</p></div><span style="color:var(--p-accent)" aria-hidden="true">⌕</span></div><div class="phone-content" style="padding-top:9px"><div class="semester-help"><strong>¿No encuentras tu semestre?</strong><small>Consultar semestres disponibles</small></div><div class="semester-filter"><button type="button" data-term-filter="principales" class="'+(state.termFilter==='principales'?'active':'')+'">Principales</button><button type="button" data-term-filter="todos" class="'+(state.termFilter==='todos'?'active':'')+'">Todos</button></div>'+terms.map((s,i)=>'<button type="button" class="semester-option'+(state.selectedTerm===i?' selected':'')+'" data-term="'+i+'" aria-pressed="'+(state.selectedTerm===i)+'"><span class="semester-radio"></span><span><strong>'+s.title+'</strong><small>'+s.tag+'</small></span></button>').join("")+'<div class="semester-actions"><button type="button" data-screen="horario">Volver</button><button type="button" class="primary" data-confirm-term>Continuar ›</button></div></div>';
  }
  function syncButtons(){
    document.querySelectorAll("[data-demo-route]").forEach(b=>b.classList.toggle("is-active",b.dataset.demoRoute===state.screen));
    document.querySelectorAll(".phone-nav-btn[data-screen]").forEach(b=>{
      const active=b.dataset.screen===state.screen;
      b.classList.toggle("is-active",active);
      if(active)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current");
    });
  }
  function render(){
    if(state.screen==="horario")renderHorario();
    else if(state.screen==="historial")renderHistorial();
    else if(state.screen==="pensum")renderPensum();
    else renderSemestres();
    syncButtons();
  }
  function closeSheet(){sheet.hidden=true;sheet.innerHTML="";}
  function openAgenda(dayIndex){
    const d=days[dayIndex], list=classData.filter(c=>c.day===dayIndex);
    const events=list.map(c=>'<div class="timeline-event" style="--event-color:'+d.color+'"><time>'+c.time.split(" - ")[0]+'</time><strong>'+c.name+'</strong><small>'+c.room+'</small></div>').join("");
    sheet.innerHTML='<div class="phone-sheet" role="dialog" aria-modal="true" aria-label="Agenda del día"><div class="sheet-handle"></div><div class="sheet-head"><h4>Agenda del día</h4><button class="sheet-close" type="button" data-close-agenda aria-label="Cerrar agenda">×</button></div><p class="sheet-sub">'+d.name+' · Datos ficticios</p>'+(events||'<div class="phone-empty">Sin clases para este día.</div>')+'<button class="timeline-add" data-close-agenda type="button">+ Añadir recordatorio (demostración)</button></div>';
    sheet.hidden=false;
  }
  document.addEventListener("click", (ev)=>{
    const button=ev.target.closest("button");if(!button)return;
    if(button.dataset.themeChoice){state.theme=button.dataset.themeChoice;phone.dataset.demoTheme=state.theme;document.querySelectorAll("[data-theme-choice]").forEach(b=>{const active=b.dataset.themeChoice===state.theme;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",active)});return;}
    const next=button.dataset.screen||button.dataset.demoRoute;
    if(next){state.screen=next;closeSheet();render();return;}
    if(button.dataset.view){state.view=button.dataset.view;closeSheet();render();return;}
    if(button.dataset.day){state.day=Number(button.dataset.day);closeSheet();render();return;}
    if(button.dataset.week!==undefined){state.week=Number(button.dataset.week);closeSheet();render();return;}
    if(button.dataset.openAgenda!==undefined){openAgenda(Number(button.dataset.openAgenda));return;}
    if(button.hasAttribute("data-close-agenda")){closeSheet();return;}
    if(button.dataset.termFilter){state.termFilter=button.dataset.termFilter;state.selectedTerm=-1;render();return;}
    if(button.dataset.term!==undefined){state.selectedTerm=Number(button.dataset.term);render();return;}
    if(button.hasAttribute("data-confirm-term")){state.screen="horario";render();return;}
  });
  sheet.addEventListener("click",ev=>{if(ev.target===sheet)closeSheet()});
  document.addEventListener("keydown",ev=>{if(ev.key==="Escape")closeSheet()});
  render();
})();
