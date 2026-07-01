/* ==========================================================================
   PitStop Express — Tienda (filtros, orden, favoritos, añadir al carrito)
   ========================================================================== */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ICON = window.ICON, money = window.PS.money;
  const P = window.PRODUCTS;

  // Cabecera de garantías tienda
  const ic = (svg) => `<span style="width:18px;height:18px;display:inline-block;color:var(--brand);flex:none">${svg}</span>`;
  const shBase = 'display:inline-flex;align-items:center;gap:8px';
  $('#sh1').style.cssText = shBase; $('#sh1').innerHTML = `${ic(ICON.truck)} Envío gratis desde 60 €`;
  $('#sh2').style.cssText = shBase; $('#sh2').innerHTML = `${ic(ICON.shield)} Devolución en 30 días`;
  $('#sh3').style.cssText = shBase; $('#sh3').innerHTML = `${ic(ICON.medal)} Recambios homologados`;

  const maxPrice = Math.ceil(Math.max(...P.map(p => p.price)));
  const range = $('#priceRange'); range.max = maxPrice; range.value = maxPrice;
  $('#priceLabel').textContent = money(maxPrice);

  const cats = [...new Set(P.map(p => p.cat))].sort();
  $('#catFilters').innerHTML = cats.map(c => `
    <label class="filter-opt"><input type="checkbox" value="${c}" class="catCheck">
      <span>${c}</span><span class="count">${P.filter(p => p.cat === c).length}</span></label>`).join('');

  let favs = [];
  try { favs = JSON.parse(localStorage.getItem('ps-favs') || '[]'); } catch (e) {}

  const filters = { search: '', cats: [], price: maxPrice, stock: false, offers: false, sort: 'pop' };

  function apply() {
    let list = P.filter(p => {
      if (filters.search && !(`${p.name} ${p.cat} ${p.desc}`.toLowerCase().includes(filters.search))) return false;
      if (filters.cats.length && !filters.cats.includes(p.cat)) return false;
      if (p.price > filters.price) return false;
      if (filters.stock && !p.stock) return false;
      if (filters.offers && !p.old) return false;
      return true;
    });
    const pop = { hot: 3, off: 2, new: 1, '': 0 };
    if (filters.sort === 'priceAsc') list.sort((a, b) => a.price - b.price);
    else if (filters.sort === 'priceDesc') list.sort((a, b) => b.price - a.price);
    else if (filters.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => (pop[b.tag] - pop[a.tag]) || b.reviews - a.reviews);
    render(list);
  }

  function tagHtml(tag) {
    if (tag === 'hot') return '<span class="product-tag pill tag-hot">🔥 Top ventas</span>';
    if (tag === 'off') return '<span class="product-tag pill tag-off">% Oferta</span>';
    if (tag === 'new') return '<span class="product-tag pill tag-new">Nuevo</span>';
    return '';
  }

  function render(list) {
    const grid = $('#productGrid');
    $('#countTxt').textContent = `${list.length} producto${list.length !== 1 ? 's' : ''}`;
    $('#emptyState').classList.toggle('hidden', list.length > 0);
    grid.innerHTML = list.map(p => `
      <article class="card card-hover product">
        ${tagHtml(p.tag)}
        <button class="product-fav ${favs.includes(p.id) ? 'on' : ''}" data-fav="${p.id}" aria-label="Favorito">${ICON.heart}</button>
        <div class="product-media" style="background:linear-gradient(160deg, ${p.color}20, ${p.color}06);color:${p.color};cursor:pointer" data-view="${p.id}" role="button" tabindex="0" aria-label="Vista rápida de ${p.name}">${ICON[p.icon]}</div>
        <div class="product-body">
          <span class="product-cat">${p.cat}</span>
          <h3>${p.name}</h3>
          <div class="product-rating"><span class="stars" style="color:#f5a623">${ICON.star}</span> ${p.rating} <span>(${p.reviews})</span>
            ${p.stock ? '<span class="pill pill-ok" style="margin-left:auto">En stock</span>' : '<span class="pill" style="margin-left:auto;color:var(--danger)">Agotado</span>'}
          </div>
          <p class="text-muted" style="font-size:.86rem;margin-bottom:12px">${p.desc}</p>
          <div class="product-foot">
            <div class="product-price">${p.old ? `<span class="old">${money(p.old)}</span>` : ''}${money(p.price)}</div>
            <button class="btn btn-primary btn-sm" data-add="${p.id}" ${p.stock ? '' : 'disabled'}>${p.stock ? 'Añadir' : 'Avísame'}</button>
          </div>
        </div>
      </article>`).join('');

    $$('[data-add]', grid).forEach(b => b.addEventListener('click', () => window.PS.cart.add(b.dataset.add)));
    $$('[data-fav]', grid).forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.fav;
      if (favs.includes(id)) favs = favs.filter(x => x !== id); else favs.push(id);
      try { localStorage.setItem('ps-favs', JSON.stringify(favs)); } catch (e) {}
      b.classList.toggle('on');
    }));
    $$('[data-view]', grid).forEach(el => {
      const open = () => quickView(el.dataset.view);
      el.addEventListener('click', open);
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  }

  function quickView(id) {
    const p = P.find(x => x.id === id); if (!p) return;
    let qty = 1;
    const disc = p.old ? `-${Math.round((1 - p.price / p.old) * 100)}%` : '';
    const m = window.PS.modal(`
      <div class="qv-grid">
        <div style="background:linear-gradient(160deg, ${p.color}22, ${p.color}08);color:${p.color};display:grid;place-items:center;padding:40px;min-height:260px">
          <div style="width:120px;height:120px">${ICON[p.icon]}</div>
        </div>
        <div class="card-body">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
            <span class="product-cat">${p.cat}</span>
            <button class="icon-btn" data-close aria-label="Cerrar">${ICON.close}</button>
          </div>
          <h3 style="font-size:1.3rem;margin:6px 0 8px">${p.name}</h3>
          <div class="product-rating" style="margin-bottom:10px"><span class="stars" style="color:#f5a623">${ICON.star}</span> ${p.rating} <span>(${p.reviews} opiniones)</span></div>
          <p class="text-muted" style="font-size:.92rem;margin-bottom:14px">${p.desc}</p>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
            <div class="product-price" style="font-size:1.6rem">${p.old ? `<span class="old" style="text-decoration:line-through;color:var(--muted);font-size:.9rem;margin-right:6px">${money(p.old)}</span>` : ''}${money(p.price)}</div>
            ${disc ? `<span class="pill tag-off">${disc}</span>` : ''}
            ${p.stock ? '<span class="pill pill-ok">En stock</span>' : '<span class="pill" style="color:var(--danger)">Agotado</span>'}
          </div>
          <div style="display:flex;gap:12px;align-items:center">
            <div class="qty"><button id="qvDec" aria-label="Restar">−</button><span id="qvQty">1</span><button id="qvInc" aria-label="Sumar">+</button></div>
            <button class="btn btn-primary" id="qvAdd" ${p.stock ? '' : 'disabled'} style="flex:1">${p.stock ? 'Añadir al carrito' : 'No disponible'}</button>
          </div>
          <p class="text-muted" style="font-size:.8rem;margin-top:14px;display:flex;gap:8px;align-items:center"><span style="width:16px;height:16px;display:inline-block;color:var(--brand)">${ICON.truck}</span> Envío en 24-48h · Devolución en 30 días</p>
        </div>
      </div>`, { width: 720 });
    const box = m.box;
    box.querySelector('#qvInc').addEventListener('click', () => { qty++; box.querySelector('#qvQty').textContent = qty; });
    box.querySelector('#qvDec').addEventListener('click', () => { if (qty > 1) { qty--; box.querySelector('#qvQty').textContent = qty; } });
    box.querySelector('#qvAdd').addEventListener('click', () => { if (p.stock) { window.PS.cart.add(p.id, qty); m.close(); } });
  }

  // Eventos filtros
  let searchT;
  $('#searchBox').addEventListener('input', (e) => { clearTimeout(searchT); searchT = setTimeout(() => { filters.search = e.target.value.toLowerCase().trim(); apply(); }, 180); });
  $$('.catCheck').forEach(cb => cb.addEventListener('change', () => { filters.cats = $$('.catCheck:checked').map(c => c.value); apply(); }));
  range.addEventListener('input', () => { filters.price = +range.value; $('#priceLabel').textContent = money(+range.value); apply(); });
  $('#onlyStock').addEventListener('change', (e) => { filters.stock = e.target.checked; apply(); });
  $('#onlyOffers').addEventListener('change', (e) => { filters.offers = e.target.checked; apply(); });
  $('#sortBy').addEventListener('change', (e) => { filters.sort = e.target.value; apply(); });

  function reset() {
    filters.search = ''; filters.cats = []; filters.price = maxPrice; filters.stock = false; filters.offers = false;
    $('#searchBox').value = ''; $$('.catCheck').forEach(c => c.checked = false);
    range.value = maxPrice; $('#priceLabel').textContent = money(maxPrice);
    $('#onlyStock').checked = false; $('#onlyOffers').checked = false;
    apply();
  }
  $('#clearFilters').addEventListener('click', reset);
  $('#resetEmpty').addEventListener('click', reset);

  // Preselección por querystring
  const qs = new URLSearchParams(location.search);
  const cat = qs.get('cat');
  if (cat && cats.includes(cat)) { const cb = $(`.catCheck[value="${cat}"]`); if (cb) { cb.checked = true; filters.cats = [cat]; } }
  if (qs.get('oferta')) { $('#onlyOffers').checked = true; filters.offers = true; }

  apply();
})();
