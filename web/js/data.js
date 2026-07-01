/* ==========================================================================
   PitStop Express — Datos (servicios, productos, iconos)
   ========================================================================== */

/* ------------------------------ Iconos SVG ------------------------------- */
const ICON = {
  wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.7-.7-.7-2.7 2.4-2.2z"/></svg>',
  oil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h11l3-3h4v6a3 3 0 0 1-3 3H8l-5-3z"/><path d="M6 9V6a2 2 0 0 1 2-2h3"/><path d="M11 4l4 3"/></svg>',
  tire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.4"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/></svg>',
  brake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.6"/><path d="M12 3v4.4M12 16.6V21M3 12h4.4M16.6 12H21"/></svg>',
  battery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="16" height="10" rx="2"/><path d="M19 10h2v4h-2"/><path d="M8 10v4M6 12h4M14 12h2"/></svg>',
  ac: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M12 6l3-2M12 6l-3-2M12 18l3 2M12 18l-3 2M2 12h20M6 12l-2 3M6 12l-2-3M18 12l2 3M18 12l2-3"/></svg>',
  diag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2 6 4-14 2 8h6"/></svg>',
  car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13l2-5a3 3 0 0 1 2.8-2h8.4A3 3 0 0 1 19 8l2 5v5h-3v-2H6v2H3z"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3 3 7 3s7-1.3 7-3v-6"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3h4v5h-4z"/><path d="M12 8v4M10 12h4l-1 4h-2z"/><path d="M12 16v5"/></svg>',
  wiper: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18h16"/><path d="M6 18L14 5"/><path d="M6 18l10-4"/></svg>',
  coolant: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s5 5.5 5 10a5 5 0 0 1-10 0c0-4.5 5-10 5-10z"/><path d="M10 14a2 2 0 0 0 2 2"/></svg>',
  light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10c1 1 1 2 1 3h6c0-1 0-2 1-3a6 6 0 0 0-4-10z"/></svg>',
  fluid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2h8M9 2v4l-3 5v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-9l-3-5V2"/><path d="M6 14h12"/></svg>',
  key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="4"/><path d="M11 11l9 9M16 16l2-2M19 19l2-2"/></svg>',
  mat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>',
  cam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="12" rx="2"/><circle cx="12" cy="13" r="3"/><path d="M8 7l1.5-2h5L16 7"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.5-9-8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 5.5C19 15.5 12 20 12 20z"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.4A2 2 0 0 0 9.3 17H18a2 2 0 0 0 2-1.6L21.5 8H6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1s-.6.8-.8.9c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4c0-.1-.5-1.3-.7-1.7-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2c0 1.2.9 2.4 1 2.5.1.2 1.7 2.7 4.2 3.7 1.5.6 2 .7 2.7.6.4-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1z"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.5c0-.3.2-.5.5-.5z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3l-7 8 8.2 10h-6.4l-5-6.1L8 21H5l7.5-8.6L4.5 3h6.5l4.5 5.6zm-1 16h1.7L8 4.7H6.2z"/></svg>',
  yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.5 12 5.5 12 5.5s-6 0-7.9.6A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.6 7.9.6 7.9.6s6 0 7.9-.6a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>',
  medal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="6"/><path d="M12 11l1 2h2l-1.5 1.5.5 2-2-1-2 1 .5-2L9 13h2z"/><path d="M8 3l2 5M16 3l-2 5"/></svg>',
  euro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5.5A6 6 0 1 0 15 18M4 10h9M4 14h9"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14M10 11v6M14 11v6"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
};

