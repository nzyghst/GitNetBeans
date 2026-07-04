#!/usr/bin/env python3
"""Sondeo El Hierro v4 (final) — listados + directorio guardado + fichas con reintento."""
import re, subprocess, time, html, csv, sys, os

BASE = "https://www.elhierro.travel"
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/126 Safari/537.36"
RUTAS = r'/(?:restaurantes|compras|servicio|alojamiento|comercios|bares)/el-hierro/[a-z0-9-]+/'

def fetch(url, tries=3):
    for i in range(tries):
        r = subprocess.run(["curl", "-sL", "--max-time", "30", "-A", UA, url],
                           capture_output=True, text=True)
        h = r.stdout
        if len(h) > 5000 and 'unexpected error' not in h[:500]:
            return h
        time.sleep(4 + 3*i)
    return h

def limpia(t):
    return html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', t))).strip()

def campos(body):
    def field(pat):
        mm = re.search(pat, body, re.S)
        return limpia(mm.group(1)) if mm else ""
    d = {}
    d['nombre'] = (field(r'<h3 class="field__item[^>]*>(.*?)</h3>')
                   or field(r'<h2 class="field[^"]*field--name-field-h-title[^>]*>(.*?)</h2>')
                   or field(r'<h1[^>]*>(.*?)</h1>'))
    d['cat']  = field(r'field--name-field-t-resource-type.*?<div class="field__item">(.*?)</div>')
    d['loc']  = field(r'field--name-field-r-city.*?<div class="field__item">(.*?)</div>')
    d['addr'] = field(r'<div class="address">(.*?)</div>')
    d['tel']  = field(r'<div class="phone-number">(.*?)</div>')
    d['web'] = ""
    d['nolink'] = None
    zona = body
    lb_m = re.search(r'<div class="field_links">(.*?)(?:</article>|<div class="field_others"|$)', body, re.S)
    if lb_m: zona = lb_m.group(1)
    if 'noLink' in zona: d['nolink'] = True
    for u in re.findall(r'<a[^>]+class="goToWeb"[^>]+href="(https?://[^"]+)"', body) \
           + re.findall(r'class="web-link-wrapper".*?<a[^>]+href="(https?://[^"]+)"', body, re.S) \
           + re.findall(r'<a[^>]+href="(https?://[^"]+)"[^>]+class="goToWeb"', body):
        if 'google.com/maps' not in u and 'elhierro.travel' not in u:
            d['web'] = u; d['nolink'] = False; break
    return d

def parse_listado(h, seccion):
    out = []
    pos = [(m.start(), m.group(1)) for m in re.finditer(r'<article\s+about="(' + RUTAS + r')"', h)]
    for i, (p, url) in enumerate(pos):
        fin = pos[i+1][0] if i+1 < len(pos) else len(h)
        d = campos(h[p:fin]); d['url'] = BASE + url; d['seccion'] = seccion
        if d['nombre']: out.append(d)
    return out

vistos, negocios = {}, []
def alta(d):
    if d['url'] not in vistos:
        vistos[d['url']] = d; negocios.append(d)
    else:
        v = vistos[d['url']]
        for k in ('tel','loc','addr','web','cat'):
            if not v.get(k) and d.get(k): v[k] = d[k]
        if d.get('web'): v['web'] = v.get('web') or d['web']; v['nolink'] = False
        if v.get('nolink') is None: v['nolink'] = d.get('nolink')

LISTADOS = [
    ("/donde-comer/", "Restauración"), ("/donde-comer/el-hierro/all/", "Restauración"),
    ("/donde-comer/el-hierro/valverde/", "Restauración"),
    ("/donde-comer/el-hierro/la-frontera/", "Restauración"),
    ("/donde-comer/el-hierro/el-pinar/", "Restauración"),
    ("/compras-el-hierro/", "Comercio"), ("/compras-el-hierro/el-hierro/all/", "Comercio"),
    ("/compras-el-hierro/el-hierro/valverde/", "Comercio"),
    ("/compras-el-hierro/el-hierro/el-pinar/", "Comercio"),
    ("/directorio-de-servicios/", "Servicios"),
]
slugs_detalle = set()
for path, seccion in LISTADOS:
    for page in range(0, 12):
        url = f"{BASE}{path}?page={page}" if page else f"{BASE}{path}"
        h = fetch(url)
        slugs_detalle |= set(re.findall(r'href="(' + RUTAS + r')"', h))
        cards = parse_listado(h, seccion)
        antes = len(vistos)
        for c in cards: alta(c)
        print(f"  {path}?page={page}: {len(cards)} tarjetas, +{len(vistos)-antes}", file=sys.stderr)
        if len(vistos) == antes and page > 0: break
        if not cards and page == 0: break
        time.sleep(0.4)

