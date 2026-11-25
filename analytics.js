// Medición con Google Analytics 4 para Remada.
// - No hace nada si config.js no tiene gaId (G-XXXXXXXXXX).
// - Solo carga Google Analytics si la persona acepta en el aviso de cookies.
// - Es una app de una sola página: cada sección (#hoy, #comer...) se envía como página virtual.
// - Escucha la página "desde afuera" (clics, cambios de sección e idioma), sin tocar app.js.
(function () {
  "use strict";
  const CFG = window.VALDI_CONFIG || {};
  const GA_ID = (CFG.gaId || "").trim();
  if (!/^G-[A-Z0-9]+$/i.test(GA_ID)) return;
  // Solo medimos en el sitio publicado (o si se fuerza para pruebas), para no ensuciar los datos.
  if (!/(^|\.)remada\.cl$|\.github\.io$/.test(location.hostname) && !CFG.gaForzar) return;

  const CLAVE = "remada-consent-analitica";
  const leer = () => { try { return localStorage.getItem(CLAVE); } catch (e) { return null; } };
  const guardar = (v) => { try { localStorage.setItem(CLAVE, v); } catch (e) { /* sin almacenamiento */ } };
  const idioma = () => (document.documentElement.lang || "es").slice(0, 2).toLowerCase();

  // ---------- Textos del aviso ----------
  const TXT = {
    es: { t: "¿Nos ayudas a mejorar Remada?", p: "Usamos Google Analytics para contar visitas y saber qué secciones sirven. No vendemos datos ni mostramos publicidad.", si: "Aceptar", no: "Rechazar", pref: "Preferencias de medición" },
    en: { t: "Help us improve Remada?", p: "We use Google Analytics to count visits and learn which sections help. We don't sell data or show ads.", si: "Accept", no: "Decline", pref: "Analytics preferences" },
    pt: { t: "Quer nos ajudar a melhorar o Remada?", p: "Usamos o Google Analytics para contar visitas e saber quais seções ajudam. Não vendemos dados nem mostramos anúncios.", si: "Aceitar", no: "Recusar", pref: "Preferências de medição" }
  };
  const tx = (k) => (TXT[idioma()] || TXT.es)[k];

  // ---------- gtag ----------
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  let activo = false;
  let cola = [];

  function enviar(nombre, params) {
    if (!activo) { cola.push([nombre, params]); if (cola.length > 50) cola.shift(); return; }
    window.gtag("event", nombre, Object.assign({ idioma: idioma() }, params || {}));
  }
  window.remadaTrack = enviar;

  function activar() {
    if (activo) return;
    activo = true;
    window.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    window.gtag("js", new Date());
    // send_page_view: false porque nosotros enviamos cada sección como página virtual.
    window.gtag("config", GA_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
    window.gtag("set", "user_properties", { idioma: idioma(), instalada: matchMedia("(display-mode: standalone)").matches ? "si" : "no" });
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
    paginaVista(true);
    const pendientes = cola; cola = [];
    pendientes.forEach(([n, p]) => enviar(n, p));
  }

  // ---------- Páginas virtuales ----------
  const TITULOS = { hoy: "Hoy", comer: "Comer", hacer: "Hacer", dia: "Mi día", ayuda: "Ayuda", transparencia: "Transparencia" };
  let ultimaVista = null;
  function vista() { const v = location.hash.slice(1); return TITULOS[v] ? v : "hoy"; }
  function paginaVista(forzar) {
    const v = vista();
    if (v === ultimaVista && !forzar) return;
    ultimaVista = v;
    if (!activo) return;
    window.gtag("event", "page_view", {
      page_title: "Remada · " + TITULOS[v],
      page_location: location.origin + "/" + (v === "hoy" ? "" : v) + location.search,
      page_referrer: document.referrer || undefined,
      idioma: idioma()
    });
  }
  window.addEventListener("hashchange", () => paginaVista(false));

  // ---------- Eventos ----------
  const texto = (n) => (n && n.textContent || "").trim().slice(0, 100);
  const seccionDe = (n) => { const s = n && n.closest("section[id^='vista-']"); return s ? s.id.replace("vista-", "") : (n && n.closest("footer") ? "pie" : "otro"); };

  // Ficha abierta: la detectamos cuando el diálogo #ficha se abre.
  let origenFicha = null;
  const ficha = document.getElementById("ficha");
  const nivelDe = (etq) => (!etq ? null : /aliad|partner|parceir/i.test(etq.textContent) ? "Aliado" : "Destacado");
  const datosFicha = () => {
    const d = ficha || document;
    const negocio = !d.querySelector(".hoja-info .fuente a");
    return {
      item_name: texto(d.querySelector("#ficha-titulo")),
      tipo_ficha: negocio ? "negocio" : "lugar",
      nivel: nivelDe(d.querySelector(".hoja-info .insignia.dest")) || (negocio ? "Colaborador" : "ninguno")
    };
  };
  if (ficha) {
    new MutationObserver(() => {
      if (ficha.hasAttribute("open")) enviar("ver_ficha", Object.assign(datosFicha(), { origen: origenFicha || seccionDe(ficha) }));
    }).observe(ficha, { attributes: true, attributeFilter: ["open"] });
  }

  // Cambio de idioma: observamos el atributo lang del documento, sea cual sea el botón o menú.
  // Solo cuenta si hubo un toque reciente: así no se mide el idioma que la app aplica al cargar.
  let idiomaPrevio = idioma();
  let ultimoToque = 0;
  document.addEventListener("pointerdown", () => { ultimoToque = Date.now(); }, true);
  document.addEventListener("keydown", () => { ultimoToque = Date.now(); }, true);
  new MutationObserver(() => {
    const nuevo = idioma();
    if (nuevo !== idiomaPrevio && Date.now() - ultimoToque < 3000) {
      enviar("cambiar_idioma", { idioma_anterior: idiomaPrevio, idioma_nuevo: nuevo });
      if (activo) window.gtag("set", "user_properties", { idioma: nuevo });
    }
    idiomaPrevio = nuevo;
    pintarTextosAviso();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  document.addEventListener("click", (e) => {
    const n = e.target.closest("a, button");
    if (!n) return;
    const href = n.getAttribute("href") || "";

    // Tarjetas y planes
    if (n.matches(".card-abrir")) { origenFicha = (n.closest("[id^='lista-']") || {}).id || seccionDe(n); setTimeout(() => { origenFicha = null; }, 1000); return; }
    if (n.matches(".plan")) { enviar("elegir_plan", { plan: texto(n.querySelector("strong")), origen: seccionDe(n) }); return; }
    if (n.matches("[data-mas], [data-ficha-dia]")) {
      const enFicha = n.matches("[data-ficha-dia]");
      const id = enFicha ? n.dataset.fichaDia : n.dataset.mas;
      let dia = [];
      try { dia = JSON.parse(localStorage.getItem("valdi-dia") || "[]"); } catch (er) { /* sin datos */ }
      const quitar = Array.isArray(dia) && dia.some((x) => x && x.id === id); // estado antes del clic
      const nombre = enFicha ? texto(ficha && ficha.querySelector("#ficha-titulo")) : texto(n.closest(".card") && n.closest(".card").querySelector("h3"));
      enviar(quitar ? "quitar_de_mi_dia" : "agregar_a_mi_dia", { item_name: nombre, origen: enFicha ? "ficha" : seccionDe(n) });
      return;
    }

    // Acciones dentro de la ficha (contacto con negocios y lugares)
    if (n.closest(".hoja-acciones")) {
      let accion = null;
      if (href.startsWith("tel:")) accion = "llamar";
      else if (/wa\.me/.test(href)) accion = "whatsapp";
      else if (/google\.[^/]+\/maps|maps\.google|maps\.app/.test(href)) accion = "como_llegar";
      else if (/^https?:/.test(href)) accion = "sitio_web";
      if (accion) {
        const d = datosFicha();
        enviar(d.tipo_ficha === "negocio" ? "contactar_negocio" : "accion_lugar", Object.assign(d, { accion }));
      }
      return;
    }

    // Ironman / panorama de la semana
    if (n.id === "evento-plan") { enviar("ironman_armar_plan", { evento: texto(document.getElementById("t-evento")) }); return; }
    if (n.id === "evento-link") { enviar("ironman_sitio_oficial", { evento: texto(document.getElementById("t-evento")), link_url: href }); return; }

    // Mi día
    if (n.id === "abrir-ruta") { enviar("mi_dia_ver_ruta", { paradas: document.querySelectorAll("#lista-dia > li").length }); return; }
    if (n.id === "compartir-dia") { enviar("share", { content_type: "mi_dia", method: navigator.share ? "nativo" : "copiar" }); return; }
    if (n.id === "vaciar-dia") { enviar("mi_dia_vaciar", {}); return; }

    // Campaña y transparencia
    if (n.id === "link-negocios") { enviar("generate_lead", { origen: "pie", link_url: href }); return; }
    if (href === "#transparencia") { enviar("ver_transparencia", { origen: n.closest(".campana") ? "campana" : seccionDe(n) }); return; }
    if (n.closest("#lista-entregas") && /^https?:/.test(href)) { enviar("ver_comprobante", { link_url: href }); return; }

    // Ayuda
    if (n.closest("#lista-emergencias") && href.startsWith("tel:")) { enviar("llamar_emergencia", { numero: href.slice(4) }); return; }
    if (n.matches(".btn-sos")) { enviar("abrir_sos", {}); return; }

    // Filtros de sector
    if (n.closest("#filtros-comer, #filtros-hacer")) { enviar("filtrar_sector", { seccion: seccionDe(n), sector: texto(n) }); return; }
  }, true);

  // Búsquedas: se envían cuando la persona deja de escribir.
  const esperas = {};
  ["comer", "hacer"].forEach((m) => {
    const inp = document.getElementById("buscar-" + m);
    if (!inp) return;
    inp.addEventListener("input", () => {
      clearTimeout(esperas[m]);
      esperas[m] = setTimeout(() => {
        const q = inp.value.trim().toLowerCase();
        if (q.length >= 3) enviar("search", { search_term: q.slice(0, 60), seccion: m, resultados: document.querySelectorAll("#lista-" + m + " .card").length });
      }, 1500);
    });
  });

  // Acordeones de Ayuda (cómo moverse, tips, tsunami)
  document.addEventListener("toggle", (e) => {
    const d = e.target;
    if (d.matches && d.matches("details.acordeon") && d.open) enviar("abrir_ayuda", { tema: texto(d.querySelector("summary")) });
  }, true);

  // ---------- Aviso de cookies ----------
  let aviso = null;
  function pintarTextosAviso() {
    if (aviso) {
      aviso.querySelector(".consent-t").textContent = tx("t");
      aviso.querySelector(".consent-p").textContent = tx("p");
      aviso.querySelector("[data-c='si']").textContent = tx("si");
      aviso.querySelector("[data-c='no']").textContent = tx("no");
    }
    const b = document.getElementById("pref-medicion");
    if (b) b.textContent = tx("pref");
  }
  function mostrarAviso() {
    if (aviso) return;
    aviso = document.createElement("div");
    aviso.className = "consent";
    aviso.setAttribute("role", "region");
    aviso.setAttribute("aria-label", "Cookies");
    aviso.innerHTML = '<p class="consent-t"></p><p class="consent-p"></p><div class="consent-acc"><button type="button" class="btn-secundario pressable" data-c="no"></button><button type="button" class="btn pressable" data-c="si"></button></div>';
    aviso.addEventListener("click", (e) => {
      const b = e.target.closest("[data-c]"); if (!b) return;
      const ok = b.dataset.c === "si";
      guardar(ok ? "si" : "no");
      aviso.remove(); aviso = null;
      if (ok) activar();
      else if (activo) { window.gtag("consent", "update", { analytics_storage: "denied" }); location.reload(); }
    });
    document.body.appendChild(aviso);
    pintarTextosAviso();
  }
  // Enlace en el pie para cambiar la decisión más tarde.
  const pie = document.querySelector("footer.pie");
  if (pie) {
    const p = document.createElement("p"); p.className = "nota";
    const b = document.createElement("button"); b.type = "button"; b.id = "pref-medicion"; b.className = "btn-enlace";
    b.addEventListener("click", mostrarAviso);
    p.appendChild(b); pie.appendChild(p);
  }

  const decision = leer();
  if (decision === "si") activar();
  else if (decision !== "no") mostrarAviso();
  pintarTextosAviso();
})();
