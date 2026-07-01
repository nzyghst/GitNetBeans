# Muestras de páginas web — Negocios locales de Tenerife

Colección de **cuatro páginas web de demostración** para negocios locales, pensadas
como muestra comercial. Todos los nombres, teléfonos, direcciones y datos son
**ficticios** y no corresponden a ningún establecimiento real.

## Demos incluidas

| Demo | Sector | Carpeta | Estilo |
|------|--------|---------|--------|
| **Estudio 27 Barber Club** | Barbería (La Laguna) | [`/barberia`](./barberia/) | Oscuro, elegante, reservas por WhatsApp |
| **Marea Café & Brunch** | Cafetería (Los Cristianos) | [`/cafe-brunch`](./cafe-brunch/) | Cálido, luminoso, carta y galería |
| **Taller Atlántico Motor** | Taller mecánico (Santa Cruz) | [`/taller`](./taller/) | Profesional, tarifas y formulario de presupuesto |
| **Guachinche El Lagar** | Restaurante canario (Norte) | [`/guachinche`](./guachinche/) | Menú rústico estilo carta impresa |

La página `index.html` es un portfolio que enlaza las cuatro demos.

## Características comunes

- **HTML + CSS puro**, sin dependencias ni proceso de build (solo fuentes de Google Fonts).
- **100% responsive** (móvil, tablet y escritorio).
- **Botón flotante de WhatsApp** con mensaje pre-rellenado en cada web.
- Iconos e ilustraciones en **SVG en línea** (sin imágenes externas que se rompan).
- Ligeras y rápidas: cada página es un único archivo autónomo.

## Cómo verlas en local

Basta con abrir `index.html` en el navegador, o levantar un servidor estático:

```bash
cd sitios-web
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Despliegue

Sitio estático; el `publish` de Netlify apunta a esta carpeta (ver `netlify.toml`).

---

> Estas webs son ejemplos de muestra con fines de demostración de producto.