/* ------------------------------ Servicios -------------------------------- */
const SERVICES = [
  { id: 'aceite', icon: 'oil', color: '#ff7a45', name: 'Cambio de aceite y filtro', short: 'Aceite sintético premium + filtro. En 30 minutos y sin cita previa.', price: 49, unit: 'desde', dur: '30 min', cat: 'Mantenimiento' },
  { id: 'neumaticos', icon: 'tire', color: '#3b4453', name: 'Neumáticos y equilibrado', short: 'Montaje, equilibrado y alineación. Todas las marcas y medidas.', price: 15, unit: 'desde /ud', dur: '45 min', cat: 'Neumáticos' },
  { id: 'frenos', icon: 'brake', color: '#e63c1e', name: 'Sistema de frenos', short: 'Pastillas, discos y purgado. Revisión gratuita del sistema completo.', price: 79, unit: 'desde', dur: '60 min', cat: 'Seguridad' },
  { id: 'diagnosis', icon: 'diag', color: '#00b4d8', name: 'Diagnosis electrónica', short: 'Lectura de centralita y borrado de errores con equipo multimarca.', price: 39, unit: 'desde', dur: '30 min', cat: 'Electrónica' },
  { id: 'bateria', icon: 'battery', color: '#16a34a', name: 'Batería y arranque', short: 'Test de carga gratuito, sustitución y reciclaje de la batería usada.', price: 59, unit: 'desde', dur: '20 min', cat: 'Electricidad' },
  { id: 'aire', icon: 'ac', color: '#0091b0', name: 'Aire acondicionado', short: 'Recarga de gas, revisión de fugas y desinfección del circuito.', price: 55, unit: 'desde', dur: '40 min', cat: 'Confort' },
  { id: 'preitv', icon: 'shield', color: '#f59e0b', name: 'Pre-ITV completa', short: 'Inspección de 30 puntos para pasar la ITV a la primera. Garantizado.', price: 29, unit: 'desde', dur: '35 min', cat: 'Inspección' },
  { id: 'distribucion', icon: 'wrench', color: '#7c3aed', name: 'Kit de distribución', short: 'Correa o cadena, tensores y bomba de agua con recambios OEM.', price: 320, unit: 'desde', dur: '3-4 h', cat: 'Motor' },
  { id: 'revision', icon: 'car', color: '#c72f13', name: 'Revisión oficial', short: 'Mantenimiento según fabricante que conserva tu garantía de origen.', price: 99, unit: 'desde', dur: '90 min', cat: 'Mantenimiento' },
];

/* Detalle ampliado para la tabla de precios */
const SERVICE_PRICES = [
  { cat: 'Mantenimiento', name: 'Cambio de aceite + filtro (sintético 5W30)', dur: '30 min', price: 49 },
  { cat: 'Mantenimiento', name: 'Revisión oficial según fabricante', dur: '90 min', price: 99 },
  { cat: 'Mantenimiento', name: 'Cambio filtro de aire / habitáculo', dur: '20 min', price: 25 },
  { cat: 'Neumáticos', name: 'Montaje + equilibrado (por neumático)', dur: '15 min', price: 15 },
  { cat: 'Neumáticos', name: 'Alineación de dirección (paralelo)', dur: '40 min', price: 45 },
  { cat: 'Neumáticos', name: 'Reparación de pinchazo', dur: '20 min', price: 18 },
  { cat: 'Seguridad', name: 'Pastillas de freno delanteras', dur: '45 min', price: 79 },
  { cat: 'Seguridad', name: 'Discos + pastillas (eje completo)', dur: '75 min', price: 159 },
  { cat: 'Seguridad', name: 'Purgado de líquido de frenos', dur: '30 min', price: 45 },
  { cat: 'Electrónica', name: 'Diagnosis electrónica multimarca', dur: '30 min', price: 39 },
  { cat: 'Electrónica', name: 'Reset luces de servicio', dur: '15 min', price: 20 },
  { cat: 'Confort', name: 'Recarga aire acondicionado + gas', dur: '40 min', price: 55 },
  { cat: 'Confort', name: 'Desinfección circuito A/C con ozono', dur: '30 min', price: 35 },
  { cat: 'Motor', name: 'Kit de distribución + bomba de agua', dur: '3-4 h', price: 320 },
  { cat: 'Motor', name: 'Cambio de embrague', dur: '4-5 h', price: 480 },
];

