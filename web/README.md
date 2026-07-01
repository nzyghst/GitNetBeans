# PitStop Express — Taller de servicio rápido

Sitio web completo para un taller de coches de servicio rápido. Hecho con **HTML, CSS y JavaScript vanilla** (sin dependencias ni paso de build): basta con abrir `index.html` o servir la carpeta con cualquier servidor estático.

## ✨ Características

- **11 páginas** interconectadas con cabecera/pie compartidos, navegación activa y diseño responsive.
- **Reserva de cita online** (`reservas.html`): asistente de 4 pasos (servicio → vehículo → fecha/hora → datos) con validación, calendario con huecos disponibles, resumen en vivo, código de confirmación y animación de confeti. Las reservas se guardan en `localStorage`.
- **Tienda del taller** (`tienda.html`): 16 productos con búsqueda, filtros por categoría/precio/stock/oferta, orden, favoritos, **vista rápida (modal)** y añadir al carrito.
- **Carrito y checkout** (`carrito.html` + panel lateral): cantidades, cupones (`PITSTOP15`, `BIENVENIDA`), opciones de envío, totales con IVA y finalización de pedido. Persistencia en `localStorage`.
- **Ofertas** (`ofertas.html`): oferta del mes con **cuenta atrás**, cupones copiables, packs ahorro y productos rebajados.
- **Mi cuenta** (`mis-reservas.html`): panel personal con tus citas, pedidos y favoritos leídos de `localStorage`, con cancelación de citas.
- **Servicios y precios** (`servicios.html`): catálogo filtrable + tabla de tarifas detallada.
- **Nosotros** (`nosotros.html`): historia, valores, línea temporal, equipo y contadores animados.
- **Blog** (`blog.html`): rejilla de artículos de consejos + newsletter.
- **Contacto** (`contacto.html`): formulario validado, datos, mapa embebido y FAQ tipo acordeón.
- **PWA instalable**: `manifest.webmanifest` + service worker (`sw.js`) con **modo offline** (`offline.html`) y aviso de instalación.
- **SEO/redes**: metaetiquetas Open Graph y Twitter Card + imagen social, `canonical`, datos estructurados JSON-LD (AutoRepair), `robots.txt`, `sitemap.xml` y página **404** personalizada.
- **Accesibilidad**: enlace "saltar al contenido", navegación por teclado (selección de servicios, vista rápida), cierre de modales con `Escape` y foco gestionado.
- **Extras de UX**: modo claro/oscuro persistente, menú móvil, animaciones al hacer scroll, toasts, botón flotante de WhatsApp, "volver arriba" y banner de cookies.

## 📁 Estructura

```
web/
├── index.html            # Inicio (+ JSON-LD)
├── servicios.html        # Servicios y precios
├── reservas.html         # Reserva de cita (wizard)
├── tienda.html           # Tienda (+ vista rápida)
├── carrito.html          # Carrito / checkout
├── ofertas.html          # Ofertas, cupones y packs
├── mis-reservas.html     # Mi cuenta (citas, pedidos, favoritos)
├── nosotros.html         # Sobre nosotros
├── blog.html             # Blog / consejos
├── contacto.html         # Contacto + FAQ
├── 404.html              # Página no encontrada
├── offline.html          # Página sin conexión (PWA)
├── manifest.webmanifest  # Manifiesto PWA
├── sw.js                 # Service worker (offline)
├── robots.txt · sitemap.xml
├── css/styles.css        # Sistema de diseño (tokens, componentes, responsive)
├── js/
│   ├── data.js           # Datos: servicios, productos, iconos SVG
│   ├── main.js           # UI compartida: header, footer, carrito, tema, modal, PWA
│   ├── home.js           # Lógica de la home
│   ├── reservas.js       # Asistente de reservas
│   └── tienda.js         # Filtros, vista rápida y catálogo
└── assets/               # favicon, iconos PWA (192/512/maskable), apple-touch, og-image
```

## 🚀 Cómo verlo en local

```bash
cd web
python3 -m http.server 8000
# abre http://localhost:8000
```

> Nota: los datos (reservas, pedidos, carrito, favoritos, tema) se guardan en el navegador con `localStorage`. Es una demo de front-end; no hay backend real.
