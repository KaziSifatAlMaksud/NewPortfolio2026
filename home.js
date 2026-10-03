/* =========================================================================
   SINGLE SOURCE OF TRUTH — every project appears once here. The featured
   block, grid, roster, filters and overlay are all generated from it.
   Add `link:"page.html"` to open a standalone page instead of the overlay.
   ========================================================================= */
const projects = [
  {
    title:"Nandi Foods",
    role:"Product Design",
    year:"2025",
    cat:"Product",
    img:"nandifoods/nandifoods_dashbord.jpeg",
    accent:"linear-gradient(150deg,#331414,#B15A3E 55%,#EDB79B)",
    blurb:"TODO — replace with the real Nandi Foods brief: the problem, your approach, and the outcome.",
    link:"flash_innovation_details.html" /* TODO: probably should be its own page, e.g. nandi_foods_details.html */
  },
  {
    title:"Flash Innovations",
    role:"Brand & Product Design",
    year:"2025",
    cat:"Branding",
    img:"flash-innovations.html.png",
    accent:"linear-gradient(135deg,#1B2A6B,#3D5AFE 55%,#9AA9FF)",
    blurb:"TODO — replace with the real Flash Innovations brief: the problem, your approach, and the outcome.",
    link:"flash_innovation_details.html"
  },
  {
    title:"Flash Painting Co.",
    role:"Brand Identity",
    year:"2025",
    cat:"Branding",
    img:"flashpainting.png",
    accent:"linear-gradient(150deg,#3A2A16,#96A87E 60%,#D9E0C7)",
    blurb:"TODO — replace with the real Flash Painting Co. brief: the problem, your approach, and the outcome.",
    link:"flash_paining_details.html"
  },
  {
    title:"Barakah",
    role:"Brand Identity",
    year:"2025",
    cat:"Branding",
    img:"barakah.jpeg",
    accent:"linear-gradient(150deg,#241226,#7A3D9B 55%,#C79BE0)",
    blurb:"TODO — replace with the real Barakah brief: the problem, your approach, and the outcome."
  },
  {
    title:"Agentic",
    role:"Product Design",
    year:"2025",
    cat:"Product",
    img:"agentic.jpeg",
    accent:"linear-gradient(150deg,#0D2130,#2C6E8F 55%,#8FD1E8)",
    blurb:"TODO — replace with the real Agentic brief: the problem, your approach, and the outcome."
  },
  {
    title:"Suvastu",
    role:"Brand Identity",
    year:"2025",
    cat:"Branding",
    img:"suvastu.jpeg",
    accent:"linear-gradient(150deg,#12241A,#3E7A52 55%,#A9D8B8)",
    blurb:"TODO — replace with the real Suvastu brief: the problem, your approach, and the outcome."
  },
  {
    title:"Primom",
    role:"Brand Identity",
    year:"2025",
    cat:"Branding",
    img:"primom.jpeg",
    accent:"linear-gradient(150deg,#241C0D,#B18C3E 55%,#EDD79B)",
    blurb:"TODO — replace with the real Primom brief: the problem, your approach, and the outcome."
  }
];

const total  = projects.length;
const padded = n => String(n).padStart(2,'0');
function initials(name){
  return name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
}

/* ---------- theme toggle ---------- */
document.getElementById('themeToggle').addEventListener('click', ()=>{
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  try{ localStorage.setItem('ks-theme', next); }catch(e){}
});

/* ---------- mobile menu ---------- */
const menuToggle = document.getElementById('menuToggle');
const navlinks   = document.getElementById('navlinks');
menuToggle.addEventListener('click', ()=>{
  menuToggle.classList.toggle('active');
  navlinks.classList.toggle('active');
});
navlinks.querySelectorAll('a').forEach(link=>{
  link.addEventListener('click', ()=>{
    menuToggle.classList.remove('active');
    navlinks.classList.remove('active');
  });
});

/* ---------- featured project (projects[0]) ---------- */
function renderFeatured(){
  const p = projects[0];
  document.getElementById('featureArt').style.backgroundImage = `url('${p.img}')`;
  document.getElementById('featureBadge').textContent = '01 · Featured';
  document.getElementById('featureTitle').textContent = p.title;
  document.getElementById('featureMeta').textContent  = `${p.role} · ${p.year}`;
  document.getElementById('featuredCount').textContent = `01 / ${padded(total)}`;
  document.getElementById('gridCount').textContent     = `02 – ${padded(total)}`;
}
renderFeatured();