/* ------------------------------ Productos tienda ------------------------- */
const PRODUCTS = [
  { id: 'p01', name: 'Aceite Castrol EDGE 5W30 · 5L', cat: 'Aceites', icon: 'oil', color: '#ff7a45', price: 42.9, old: 54.9, rating: 4.9, reviews: 214, tag: 'off', stock: true, desc: 'Aceite 100% sintético de máximo rendimiento para motores modernos.' },
  { id: 'p02', name: 'Filtro de aceite Bosch', cat: 'Filtros', icon: 'filter', color: '#3b4453', price: 8.5, rating: 4.7, reviews: 98, tag: '', stock: true, desc: 'Filtro de alta capacidad compatible con la mayoría de utilitarios.' },
  { id: 'p03', name: 'Pastillas de freno Brembo', cat: 'Frenos', icon: 'brake', color: '#e63c1e', price: 34.9, rating: 4.8, reviews: 176, tag: 'hot', stock: true, desc: 'Juego delantero cerámico con bajo nivel de polvo y frenada progresiva.' },
  { id: 'p04', name: 'Batería Varta 70Ah', cat: 'Eléctrico', icon: 'battery', color: '#16a34a', price: 89.0, old: 109, rating: 4.9, reviews: 340, tag: 'off', stock: true, desc: 'Batería de arranque con tecnología AGM y 4 años de garantía.' },
  { id: 'p05', name: 'Bujías NGK Iridium (x4)', cat: 'Motor', icon: 'spark', color: '#7c3aed', price: 28.0, rating: 4.8, reviews: 121, tag: '', stock: true, desc: 'Electrodo de iridio para arranques más rápidos y menor consumo.' },
  { id: 'p06', name: 'Escobillas Bosch Aerotwin', cat: 'Accesorios', icon: 'wiper', color: '#0091b0', price: 19.9, rating: 4.6, reviews: 87, tag: 'new', stock: true, desc: 'Par de escobillas planas con barrido uniforme y anticongelante.' },
  { id: 'p07', name: 'Anticongelante G12 · 5L', cat: 'Líquidos', icon: 'coolant', color: '#00b4d8', price: 16.5, rating: 4.7, reviews: 64, tag: '', stock: true, desc: 'Refrigerante de larga duración listo para usar, protección -37 ºC.' },
  { id: 'p08', name: 'Kit bombillas LED H7', cat: 'Iluminación', icon: 'light', color: '#f59e0b', price: 39.9, old: 49.9, rating: 4.5, reviews: 152, tag: 'off', stock: true, desc: '6000K, homologadas, +200% de luz para una conducción más segura.' },
  { id: 'p09', name: 'Líquido de frenos DOT4 · 1L', cat: 'Líquidos', icon: 'fluid', color: '#dc2626', price: 9.9, rating: 4.6, reviews: 45, tag: '', stock: true, desc: 'Alto punto de ebullición, ideal para conducción exigente.' },
  { id: 'p10', name: 'Alfombrillas premium (juego)', cat: 'Accesorios', icon: 'mat', color: '#3b4453', price: 24.9, rating: 4.4, reviews: 73, tag: '', stock: true, desc: 'Goma antideslizante a medida, bordes altos que protegen la moqueta.' },
  { id: 'p11', name: 'Cámara de visión trasera HD', cat: 'Electrónica', icon: 'cam', color: '#0091b0', price: 59.0, old: 79, rating: 4.7, reviews: 208, tag: 'hot', stock: true, desc: 'Visión nocturna, líneas de guía y montaje universal en matrícula.' },
  { id: 'p12', name: 'Filtro de habitáculo carbón', cat: 'Filtros', icon: 'filter', color: '#16a34a', price: 12.9, rating: 4.8, reviews: 110, tag: '', stock: true, desc: 'Carbón activo que retiene polen, polvo y malos olores.' },
  { id: 'p13', name: 'Aceite Motul 8100 5W40 · 5L', cat: 'Aceites', icon: 'oil', color: '#e63c1e', price: 47.5, rating: 4.9, reviews: 189, tag: 'new', stock: true, desc: 'Sintético de altas prestaciones, aprobaciones VW, MB y BMW.' },
  { id: 'p14', name: 'Juego de discos de freno', cat: 'Frenos', icon: 'brake', color: '#3b4453', price: 64.9, rating: 4.7, reviews: 96, tag: '', stock: false, desc: 'Discos ventilados de fundición GG20, par delantero.' },
  { id: 'p15', name: 'Cargador batería inteligente', cat: 'Eléctrico', icon: 'battery', color: '#7c3aed', price: 45.0, rating: 4.8, reviews: 134, tag: '', stock: true, desc: 'Mantenedor automático 12V con modo invierno y protección.' },
  { id: 'p16', name: 'Ambientador + kit limpieza', cat: 'Accesorios', icon: 'key', color: '#00b4d8', price: 14.5, old: 19.9, rating: 4.3, reviews: 58, tag: 'off', stock: true, desc: 'Pack de limpieza interior con microfibras y ambientador premium.' },
];

if (typeof window !== 'undefined') {
  window.ICON = ICON;
  window.SERVICES = SERVICES;
  window.SERVICE_PRICES = SERVICE_PRICES;
  window.PRODUCTS = PRODUCTS;
}
