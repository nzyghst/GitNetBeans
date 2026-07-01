/* ==========================================================================
   PitStop Express — Lógica compartida (UI, carrito, tema)
   ========================================================================== */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const money = (n) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  window.PS = window.PS || {};
  window.PS.money = money;

  const PAGES = [
    { href: 'index.html', label: 'Inicio' },
    { href: 'servicios.html', label: 'Servicios' },
    { href: 'reservas.html', label: 'Reservar' },
    { href: 'tienda.html', label: 'Tienda' },
    { href: 'ofertas.html', label: 'Ofertas' },
    { href: 'nosotros.html', label: 'Nosotros' },
    { href: 'blog.html', label: 'Blog' },
    { href: 'contacto.html', label: 'Contacto' },
  ];
  const current = location.pathname.split('/').pop() || 'index.html';

  /* ------------------------------ HEADER --------------------------------- */
  function renderHeader() {
    const host = $('#site-header');
    if (!host) return;
    const links = PAGES.map(p =>
      `<a href="${p.href}" class="${p.href === current ? 'active' : ''}">${p.label}</a>`
    ).join('');
    host.innerHTML = `
      <header class="site-header">
        <div class="container nav">
          <a href="index.html" class="brand" aria-label="PitStop Express - Inicio">
            ${brandLogo()}
            <span>PitStop <small>Servicio Rápido</small></span>
          </a>
          <nav class="nav-links" aria-label="Principal">${links}</nav>
          <div class="nav-actions">
            <button class="icon-btn" id="themeBtn" aria-label="Cambiar tema" title="Modo claro/oscuro">${window.ICON.moon}</button>
            <a class="icon-btn desktop-only" href="mis-reservas.html" id="accountBtn" aria-label="Mi cuenta" title="Mis reservas y pedidos">${window.ICON.user}</a>
            <button class="icon-btn" id="cartBtn" aria-label="Abrir carrito" title="Carrito">
              ${window.ICON.cart}<span class="cart-count" id="cartCount">0</span>
            </button>
            <a href="reservas.html" class="btn btn-primary btn-sm desktop-only">Pedir cita</a>
            <button class="icon-btn hamburger" id="hamburger" aria-label="Abrir menú">${window.ICON.menu}</button>
          </div>
        </div>
      </header>`;

    // Menú móvil
    const mm = document.createElement('div');
    mm.className = 'mobile-menu';
    mm.id = 'mobileMenu';
    mm.innerHTML = `
      <div class="mm-head">
        <a href="index.html" class="brand">${brandLogo()}<span>PitStop</span></a>
        <button class="icon-btn" id="mmClose" aria-label="Cerrar menú">${window.ICON.close}</button>
      </div>
      ${PAGES.map(p => `<a href="${p.href}" class="mm-link ${p.href === current ? 'active' : ''}">${p.label} ${window.ICON.arrow}</a>`).join('')}
      <a href="mis-reservas.html" class="mm-link ${current === 'mis-reservas.html' ? 'active' : ''}">Mi cuenta ${window.ICON.arrow}</a>
      <a href="reservas.html" class="btn btn-primary btn-lg" style="margin-top:24px">Pedir cita ahora</a>`;
    document.body.appendChild(mm);

    // Eventos header
    $('#themeBtn').addEventListener('click', toggleTheme);
    $('#cartBtn').addEventListener('click', () => openCart(true));
    $('#hamburger').addEventListener('click', () => mm.classList.add('open'));
    $('#mmClose').addEventListener('click', () => mm.classList.remove('open'));
    $$('.mm-link', mm).forEach(a => a.addEventListener('click', () => mm.classList.remove('open')));

    const header = $('.site-header');
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    syncThemeIcon();
  }

  function brandLogo() {
    return `<svg class="brand-logo" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#ff4d2e"/>
      <path d="M13 30l2.6-8A3 3 0 0 1 18.4 20h11.2a3 3 0 0 1 2.8 2l2.6 8v4h-3v-2H16v2h-3z" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="18" cy="33" r="1.8" fill="#fff"/><circle cx="30" cy="33" r="1.8" fill="#fff"/>
      <path d="M24 8l2 4h-4z" fill="#fff"/><path d="M24 12v5" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  }

  /* ------------------------------ FOOTER --------------------------------- */
  function renderFooter() {
    const host = $('#site-footer');
    if (!host) return;
    host.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="index.html" class="brand" style="color:#fff">${brandLogo()}<span>PitStop <small style="color:#8a94a6">Servicio Rápido</small></span></a>
              <p>Tu taller de confianza. Servicio rápido, precios cerrados y mecánicos certificados. Sin sorpresas.</p>
              <div class="footer-social">
                <a href="#" aria-label="Facebook">${window.ICON.fb}</a>
                <a href="#" aria-label="Instagram">${window.ICON.ig}</a>
                <a href="#" aria-label="X">${window.ICON.x}</a>
                <a href="#" aria-label="YouTube">${window.ICON.yt}</a>
              </div>
            </div>
            <div>
              <h4>Servicios</h4>
              <a href="servicios.html">Cambio de aceite</a>
              <a href="servicios.html">Neumáticos</a>
              <a href="servicios.html">Frenos</a>
              <a href="servicios.html">Diagnosis</a>
              <a href="servicios.html">Pre-ITV</a>
            </div>
            <div>
              <h4>Empresa</h4>
              <a href="nosotros.html">Sobre nosotros</a>
              <a href="blog.html">Blog</a>
              <a href="tienda.html">Tienda</a>
              <a href="mis-reservas.html">Mi cuenta</a>
              <a href="contacto.html">Contacto</a>
            </div>
            <div>
              <h4>Contacto</h4>
              <div class="footer-contact-item">${window.ICON.pin}<span>Av. de los Talleres 24<br>28020 Madrid</span></div>
              <div class="footer-contact-item">${window.ICON.phone}<a href="tel:+34910000000">+34 910 000 000</a></div>
              <div class="footer-contact-item">${window.ICON.mail}<a href="mailto:hola@pitstopexpress.es">hola@pitstopexpress.es</a></div>
              <div class="footer-contact-item">${window.ICON.clock}<span>L-V 8:00-20:00 · S 9:00-14:00</span></div>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} PitStop Express. Proyecto de demostración.</span>
            <span style="display:flex;gap:18px;flex-wrap:wrap">
              <a href="#">Aviso legal</a><a href="#">Privacidad</a><a href="#">Cookies</a>
            </span>
          </div>
        </div>
      </footer>`;
  }

  /* ------------------------------ TEMA ----------------------------------- */
  function toggleTheme() {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('ps-theme', next); } catch (e) {}
    syncThemeIcon();
  }
  function syncThemeIcon() {
    const btn = $('#themeBtn'); if (!btn) return;
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.innerHTML = dark ? window.ICON.sun : window.ICON.moon;
  }

  /* ------------------------------ CARRITO -------------------------------- */
  const CART_KEY = 'ps-cart';
  function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } }
  function saveCart(c) { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {} updateCartUI(); }
  function cartCount() { return getCart().reduce((s, i) => s + i.qty, 0); }
  function cartTotal() { return getCart().reduce((s, i) => s + i.price * i.qty, 0); }

  function addToCart(id, qty = 1) {
    const p = window.PRODUCTS.find(x => x.id === id); if (!p) return;
    const cart = getCart();
    const line = cart.find(i => i.id === id);
    if (line) line.qty += qty; else cart.push({ id, name: p.name, price: p.price, icon: p.icon, color: p.color, qty });
    saveCart(cart);
    toast(`${p.name.split('·')[0].trim()} añadido al carrito`);
    bumpCart();
  }
  function setQty(id, qty) {
    let cart = getCart();
    const line = cart.find(i => i.id === id); if (!line) return;
    line.qty = qty;
    if (line.qty <= 0) cart = cart.filter(i => i.id !== id);
    saveCart(cart);
  }
  function removeFromCart(id) { saveCart(getCart().filter(i => i.id !== id)); }
  function clearCart() { saveCart([]); }

  window.PS.cart = { get: getCart, add: addToCart, setQty, remove: removeFromCart, clear: clearCart, count: cartCount, total: cartTotal, open: openCart };

  function bumpCart() {
    const c = $('#cartCount'); if (!c) return;
    c.animate([{ transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 300, easing: 'ease' });
  }

  function updateCartUI() {
    const n = cartCount();
    const badge = $('#cartCount');
    if (badge) { badge.textContent = n; badge.classList.toggle('show', n > 0); }
    renderDrawer();
    // Actualiza cualquier contador de página (carrito.html)
    document.dispatchEvent(new CustomEvent('cart:change'));
  }

  /* Drawer del carrito */
  function ensureDrawer() {
    if ($('#cartDrawer')) return;
    const overlay = document.createElement('div');
    overlay.className = 'drawer-overlay'; overlay.id = 'drawerOverlay';
    const drawer = document.createElement('aside');
    drawer.className = 'cart-drawer'; drawer.id = 'cartDrawer';
    drawer.setAttribute('aria-label', 'Carrito de compra');
    drawer.innerHTML = `
      <div class="cart-head">
        <h3>Tu carrito</h3>
        <button class="icon-btn" id="cartClose" aria-label="Cerrar carrito">${window.ICON.close}</button>
      </div>
      <div class="cart-items" id="cartItems"></div>
      <div class="cart-foot" id="cartFoot"></div>`;
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    overlay.addEventListener('click', () => openCart(false));
    $('#cartClose').addEventListener('click', () => openCart(false));
  }

  function openCart(show) {
    ensureDrawer();
    $('#cartDrawer').classList.toggle('open', show);
    $('#drawerOverlay').classList.toggle('open', show);
    document.body.style.overflow = show ? 'hidden' : '';
    if (show) { renderDrawer(); $('#cartClose')?.focus(); }
    else $('#cartBtn')?.focus();
  }

  function renderDrawer() {
    const items = $('#cartItems'); const foot = $('#cartFoot');
    if (!items || !foot) return;
    const cart = getCart();
    if (!cart.length) {
      items.innerHTML = `<div class="cart-empty">${window.ICON.cart}<p>Tu carrito está vacío.</p>
        <a href="tienda.html" class="btn btn-primary" style="margin-top:16px" onclick="PS.cart.open(false)">Ir a la tienda</a></div>`;
      foot.innerHTML = '';
      return;
    }
    items.innerHTML = cart.map(i => `
      <div class="cart-item">
        <div class="cart-item-media" style="color:${i.color}">${window.ICON[i.icon] || window.ICON.wrench}</div>
        <div>
          <h4>${i.name}</h4>
          <div class="ci-price">${money(i.price)}</div>
          <div class="qty">
            <button aria-label="Restar" data-dec="${i.id}">−</button>
            <span>${i.qty}</span>
            <button aria-label="Sumar" data-inc="${i.id}">+</button>
          </div>
        </div>
        <div style="text-align:right;display:flex;flex-direction:column;gap:8px;align-items:flex-end">
          <strong>${money(i.price * i.qty)}</strong>
          <button class="ci-remove" data-rm="${i.id}">Quitar</button>
        </div>
      </div>`).join('');
    const total = cartTotal();
    const envio = total >= 60 || total === 0 ? 0 : 4.9;
    foot.innerHTML = `
      <div class="summary-row"><span class="k">Subtotal</span><span class="v">${money(total)}</span></div>
      <div class="summary-row"><span class="k">Envío ${envio === 0 ? '<span class="pill pill-ok">Gratis</span>' : ''}</span><span class="v">${money(envio)}</span></div>
      <div class="summary-total"><span>Total</span><span class="v">${money(total + envio)}</span></div>
      <a href="carrito.html" class="btn btn-primary btn-block btn-lg" style="margin-top:16px">Tramitar pedido</a>
      <button class="btn btn-ghost btn-block" style="margin-top:10px" id="drawerContinue">Seguir comprando</button>`;

    $$('[data-inc]', items).forEach(b => b.addEventListener('click', () => setQty(b.dataset.inc, (getCart().find(i => i.id === b.dataset.inc)?.qty || 0) + 1)));
    $$('[data-dec]', items).forEach(b => b.addEventListener('click', () => setQty(b.dataset.dec, (getCart().find(i => i.id === b.dataset.dec)?.qty || 0) - 1)));
    $$('[data-rm]', items).forEach(b => b.addEventListener('click', () => removeFromCart(b.dataset.rm)));
    $('#drawerContinue')?.addEventListener('click', () => openCart(false));
  }

  /* ------------------------------ TOAST ---------------------------------- */
  let toastWrap;
  function toast(msg, icon = window.ICON.check) {
    if (!toastWrap) { toastWrap = document.createElement('div'); toastWrap.className = 'toast-wrap'; document.body.appendChild(toastWrap); }
    const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = `${icon}<span>${msg}</span>`;
    toastWrap.appendChild(t);
    setTimeout(() => { t.style.transition = 'opacity .3s, transform .3s'; t.style.opacity = '0'; t.style.transform = 'translateY(10px)'; setTimeout(() => t.remove(), 300); }, 2600);
  }
  window.PS.toast = toast;

  /* ------------------------------ REVEAL --------------------------------- */
  function initReveal() {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(e => io.observe(e));
  }

  /* Contadores animados */
  window.PS.animateCounters = function () {
    $$('[data-count]').forEach(el => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const io = new IntersectionObserver((ents) => {
        ents.forEach(ent => {
          if (!ent.isIntersecting) return;
          io.disconnect();
          let start = 0; const dur = 1400; const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min((now - t0) / dur, 1);
            const val = target * (1 - Math.pow(1 - p, 3));
            el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      }, { threshold: 0.5 });
      io.observe(el);
    });
  };

  /* ------------------------------ FABs ----------------------------------- */
  function initFabs() {
    const stack = document.createElement('div');
    stack.className = 'fab-stack';
    stack.innerHTML = `
      <button class="fab fab-top" id="fabTop" aria-label="Subir arriba">${window.ICON.chevron.replace('9l6 6 6-6', '15l6-6 6 6')}</button>
      <a class="fab fab-wa" href="https://wa.me/34910000000?text=Hola%2C%20quiero%20informaci%C3%B3n" target="_blank" rel="noopener" aria-label="WhatsApp">${window.ICON.wa}</a>`;
    document.body.appendChild(stack);
    const top = $('#fabTop');
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => top.classList.toggle('show', window.scrollY > 500), { passive: true });
  }

  /* ------------------------------ Cookies -------------------------------- */
  function initCookies() {
    let ok = false; try { ok = localStorage.getItem('ps-cookies') === '1'; } catch (e) {}
    if (ok) return;
    const c = document.createElement('div');
    c.className = 'cookie';
    c.innerHTML = `
      <p>🍪 Usamos cookies para mejorar tu experiencia y recordar tu carrito. Al continuar, aceptas nuestra política.</p>
      <div class="cookie-actions">
        <button class="btn btn-primary btn-sm" id="ckOk">Aceptar</button>
        <button class="btn btn-ghost btn-sm" id="ckNo">Solo esenciales</button>
      </div>`;
    document.body.appendChild(c);
    setTimeout(() => c.classList.add('show'), 900);
    const close = () => { try { localStorage.setItem('ps-cookies', '1'); } catch (e) {} c.classList.remove('show'); setTimeout(() => c.remove(), 400); };
    $('#ckOk').addEventListener('click', close);
    $('#ckNo').addEventListener('click', close);
  }

  /* Utilidad confeti (usada en reservas/checkout) */
  window.PS.confetti = function () {
    const canvas = document.createElement('canvas');
    canvas.className = 'confetti'; document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    resize();
    const colors = ['#ff4d2e', '#00b4d8', '#16a34a', '#f59e0b', '#7c3aed'];
    const parts = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width, y: -20 - Math.random() * canvas.height * 0.4,
      r: 4 + Math.random() * 6, c: colors[Math.floor(Math.random() * colors.length)],
      vy: 2 + Math.random() * 4, vx: -2 + Math.random() * 4, rot: Math.random() * 6, vr: -0.2 + Math.random() * 0.4,
    }));
    let frames = 0;
    (function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6); ctx.restore();
      });
      frames++;
      if (frames < 200) requestAnimationFrame(loop); else canvas.remove();
    })();
  };

  /* ------------------------------ Modal genérico ------------------------- */
  window.PS.modal = function (html, opts = {}) {
    const wrap = document.createElement('div');
    wrap.className = 'drawer-overlay open';
    wrap.style.cssText = 'z-index:100;display:grid;place-items:center;padding:20px';
    const box = document.createElement('div');
    box.className = 'card';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.style.cssText = `max-width:${opts.width || 560}px;width:100%;max-height:90dvh;overflow:auto;animation:fadeUp .3s var(--ease)`;
    box.innerHTML = html;
    wrap.appendChild(box);
    document.body.appendChild(wrap);
    document.body.style.overflow = 'hidden';
    const close = () => { wrap.remove(); document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    wrap.addEventListener('click', (e) => { if (e.target === wrap) close(); });
    box.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
    setTimeout(() => box.querySelector('[autofocus], button, a, input')?.focus(), 30);
    return { close, box };
  };

  /* ------------------------------ Tecla Escape --------------------------- */
  function initKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if ($('#cartDrawer')?.classList.contains('open')) openCart(false);
      const mm = $('#mobileMenu');
      if (mm?.classList.contains('open')) mm.classList.remove('open');
    });
  }

  /* ------------------------------ PWA ------------------------------------ */
  function initPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
    }
    let deferred;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault(); deferred = e;
      let dismissed = false; try { dismissed = localStorage.getItem('ps-pwa') === '1'; } catch (err) {}
      if (dismissed) return;
      const bar = document.createElement('div');
      bar.className = 'cookie show';
      bar.style.bottom = '90px';
      bar.innerHTML = `<p>📲 Instala PitStop Express en tu dispositivo para acceder más rápido, incluso sin conexión.</p>
        <div class="cookie-actions"><button class="btn btn-primary btn-sm" id="pwaInstall">Instalar app</button>
        <button class="btn btn-ghost btn-sm" id="pwaNo">Ahora no</button></div>`;
      document.body.appendChild(bar);
      $('#pwaInstall').addEventListener('click', async () => { bar.remove(); deferred.prompt(); await deferred.userChoice; try { localStorage.setItem('ps-pwa', '1'); } catch (err) {} });
      $('#pwaNo').addEventListener('click', () => { bar.remove(); try { localStorage.setItem('ps-pwa', '1'); } catch (err) {} });
    });
  }

  /* ------------------------------ Init ----------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    ensureDrawer();
    updateCartUI();
    initReveal();
    initFabs();
    initCookies();
    initKeyboard();
    initPWA();
  });
})();
