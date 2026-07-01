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
        <div class="product-media" style="background:linear-gradient(160deg, ${p.color}20, ${p.color}06);color:${p.color}">${ICON[p.icon]}</div>
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

  // Preselección de categoría por querystring
  const cat = new URLSearchParams(location.search).get('cat');
  if (cat && cats.includes(cat)) { const cb = $(`.catCheck[value="${cat}"]`); if (cb) { cb.checked = true; filters.cats = [cat]; } }

  apply();
})();