# directorio guardado de la primera pasada (tenía 13 tarjetas de servicios)
if os.path.exists('directorio-de-servicios.html'):
    h = open('directorio-de-servicios.html', encoding='utf-8').read()
    slugs_detalle |= set(re.findall(r'href="(' + RUTAS + r')"', h))
    cards = parse_listado(h, "Servicios")
    antes = len(vistos)
    for c in cards: alta(c)
    print(f"  [guardado] directorio: {len(cards)} tarjetas, +{len(vistos)-antes}", file=sys.stderr)

# alojamientos del landing dormir
h = fetch(BASE + "/donde-dormir-el-hierro/")
slugs_detalle |= set(re.findall(r'href="(' + RUTAS + r')"', h))

pendientes = {BASE+u for u in slugs_detalle} - set(vistos)
print(f"\nFichas de detalle: {len(pendientes)}", file=sys.stderr)
for u in sorted(pendientes):
    h = fetch(u); d = campos(h); d['url'] = u
    d['seccion'] = 'Alojamiento' if '/alojamiento/' in u else ('Servicios' if '/servicio/' in u else 'Comercio')
    if d['nombre']: alta(d)
    print(f"  {d['nombre'][:38]:40s} tel:{(d['tel'] or '-')[:16]:16s} web:{d['web'][:36] or 'no'}", file=sys.stderr)
    time.sleep(0.4)

# completar web de los que quedaron sin veredicto visitando su ficha
sin_veredicto = [c for c in negocios if not c.get('web') and c.get('nolink') is None]
print(f"\nRe-verificando {len(sin_veredicto)} sin veredicto de web...", file=sys.stderr)
for c in sin_veredicto:
    h = fetch(c['url']); d = campos(h)
    if d.get('web'): c['web'] = d['web']
    for k in ('tel','loc','addr'):
        if not c.get(k) and d.get(k): c[k] = d[k]
    time.sleep(0.4)

print(f"\nTOTAL: {len(negocios)}", file=sys.stderr)
SC = {"Restauración":"Restaurante/Bar","Comercio":"Comercio","Servicios":"Servicio","Alojamiento":"Alojamiento"}
with open("negocios.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["Prioridad","Negocio","Categoria","Localidad","Direccion","Telefono",
                "Link_WhatsApp","Presencia_Web","Ficha_Directorio","Estado"])
    def prio(c):
        t = re.sub(r'[^\d]','',c.get('tel',''))[-9:]
        m = t[:1] in ('6','7')
        if not c.get('web') and t and m: return (0,"1-TOP (sin web, WhatsApp)")
        if not c.get('web') and t:       return (1,"2-Sin web (solo fijo)")
        if not c.get('web'):             return (2,"3-Sin web (sin telefono)")
        return (3,"4-Ya tiene web")
    negocios.sort(key=lambda c: (prio(c)[0], c.get('loc',''), c['nombre']))
    n = 0
    for c in negocios:
        t = re.sub(r'[^\d]','',c.get('tel','')); t = t[-9:] if len(t) >= 9 else ""
        wa = f"https://wa.me/34{t}" if t and t[0] in ('6','7') else ""
        pres = c.get('web') or "Ninguna (segun directorio oficial)"
        if not c.get('web'): n += 1
        w.writerow([prio(c)[1], c['nombre'], c.get('cat') or SC.get(c['seccion'],''), c.get('loc',''),
                    c.get('addr',''), c.get('tel') or "-", wa, pres, c['url'], "Sin contactar"])
    print(f"Sin web: {n}/{len(negocios)}", file=sys.stderr)
