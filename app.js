/* Valdi · guía de Valdivia (PWA mínima). Sin dependencias ni build. */
(function () {
  "use strict";
  const CFG = window.VALDI_CONFIG || {};
  const $ = (s, el = document) => el.querySelector(s);

  // ---------- Textos (es / en) ----------
  const T = {
    es: {
      skip: "Saltar al contenido", emergencyShort: "Emergencias", offline: "Sin conexión. Te mostramos lo último guardado.",
      todayTitle: "Hola, bienvenido a Valdivia",
      campaignTitle: "Tu visita apoya al deporte infantil",
      campaignBody: "Cada negocio de Valdi hizo un aporte para la categoría U13 del Club de Deportes Las Ánimas, para que más niñas y niños puedan competir este verano.",
      raised: (r, m, n) => `${r} de ${m} reunidos${n ? ` · ${n} negocios` : ""}`,
      goalBy: (d) => `Meta al ${d}`,
      featuredTitle: "Negocios destacados", ideasTitle: "Ideas para hoy", ideasRain: "Ideas bajo techo para hoy",
      tipTitle: "Tip del día", eatTitle: "Dónde comer y beber", doTitle: "Qué hacer", moveTitle: "Cómo moverte",
      moveNote: "Precios y horarios pueden cambiar. Confírmalos antes de viajar.",
      helpTitle: "Emergencias y tips", tipsTitle: "Guía práctica",
      tsunamiTitle: "Sismo o aviso de tsunami en la costa",
      tsunamiBody: "En Niebla, Los Molinos, Corral, Isla Mancera o Curiñanco: si el sismo te impide estar de pie, o si escuchas la alarma, sube a pie a un lugar alto o sigue las señales de evacuación. No esperes el aviso oficial ni vuelvas a la playa hasta que la autoridad lo indique.",
      source: "Fuente", search: "Buscar", searchPh: "Busca por nombre o plato", searchPh2: "Busca un lugar o actividad",
      footerBusiness: "¿Tienes un negocio en Valdivia?", footerCta: "Suma tu negocio y apoya a la U13",
      footerNote: "Los negocios con la etiqueta «Destacado» hicieron un aporte mayor y aparecen primero. La información es referencial: confirma horarios antes de ir.",
      tabToday: "Hoy", tabEat: "Comer", tabDo: "Hacer", tabMove: "Moverse", tabHelp: "Ayuda",
      all: "Todo", directions: "Cómo llegar", call: "Llamar", web: "Sitio web", whatsapp: "WhatsApp",
      featured: "Destacado", main: "Aliado del deporte", supports: "Apoya a la U13",
      toConfirm: "Por confirmar", byBusiness: "Información entregada por el negocio",
      results: (n) => `${n} resultado${n === 1 ? "" : "s"}`,
      empty: "No hay resultados. Prueba otra búsqueda o quita el filtro.",
      noBusiness: "Pronto verás aquí los negocios que se suman a la campaña.",
      hours: "Horario", indoor: "Bajo techo",
      weatherNow: (t) => `${t}° ahora en Valdivia`,
      rainSoon: (p) => `Probabilidad de lluvia de ${p}% en las próximas 3 horas. Lleva paraguas o elige un plan bajo techo.`,
      noRain: "Sin lluvia en las próximas 3 horas.",
      langBtn: "EN", langLabel: "Change language to English",
      call_: "Llamar al"
    },
    en: {
      skip: "Skip to content", emergencyShort: "Emergency", offline: "You're offline. Showing your saved information.",
      todayTitle: "Welcome to Valdivia",
      campaignTitle: "Your visit supports kids' sports",
      campaignBody: "Every business on Valdi made a contribution to the U13 team of Club de Deportes Las Ánimas, so more girls and boys can compete this summer.",
      raised: (r, m, n) => `${r} of ${m} raised${n ? ` · ${n} businesses` : ""}`,
      goalBy: (d) => `Goal by ${d}`,
      featuredTitle: "Featured businesses", ideasTitle: "Ideas for today", ideasRain: "Indoor ideas for today",
      tipTitle: "Tip of the day", eatTitle: "Where to eat and drink", doTitle: "Things to do", moveTitle: "Getting around",
      moveNote: "Prices and schedules may change. Check them before you travel.",
      helpTitle: "Emergencies and tips", tipsTitle: "Practical guide",
      tsunamiTitle: "Earthquake or tsunami warning on the coast",
      tsunamiBody: "In Niebla, Los Molinos, Corral, Isla Mancera or Curiñanco: if the earthquake makes it hard to stand, or you hear the siren, walk to high ground or follow the evacuation signs. Don't wait for an official warning, and don't go back to the beach until authorities say so.",
      source: "Source", search: "Search", searchPh: "Search by name or dish", searchPh2: "Search a place or activity",
      footerBusiness: "Own a business in Valdivia?", footerCta: "Join Valdi and support the U13 team",
      footerNote: "Businesses labeled “Featured” made a larger contribution and are shown first. Information is for reference: check opening hours before you go.",
      tabToday: "Today", tabEat: "Eat", tabDo: "Do", tabMove: "Move", tabHelp: "Help",
      all: "All", directions: "Get directions", call: "Call", web: "Website", whatsapp: "WhatsApp",
      featured: "Featured", main: "Sports partner", supports: "Supports U13 team",
      toConfirm: "To be confirmed", byBusiness: "Information provided by the business",
      results: (n) => `${n} result${n === 1 ? "" : "s"}`,
      empty: "No results. Try another search or remove the filter.",
      noBusiness: "Businesses joining the campaign will appear here soon.",
      hours: "Hours", indoor: "Indoors",
      weatherNow: (t) => `${t}° now in Valdivia`,
      rainSoon: (p) => `${p}% chance of rain in the next 3 hours. Bring an umbrella or pick an indoor plan.`,
      noRain: "No rain expected in the next 3 hours.",
      langBtn: "ES", langLabel: "Cambiar idioma a español",
      call_: "Call"
    }
  };

  const EMERGENCIAS = [
    { n: "131", es: "Ambulancia (SAMU)", en: "Ambulance (SAMU)" },
    { n: "132", es: "Bomberos", en: "Fire department" },
    { n: "133", es: "Carabineros (policía)", en: "Carabineros (police)" },
    { n: "137", es: "Emergencias en el mar", en: "Sea emergencies (Navy)" }
  ];

  const MOVERSE = [
    { es: ["A pie", "El centro, la costanera y la Isla Teja se recorren caminando. Cruza a la isla por el puente Pedro de Valdivia."],
      en: ["On foot", "Downtown, the waterfront and Isla Teja are walkable. Cross to the island on the Pedro de Valdivia bridge."] },
    { es: ["Micro (bus urbano)", "Recorren la ciudad y llegan a Niebla. El pago está cambiando a tarjeta y QR: lleva efectivo en monedas por si acaso y pregunta al subir."],
      en: ["Micro (city bus)", "They cover the city and go to Niebla. Payment is moving to card and QR: carry some coins just in case and ask the driver."] },
    { es: ["Colectivo (taxi compartido con ruta fija)", "Autos con un número de ruta en el techo. Son rápidos y económicos. Se paga en efectivo al conductor."],
      en: ["Colectivo (shared taxi with a fixed route)", "Cars with a route number on the roof. Fast and cheap. Pay the driver in cash."] },
    { es: ["Taxi y apps", "Hay taxis y apps de transporte. Para el aeródromo o de noche, es la opción más cómoda."],
      en: ["Taxis and apps", "Taxis and ride apps are available. The easiest option at night or to the airport."] },
    { es: ["Niebla – Corral", "Desde Niebla salen la barcaza (también lleva autos) y lanchas de pasajeros hacia Corral. Revisa el horario en el muelle; con mal tiempo se suspenden."],
      en: ["Niebla – Corral", "From Niebla, a car ferry and passenger boats go to Corral. Check the schedule at the pier; they stop in bad weather."] },
    { es: ["Llegar y salir", "Aeródromo Pichoy: unos 30 minutos al centro en taxi o transfer. Terminal de buses: a pocas cuadras del centro y de la costanera."],
      en: ["Arriving and leaving", "Pichoy airport: about 30 minutes to downtown by taxi or shuttle. Bus terminal: a few blocks from downtown and the waterfront."] }
  ];

  const TIPS = [
    { es: ["Clima", "En Valdivia llueve seguido, incluso en verano. Lleva capa o chaqueta impermeable y ropa por capas."],
      en: ["Weather", "It rains often in Valdivia, even in summer. Bring a rain jacket and dress in layers."] },
    { es: ["Dinero", "Casi todo acepta tarjeta, pero lleva algo de efectivo para micros, colectivos y ferias. La propina sugerida en restaurantes es 10%."],
      en: ["Money", "Most places take cards, but carry some cash for buses, colectivos and markets. A 10% tip is customary in restaurants."] },
    { es: ["Lobos marinos", "Mira a los lobos marinos del Mercado Fluvial a distancia. No los alimentes ni te acerques: pueden morder."],
      en: ["Sea lions", "Watch the sea lions at the river market from a distance. Don't feed them or get close: they can bite."] },
    { es: ["Cerveza", "Valdivia es la capital cervecera de Chile. Si tomas, no manejes: los controles son frecuentes y la ley es estricta."],
      en: ["Beer", "Valdivia is Chile's craft beer capital. If you drink, don't drive: checks are frequent and the law is strict."] },
    { es: ["Eventos y cortes de calle", "En días de competencias deportivas, como el Ironman, algunas calles y la costanera se cierran. Revisa los avisos municipales y camina."],
      en: ["Events and road closures", "On race days, such as the Ironman, some streets and the waterfront close. Check city notices and walk."] },
    { es: ["Palabras locales", "«Once» es la merienda de la tarde. «Luca» son 1.000 pesos. «Al tiro» significa enseguida."],
      en: ["Local words", "“Once” is the afternoon tea. “Luca” means 1,000 pesos. “Al tiro” means right away."] },
    { es: ["Costa", "En la costa, respeta los cierres de senderos y playas: hay zonas con riesgo de derrumbes, como Playa Grande de Niebla."],
      en: ["Coast", "On the coast, respect closed trails and beaches: some areas have landslide risk, like Playa Grande in Niebla."] }
  ];

  const SECTORES = ["Valdivia centro", "Isla Teja", "Otro sector de Valdivia", "Niebla y Los Molinos", "Corral", "Curiñanco y costa"];
  const SECTOR_EN = { "Valdivia centro": "Downtown", "Isla Teja": "Isla Teja", "Otro sector de Valdivia": "Other areas", "Niebla y Los Molinos": "Niebla", "Corral": "Corral", "Curiñanco y costa": "Coast" };

  // ---------- Estado ----------
  let lang = leer("valdi-lang") || ((navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en");
  const estado = { lugares: [], negocios: [], campana: { recaudado: CFG.recaudado || 0, negocios: CFG.negocios || 0 }, lluvia: null, filtros: { comer: null, hacer: null }, q: { comer: "", hacer: "" } };
  const t = (k, ...a) => { const v = (T[lang] || T.es)[k]; return typeof v === "function" ? v(...a) : v; };

  function leer(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function guardar(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }

  // ---------- CSV ----------
  function parseCSV(txt) {
    const filas = []; let fila = [], campo = "", q = false;
    for (let i = 0; i < txt.length; i++) {
      const c = txt[i];
      if (q) {
        if (c === '"' && txt[i + 1] === '"') { campo += '"'; i++; }
        else if (c === '"') q = false;
        else campo += c;
      } else if (c === '"') q = true;
      else if (c === ",") { fila.push(campo); campo = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && txt[i + 1] === "\n") i++;
        fila.push(campo); filas.push(fila); fila = []; campo = "";
      } else campo += c;
    }
    if (campo || fila.length) { fila.push(campo); filas.push(fila); }
    const norm = (s) => s.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "_");
    const cab = (filas.shift() || []).map(norm);
    return filas.filter((f) => f.some((x) => x.trim())).map((f) => Object.fromEntries(cab.map((h, i) => [h, (f[i] || "").trim()])));
  }

  async function traerCSV(url, clave) {
    if (!url) return null;
    try {
      const r = await fetch(url, { cache: "no-store" });
      if (!r.ok) throw new Error(r.status);
      const txt = await r.text();
      guardar(clave, txt);
      return parseCSV(txt);
    } catch (e) {
      const viejo = leer(clave);
      return viejo ? parseCSV(viejo) : null;
    }
  }

  function aNegocio(f, i) {
    const nivelTxt = (f.nivel || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    return {
      id: "neg-" + i,
      negocio: true,
      tipo: /comida|bebida|comer|restaurant|cafe/i.test(f.rubro || "") ? "comer" : "hacer",
      nombre: f.nombre || "",
      sector: f.sector || "",
      direccion: f.direccion || "",
      horario: f.horario || "",
      es: f.descripcion || "",
      en: f.descripcion_en || "",
      web: f.web || "",
      telefono: f.telefono || "",
      foto: /^https:\/\//.test(f.foto || "") ? f.foto : "",
      promocion: f.promocion || "",
      nivel: nivelTxt.startsWith("aliado") || nivelTxt.startsWith("principal") ? 0 : nivelTxt.startsWith("destacado") ? 1 : 2,
      mapa: [f.nombre, f.direccion, "Valdivia"].filter(Boolean).join(", ")
    };
  }

  // Orden: Aliado del deporte ($75.000+), Destacado ($25.000+), Colaborador ($5.000+); dentro de cada nivel, rotación diaria para ser justos.
  function hash(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
  const hoyClave = new Date().toISOString().slice(0, 10);
  function ordenar(a, b) {
    const na = a.negocio ? a.nivel : 3, nb = b.negocio ? b.nivel : 3;
    if (na !== nb) return na - nb;
    return hash(hoyClave + a.id) - hash(hoyClave + b.id);
  }

  // ---------- Render ----------
  const fmtCLP = (n) => new Intl.NumberFormat(lang === "es" ? "es-CL" : "en-US", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);
  const el = (tag, attrs = {}, ...hijos) => {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) { if (v === false || v == null) continue; if (k === "class") e.className = v; else if (k === "text") e.textContent = v; else e.setAttribute(k, v); }
    for (const h of hijos) if (h) e.append(h);
    return e;
  };
  const url = (u) => (/^https?:\/\//i.test(u) ? u : "https://" + u.replace(/^\/+/, ""));
  const soloDigitos = (s) => s.replace(/[^\d+]/g, "");

  function tarjeta(p) {
    const desc = (lang === "en" && p.en) ? p.en : p.es;
    const cls = "lugar" + (p.negocio && p.nivel === 0 ? " principal" : p.negocio && p.nivel === 1 ? " destacado" : "");
    const etiquetas = el("div", { class: "etiquetas" });
    if (p.negocio && p.nivel <= 1) etiquetas.append(el("span", { class: "etiqueta dest", text: p.nivel === 0 ? t("main") : t("featured") }));
    if (p.negocio) etiquetas.append(el("span", { class: "etiqueta u13", text: t("supports") }));
    if (p.sector) etiquetas.append(el("span", { class: "etiqueta", text: lang === "en" ? (SECTOR_EN[p.sector] || p.sector) : p.sector }));
    if (p.lluvia) etiquetas.append(el("span", { class: "etiqueta", text: t("indoor") }));

    const acc = el("div", { class: "acciones" });
    acc.append(el("a", { class: "btn", href: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(p.mapa || p.nombre + ", Valdivia"), target: "_blank", rel: "noopener", text: t("directions") }));
    if (p.telefono) {
      const tel = soloDigitos(p.telefono);
      acc.append(el("a", { class: "btn-secundario", href: "tel:" + tel, text: t("call"), "aria-label": `${t("call")} ${p.nombre}` }));
      const wa = tel.replace(/^\+/, "");
      if (/^(56)?9\d{8}$/.test(wa)) acc.append(el("a", { class: "btn-secundario", href: "https://wa.me/" + (wa.startsWith("56") ? wa : "56" + wa), target: "_blank", rel: "noopener", text: t("whatsapp") }));
    }
    if (p.web) acc.append(el("a", { class: "btn-secundario", href: url(p.web), target: "_blank", rel: "noopener", text: t("web"), "aria-label": `${t("web")} ${p.nombre}` }));

    const fuente = p.negocio
      ? el("p", { class: "fuente", text: t("byBusiness") })
      : el("p", { class: "fuente" }, document.createTextNode(t("source") + ": "), el("a", { href: p.fuenteUrl, target: "_blank", rel: "noopener", text: p.fuente }));

    return el("article", { class: cls },
      p.foto ? el("img", { src: p.foto, alt: p.nombre, loading: "lazy" }) : null,
      el("h3", { text: p.nombre }),
      etiquetas,
      desc ? el("p", { text: desc }) : null,
      p.direccion ? el("p", { class: "meta", text: p.direccion }) : null,
      p.horario ? el("p", { class: "meta", text: `${t("hours")}: ${p.horario}` }) : null,
      p.promocion ? el("p", { class: "promo", text: p.promocion }) : null,
      acc,
      fuente
    );
  }

  function pintarLista(cont, items, vacio) {
    cont.replaceChildren(...(items.length ? items.map(tarjeta) : [el("p", { class: "vacio", text: vacio })]));
  }

  const sinTildes = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  function todos() { return [...estado.negocios, ...estado.lugares].sort(ordenar); }

  function pintarModulo(mod) {
    const q = sinTildes(estado.q[mod]);
    const f = estado.filtros[mod];
    const items = todos().filter((p) => p.tipo === mod && (!f || p.sector === f) && (!q || sinTildes([p.nombre, p.es, p.en, p.sector, p.direccion].join(" ")).includes(q)));
    pintarLista($("#lista-" + mod), items, t("empty"));
    $("#n-" + mod).textContent = t("results", items.length);
    const chips = $("#filtros-" + mod);
    const sectores = SECTORES.filter((s) => todos().some((p) => p.tipo === mod && p.sector === s));
    chips.replaceChildren(...[null, ...sectores].map((s) => {
      const b = el("button", { type: "button", "aria-pressed": String(f === s), text: s ? (lang === "en" ? SECTOR_EN[s] : s) : t("all") });
      b.addEventListener("click", () => { estado.filtros[mod] = s; pintarModulo(mod); });
      return b;
    }));
  }

  function pintarHoy() {
    const { recaudado, negocios } = estado.campana;
    const meta = CFG.meta || 5000000;
    const pct = Math.min(100, Math.round((recaudado / meta) * 100));
    $("#relleno-meta").style.width = pct + "%";
    const barra = $("#barra-meta");
    barra.setAttribute("aria-valuemax", meta); barra.setAttribute("aria-valuenow", recaudado);
    barra.setAttribute("aria-valuetext", t("raised", fmtCLP(recaudado), fmtCLP(meta), negocios));
    const fecha = new Intl.DateTimeFormat(lang === "es" ? "es-CL" : "en-US", { day: "numeric", month: "long", timeZone: "America/Santiago" }).format(new Date((CFG.fechaMeta || "2027-01-04") + "T12:00:00-03:00"));
    $("#texto-meta").textContent = `${t("raised", fmtCLP(recaudado), fmtCLP(meta), negocios)}. ${t("goalBy", fecha)}.`;

    const dest = estado.negocios.slice().sort(ordenar).slice(0, 4);
    pintarLista($("#lista-destacados"), dest, t("noBusiness"));

    const lluvia = estado.lluvia != null && estado.lluvia >= 60;
    $("#t-sugerencias").textContent = lluvia ? t("ideasRain") : t("ideasTitle");
    const base = estado.lugares.slice().sort((a, b) => hash(hoyClave + a.id) - hash(hoyClave + b.id));
    const ideas = (lluvia ? base.filter((p) => p.lluvia) : base).slice(0, 4);
    pintarLista($("#lista-sugerencias"), ideas, t("empty"));

    const dia = Math.floor(Date.now() / 86400000);
    const tip = TIPS[dia % TIPS.length][lang];
    $("#tip-dia").textContent = `${tip[0]}. ${tip[1]}`;
  }

  function pintarEstaticos() {
    $("#lista-emergencias").replaceChildren(...EMERGENCIAS.map((e) =>
      el("a", { href: "tel:" + e.n, "aria-label": `${t("call_")} ${e.n}, ${e[lang]}` }, el("strong", { text: e.n }), el("span", { text: e[lang] }))));
    const bloque = (x) => el("article", { class: "tarjeta" }, el("h3", { text: x[lang][0] }), el("p", { text: x[lang][1] }));
    $("#lista-moverse").replaceChildren(...MOVERSE.map(bloque));
    $("#lista-tips").replaceChildren(...TIPS.map(bloque));
  }

  function aplicarIdioma() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((n) => { const v = t(n.dataset.i18n); if (typeof v === "string") n.textContent = v; });
    document.querySelectorAll("[data-i18n-ph]").forEach((n) => { n.placeholder = t(n.dataset.i18nPh); });
    const b = $("#btn-idioma"); b.textContent = t("langBtn"); b.setAttribute("aria-label", t("langLabel"));
    pintarTodo();
    pintarClima();
  }

  function pintarTodo() { pintarEstaticos(); pintarHoy(); pintarModulo("comer"); pintarModulo("hacer"); }

  // ---------- Clima (Open-Meteo, sin clave) ----------
  let clima = null;
  async function cargarClima() {
    try {
      const r = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-39.8142&longitude=-73.2459&current=temperature_2m&hourly=precipitation_probability&forecast_hours=3&timezone=America%2FSantiago");
      if (!r.ok) throw new Error(r.status);
      const d = await r.json();
      clima = { temp: Math.round(d.current.temperature_2m), lluvia: Math.max(...(d.hourly.precipitation_probability || [0])) };
      estado.lluvia = clima.lluvia;
      pintarClima(); pintarHoy();
    } catch (e) { /* si falla, el módulo queda oculto */ }
  }
  function pintarClima() {
    const c = $("#clima");
    if (!clima) { c.hidden = true; return; }
    c.hidden = false;
    c.replaceChildren(el("div", {}, el("strong", { text: t("weatherNow", clima.temp) }), el("p", { text: clima.lluvia >= 40 ? t("rainSoon", clima.lluvia) : t("noRain") })));
  }

  // ---------- Navegación ----------
  const VISTAS = ["hoy", "comer", "hacer", "moverse", "ayuda"];
  function navegar() {
    const v = VISTAS.includes(location.hash.slice(1)) ? location.hash.slice(1) : "hoy";
    VISTAS.forEach((x) => { $("#vista-" + x).hidden = x !== v; });
    document.querySelectorAll(".pestanas a").forEach((a) => { if (a.dataset.tab === v) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    window.scrollTo(0, 0);
    if (navegar.listo) $("#principal").focus({ preventScroll: true });
    navegar.listo = true;
  }

  // ---------- Inicio ----------
  async function iniciar() {
    $("#link-negocios").href = CFG.paraNegocios || "#";
    ["comer", "hacer"].forEach((m) => $("#buscar-" + m).addEventListener("input", (e) => { estado.q[m] = e.target.value; pintarModulo(m); }));
    $("#btn-idioma").addEventListener("click", () => { lang = lang === "es" ? "en" : "es"; guardar("valdi-lang", lang); aplicarIdioma(); });
    window.addEventListener("hashchange", navegar);
    const offline = () => { $("#aviso-offline").hidden = navigator.onLine; };
    window.addEventListener("online", offline); window.addEventListener("offline", offline); offline();
    navegar();
    aplicarIdioma();

    try { const r = await fetch("data/lugares.json"); estado.lugares = (await r.json()).lugares; } catch (e) { estado.lugares = []; }

    const filas = await traerCSV(CFG.negociosCsv, "valdi-negocios");
    if (filas) estado.negocios = filas.filter((f) => /^s[ií]$/i.test(f.publicar || "") && f.nombre).map(aNegocio);

    const camp = await traerCSV(CFG.campanaCsv, "valdi-campana");
    if (camp && camp[0]) {
      const num = (s) => Number(String(s || "0").replace(/[^\d]/g, "")) || 0;
      estado.campana = { recaudado: num(camp[0].recaudado), negocios: num(camp[0].negocios) || estado.negocios.length };
    } else if (!estado.campana.negocios) estado.campana.negocios = estado.negocios.length;

    pintarTodo();
    cargarClima();
  }

  if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  iniciar();
})();
