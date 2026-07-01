/* ==========================================================================
   PitStop Express — Home
   ========================================================================== */
(function () {
  const $ = (s) => document.querySelector(s);
  const ICON = window.ICON, money = window.PS.money;

  // Iconos sueltos del hero
  ['i-check1', 'i-check2', 'i-check3'].forEach(id => { const e = $('#' + id); if (e) e.innerHTML = `<span style="width:18px;height:18px;display:inline-block;color:var(--brand);vertical-align:middle">${ICON.check}</span>`; });
  const clk = $('#i-clock'); if (clk) clk.innerHTML = ICON.clock;
  const shd = $('#i-shield'); if (shd) shd.innerHTML = ICON.shield;

  // Marcas
  const brands = ['SEAT', 'Volkswagen', 'Renault', 'Peugeot', 'BMW', 'Mercedes', 'Toyota', 'Ford', 'Audi', 'Citroën', 'Opel', 'Kia'];
  const track = $('#brandsTrack');
  if (track) track.innerHTML = [...brands, ...brands].map(b => `<span>${b}</span>`).join('');

  // Features
  const features = [
    { icon: 'clock', t: 'Rápido de verdad', d: 'Servicios exprés mientras esperas. La mayoría en menos de una hora.' },
    { icon: 'euro', t: 'Precio cerrado', d: 'Sabes lo que pagas antes de empezar. Sin extras ni letra pequeña.' },
    { icon: 'shield', t: 'Garantía por escrito', d: '12 meses en mano de obra y recambios originales o equivalentes.' },
    { icon: 'medal', t: 'Mecánicos certificados', d: 'Equipo con formación oficial y equipos de diagnosis de última generación.' },
    { icon: 'car', t: 'Coche de cortesía', d: 'Para reparaciones largas te dejamos un vehículo para que no pares.' },
    { icon: 'wrench', t: 'Todas las marcas', d: 'Mantenemos tu garantía oficial usando recambios homologados.' },
  ];
  const fg = $('#featuresGrid');
  if (fg) fg.innerHTML = features.map(f => `
    <div class="card card-hover feature reveal">
      <span class="icon-badge">${ICON[f.icon]}</span>
      <h3>${f.t}</h3><p>${f.d}</p>
    </div>`).join('');

  // Servicios destacados (6 primeros)
  const sg = $('#svcGrid');
  if (sg) sg.innerHTML = window.SERVICES.slice(0, 6).map(s => `
    <article class="card card-hover svc-card reveal">
      <div class="svc-media" style="background:linear-gradient(160deg, ${s.color}22, ${s.color}08);color:${s.color}">${ICON[s.icon]}</div>
      <div class="svc-body">
        <span class="pill pill-brand" style="align-self:flex-start">${s.cat}</span>
        <h3 style="margin-top:10px">${s.name}</h3>
        <p>${s.short}</p>
        <div class="svc-meta">
          <div class="svc-price">${money(s.price)} <small>${s.unit}</small></div>
          <a href="reservas.html?servicio=${s.id}" class="btn btn-dark btn-sm">Reservar</a>
        </div>
      </div>
    </article>`).join('');

  // Testimonios
  const testis = [
    { n: 'Laura Giménez', r: 'SEAT León', c: '#ff4d2e', s: 5, txt: 'Entré sin cita para el aceite y en media hora estaba fuera. Precio exacto al del presupuesto online. Repetiré seguro.' },
    { n: 'Marc Ferrer', r: 'BMW Serie 1', c: '#00b4d8', s: 5, txt: 'Me cambiaron pastillas y discos el mismo día. Me explicaron todo con fotos y sin intentar venderme cosas que no necesitaba.' },
    { n: 'Ana Rodríguez', r: 'Renault Clio', c: '#16a34a', s: 5, txt: 'Reservé desde el móvil un domingo por la noche. El lunes me esperaban puntuales. Zona de espera con café, un lujo.' },
  ];
  const tg = $('#testiGrid');
  if (tg) tg.innerHTML = testis.map(t => `
    <article class="card testi reveal">
      <div class="stars">${ICON.star.repeat(t.s)}</div>
      <p>“${t.txt}”</p>
      <div class="testi-person">
        <div class="avatar" style="background:${t.c}">${t.n[0]}</div>
        <div><b>${t.n}</b><span>${t.r}</span></div>
      </div>
    </article>`).join('');

  window.PS.animateCounters();
})();
