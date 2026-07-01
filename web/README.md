# PitStop Express — Taller de servicio rápido

Sitio web completo para un taller de coches de servicio rápido. Hecho con **HTML, CSS y JavaScript vanilla** (sin dependencias ni paso de build): basta con abrir `index.html` o servir la carpeta con cualquier servidor estático.

## ✨ Características

- **7 páginas** interconectadas con cabecera/pie compartidos, navegación activa y diseño responsive.
- **Reserva de cita online** (`reservas.html`): asistente de 4 pasos (servicio → vehículo → fecha/hora → datos) con validación, calendario con huecos disponibles, resumen en vivo, código de confirmación y animación de confeti. Las reservas se guardan en `localStorage`.
- **Tienda del taller** (`tienda.html`): 16 productos con búsqueda, filtros por categoría/precio/stock/oferta, orden, favoritos y añadir al carrito.
- **Carrito y checkout** (`carrito.html` + panel lateral): cantidades, cupones (`PITSTOP15`, `BIENVENIDA`), opciones de envío, totales con IVA y finalización de pedido. Persistencia en `localStorage`.
- **Servicios y precios** (`servicios.html`): catálogo filtrable + tabla de tarifas detallada.
- **Nosotros** (`nosotros.html`): historia, valores, línea temporal, equipo y contadores animados.
- **Blog** (`blog.html`): rejilla de artículos de consejos + newsletter.
- **Contacto** (`contacto.html`): formulario validado, datos, mapa embebido y FAQ tipo acordeón.
- **Extras de UX**: modo claro/oscuro persistente, menú móvil, animaciones al hacer scroll, toasts, botón flotante de WhatsApp, "volver arriba" y banner de cookies.

## 📁 Estructura

```
web/
├── index.html            # Inicio
├── servicios.html        # Servicios y precios
├── reservas.html         # Reserva de cita (wizard)
├── tienda.html           # Tienda
├── carrito.html          # Carrito / checkout
├── nosotros.html         # Sobre nosotros
├── blog.html             # Blog / consejos
├── contacto.html         # Contacto + FAQ
├── css/styles.css        # Sistema de diseño (tokens, componentes, responsive)
├── js/
│   ├── data.js           # Datos: servicios, productos, iconos SVG
│   ├── main.js           # UI compartida: header, footer, carrito, tema, toasts
│   ├── home.js           # Lógica de la home
│   ├── reservas.js       # Asistente de reservas
│   └── tienda.js         # Filtros y catálogo de la tienda
└── assets/favicon.svg
```

## 🚀 Cómo verlo en local

```bash
cd web
python3 -m http.server 8000
# abre http://localhost:8000
```

> Nota: los datos (reservas, pedidos, carrito, favoritos, tema) se guardan en el navegador con `localStorage`. Es una demo de front-end; no hay backend real.
