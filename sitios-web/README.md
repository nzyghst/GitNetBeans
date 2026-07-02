# Muestras de páginas web — Negocios locales de Tenerife

Colección de **diez páginas web de demostración** para negocios locales, pensadas
como muestra comercial y organizadas por sector. Todos los nombres, teléfonos,
direcciones y datos son **ficticios** y no corresponden a ningún establecimiento real.

## Estructura del portfolio

- `index.html` — **hub principal**: tarjetas de sector, sin demos mezcladas.
- `hosteleria.html`, `belleza.html`, `automocion.html`, `salud.html`, `oficios.html` —
  páginas de sector, cada una con sus demos. Comparten `portfolio.css`.

## Demos incluidas

### 🍽️ Hostelería y restauración (`hosteleria.html`)
| Demo | Carpeta | Estilo |
|------|---------|--------|
| **Brisa del Mar** (multipágina: inicio + carta + contacto) | [`/restaurante-brisa`](./restaurante-brisa/) | Mediterráneo azul, formulario de reserva, FAQ |
| **Guachinche El Lagar** | [`/guachinche`](./guachinche/) | Menú rústico estilo carta impresa |
| **Bar La Esquina** ★ clásica | [`/bar-tapas`](./bar-tapas/) | Bar de toda la vida: sobrio, letra grande, teléfono a la vista |
| **Marea Café & Brunch** | [`/cafe-brunch`](./cafe-brunch/) | Cálido, luminoso, carta y galería |
| **Kaiyo Sushi Bar** | [`/sushi-bar`](./sushi-bar/) | Japonés minimalista, pedidos por WhatsApp |

### 💈 Barbería y belleza (`belleza.html`)
| Demo | Carpeta | Estilo |
|------|---------|--------|
| **Estudio 27 Barber Club** | [`/barberia`](./barberia/) | Oscuro, elegante, reservas por WhatsApp |
| **Alma Studio** (peluquería y estética) | [`/salon-belleza`](./salon-belleza/) | Rosa empolvado, elegante, precios |

### 🔧 Automoción (`automocion.html`)
| Demo | Carpeta | Estilo |
|------|---------|--------|
| **Taller Atlántico Motor** | [`/taller`](./taller/) | Profesional, tarifas y formulario de presupuesto |

### 🩺 Salud y bienestar (`salud.html`)
| Demo | Carpeta | Estilo |
|------|---------|--------|
| **Fisio Atlante** (fisioterapia) | [`/fisioterapia`](./fisioterapia/) | Sanitario limpio, bonos y citas |

### 🔨 Oficios y hogar (`oficios.html`)
| Demo | Carpeta | Estilo |
|------|---------|--------|
| **Carpintería El Drago** ★ rústica | [`/carpinteria`](./carpinteria/) | Tonos madera, clásica, trato de usted, teléfono grande |

★ Las demos "clásicas" (`bar-tapas`, `carpinteria`) están pensadas para el cliente
tradicional: tipografía serif grande, alto contraste, trato de usted, sin animaciones
llamativas y con el teléfono como vía de contacto principal.

## Características comunes

- **HTML + CSS puro**, sin dependencias ni proceso de build (solo fuentes de Google Fonts).
- **100% responsive** (móvil, tablet y escritorio).
- **Botón flotante de WhatsApp** con mensaje pre-rellenado en cada web.
- Iconos e ilustraciones en **SVG/emoji** (sin imágenes externas que se rompan).
- Cada demo de una sola página es un archivo autónomo; la multipágina
  (`restaurante-brisa`) comparte un `styles.css` propio.

## Cómo verlas en local

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
