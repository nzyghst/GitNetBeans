# Muestras de páginas web — Negocios locales de Tenerife

Colección de **ocho páginas web de demostración** para negocios locales, pensadas
como muestra comercial y organizadas por sector. Todos los nombres, teléfonos,
direcciones y datos son **ficticios** y no corresponden a ningún establecimiento real.

## Demos incluidas

### 🍽️ Hostelería y restauración
| Demo | Carpeta | Estilo |
|------|---------|--------|
| **Brisa del Mar** (multipágina: inicio + carta + contacto) | [`/restaurante-brisa`](./restaurante-brisa/) | Mediterráneo azul, formulario de reserva, FAQ |
| **Guachinche El Lagar** | [`/guachinche`](./guachinche/) | Menú rústico estilo carta impresa |
| **Marea Café & Brunch** | [`/cafe-brunch`](./cafe-brunch/) | Cálido, luminoso, carta y galería |
| **Kaiyo Sushi Bar** | [`/sushi-bar`](./sushi-bar/) | Japonés minimalista, pedidos por WhatsApp |

### 💈 Barbería y belleza
| Demo | Carpeta | Estilo |
|------|---------|--------|
| **Estudio 27 Barber Club** | [`/barberia`](./barberia/) | Oscuro, elegante, reservas por WhatsApp |
| **Alma Studio** (peluquería y estética) | [`/salon-belleza`](./salon-belleza/) | Rosa empolvado, elegante, precios |

### 🔧 Automoción
| Demo | Carpeta | Estilo |
|------|---------|--------|
| **Taller Atlántico Motor** | [`/taller`](./taller/) | Profesional, tarifas y formulario de presupuesto |

### 🩺 Salud y bienestar
| Demo | Carpeta | Estilo |
|------|---------|--------|
| **Fisio Atlante** (fisioterapia) | [`/fisioterapia`](./fisioterapia/) | Sanitario limpio, bonos y citas |

La página `index.html` es un portfolio que enlaza todas las demos, agrupadas por sector.

## Características comunes

- **HTML + CSS puro**, sin dependencias ni proceso de build (solo fuentes de Google Fonts).
- **100% responsive** (móvil, tablet y escritorio).
- **Botón flotante de WhatsApp** con mensaje pre-rellenado en cada web.
- Iconos e ilustraciones en **SVG en línea** (sin imágenes externas que se rompan).
- Ligeras y rápidas: cada página de una sola página es un archivo autónomo;
  la multipágina (`restaurante-brisa`) comparte un `styles.css`.

## Cómo verlas en local

Basta con abrir `index.html` en el navegador, o levantar un servidor estático:

```bash
cd sitios-web
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Despliegue

Sitio estático; el `publish` de Netlify apunta a esta carpeta (ver `netlify.toml`).
En vivo: https://muestras-web-tenerife.netlify.app

---

> Estas webs son ejemplos de muestra con fines de demostración de producto.
