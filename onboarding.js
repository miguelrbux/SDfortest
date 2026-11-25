/* Remada · onboarding de primer uso. Se muestra una vez; se puede volver a ver desde Ayuda o con ?intro=1. */
(function () {
  "use strict";
  const CLAVE = "remada-intro-vista";
  const leer = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const idioma = () => { const l = document.documentElement.lang; return ["es", "en", "pt"].includes(l) ? l : "es"; };

  const ic = {
    tienda: '<svg viewBox="0 0 24 24"><path d="M3 9 4.5 4h15L21 9M3 9v11h18V9M3 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3M9 20v-5h6v5"/></svg>',
    ojo: '<svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    copa: '<svg viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.7V17c0 .6-.5 1-1 1.2C7.8 18.8 7 20.2 7 22M14 14.7V17c0 .6.5 1 1 1.2 1.2.6 2 2 2 3.8M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>'
  };

  const TX = {
    es: {
      saltar: "Saltar", sig: "Siguiente", fin: "Empezar a explorar", paso: (i, n) => `Paso ${i} de ${n}`, verIntro: "Ver la introducción de nuevo", region: "Bienvenida a Remada",
      s: [
        { k: "Bienvenida", h: "Turismo que mueve el deporte", p: "Remada es la guía de Valdivia hecha con el comercio local. Cada negocio que ves aquí aportó para que niñas y niños de la U13 del Club de Deportes Las Ánimas puedan competir." },
        { k: "Cómo funciona", h: "Tú eliges, todos ganan", p: "Mientras más visitas recibe un negocio colaborador, más sentido tiene su aporte. Cada peso queda a la vista en Transparencia.",
          flujo: [["El comercio local aporta", "Desde $5.000 para aparecer"], ["Tú lo descubres", "Comes, paseas, compras"], ["Los niños compiten", "Todo va a la U13 hasta la meta"]] },
        { k: "Explora", h: "Encuentra dónde ir", p: "En Comer y Hacer busca o filtra por sector. Toca una tarjeta para ver horario, cómo llegar y llamar." },
        { k: "Mi día", h: "Arma tu itinerario", p: "Toca «+» en cualquier lugar o elige un plan listo. En Mi día ordenas las paradas y abres la ruta completa en el mapa." },
        { k: "Siempre a mano", h: "Ayuda cuando la necesites", p: "SOS está siempre arriba a la derecha. En Ayuda tienes transporte, tips y las palabras que vas a escuchar en Valdivia." }
      ]
    },
    en: {
      saltar: "Skip", sig: "Next", fin: "Start exploring", paso: (i, n) => `Step ${i} of ${n}`, verIntro: "See the introduction again", region: "Welcome to Remada",
      s: [
        { k: "Welcome", h: "Tourism that moves sport", p: "Remada is a Valdivia guide made with local businesses. Every business you see here contributed so girls and boys on the Club de Deportes Las Ánimas U13 team can compete." },
        { k: "How it works", h: "You choose, everyone wins", p: "The more visitors a partner business gets, the more its contribution pays off. Every peso is public in Transparency.",
          flujo: [["Local businesses contribute", "From CLP 5,000 to be listed"], ["You discover them", "Eat, explore, shop"], ["Kids get to compete", "Everything goes to the U13 up to the goal"]] },
        { k: "Explore", h: "Find where to go", p: "In Eat and Do, search or filter by area. Tap a card for hours, directions and to call." },
        { k: "My day", h: "Build your itinerary", p: "Tap “+” on any place or pick a ready-made plan. In My day you reorder stops and open the full route on the map." },
        { k: "Always at hand", h: "Help when you need it", p: "SOS is always at the top right. Help has transport, tips and the local words you'll hear in Valdivia." }
      ]
    },
    pt: {
      saltar: "Pular", sig: "Próximo", fin: "Começar a explorar", paso: (i, n) => `Passo ${i} de ${n}`, verIntro: "Ver a introdução de novo", region: "Boas-vindas ao Remada",
      s: [
        { k: "Boas-vindas", h: "Turismo que move o esporte", p: "O Remada é um guia de Valdivia feito com o comércio local. Cada negócio que você vê aqui contribuiu para que meninas e meninos do time sub-13 do Club de Deportes Las Ánimas possam competir." },
        { k: "Como funciona", h: "Você escolhe, todos ganham", p: "Quanto mais visitas um negócio parceiro recebe, mais sentido faz a sua contribuição. Cada peso fica visível em Transparência.",
          flujo: [["O comércio local contribui", "A partir de CLP 5.000 para aparecer"], ["Você descobre", "Come, passeia, compra"], ["As crianças competem", "Tudo vai para o sub-13 até a meta"]] },
        { k: "Explore", h: "Encontre aonde ir", p: "Em Comer e Fazer, busque ou filtre por região. Toque num cartão para ver horário, como chegar e ligar." },
        { k: "Meu dia", h: "Monte seu roteiro", p: "Toque em “+” em qualquer lugar ou escolha um plano pronto. Em Meu dia você ordena as paradas e abre a rota completa no mapa." },
        { k: "Sempre à mão", h: "Ajuda quando precisar", p: "O SOS fica sempre no canto superior direito. Em Ajuda há transporte, dicas e as palavras que você vai ouvir em Valdivia." }
      ]
    }
  };

  function arte(i, tx) {
    const d = document.createElement("div"); d.className = "onb-arte"; d.setAttribute("aria-hidden", "true");
    if (i === 0) d.innerHTML = '<img src="icons/logo-bajada-blanco.svg" alt="">';
    else if (i === 1) d.innerHTML = '<div class="flujo">' + tx.s[1].flujo.map((f, j) => `<div class="flujo-paso"><span>${[ic.tienda, ic.ojo, ic.copa][j]}</span><div><strong></strong><small></small></div></div>`).join("") + "</div>";
    else if (i === 2) d.innerHTML = '<div class="mock"><div class="mock-foto"></div><div class="mock-linea"></div><div class="mock-linea corta"></div><div class="mock-btn"></div></div>';
    else if (i === 3) d.innerHTML = '<div class="mock"><div class="mock-foto"><span class="mock-mas">+</span></div><div class="mock-paradas"><div class="mock-parada"><b>10:00</b><div class="mock-linea"></div></div><div class="mock-parada"><b>11:20</b><div class="mock-linea corta"></div></div></div></div>';
    else d.innerHTML = '<span class="mock-sos">SOS</span><div class="mock"><div class="mock-linea"></div><div class="mock-linea corta"></div><div class="mock-linea"></div></div>';
    if (i === 1) d.querySelectorAll(".flujo-paso").forEach((n, j) => { n.querySelector("strong").textContent = tx.s[1].flujo[j][0]; n.querySelector("small").textContent = tx.s[1].flujo[j][1]; });
    return d;
  }

  function abrir() {
    if (document.querySelector(".onb")) return;
    let tx = TX[idioma()];
    const n = tx.s.length;
    let actual = 0;
    const previo = document.activeElement;

    const raiz = document.createElement("div");
    raiz.className = "onb"; raiz.setAttribute("role", "dialog"); raiz.setAttribute("aria-modal", "true");
    raiz.innerHTML = `
      <div class="onb-top">
        <div class="onb-idiomas" role="group" aria-label="Idioma / Language / Idioma">
          <button type="button" data-l="es" lang="es">ES</button><button type="button" data-l="en" lang="en">EN</button><button type="button" data-l="pt" lang="pt">PT</button>
        </div>
        <button type="button" class="onb-saltar pressable"></button>
      </div>
      <div class="onb-pistas" tabindex="-1"></div>
      <div class="onb-pie"><div class="onb-puntos"></div><button type="button" class="btn onb-sig pressable"></button></div>`;
    const pistas = raiz.querySelector(".onb-pistas"), puntos = raiz.querySelector(".onb-puntos"), sig = raiz.querySelector(".onb-sig"), saltar = raiz.querySelector(".onb-saltar");

    function pintar() {
      raiz.setAttribute("aria-label", tx.region);
      saltar.textContent = tx.saltar;
      raiz.querySelectorAll(".onb-idiomas button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.l === idioma())));
      pistas.replaceChildren(...tx.s.map((s, i) => {
        const sl = document.createElement("section"); sl.className = "onb-slide"; sl.setAttribute("aria-roledescription", "slide");
        sl.setAttribute("aria-label", tx.paso(i + 1, n)); sl.id = "onb-s" + i;
        const k = document.createElement("p"); k.className = "onb-kicker"; k.textContent = s.k;
        const h = document.createElement("h2"); h.textContent = s.h;
        const p = document.createElement("p"); p.textContent = s.p;
        sl.append(arte(i, tx), k, h, p);
        return sl;
      }));
      puntos.replaceChildren(...tx.s.map((s, i) => {
        const b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-label", tx.paso(i + 1, n));
        b.addEventListener("click", () => ir(i));
        return b;
      }));
      marcar(actual);
      pistas.scrollLeft = actual * pistas.clientWidth;
    }
    function marcar(i) {
      actual = i;
      pistas.querySelectorAll(".onb-slide").forEach((s, j) => { s.classList.toggle("activa", j === i); s.setAttribute("aria-hidden", String(j !== i)); s.inert = j !== i; });
      puntos.querySelectorAll("button").forEach((b, j) => (j === i ? b.setAttribute("aria-current", "step") : b.removeAttribute("aria-current")));
      sig.textContent = i === n - 1 ? tx.fin : tx.sig;
    }
    function ir(i) {
      i = Math.max(0, Math.min(n - 1, i));
      pistas.scrollTo({ left: i * pistas.clientWidth, behavior: reduce ? "auto" : "smooth" });
      marcar(i);
    }
    function cerrar() {
      guardar(CLAVE, "1");
      document.removeEventListener("keydown", teclas);
      const fin = () => { raiz.remove(); document.body.style.overflow = ""; if (previo && previo.focus) previo.focus(); };
      if (reduce) fin(); else { raiz.classList.add("saliendo"); setTimeout(fin, 280); }
    }
    function teclas(e) {
      if (e.key === "Escape") cerrar();
      else if (e.key === "ArrowRight") ir(actual + 1);
      else if (e.key === "ArrowLeft") ir(actual - 1);
      else if (e.key === "Tab") {
        const f = [...raiz.querySelectorAll("button:not([disabled])")].filter((b) => !b.closest("[inert]"));
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    }

    let timer;
    pistas.addEventListener("scroll", () => { clearTimeout(timer); timer = setTimeout(() => { const i = Math.round(pistas.scrollLeft / pistas.clientWidth); if (i !== actual) marcar(i); }, 80); });
    sig.addEventListener("click", () => (actual === n - 1 ? cerrar() : ir(actual + 1)));
    saltar.addEventListener("click", cerrar);
    raiz.querySelectorAll(".onb-idiomas button").forEach((b) => b.addEventListener("click", () => {
      const sel = document.getElementById("sel-idioma");
      if (sel) { sel.value = b.dataset.l; sel.dispatchEvent(new Event("change", { bubbles: true })); }
      else document.documentElement.lang = b.dataset.l;
      tx = TX[idioma()]; pintar();
    }));
    document.addEventListener("keydown", teclas);
    window.addEventListener("resize", () => { pistas.scrollLeft = actual * pistas.clientWidth; });

    document.body.append(raiz);
    document.body.style.overflow = "hidden";
    pintar();
    sig.focus();
  }

  // Enlace para volver a verla, al final de Ayuda
  function enlaceAyuda() {
    const ayuda = document.getElementById("vista-ayuda");
    if (!ayuda) return;
    let b = document.getElementById("ver-intro");
    if (!b) { b = document.createElement("button"); b.type = "button"; b.id = "ver-intro"; b.className = "ver-intro"; b.addEventListener("click", abrir); ayuda.append(b); }
    b.textContent = TX[idioma()].verIntro;
  }
  document.addEventListener("remada:idioma", enlaceAyuda);

  function iniciar() {
    enlaceAyuda();
    const forzar = /[?&]intro=1\b/.test(location.search);
    if (forzar || !leer(CLAVE)) setTimeout(abrir, 250);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