/* ---------- "more projects" grid ---------- */
const grid = document.getElementById('grid');
function renderGrid(){
  grid.innerHTML = projects.slice(1).map((p,i)=>{
    const idx = i + 1;
    return `
    <div class="card reveal in" data-project="${idx}" data-cat="${p.cat}">
      <div class="thumb">
        <div class="art" style="background-image:url('${p.img}')"></div>
        <span class="glass-label thumb-badge">${padded(idx+1)} · ${p.cat}</span>
        <span class="glass-label thumb-year">${p.year}</span>
      </div>
      <div class="body">
        <div>
          <h4 class="display">${p.title}</h4>
          <div class="tags">${p.role} · ${p.cat} · ${p.year}</div>
        </div>
        <span class="arrow">↗</span>
      </div>
    </div>`;
  }).join('');
}
renderGrid();

/* ---------- overlay case study ---------- */
const overlay    = document.getElementById('overlay');
const overlayArt = document.getElementById('overlayArt');

function openProject(i){
  const p = projects[i];
  if(!p) return;
  if(p.link){ window.location.href = p.link; return; }

  overlayArt.style.backgroundImage = `url('${p.img}')`;
  document.getElementById('csGal1').style.background = p.accent;
  const stops = (p.accent.match(/#[0-9A-Fa-f]{6}/g) || []).slice().reverse().join(',');
  document.getElementById('csGal2').style.background = stops ? `linear-gradient(60deg,${stops})` : p.accent;
  document.getElementById('csTitle').textContent = p.title;
  document.getElementById('csRole').textContent  = p.role;
  document.getElementById('csYear').textContent  = p.year;
  document.getElementById('csCat').textContent   = p.cat;
  document.getElementById('csText').innerHTML    = '<p>' + p.blurb + '</p>';
  overlay.classList.add('open');
  document.body.classList.add('locked');
  overlay.scrollTop = 0;
}
function closeProject(){
  overlay.classList.remove('open');
  document.body.classList.remove('locked');
}
document.getElementById('closeBtn').addEventListener('click', closeProject);
document.addEventListener('keydown', e=>{ if(e.key === 'Escape') closeProject(); });

/* One delegated click handler covers featured card, grid cards AND roster tiles,
   even though some of them are rendered after page load. */
document.addEventListener('click', e=>{
  const el = e.target.closest('[data-project]');
  if(el) openProject(Number(el.dataset.project));
});

/* ---------- custom cursor (delegated, so dynamic items work too) ---------- */
const cursor = document.getElementById('cursor');
if(matchMedia('(pointer:fine)').matches){
  window.addEventListener('mousemove', e=>{
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  const hoverSel = '.card, .feature-card, .client-tile, .logo-card, .contact-link, .close-btn, .theme-toggle';
  document.addEventListener('mouseover', e=>{
    if(e.target.closest(hoverSel)) cursor.classList.add('view');
  });
  document.addEventListener('mouseout', e=>{
    if(e.target.closest(hoverSel) &&
       !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(hoverSel))){
      cursor.classList.remove('view');
    }
  });
}

/* ---------- featured parallax ---------- */
const featArt = document.getElementById('featureArt');
window.addEventListener('scroll', ()=>{
  const r = featArt.parentElement.getBoundingClientRect();
  featArt.style.transform = `translateY(${(window.innerHeight - r.top) * 0.06}px)`;
});

/* ---------- hero orb mouse parallax ---------- */
const heroBg = document.getElementById('heroBg');
const orbs   = heroBg.querySelectorAll('.orb');
const depths = [40, 25, 15];
let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
heroBg.closest('.hero').addEventListener('mousemove', e=>{
  const rect = e.currentTarget.getBoundingClientRect();
  mouseX = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
  mouseY = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
});
function animateOrbs(){
  targetX += (mouseX - targetX) * 0.05;
  targetY += (mouseY - targetY) * 0.05;
  orbs.forEach((orb,i)=>{
    orb.style.transform = `translate(${targetX * depths[i]}px, ${targetY * depths[i]}px)`;
  });
  requestAnimationFrame(animateOrbs);
}
if(!matchMedia('(prefers-reduced-motion: reduce)').matches) animateOrbs();

/* =========================================================================
   SLIDING CLIENT LOGOS
   ========================================================================= */
const logos = [
  { name:"Network Logic",           logo:"logo/Network.png" },
  { name:"NandiFood",               logo:"logo/nandifood.png" },
  { name:"Flash Painting",          logo:"logo/flashpainting.png" },
  { name:"Flash Innovation",        logo:"logo/flashinnovation.webp" },
  { name:"Suvastu Properties ltd.", logo:"logo/suvastu.svg" },
  { name:"BSAT",                    logo:"logo/Barakah-Logo.png" },
  { name:"MJL Bangladesh",          logo:"assets/logos/mjl.png" } /* check this path — other logos are in logo/ */
];

const logoTrack  = document.getElementById('logoTrack');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');

function renderLogos(){
  logoTrack.innerHTML = '';
  logos.forEach(l=>{
    const card = document.createElement('div');
    card.className = 'logo-card';

    const img = document.createElement('img');
    img.src = l.logo;
    img.alt = l.name + ' logo';
    img.draggable = false;
    img.onerror = ()=>{
      const fb = document.createElement('div');
      fb.className = 'logo-fallback';
      fb.textContent = initials(l.name);
      img.replaceWith(fb);
    };

    const cap = document.createElement('div');
    cap.className = 'logo-caption mono';
    cap.textContent = l.name;

    card.append(img, cap);
    logoTrack.appendChild(card);
  });
}
renderLogos();

function scrollAmount(){
  const card = logoTrack.querySelector('.logo-card');
  const gap  = parseFloat(getComputedStyle(logoTrack).gap) || 18;
  return card ? card.offsetWidth + gap : 300;
}
function updateSliderButtons(){
  sliderPrev.disabled = logoTrack.scrollLeft <= 4;
  sliderNext.disabled = logoTrack.scrollLeft >= logoTrack.scrollWidth - logoTrack.clientWidth - 4;
}

/* arrows */
sliderPrev.addEventListener('click', ()=> logoTrack.scrollBy({ left:-scrollAmount()*2, behavior:'smooth' }));
sliderNext.addEventListener('click', ()=> logoTrack.scrollBy({ left: scrollAmount()*2, behavior:'smooth' }));
logoTrack.addEventListener('scroll', updateSliderButtons);
window.addEventListener('resize', updateSliderButtons);
setTimeout(updateSliderButtons, 50);

/* autoplay: loops back to start, pauses on hover/touch */
let paused = false;
setInterval(()=>{
  if(paused) return;
  const max = logoTrack.scrollWidth - logoTrack.clientWidth;
  if(max <= 4) return; /* everything already fits */
  if(logoTrack.scrollLeft >= max - 4) logoTrack.scrollTo({ left:0, behavior:'smooth' });
  else logoTrack.scrollBy({ left:scrollAmount(), behavior:'smooth' });
}, 2800);
logoTrack.addEventListener('mouseenter', ()=> paused = true);
logoTrack.addEventListener('mouseleave', ()=> paused = false);
logoTrack.addEventListener('touchstart', ()=> paused = true, { passive:true });
logoTrack.addEventListener('touchend',   ()=> setTimeout(()=> paused = false, 2500));

/* mouse drag-to-scroll (touch already swipes natively) */
let isDown = false, startX = 0, startLeft = 0;
logoTrack.addEventListener('pointerdown', e=>{
  if(e.pointerType === 'touch') return;
  isDown = true; startX = e.clientX; startLeft = logoTrack.scrollLeft;
  logoTrack.classList.add('dragging');
});
window.addEventListener('pointermove', e=>{
  if(!isDown) return;
  logoTrack.scrollLeft = startLeft - (e.clientX - startX);
});
window.addEventListener('pointerup', ()=>{
  if(!isDown) return;
  isDown = false;
  logoTrack.classList.remove('dragging');
});

/* =========================================================================
   FULL ROSTER + FILTERS
   ========================================================================= */
const rosterColors = ["#B9C2FF","#D9E0C7","#C79BE0","#EDB79B","#8FD1E8","#A9D8B8","#EDD79B"];
const clientGrid   = document.getElementById('clientGrid');
const rosterCount  = document.getElementById('rosterCount');

function renderRoster(){
  clientGrid.innerHTML = projects.map((p,i)=>`
    <div class="client-tile" data-industry="${p.cat}" data-project="${i}">
      <div class="top">
        <div class="initial" style="background:${rosterColors[i % rosterColors.length]};">${initials(p.title)}</div>
        <div class="arrow">↗</div>
      </div>
      <div>
        <h4 class="display">${p.title}</h4>
        <div class="meta">${p.cat}<span class="dot">·</span>${p.role}<span class="dot">·</span>${p.year}</div>
      </div>
    </div>
  `).join('');
}
renderRoster();

document.getElementById('industryFilters').addEventListener('click', e=>{
  const btn = e.target.closest('button');
  if(!btn) return;
  document.querySelectorAll('#industryFilters button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  let visible = 0;
  document.querySelectorAll('.client-tile').forEach(tile=>{
    const show = f === 'all' || tile.dataset.industry === f;
    tile.classList.toggle('hide', !show);
    if(show) visible++;
  });
  rosterCount.textContent = `${visible} client${visible !== 1 ? 's' : ''}`;
});

/* ---------- scroll reveal (runs last so it sees every rendered element) ---------- */
const io = new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
  });
},{ threshold:.15 });
document.querySelectorAll('.reveal:not(.in)').forEach(el=>io.observe(el));