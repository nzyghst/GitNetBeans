/* ==========================================================================
   PitStop Express — Reserva de cita (wizard multi-paso)
   ========================================================================== */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ICON = window.ICON, money = window.PS.money;

  const state = { services: [], fuel: '', date: '', time: '', step: 1 };
  const TOTAL_STEPS = 4;

  /* ---------- Paso 1: servicios ---------- */
  const opts = $('#serviceOptions');
  opts.innerHTML = window.SERVICES.map(s => `
    <label class="option-card" data-svc="${s.id}">
      <input type="checkbox" value="${s.id}">
      <span class="oc-icon icon-badge" style="background:${s.color}18;color:${s.color}">${ICON[s.icon]}</span>
      <div><h4>${s.name}</h4><p>${s.short}</p></div>
      <span class="oc-price">${money(s.price)}<br><small class="text-muted" style="font-weight:500">${s.unit}</small></span>
    </label>`).join('');

  $$('.option-card', opts).forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') { const cb = $('input', card); cb.checked = !cb.checked; }
      const cb = $('input', card);
      card.classList.toggle('selected', cb.checked);
      const id = card.dataset.svc;
      if (cb.checked) state.services.push(id); else state.services = state.services.filter(x => x !== id);
      state.services = [...new Set(state.services)];
      renderSummary();
    });
  });

  // Preselección por querystring
  const pre = new URLSearchParams(location.search).get('servicio');
  if (pre) {
    const card = $(`.option-card[data-svc="${pre}"]`, opts);
    if (card) card.click();
  }

  /* ---------- Paso 2: combustible ---------- */
  $$('#fuelChips .chip').forEach(ch => ch.addEventListener('click', () => {
    $$('#fuelChips .chip').forEach(c => c.classList.remove('selected'));
    ch.classList.add('selected');
    state.fuel = ch.dataset.fuel;
    $('#combustible').value = state.fuel;
    renderSummary();
  }));

  /* ---------- Paso 3: fecha y horas ---------- */
  const dateInput = $('#fecha');
  const today = new Date();
  const min = new Date(today); min.setDate(min.getDate() + 1);
  const max = new Date(today); max.setDate(max.getDate() + 45);
  dateInput.min = min.toISOString().split('T')[0];
  dateInput.max = max.toISOString().split('T')[0];

  const ALL_SLOTS = ['08:30', '09:15', '10:00', '10:45', '11:30', '12:15', '13:00', '16:00', '16:45', '17:30', '18:15', '19:00'];
  function renderSlots() {
    const grid = $('#slotGrid');
    const d = dateInput.value ? new Date(dateInput.value + 'T00:00') : null;
    if (!d) { grid.innerHTML = '<p class="text-muted">Selecciona primero una fecha.</p>'; return; }
    if (d.getDay() === 0) { grid.innerHTML = '<p class="text-muted">Los domingos permanecemos cerrados. Elige otro día 🙂</p>'; state.time = ''; renderSummary(); return; }
    // Simulación de disponibilidad determinista por fecha
    const seed = d.getDate() + d.getMonth();
    grid.innerHTML = ALL_SLOTS.map((t, i) => {
      const busy = (seed + i) % 4 === 0;
      return `<div class="slot ${busy ? 'disabled' : ''} ${state.time === t ? 'selected' : ''}" data-time="${busy ? '' : t}">${t}</div>`;
    }).join('');
    $$('.slot:not(.disabled)', grid).forEach(s => s.addEventListener('click', () => {
      $$('.slot', grid).forEach(x => x.classList.remove('selected'));
      s.classList.add('selected'); state.time = s.dataset.time; renderSummary();
    }));
  }
  dateInput.addEventListener('change', () => { state.date = dateInput.value; state.time = ''; renderSlots(); renderSummary(); });

  /* ---------- Resumen ---------- */
  function selectedServices() { return window.SERVICES.filter(s => state.services.includes(s.id)); }
  function estTotal() { return selectedServices().reduce((sum, s) => sum + s.price, 0); }

  function renderSummary() {
    const svcs = selectedServices();
    const box = $('#summaryContent');
    const rows = [];
    if (svcs.length) rows.push(...svcs.map(s => `<div class="summary-row"><span class="k">${s.name}</span><span class="v">${money(s.price)} <small class="text-muted">${s.unit}</small></span></div>`));
    else rows.push('<p class="text-muted" style="font-size:.9rem">Aún no has elegido servicios.</p>');

    const marca = $('#marca')?.value, modelo = $('#modelo')?.value;
    if (marca || modelo || state.fuel) rows.push(`<div class="summary-row"><span class="k">Vehículo</span><span class="v">${[marca, modelo, state.fuel].filter(Boolean).join(' · ') || '—'}</span></div>`);
    if (state.date) rows.push(`<div class="summary-row"><span class="k">Fecha</span><span class="v">${formatDate(state.date)}</span></div>`);
    if (state.time) rows.push(`<div class="summary-row"><span class="k">Hora</span><span class="v">${state.time} h</span></div>`);

    box.innerHTML = rows.join('') + `
      <div class="summary-total"><span>Estimado <small class="text-muted" style="font-weight:500;display:block">precio final tras revisión</small></span><span class="v">${money(estTotal())}</span></div>
      <p class="text-muted" style="font-size:.78rem;margin-top:12px">💡 Presupuesto sin compromiso. No cobramos nada hasta confirmar el trabajo contigo.</p>`;
  }

  function formatDate(iso) {
    return new Date(iso + 'T00:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  ['marca', 'modelo'].forEach(id => $('#' + id)?.addEventListener('input', renderSummary));
  renderSummary();

  /* ---------- Navegación pasos ---------- */
  const stepper = $$('#stepper .st');
  function showStep(n) {
    state.step = n;
    $$('.res-step').forEach(s => s.classList.toggle('active', +s.dataset.step === n));
    stepper.forEach((st, i) => {
      st.classList.toggle('active', i === n - 1);
      st.classList.toggle('done', i < n - 1);
    });
    $('#prevBtn').style.visibility = n === 1 ? 'hidden' : 'visible';
    $('#nextBtn').classList.toggle('hidden', n === TOTAL_STEPS);
    $('#submitBtn').classList.toggle('hidden', n !== TOTAL_STEPS);
    if (n === 3) renderSlots();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function validateStep(n) {
    if (n === 1) {
      if (!state.services.length) { window.PS.toast('Elige al menos un servicio', ICON.wrench); return false; }
      return true;
    }
    if (n === 2) {
      let ok = true;
      ['marca', 'modelo', 'matricula'].forEach(id => { if (!markValid(id, $('#' + id).value.trim())) ok = false; });
      if (!ok) window.PS.toast('Completa los datos del vehículo', ICON.car);
      return ok;
    }
    if (n === 3) {
      if (!state.date) { window.PS.toast('Elige una fecha', ICON.clock); return false; }
      if (!state.time) { window.PS.toast('Elige una hora disponible', ICON.clock); return false; }
      return true;
    }
    return true;
  }

  function markValid(id, val) {
    const field = $('#' + id).closest('.field');
    const ok = !!val;
    field.classList.toggle('invalid', !ok);
    return ok;
  }

  $('#nextBtn').addEventListener('click', () => { if (validateStep(state.step)) showStep(Math.min(state.step + 1, TOTAL_STEPS)); });
  $('#prevBtn').addEventListener('click', () => showStep(Math.max(state.step - 1, 1)));

  // Permitir clic en stepper hacia pasos ya visitados
  stepper.forEach((st, i) => st.addEventListener('click', () => { if (i + 1 < state.step) showStep(i + 1); }));

  /* ---------- Envío ---------- */
  $('#bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    if (!markValid('nombre', $('#nombre').value.trim())) ok = false;
    const tel = $('#telefono').value.replace(/\s/g, '');
    const telOk = /^(\+?\d{9,15})$/.test(tel);
    $('#telefono').closest('.field').classList.toggle('invalid', !telOk); if (!telOk) ok = false;
    const email = $('#email').value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    $('#email').closest('.field').classList.toggle('invalid', !emailOk); if (!emailOk) ok = false;
    const rgpd = $('#rgpd').checked;
    $('#rgpd').closest('.field').classList.toggle('invalid', !rgpd); if (!rgpd) ok = false;
    if (!ok) { window.PS.toast('Revisa los campos marcados', ICON.close); return; }

    const code = 'PS-' + Date.now().toString(36).toUpperCase().slice(-6);
    const booking = {
      code, services: selectedServices().map(s => s.name), date: state.date, time: state.time,
      vehicle: `${$('#marca').value} ${$('#modelo').value} · ${state.fuel || ''}`.trim(),
      matricula: $('#matricula').value, name: $('#nombre').value, phone: tel, email, total: estTotal(), created: new Date().toISOString(),
    };
    try {
      const all = JSON.parse(localStorage.getItem('ps-bookings') || '[]');
      all.push(booking); localStorage.setItem('ps-bookings', JSON.stringify(all));
    } catch (err) {}

    // Vista de éxito
    $('#bookingForm').closest('.section').classList.add('hidden');
    $('#stepper').classList.add('hidden');
    $('#successView').classList.remove('hidden');
    $('#successIcon').innerHTML = `<span style="width:40px;height:40px;display:block">${ICON.check}</span>`;
    $('#bookingCode').textContent = code;
    $('#successSummary').innerHTML = `
      <div class="summary-row"><span class="k">Servicios</span><span class="v">${booking.services.join(', ')}</span></div>
      <div class="summary-row"><span class="k">Vehículo</span><span class="v">${booking.vehicle} (${booking.matricula.toUpperCase()})</span></div>
      <div class="summary-row"><span class="k">Fecha y hora</span><span class="v">${formatDate(booking.date)} · ${booking.time} h</span></div>
      <div class="summary-row"><span class="k">A nombre de</span><span class="v">${booking.name}</span></div>
      <div class="summary-total"><span>Estimado</span><span class="v">${money(booking.total)}</span></div>`;
    window.PS.confetti();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // limpia error al escribir
  ['nombre', 'telefono', 'email', 'marca', 'modelo', 'matricula'].forEach(id => {
    const el = $('#' + id);
    el?.addEventListener('input', () => el.closest('.field').classList.remove('invalid'));
    el?.addEventListener('change', () => el.closest('.field').classList.remove('invalid'));
  });
  $('#rgpd').addEventListener('change', () => $('#rgpd').closest('.field').classList.remove('invalid'));

  showStep(1);
})();
