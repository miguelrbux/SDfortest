/* Remada · guía de Valdivia (PWA). Sin dependencias ni build. */
(function () {
  "use strict";
  const CFG = window.VALDI_CONFIG || {};
  const $ = (s, el = document) => el.querySelector(s);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Textos ----------
  const T = {
    es: {
      skip: "Saltar al contenido", sos: "SOS", offline: "Sin conexión. Te mostramos lo último guardado.",
      todayTitle: "Descubre Valdivia", todaySub: "Comer, pasear y armar tu día, en un solo lugar.",
      campaignTitle: "Tu visita apoya a la U13 de Las Ánimas",
      of: (m) => `de ${m}`, campaignFoot: (n, d) => `${n ? n + " negocios aportando · " : ""}Meta al ${d}`,
      plansTitle: "Arma tu día en 1 toque", featuredTitle: "Destacados", ideasTitle: "Imperdibles", ideasRain: "Planes bajo techo", seeAll: "Ver todo",
      tipTitle: "Tip del día", eatTitle: "Comer y beber", doTitle: "Qué hacer", dayTitle: "Mi día", helpTitle: "Ayuda",
      moveTitle: "Cómo moverte", tipsTitle: "Tips", moveNote: "Precios y horarios pueden cambiar. Confírmalos antes de ir.",
      tsunamiTitle: "Sismo o tsunami en la costa",
      tsunamiBody: "Si el sismo no te deja estar de pie o suena la alarma: sube a pie a un lugar alto. No esperes el aviso oficial.",
      source: "Fuente", search: "Buscar", searchPh: "Busca un lugar o plato", searchPh2: "Busca un lugar o actividad",
      footerBusiness: "¿Tienes un negocio en Valdivia?", footerCta: "Súmate y apoya a la U13",
      footerNote: "«Aliado» y «Destacado» indican un aporte mayor a la campaña. Info referencial: confirma horarios antes de ir.",
      photoCredits: "Fotos: Wikimedia Commons, con licencias libres. Toca el crédito de cada foto para ver autor y licencia.",
      tabToday: "Hoy", tabEat: "Comer", tabDo: "Hacer", tabDay: "Mi día", tabHelp: "Ayuda",
      all: "Todo", directions: "Cómo llegar", call: "Llamar", web: "Sitio web", whatsapp: "WhatsApp",
      featured: "Destacado", main: "Aliado", supports: "Apoya a la U13", indoor: "Bajo techo",
      byBusiness: "Información entregada por el negocio", photo: "Foto",
      results: (n) => `${n} resultado${n === 1 ? "" : "s"}`,
      empty: "Sin resultados. Prueba otra búsqueda.", noBusiness: "Pronto verás aquí a los negocios de la campaña.",
      open: (n) => `Ver ${n}`, add: (n) => `Agregar ${n} a Mi día`, remove: (n) => `Quitar ${n} de Mi día`,
      added: "Agregado a Mi día", removed: "Quitado de Mi día", planAdded: (n) => `${n} paradas en Mi día`,
      addDay: "Agregar a Mi día", inDay: "En Mi día", close: "Cerrar",
      min: (m) => (m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? " " + (m % 60) + " min" : ""}` : `${m} min`),
      startAt: "Empiezo a las", dayEmptyT: "Tu día está vacío", dayEmpty: "Toca «+» en cualquier lugar o elige un plan listo.",
      openRoute: "Ver ruta en el mapa", share: "Compartir", clear: "Vaciar", copied: "Itinerario copiado",
      dayNote: "Los tiempos son aproximados e incluyen 20 min de traslado entre paradas.",
      daySummary: (n, fin) => `${n} parada${n === 1 ? "" : "s"} · terminas ~${fin}`,
      up: "Subir", down: "Bajar", less: "Menos tiempo", more: "Más tiempo", del: "Quitar",
      stops: (n) => `${n} paradas`, myDayShare: "Mi día en Valdivia",
      weather: (t, p) => `${t}°${p >= 40 ? ` · ${p}% lluvia` : ""}`,
      eventTag: "Panorama de la semana", eventPlan: "Armar mi domingo", eventSite: "Sitio oficial", eventBadge: "Ironman",
      countdown: (d, h) => (d > 0 ? `Faltan ${d} día${d === 1 ? "" : "s"}` : h > 0 ? `Faltan ${h} h` : "¡Hoy!"), live: "En carrera ahora",
      seeReport: "Ver informe de transparencia", back: "Volver", transpTitle: "Transparencia", transpSub: "Cada aporte y cada entrega al club, a la vista de todos.",
      kRecv: "Recibido", kSent: "Entregado al club", kHeld: "Por entregar", howTitle: "Cómo funciona", transfersTitle: "Entregas al club", donorsTitle: "Negocios que aportan",
      reglas: ["Los negocios transfieren su aporte a una cuenta dedicada solo a esta campaña, a nombre del creador de Remada.", "Cada 15 días, lo reunido se entrega a la categoría U13 del Club de Deportes Las Ánimas.", "Aquí publicamos cada entrega con su fecha y comprobante.", "Hasta los $5.000.000, todo va a las familias. Si se supera la meta, el excedente cubre la operación de Remada y lo que sobre vuelve a las familias. Remada no busca lucro."],
      noTransfers: "Aún no hay entregas. La primera será dentro de los próximos 15 días.", receipt: "Ver comprobante",
      noDonors: "Pronto verás aquí a los negocios que aportan.", updated: (h) => `Datos en vivo desde la planilla de la campaña · ${h}`,
      progress: (p, d) => `${p}% de la meta · ${d}`,
      wordsTitle: "Habla como valdiviano", wordsSub: "Las palabras que vas a escuchar en la calle, la mesa y la micro.",
      langBtn: "EN", langLabel: "Change language to English", call_: "Llamar al"
    },
    en: {
      skip: "Skip to content", sos: "SOS", offline: "You're offline. Showing your saved information.",
      todayTitle: "Discover Valdivia", todaySub: "Eat, explore and plan your day, all in one place.",
      campaignTitle: "Your visit supports the Las Ánimas U13 team",
      of: (m) => `of ${m}`, campaignFoot: (n, d) => `${n ? n + " businesses contributing · " : ""}Goal by ${d}`,
      plansTitle: "Plan your day in 1 tap", featuredTitle: "Featured", ideasTitle: "Must-sees", ideasRain: "Indoor plans", seeAll: "See all",
      tipTitle: "Tip of the day", eatTitle: "Eat and drink", doTitle: "Things to do", dayTitle: "My day", helpTitle: "Help",
      moveTitle: "Getting around", tipsTitle: "Tips", moveNote: "Prices and schedules may change. Check before you go.",
      tsunamiTitle: "Earthquake or tsunami on the coast",
      tsunamiBody: "If the quake makes it hard to stand or you hear the siren: walk to high ground. Don't wait for an official warning.",
      source: "Source", search: "Search", searchPh: "Search a place or dish", searchPh2: "Search a place or activity",
      footerBusiness: "Own a business in Valdivia?", footerCta: "Join and support the U13 team",
      footerNote: "“Partner” and “Featured” mean a larger contribution to the campaign. Info is for reference: check hours before you go.",
      photoCredits: "Photos: Wikimedia Commons, under free licenses. Tap each photo credit to see author and license.",
      tabToday: "Today", tabEat: "Eat", tabDo: "Do", tabDay: "My day", tabHelp: "Help",
      all: "All", directions: "Directions", call: "Call", web: "Website", whatsapp: "WhatsApp",
      featured: "Featured", main: "Partner", supports: "Supports U13", indoor: "Indoors",
      byBusiness: "Information provided by the business", photo: "Photo",
      results: (n) => `${n} result${n === 1 ? "" : "s"}`,
      empty: "No results. Try another search.", noBusiness: "Campaign businesses will appear here soon.",
      open: (n) => `View ${n}`, add: (n) => `Add ${n} to My day`, remove: (n) => `Remove ${n} from My day`,
      added: "Added to My day", removed: "Removed from My day", planAdded: (n) => `${n} stops in My day`,
      addDay: "Add to My day", inDay: "In My day", close: "Close",
      min: (m) => (m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? " " + (m % 60) + " min" : ""}` : `${m} min`),
      startAt: "I start at", dayEmptyT: "Your day is empty", dayEmpty: "Tap “+” on any place or pick a ready-made plan.",
      openRoute: "See route on map", share: "Share", clear: "Clear", copied: "Itinerary copied",
      dayNote: "Times are approximate and include 20 min of travel between stops.",
      daySummary: (n, fin) => `${n} stop${n === 1 ? "" : "s"} · finish ~${fin}`,
      up: "Move up", down: "Move down", less: "Less time", more: "More time", del: "Remove",
      stops: (n) => `${n} stops`, myDayShare: "My day in Valdivia",
      weather: (t, p) => `${t}°${p >= 40 ? ` · ${p}% rain` : ""}`,
      eventTag: "This week's big event", eventPlan: "Plan my Sunday", eventSite: "Official site", eventBadge: "Ironman",
      countdown: (d, h) => (d > 0 ? `${d} day${d === 1 ? "" : "s"} to go` : h > 0 ? `${h} h to go` : "Today!"), live: "Racing now",
      seeReport: "See transparency report", back: "Back", transpTitle: "Transparency", transpSub: "Every contribution and every handover to the club, in the open.",
      kRecv: "Received", kSent: "Given to the club", kHeld: "To be handed over", howTitle: "How it works", transfersTitle: "Handovers to the club", donorsTitle: "Contributing businesses",
      reglas: ["Businesses transfer their contribution to an account used only for this campaign, held by the creator of Remada.", "Every 15 days, the funds are handed to the U13 team of Club de Deportes Las Ánimas.", "We publish each handover here with its date and receipt.", "Up to CLP 5,000,000, everything goes to the families. Any surplus covers Remada's running costs, and the rest goes back to the families. Remada is non-profit."],
      noTransfers: "No handovers yet. The first one will happen within the next 15 days.", receipt: "See receipt",
      noDonors: "Contributing businesses will appear here soon.", updated: (h) => `Live data from the campaign sheet · ${h}`,
      progress: (p, d) => `${p}% of the goal · ${d}`,
      wordsTitle: "Talk like a local", wordsSub: "Words you'll hear on the street, at the table and on the bus.",
      langBtn: "ES", langLabel: "Cambiar idioma a español", call_: "Call"
    }
  };

  const EMERGENCIAS = [
    { n: "131", es: "Ambulancia", en: "Ambulance" },
    { n: "132", es: "Bomberos", en: "Fire" },
    { n: "133", es: "Carabineros", en: "Police" },
    { n: "137", es: "Emergencia en el mar", en: "Sea rescue" }
  ];
  const MOVERSE = [
    { es: ["A pie", "Centro, costanera e Isla Teja se recorren caminando."], en: ["On foot", "Downtown, the waterfront and Isla Teja are walkable."] },
    { es: ["Micro (bus)", "Recorren la ciudad y llegan a Niebla. Lleva monedas por si acaso."], en: ["Micro (city bus)", "They cover the city and go to Niebla. Carry some coins."] },
    { es: ["Colectivo", "Taxi compartido con ruta fija. Rápido y barato, se paga en efectivo."], en: ["Colectivo", "Shared taxi with a fixed route. Fast and cheap, pay in cash."] },
    { es: ["Taxi y apps", "Lo más cómodo de noche o al aeródromo."], en: ["Taxis and apps", "Easiest at night or to the airport."] },
    { es: ["Niebla – Corral", "Barcaza y lanchas desde el muelle de Niebla. Con mal tiempo se suspenden."], en: ["Niebla – Corral", "Ferry and boats from Niebla pier. They stop in bad weather."] },
    { es: ["Llegar y salir", "Aeródromo Pichoy: 30 min al centro. Terminal de buses: a pasos del centro."], en: ["Arriving and leaving", "Pichoy airport: 30 min to downtown. Bus terminal: close to downtown."] }
  ];
  const TIPS = [
    { es: ["Clima", "Llueve seguido, incluso en verano. Lleva chaqueta impermeable."], en: ["Weather", "It rains often, even in summer. Bring a rain jacket."] },
    { es: ["Dinero", "Casi todo acepta tarjeta. Propina sugerida: 10%."], en: ["Money", "Most places take cards. Customary tip: 10%."] },
    { es: ["Lobos marinos", "Míralos a distancia. No los alimentes: pueden morder."], en: ["Sea lions", "Watch from a distance. Don't feed them: they bite."] },
    { es: ["Cerveza", "Valdivia es la capital cervecera. Si tomas, no manejes."], en: ["Beer", "Valdivia is the craft beer capital. If you drink, don't drive."] },
    { es: ["Ironman y eventos", "En días de carrera se cierran calles y la costanera. Mejor camina."], en: ["Ironman and events", "On race days streets and the waterfront close. Walk instead."] },
    { es: ["Costa", "Respeta los cierres de senderos y playas: hay riesgo de derrumbes."], en: ["Coast", "Respect closed trails and beaches: there is landslide risk."] }
  ];
  // Palabras locales: [palabra, significado es, significado en, ejemplo]
  const PALABRAS = {
    charla: { es: "Conversar", en: "Small talk", items: [
      ["¿Cachai?", "¿Entiendes?", "Get it? / You know?", "«Es por allá, ¿cachai?»"],
      ["Po", "Muletilla que refuerza: «sí po», «no po»", "Filler word for emphasis: “sí po” = yeah, sure", "«¡Obvio po!»"],
      ["¿Cómo estai?", "¿Cómo estás? (informal)", "How are you? (casual)", "«¡Hola! ¿Cómo estai?»"],
      ["Bacán", "Genial, muy bueno", "Awesome", "«El paseo en barco estuvo bacán»"],
      ["Fome", "Aburrido, sin gracia", "Boring, lame", "«Llovió y el día quedó fome»"],
      ["Cuático", "Impresionante o exagerado", "Wild, intense, unbelievable", "«Correr 42 km es cuático»"],
      ["Harto", "Mucho, bastante", "A lot, plenty", "«Hay harta gente en la Costanera»"],
      ["Al tiro", "Enseguida, ahora mismo", "Right away", "«Te lo traigo al tiro»"],
      ["Piola", "Tranquilo, sin llamar la atención", "Chill, low-key", "«Un bar piola junto al río»"],
      ["Pololo / polola", "Novio / novia", "Boyfriend / girlfriend", "«Vine con mi polola»"],
      ["Cabros", "Chicos, jóvenes", "Kids, young people", "«Los cabros de la U13 juegan el sábado»"],
      ["Guagua", "Bebé", "Baby", "«¿Hay mudador para la guagua?»"],
      ["Pega", "Trabajo", "Job, work", "«Mañana tengo pega temprano»"],
      ["Carrete", "Fiesta, salida nocturna", "Party, night out", "«¿Dónde es el carrete?»"]
    ]},
    mesa: { es: "En la mesa", en: "Food and drink", items: [
      ["Once", "Merienda de la tarde, con pan, té y algo dulce", "Afternoon tea with bread and something sweet", "«Tomemos once con kuchen»"],
      ["Kuchen", "Pastel de origen alemán, típico del sur", "German-style cake, a southern classic", "«El kuchen de murta es de aquí»"],
      ["Schop", "Cerveza de barril", "Draft beer", "«Un schop de la casa, por favor»"],
      ["Chela", "Cerveza (informal)", "Beer (slang)", "«¿Vamos por unas chelas?»"],
      ["Copete", "Trago con alcohol", "Alcoholic drink", "«Sin copete, que mañana corro»"],
      ["Paila marina", "Caldo caliente de mariscos y pescado", "Hot seafood and fish soup", "«Ideal para un día de lluvia»"],
      ["Curanto", "Mariscos, carnes y papas cocidos juntos", "Shellfish, meat and potatoes cooked together", "«En Niebla sirven curanto en olla»"],
      ["Completo", "Hot dog con palta, tomate y mayo", "Hot dog with avocado, tomato and mayo", "«Un completo italiano»"],
      ["Palta", "Aguacate", "Avocado", "«¿Le pone palta?»"],
      ["Sopaipilla", "Masa frita de zapallo", "Fried pumpkin dough", "«Sopaipillas con pebre cuando llueve»"],
      ["Pebre", "Salsa de tomate, cebolla, cilantro y ají", "Fresh tomato, onion and chili salsa", "«Pásame el pebre»"],
      ["Mote con huesillo", "Bebida dulce con trigo y durazno seco", "Sweet drink with wheat and dried peach", "«Refrescante en verano»"],
      ["Murta", "Fruto silvestre del sur, rojo y aromático", "Wild southern berry", "«Mermelada de murta»"]
    ]},
    calle: { es: "En la calle", en: "Getting around", items: [
      ["Micro", "Bus urbano", "City bus", "«La micro a Niebla pasa por la Costanera»"],
      ["Colectivo", "Taxi compartido con ruta fija", "Shared taxi with a fixed route", "«Toma un colectivo a la Isla Teja»"],
      ["Paradero", "Parada de bus", "Bus stop", "«Bájate en el paradero del puente»"],
      ["Taco", "Atasco de tráfico", "Traffic jam", "«Con el Ironman habrá taco»"],
      ["Luca", "Mil pesos", "1,000 pesos", "«Son cinco lucas»"],
      ["Gamba", "Cien pesos", "100 pesos", "«Me faltan dos gambas»"],
      ["Cuadra", "Distancia entre esquinas, unos 100 m", "One city block, about 100 m", "«Está a tres cuadras»"],
      ["Achuntar", "Acertar, dar en el blanco", "To get it right, hit the spot", "«¡Achuntamos con el día sin lluvia!»"]
    ]}
  };
  let temaPalabras = "charla";

  const SECTORES = ["Valdivia centro", "Isla Teja", "Otro sector de Valdivia", "Niebla y Los Molinos", "Corral", "Curiñanco y costa"];
  const SECTOR_EN = { "Valdivia centro": "Downtown", "Isla Teja": "Isla Teja", "Otro sector de Valdivia": "Other areas", "Niebla y Los Molinos": "Niebla", "Corral": "Corral", "Curiñanco y costa": "Coast" };
  const HERO = "Vista_de_Valdivia_(Puente_PdeV,_01).jpg";
  const TRASLADO = 20;

  // ---------- Íconos ----------
  const I = {
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    pin: '<svg viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    nav: '<svg viewBox="0 0 24 24"><path d="m3 11 19-9-9 19-2-8-8-2z"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20z"/></svg>',
    chat: '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5z"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    up: '<svg viewBox="0 0 24 24"><path d="m18 15-6-6-6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
    minus: '<svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>',
    food: '<svg viewBox="0 0 24 24"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>',
    mountain: '<svg viewBox="0 0 24 24"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>'
  };

  // ---------- Estado ----------
  const leer = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } };
  let lang = leer("valdi-lang") || ((navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en");
  const estado = {
    lugares: [], planes: [], negocios: [], evento: null, porId: new Map(),
    campana: { recaudado: CFG.recaudado || 0, negocios: CFG.negocios || 0 }, traspasos: [], cargadoEn: null,
    lluvia: null, filtros: { comer: null, hacer: null }, q: { comer: "", hacer: "" },
    dia: (() => { try { return JSON.parse(leer("valdi-dia") || "[]"); } catch (e) { return []; } })(),
    inicio: leer("valdi-inicio") || "10:00"
  };
  const t = (k, ...a) => { const v = (T[lang] || T.es)[k]; return typeof v === "function" ? v(...a) : v; };

  // ---------- Utilidades ----------
  const el = (tag, attrs = {}, ...hijos) => {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === false || v == null) continue;
      if (k === "class") e.className = v; else if (k === "text") e.textContent = v; else if (k === "html") e.innerHTML = v;
      else if (k.startsWith("on")) e.addEventListener(k.slice(2), v); else e.setAttribute(k, v);
    }
    for (const h of hijos) if (h) e.append(h);
    return e;
  };
  const sinTildes = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const slug = (s) => sinTildes(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const url = (u) => (/^https?:\/\//i.test(u) ? u : "https://" + u.replace(/^\/+/, ""));
  const fmtCLP = (n) => new Intl.NumberFormat(lang === "es" ? "es-CL" : "en-US", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);
  const fotoUrl = (p, w = 800) => !p.foto ? "" : /^https:\/\//.test(p.foto) ? p.foto : `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(p.foto)}?width=${w}`;
  const fotoPagina = (p) => (p.foto && !/^https:\/\//.test(p.foto) ? "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(p.foto.replace(/ /g, "_")) : "");
  const mapaUrl = (p) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(p.mapa || p.nombre + ", Valdivia");
  const corto = (p) => (p.corto && (p.corto[lang] || p.corto.es)) || ((lang === "en" && p.en) ? p.en : p.es) || "";
  const largo = (p) => ((lang === "en" && p.en) ? p.en : p.es) || "";
  const sector = (p) => (lang === "en" ? (SECTOR_EN[p.sector] || p.sector) : p.sector);
  const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  const hoyClave = new Date().toISOString().slice(0, 10);
  const eventoActivo = () => estado.evento && Date.now() < new Date(estado.evento.hasta).getTime();
  const rango = (p) => (p.evento && eventoActivo() ? -1 : p.negocio ? p.nivel : 3);
  const ordenar = (a, b) => {
    const na = rango(a), nb = rango(b);
    return na !== nb ? na - nb : hash(hoyClave + a.id) - hash(hoyClave + b.id);
  };

  let toastTimer;
  function toast(msg) {
    const tt = $("#toast"); tt.textContent = msg; tt.classList.add("visible");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => tt.classList.remove("visible"), 1800);
  }

  // Imágenes con aparición suave y respaldo si no cargan
  function imagen(src, alt, cont, icono) {
    const ph = () => { cont.classList.add("lista"); if (!cont.querySelector(".sin-foto")) cont.prepend(el("div", { class: "sin-foto", html: icono })); };
    if (!src) { ph(); return null; }
    const img = el("img", { src, alt, loading: "lazy", decoding: "async" });
    img.addEventListener("load", () => { img.classList.add("cargada"); cont.classList.add("lista"); });
    img.addEventListener("error", () => { img.remove(); ph(); });
    return img;
  }

  // Revelado al hacer scroll
  const io = "IntersectionObserver" in window && !reduceMotion
    ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" })
    : null;
  const revelar = (n, i = 0) => { n.classList.add("revelar"); if (!io) { n.classList.add("visible"); return n; } n.style.transitionDelay = Math.min(i, 6) * 50 + "ms"; io.observe(n); return n; };

  // ---------- CSV ----------
  function parseCSV(txt) {
    const filas = []; let fila = [], campo = "", q = false;
    for (let i = 0; i < txt.length; i++) {
      const c = txt[i];
      if (q) { if (c === '"' && txt[i + 1] === '"') { campo += '"'; i++; } else if (c === '"') q = false; else campo += c; }
      else if (c === '"') q = true;
      else if (c === ",") { fila.push(campo); campo = ""; }
      else if (c === "\n" || c === "\r") { if (c === "\r" && txt[i + 1] === "\n") i++; fila.push(campo); filas.push(fila); fila = []; campo = ""; }
      else campo += c;
    }
    if (campo || fila.length) { fila.push(campo); filas.push(fila); }
    const cab = (filas.shift() || []).map((s) => sinTildes(s.trim()).replace(/\s+/g, "_"));
    return filas.filter((f) => f.some((x) => x.trim())).map((f) => Object.fromEntries(cab.map((h, i) => [h, (f[i] || "").trim()])));
  }
  async function traerCSV(u, clave) {
    if (!u) return null;
    try {
      const r = await fetch(u, { cache: "no-store" }); if (!r.ok) throw new Error(r.status);
      const txt = await r.text(); guardar(clave, txt); return parseCSV(txt);
    } catch (e) { const v = leer(clave); return v ? parseCSV(v) : null; }
  }
  function aNegocio(f) {
    const nv = sinTildes(f.nivel || "").trim();
    const tipo = /comida|bebida|comer|restaurant|cafe/i.test(f.rubro || "") ? "comer" : "hacer";
    const d = f.descripcion || "";
    return {
      id: "neg-" + slug(f.nombre), negocio: true, tipo, nombre: f.nombre, sector: f.sector || "",
      direccion: f.direccion || "", horario: f.horario || "", es: d, en: f.descripcion_en || "",
      corto: { es: d.length > 70 ? d.slice(0, 68).replace(/\s+\S*$/, "") + "…" : d, en: (f.descripcion_en || "").slice(0, 70) || undefined },
      web: f.web || "", telefono: f.telefono || "", foto: /^https:\/\//.test(f.foto || "") ? f.foto : "", promocion: f.promocion || "",
      nivel: nv.startsWith("aliado") || nv.startsWith("principal") ? 0 : nv.startsWith("destacado") ? 1 : 2,
      duracion: tipo === "comer" ? 60 : 90, mapa: [f.nombre, f.direccion, "Valdivia"].filter(Boolean).join(", ")
    };
  }

  // ---------- Tarjetas ----------
  function enDia(id) { return estado.dia.some((s) => s.id === id); }
  function botonMas(p) {
    const b = el("button", { type: "button", class: "btn-mas", html: I.plus, "aria-pressed": String(enDia(p.id)), "aria-label": enDia(p.id) ? t("remove", p.nombre) : t("add", p.nombre), "data-mas": p.id });
    b.addEventListener("click", (e) => { e.stopPropagation(); alternarDia(p.id); });
    return b;
  }
  function insignias(p) {
    const c = el("div", { class: "insignias" });
    if (p.evento && eventoActivo()) c.append(el("span", { class: "insignia evt", text: t("eventBadge") }));
    if (p.negocio && p.nivel <= 1) c.append(el("span", { class: "insignia dest", text: p.nivel === 0 ? t("main") : t("featured") }));
    if (p.lluvia && estado.lluvia >= 60) c.append(el("span", { class: "insignia", text: t("indoor") }));
    return c;
  }
  function tarjeta(p, i) {
    const media = el("div", { class: "card-media" });
    const img = imagen(fotoUrl(p, 640), "", media, p.tipo === "comer" ? I.food : I.mountain);
    if (img) media.append(img);
    media.append(insignias(p));
    const pag = fotoPagina(p);
    if (pag) media.append(el("a", { class: "credito", href: pag, target: "_blank", rel: "noopener", text: "© Wikimedia Commons", style: "z-index:2", "aria-label": `${t("photo")}: Wikimedia Commons` }));
    const meta = el("div", { class: "card-meta" },
      p.sector ? el("span", { html: I.pin + " " }, document.createTextNode(sector(p))) : null,
      p.duracion ? el("span", { html: I.clock + " " }, document.createTextNode(t("min", p.duracion))) : null);
    const cls = "card" + (p.negocio && p.nivel === 0 ? " aliado" : p.negocio && p.nivel === 1 ? " destacado" : "");
    const card = el("article", { class: cls },
      media,
      el("div", { class: "card-cuerpo" },
        el("h3", { text: p.nombre }),
        el("p", { class: "card-linea", text: corto(p) }),
        meta,
        p.promocion ? el("p", { class: "card-promo", text: p.promocion }) : null),
      el("button", { type: "button", class: "card-abrir", "aria-label": t("open", p.nombre), onclick: () => abrirFicha(p) }),
      botonMas(p));
    return revelar(card, i);
  }
  function pintar(cont, items, vacio) {
    cont.replaceChildren(...(items.length ? items.map(tarjeta) : [el("p", { class: "vacio", text: vacio })]));
  }
  function tarjetaPlan(plan) {
    const primero = estado.porId.get(plan.paradas[0]);
    const b = el("button", { type: "button", class: "plan pressable", onclick: () => cargarPlan(plan) });
    const src = primero && fotoUrl(primero, 640);
    if (src) { const img = el("img", { src, alt: "", loading: "lazy" }); img.addEventListener("error", () => img.remove()); b.append(img); }
    const total = plan.paradas.reduce((s, id) => s + ((estado.porId.get(id) || {}).duracion || 60), 0) + TRASLADO * (plan.paradas.length - 1);
    b.append(el("strong", { text: plan[lang] || plan.es }), el("span", { text: `${t("stops", plan.paradas.length)} · ${t("min", Math.round(total / 30) * 30)}` }));
    return b;
  }

  // ---------- Ficha ----------
  function abrirFicha(p) {
    const d = $("#ficha");
    const media = el("div", { class: "hoja-media" });
    const img = imagen(fotoUrl(p, 1200), p.nombre, media, p.tipo === "comer" ? I.food : I.mountain);
    if (img) { img.loading = "eager"; media.append(img); }
    const pag = fotoPagina(p);
    if (pag) media.append(el("a", { class: "credito", href: pag, target: "_blank", rel: "noopener", text: "© Wikimedia Commons" }));
    media.append(el("button", { type: "button", class: "hoja-cerrar", html: I.x, "aria-label": t("close"), onclick: cerrarFicha }));

    const acc = el("div", { class: "hoja-acciones" },
      el("a", { class: "btn pressable", href: mapaUrl(p), target: "_blank", rel: "noopener", html: I.nav + " " }, document.createTextNode(t("directions"))));
    const bDia = el("button", { type: "button", class: "btn-secundario pressable", "data-ficha-dia": p.id });
    const pintarBDia = () => { bDia.innerHTML = (enDia(p.id) ? I.x : I.plus) + " "; bDia.append(document.createTextNode(enDia(p.id) ? t("inDay") : t("addDay"))); };
    pintarBDia(); bDia.addEventListener("click", () => { alternarDia(p.id); pintarBDia(); });
    acc.append(bDia);
    if (p.telefono) {
      const tel = p.telefono.replace(/[^\d+]/g, "");
      acc.append(el("a", { class: "btn-secundario pressable", href: "tel:" + tel, html: I.phone + " " }, document.createTextNode(t("call"))));
      const wa = tel.replace(/^\+/, "");
      if (/^(56)?9\d{8}$/.test(wa)) acc.append(el("a", { class: "btn-secundario pressable", href: "https://wa.me/" + (wa.startsWith("56") ? wa : "56" + wa), target: "_blank", rel: "noopener", html: I.chat + " " }, document.createTextNode(t("whatsapp"))));
    }
    if (p.web) acc.append(el("a", { class: "btn-secundario pressable", href: url(p.web), target: "_blank", rel: "noopener", html: I.globe + " " }, document.createTextNode(t("web"))));

    const dato = (ic, txt) => (txt ? el("div", { class: "dato", html: ic }, el("span", { text: txt })) : null);
    const info = el("div", { class: "hoja-info" },
      p.negocio && p.nivel <= 1 ? el("span", { class: "insignia dest", style: "align-self:flex-start", text: p.nivel === 0 ? t("main") : t("featured") }) : null,
      el("h2", { id: "ficha-titulo", text: p.nombre }),
      el("p", { class: "desc", text: largo(p) }),
      p.promocion ? el("p", { class: "card-promo", text: p.promocion }) : null,
      el("div", { class: "datos" },
        dato(I.pin, [p.direccion, sector(p)].filter(Boolean).join(" · ")),
        dato(I.clock, p.horario || (p.duracion ? t("min", p.duracion) : ""))),
      acc,
      p.negocio
        ? el("p", { class: "fuente", text: `${t("byBusiness")} · ${t("supports")}` })
        : el("p", { class: "fuente" }, document.createTextNode(t("source") + ": "), el("a", { href: p.fuenteUrl, target: "_blank", rel: "noopener", text: p.fuente })));
    $("#ficha-cuerpo").replaceChildren(media, info);
    d.classList.remove("cerrando");
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
  }
  function cerrarFicha() {
    const d = $("#ficha");
    if (reduceMotion) { d.close(); return; }
    d.classList.add("cerrando");
    setTimeout(() => { d.classList.remove("cerrando"); d.close(); }, 230);
  }

  // ---------- Mi día ----------
  function guardarDia() { guardar("valdi-dia", JSON.stringify(estado.dia)); }
  function actualizarContador(pop) {
    const c = $("#contador-dia"); const n = estado.dia.length;
    c.hidden = !n; c.textContent = n;
    if (pop && !reduceMotion) { c.classList.remove("pop"); void c.offsetWidth; c.classList.add("pop"); }
  }
  function alternarDia(id) {
    const p = estado.porId.get(id); if (!p) return;
    if (enDia(id)) { estado.dia = estado.dia.filter((s) => s.id !== id); toast(t("removed")); }
    else { estado.dia.push({ id, dur: p.duracion || 60 }); toast(t("added")); }
    guardarDia(); actualizarContador(true);
    document.querySelectorAll(`[data-mas="${CSS.escape(id)}"]`).forEach((b) => {
      b.setAttribute("aria-pressed", String(enDia(id)));
      b.setAttribute("aria-label", enDia(id) ? t("remove", p.nombre) : t("add", p.nombre));
    });
    pintarDia();
  }
  function cargarPlan(plan) {
    let n = 0;
    for (const id of plan.paradas) { const p = estado.porId.get(id); if (p && !enDia(id)) { estado.dia.push({ id, dur: p.duracion || 60 }); n++; } }
    guardarDia(); actualizarContador(true); pintarDia(); pintarTarjetasMas();
    toast(t("planAdded", estado.dia.length));
    if (location.hash !== "#dia") location.hash = "#dia";
    return n;
  }
  function pintarTarjetasMas() {
    document.querySelectorAll("[data-mas]").forEach((b) => b.setAttribute("aria-pressed", String(enDia(b.dataset.mas))));
  }
  const aMin = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + (m || 0); };
  const aHora = (min) => { min = ((min % 1440) + 1440) % 1440; return String(Math.floor(min / 60)).padStart(2, "0") + ":" + String(min % 60).padStart(2, "0"); };

  function pintarDia() {
    estado.dia = estado.dia.filter((s) => estado.porId.has(s.id));
    const lista = $("#lista-dia"); const n = estado.dia.length;
    $("#dia-vacio").hidden = n > 0; $("#dia-acciones").hidden = n === 0;
    let reloj = aMin(estado.inicio);
    const filas = estado.dia.map((s, i) => {
      const p = estado.porId.get(s.id);
      const hora = aHora(reloj); reloj += s.dur + (i < n - 1 ? TRASLADO : 0);
      const foto = fotoUrl(p, 200);
      const img = foto ? el("img", { class: "parada-foto", src: foto, alt: "", loading: "lazy" }) : el("div", { class: "parada-foto" });
      if (foto) img.addEventListener("error", () => img.replaceWith(el("div", { class: "parada-foto" })));
      const mover = (d) => { const j = i + d; [estado.dia[i], estado.dia[j]] = [estado.dia[j], estado.dia[i]]; guardarDia(); pintarDia(); };
      const durar = (d) => { s.dur = Math.max(15, Math.min(300, s.dur + d)); guardarDia(); pintarDia(); };
      const btn = (ic, label, fn, extra = {}) => el("button", Object.assign({ type: "button", class: "icon-btn pressable", html: ic, "aria-label": `${label}: ${p.nombre}`, onclick: fn }, extra));
      return el("li", { class: "parada" },
        el("div", { class: "parada-hora", text: hora }),
        el("div", { class: "parada-caja" },
          img,
          el("div", { class: "parada-info" },
            el("h3", {}, el("button", { type: "button", class: "parada-nombre", text: p.nombre, "aria-label": t("open", p.nombre), onclick: () => abrirFicha(p) })),
            el("p", { text: `${sector(p)} · ${t("min", s.dur)}` })),
          el("div", { class: "parada-botones" },
            btn(I.up, t("up"), () => mover(-1), { disabled: i === 0 ? "" : null }),
            btn(I.down, t("down"), () => mover(1), { disabled: i === n - 1 ? "" : null }),
            btn(I.minus, t("less"), () => durar(-15)),
            btn(I.plus, t("more"), () => durar(15)),
            btn(I.trash, t("del"), () => alternarDia(p.id), { class: "icon-btn quitar pressable" }))));
    });
    lista.replaceChildren(...filas);
    $("#dia-resumen").textContent = n ? t("daySummary", n, aHora(reloj)) : "";
    if (n) {
      const q = (p) => encodeURIComponent(p.mapa || p.nombre + ", Valdivia");
      const ps = estado.dia.map((s) => estado.porId.get(s.id));
      let u = "https://www.google.com/maps/dir/?api=1&destination=" + q(ps[ps.length - 1]);
      if (ps.length > 1) u += "&origin=" + q(ps[0]);
      if (ps.length > 2) u += "&waypoints=" + ps.slice(1, -1).map(q).join("%7C");
      $("#abrir-ruta").href = u;
      $("#abrir-ruta").innerHTML = I.nav + " "; $("#abrir-ruta").append(document.createTextNode(t("openRoute")));
    }
  }
  function textoDia() {
    let reloj = aMin(estado.inicio);
    const lineas = estado.dia.map((s, i) => { const p = estado.porId.get(s.id); const l = `${aHora(reloj)} ${p.nombre}`; reloj += s.dur + TRASLADO; return l; });
    return `${t("myDayShare")}\n${lineas.join("\n")}\n\n${location.href.split("#")[0]}`;
  }

  // ---------- Vistas ----------
  function pintarModulo(mod) {
    const q = sinTildes(estado.q[mod]); const f = estado.filtros[mod];
    const base = todos().filter((p) => p.tipo === mod);
    const items = base.filter((p) => (!f || p.sector === f) && (!q || sinTildes([p.nombre, p.es, p.en, p.sector, p.direccion].join(" ")).includes(q)));
    pintar($("#lista-" + mod), items, t("empty"));
    $("#n-" + mod).textContent = t("results", items.length);
    const sectores = SECTORES.filter((s) => base.some((p) => p.sector === s));
    $("#filtros-" + mod).replaceChildren(...[null, ...sectores].map((s) =>
      el("button", { type: "button", class: "pressable", "aria-pressed": String(f === s), text: s ? (lang === "en" ? SECTOR_EN[s] : s) : t("all"), onclick: () => { estado.filtros[mod] = s; pintarModulo(mod); } })));
  }
  const todos = () => [...estado.negocios, ...estado.lugares].sort(ordenar);

  function contar(nodo, hasta) {
    if (reduceMotion || !hasta) { nodo.textContent = fmtCLP(hasta); return; }
    const t0 = performance.now(), dur = 1200;
    const paso = (now) => { const k = Math.min(1, (now - t0) / dur); const e = 1 - Math.pow(1 - k, 3); nodo.textContent = fmtCLP(Math.round(hasta * e)); if (k < 1) requestAnimationFrame(paso); };
    requestAnimationFrame(paso);
  }
  function pintarHoy() {
    const { recaudado, negocios } = estado.campana; const meta = CFG.meta || 5000000;
    contar($("#monto-recaudado"), recaudado);
    $("#monto-meta").textContent = t("of", fmtCLP(meta));
    const barra = $("#barra-meta");
    barra.setAttribute("aria-valuemax", meta); barra.setAttribute("aria-valuenow", recaudado);
    barra.setAttribute("aria-valuetext", `${fmtCLP(recaudado)} ${t("of", fmtCLP(meta))}`);
    requestAnimationFrame(() => { $("#relleno-meta").style.width = Math.min(100, (recaudado / meta) * 100) + "%"; });
    const fecha = new Intl.DateTimeFormat(lang === "es" ? "es-CL" : "en-US", { day: "numeric", month: "long", timeZone: "America/Santiago" }).format(new Date((CFG.fechaMeta || "2027-01-04") + "T12:00:00-03:00"));
    $("#texto-meta").textContent = t("campaignFoot", negocios, fecha);

    pintar($("#lista-destacados"), estado.negocios.slice().sort(ordenar).slice(0, 6), t("noBusiness"));
    const lluvia = estado.lluvia != null && estado.lluvia >= 60;
    $("#t-sugerencias").textContent = lluvia ? t("ideasRain") : t("ideasTitle");
    const base = estado.lugares.filter((p) => !p.evento || eventoActivo()).sort((a, b) => (rango(a) - rango(b)) || (hash(hoyClave + a.id) - hash(hoyClave + b.id)));
    pintar($("#lista-sugerencias"), (lluvia ? base.filter((p) => p.lluvia || p.evento) : base).slice(0, 6), t("empty"));
    pintarEvento();
    const planes = estado.planes.filter((pl) => pl.id !== "ironman" || eventoActivo());
    $("#lista-planes").replaceChildren(...planes.map(tarjetaPlan));
    $("#planes-dia").replaceChildren(...planes.map(tarjetaPlan));
    const tip = TIPS[Math.floor(Date.now() / 86400000) % TIPS.length][lang];
    $("#tip-dia").textContent = `${tip[0]}: ${tip[1]}`;
  }
  function pintarTransparencia() {
    const meta = CFG.meta || 5000000, recibido = estado.campana.recaudado;
    const entregado = estado.traspasos.reduce((s, x) => s + x.monto, 0);
    $("#k-recibido").textContent = fmtCLP(recibido);
    $("#k-traspasado").textContent = fmtCLP(entregado);
    $("#k-saldo").textContent = fmtCLP(Math.max(0, recibido - entregado));
    const pct = Math.min(100, Math.round((recibido / meta) * 100));
    const barra = $("#barra-transp"); barra.setAttribute("aria-valuemax", meta); barra.setAttribute("aria-valuenow", recibido);
    requestAnimationFrame(() => { $("#relleno-transp").style.width = pct + "%"; });
    const fecha = new Intl.DateTimeFormat(lang === "es" ? "es-CL" : "en-US", { day: "numeric", month: "long", timeZone: "America/Santiago" }).format(new Date((CFG.fechaMeta || "2027-01-04") + "T12:00:00-03:00"));
    $("#texto-transp").textContent = t("progress", pct, `${fmtCLP(meta)} · ${fecha}`);
    $("#reglas").replaceChildren(...t("reglas").map((r) => el("li", {}, el("p", { text: r }))));
    const fmtF = (f) => { const d = new Date(f + "T12:00:00-03:00"); return isNaN(d) ? f : new Intl.DateTimeFormat(lang === "es" ? "es-CL" : "en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "America/Santiago" }).format(d); };
    const ent = estado.traspasos.slice().sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
    $("#lista-entregas").replaceChildren(...(ent.length ? ent.map((x) => el("li", { class: "entrega" },
      el("span", { class: "f", text: fmtF(x.fecha) }), el("strong", { text: fmtCLP(x.monto) }),
      el("span", { class: "d", text: [x.destino || "U13 Club de Deportes Las Ánimas", x.nota].filter(Boolean).join(" · ") }),
      /^https:\/\//.test(x.comprobante) ? el("a", { href: x.comprobante, target: "_blank", rel: "noopener", text: t("receipt") }) : null))
      : [el("li", { class: "vacio", text: t("noTransfers") })]));
    const ap = estado.negocios.slice().sort((a, b) => a.nivel - b.nivel || a.nombre.localeCompare(b.nombre));
    $("#lista-aportantes").replaceChildren(...(ap.length ? ap.map((p) => el("span", { class: "aportante n" + p.nivel, text: p.nombre })) : [el("p", { class: "vacio", text: t("noDonors") })]));
    const h = estado.cargadoEn ? new Intl.DateTimeFormat(lang === "es" ? "es-CL" : "en-US", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short", timeZone: "America/Santiago" }).format(estado.cargadoEn) : "";
    $("#transp-actualizado").textContent = h ? t("updated", h) : "";
  }
  function pintarEvento() {
    const ev = estado.evento, caja = $("#evento");
    if (!ev || !eventoActivo()) { caja.hidden = true; return; }
    caja.hidden = false;
    const L = (o) => (o && (o[lang] || o.es)) || "";
    $("#t-evento").textContent = L(ev.titulo);
    $("#evento-bajada").textContent = L(ev.bajada);
    const falta = new Date(ev.inicio).getTime() - Date.now();
    const dias = Math.floor(falta / 86400000), horas = Math.ceil(falta / 3600000);
    $("#evento-cuenta").textContent = falta > 0 ? t("countdown", dias, horas) : t("live");
    $("#evento-agenda").replaceChildren(...ev.agenda.map((a) => el("li", {},
      el("p", { class: "cuando" }, document.createTextNode(L(a.dia)), a.hora ? el("span", { text: a.hora }) : null),
      el("p", { text: a[lang] || a.es }))));
    $("#evento-consejos").replaceChildren(...L(ev.consejos).map((c) => el("li", { text: c })));
    $("#evento-link").href = ev.url;
    $("#evento-nota").textContent = L(ev.nota);
  }
  function pintarPalabras() {
    $("#filtros-palabras").replaceChildren(...Object.entries(PALABRAS).map(([k, g]) =>
      el("button", { type: "button", class: "pressable", "aria-pressed": String(k === temaPalabras), text: g[lang], onclick: () => { temaPalabras = k; pintarPalabras(); } })));
    $("#lista-palabras").replaceChildren(...PALABRAS[temaPalabras].items.map(([w, es, en, ej], i) =>
      el("article", { class: "palabra", style: reduceMotion ? null : `animation-delay:${Math.min(i, 8) * 30}ms` },
        el("p", { class: "palabra-t", lang: "es", text: w }),
        el("p", { class: "palabra-s", text: lang === "en" ? en : es }),
        el("p", { class: "palabra-e", lang: "es", text: ej }))));
  }
  function pintarEstaticos() {
    pintarPalabras();
    $("#lista-emergencias").replaceChildren(...EMERGENCIAS.map((e) =>
      el("a", { href: "tel:" + e.n, class: "pressable", "aria-label": `${t("call_")} ${e.n}, ${e[lang]}` }, el("strong", { text: e.n }), el("span", { text: e[lang] }))));
    const acordeon = (x) => el("details", { class: "acordeon" }, el("summary", { text: x[lang][0] }), el("p", { text: x[lang][1] }));
    $("#lista-moverse").replaceChildren(...MOVERSE.map(acordeon));
    $("#lista-tips").replaceChildren(...TIPS.map(acordeon));
  }
  function aplicarIdioma() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((n) => { const v = t(n.dataset.i18n); if (typeof v === "string") n.textContent = v; });
    document.querySelectorAll("[data-i18n-ph]").forEach((n) => { n.placeholder = t(n.dataset.i18nPh); });
    const b = $("#btn-idioma"); b.textContent = t("langBtn"); b.setAttribute("aria-label", t("langLabel"));
    pintarTodo(); pintarClima();
  }
  function pintarTodo() { pintarTransparencia(); pintarEstaticos(); pintarHoy(); pintarModulo("comer"); pintarModulo("hacer"); pintarDia(); actualizarContador(false); }

  // ---------- Clima ----------
  let clima = null;
  async function cargarClima() {
    try {
      const r = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-39.8142&longitude=-73.2459&current=temperature_2m&hourly=precipitation_probability&forecast_hours=3&timezone=America%2FSantiago");
      if (!r.ok) throw new Error(r.status);
      const d = await r.json();
      clima = { temp: Math.round(d.current.temperature_2m), lluvia: Math.max(...(d.hourly.precipitation_probability || [0])) };
      estado.lluvia = clima.lluvia; pintarClima(); pintarHoy();
    } catch (e) { /* sin clima */ }
  }
  function pintarClima() { $("#clima").textContent = clima ? "Valdivia · " + t("weather", clima.temp, clima.lluvia) : ""; }

  // ---------- Navegación ----------
  const VISTAS = ["hoy", "comer", "hacer", "dia", "ayuda", "transparencia"];
  let vistaActual = null;
  function navegar() {
    const v = VISTAS.includes(location.hash.slice(1)) ? location.hash.slice(1) : "hoy";
    if (v === vistaActual) return;
    VISTAS.forEach((x) => { const s = $("#vista-" + x); s.hidden = x !== v; s.classList.remove("entrando"); });
    const actual = $("#vista-" + v);
    if (!reduceMotion) { void actual.offsetWidth; actual.classList.add("entrando"); }
    document.querySelectorAll(".pestanas a").forEach((a) => (a.dataset.tab === v ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    if (vistaActual) $("#principal").focus({ preventScroll: true });
    vistaActual = v;
  }

  // ---------- Inicio ----------
  async function iniciar() {
    $("#link-negocios").href = CFG.paraNegocios || "#";
    const hero = $("#hero-img");
    hero.addEventListener("load", () => hero.classList.add("cargada"));
    hero.addEventListener("error", () => hero.remove());
    hero.src = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(HERO)}?width=1200`;

    ["comer", "hacer"].forEach((m) => $("#buscar-" + m).addEventListener("input", (e) => { estado.q[m] = e.target.value; pintarModulo(m); }));
    $("#btn-idioma").addEventListener("click", () => { lang = lang === "es" ? "en" : "es"; guardar("valdi-lang", lang); aplicarIdioma(); });
    const hi = $("#hora-inicio"); hi.value = estado.inicio;
    hi.addEventListener("change", () => { if (hi.value) { estado.inicio = hi.value; guardar("valdi-inicio", hi.value); pintarDia(); } });
    $("#vaciar-dia").addEventListener("click", () => { estado.dia = []; guardarDia(); actualizarContador(true); pintarDia(); pintarTarjetasMas(); });
    $("#compartir-dia").addEventListener("click", async () => {
      const txt = textoDia();
      try { if (navigator.share) { await navigator.share({ title: t("myDayShare"), text: txt }); return; } } catch (e) { return; }
      try { await navigator.clipboard.writeText(txt); toast(t("copied")); } catch (e) { /* sin portapapeles */ }
    });
    $("#evento-plan").addEventListener("click", () => { const pl = estado.planes.find((x) => x.id === "ironman"); if (pl) { estado.inicio = "10:00"; guardar("valdi-inicio", "10:00"); $("#hora-inicio").value = "10:00"; cargarPlan(pl); } });
    const ficha = $("#ficha");
    ficha.addEventListener("click", (e) => { if (e.target === ficha) cerrarFicha(); });
    ficha.addEventListener("cancel", (e) => { e.preventDefault(); cerrarFicha(); });
    ficha.addEventListener("close", () => { pintarTarjetasMas(); });

    window.addEventListener("hashchange", navegar);
    const offline = () => { $("#aviso-offline").hidden = navigator.onLine; };
    window.addEventListener("online", offline); window.addEventListener("offline", offline); offline();
    navegar();

    try { const r = await fetch("data/lugares.json"); const d = await r.json(); estado.lugares = d.lugares; estado.planes = d.planes || []; estado.evento = d.evento || null; } catch (e) { /* sin datos */ }
    const filas = await traerCSV(CFG.negociosCsv, "valdi-negocios");
    if (filas) estado.negocios = filas.filter((f) => /^s[ií]$/i.test(f.publicar || "") && f.nombre).map(aNegocio);
    estado.porId = new Map([...estado.lugares, ...estado.negocios].map((p) => [p.id, p]));
    const camp = await traerCSV(CFG.campanaCsv, "valdi-campana");
    const num = (s) => Number(String(s || "0").replace(/[^\d]/g, "")) || 0;
    if (camp && camp[0]) estado.campana = { recaudado: num(camp[0].recaudado), negocios: num(camp[0].negocios) || estado.negocios.length };
    else if (!estado.campana.negocios) estado.campana.negocios = estado.negocios.length;
    const tr = await traerCSV(CFG.traspasosCsv, "valdi-traspasos");
    if (tr) estado.traspasos = tr.map((f) => ({ fecha: f.fecha || "", monto: num(f.monto), destino: f.destino || "", comprobante: f.comprobante || "", nota: f.nota || "" })).filter((x) => x.monto > 0);
    estado.cargadoEn = (filas || camp) ? new Date() : null;

    aplicarIdioma();
    document.querySelectorAll("main > section > .revelar, .campana, .tip").forEach((n) => revelar(n));
    cargarClima();
  }

  if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  iniciar();
})();
