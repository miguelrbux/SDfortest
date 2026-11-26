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
      eventMore: "Ver agenda y consejos", eventLess: "Ocultar detalles",
      eventTag: "Panorama de la semana", eventPlan: "Armar mi domingo", eventSite: "Sitio oficial", eventBadge: "Ironman",
      countdown: (d, h) => (d > 0 ? `Faltan ${d} día${d === 1 ? "" : "s"}` : h > 0 ? `Faltan ${h} h` : "¡Hoy!"), live: "En carrera ahora",
      seeReport: "Ver informe de transparencia", back: "Volver", transpTitle: "Transparencia", transpSub: "Cada aporte y cada entrega al club, a la vista de todos.",
      kRecv: "Recibido", kSent: "Entregado al club", kHeld: "Por entregar", howTitle: "Cómo funciona", transfersTitle: "Entregas al club", donorsTitle: "Negocios que aportan",
      reglas: ["Los negocios transfieren su aporte a una cuenta dedicada solo a esta campaña, a nombre del creador de Remada.", "Cada 15 días, lo reunido se entrega a la categoría U13 del Club de Deportes Las Ánimas.", "Aquí publicamos cada entrega con su fecha y comprobante.", "Hasta los $5.000.000, todo va a las familias. Si se supera la meta, el excedente cubre la operación de Remada y lo que sobre vuelve a las familias. Remada no busca lucro."],
      noTransfers: "Aún no hay entregas. La primera será dentro de los próximos 15 días.", receipt: "Ver comprobante",
      noDonors: "Pronto verás aquí a los negocios que aportan.", updated: (h) => `Datos en vivo desde la planilla de la campaña · ${h}`,
      progress: (p, d) => `${p}% de la meta · ${d}`,
      wordsTitle: "Habla como valdiviano", wordsSub: "Las palabras que vas a escuchar en la calle, la mesa y la micro.",
      langLabel: "Idioma", navLabel: "Secciones", sosLabel: "Emergencias", sectorLabel: "Sector", topicsLabel: "Temas", call_: "Llamar al",
      today: "Hoy", tomorrow: "Mañana", dayDate: "Otra fecha", dayDateLabel: "¿Para qué día?",
      nPlans: (n) => `${n} planes listos`, nBusinesses: (n) => `${n} negocio${n === 1 ? "" : "s"}`, nPlaces: (n) => `${n} lugares`,
      viewLabel: "Vista", viewList: "Lista", viewMap: "Mapa", mapLabel: "Mapa de lugares", nearMe: "Cerca de mí",
      mapError: "No pudimos cargar el mapa. Revisa tu conexión.", mapSome: (a, b) => `${a} de ${b} lugares en el mapa. El resto, en la lista.`,
      geoNo: "Tu navegador no permite ubicarte.", geoAsk: "Buscando tu ubicación…", youAreHere: "Estás aquí",
      geoFar: "Estás lejos de Valdivia. Te mostramos los lugares igual.", geoDenied: "Sin permiso de ubicación. Puedes activarlo en tu navegador.",
      donateTag: "Súmate a la causa", donateTitle: "Aporta a la U13 de Las Ánimas",
      donateBody: "Con tu aporte voluntario ayudas a las familias que costean el deporte de sus hijos. Cada entrega al club se publica en Transparencia.",
      donateAmounts: "Monto sugerido", donateCopy: "Copiar datos", donateNotify: "Avisar mi aporte", donateCta: "Aportar yo también",
      donateNote: "Transferencia a la cuenta dedicada a esta campaña. En el comentario escribe «U13» y tu nombre. No da beneficio tributario.",
      bHolder: "Titular", bBank: "Banco", bType: "Tipo de cuenta", bNumber: "Número", bEmail: "Correo", bAmount: "Monto", bComment: "Comentario", yourName: "tu nombre",
      notifySubject: (m) => `Aporte voluntario U13 · ${m}`, notifyBody: (m) => `Hola, transferí ${m} para la U13 de Las Ánimas.\nNombre: \nFecha: `,
      bCopied: "Datos copiados. Pégalos en tu app del banco.", bCopyFail: "No se pudo copiar. Mantén presionado para copiar.",
      installTitle: "Usa Remada a pantalla completa", installBtn: "Instalar",
      installAndroid: "Instálala en tu inicio: se abre sin la barra del navegador.", installIOS: "Toca Compartir y luego «Agregar a inicio». Se abre sin la barra del navegador."
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
      eventMore: "See schedule and tips", eventLess: "Hide details",
      eventTag: "This week's big event", eventPlan: "Plan my Sunday", eventSite: "Official site", eventBadge: "Ironman",
      countdown: (d, h) => (d > 0 ? `${d} day${d === 1 ? "" : "s"} to go` : h > 0 ? `${h} h to go` : "Today!"), live: "Racing now",
      seeReport: "See transparency report", back: "Back", transpTitle: "Transparency", transpSub: "Every contribution and every handover to the club, in the open.",
      kRecv: "Received", kSent: "Given to the club", kHeld: "To be handed over", howTitle: "How it works", transfersTitle: "Handovers to the club", donorsTitle: "Contributing businesses",
      reglas: ["Businesses transfer their contribution to an account used only for this campaign, held by the creator of Remada.", "Every 15 days, the funds are handed to the U13 team of Club de Deportes Las Ánimas.", "We publish each handover here with its date and receipt.", "Up to CLP 5,000,000, everything goes to the families. Any surplus covers Remada's running costs, and the rest goes back to the families. Remada is non-profit."],
      noTransfers: "No handovers yet. The first one will happen within the next 15 days.", receipt: "See receipt",
      noDonors: "Contributing businesses will appear here soon.", updated: (h) => `Live data from the campaign sheet · ${h}`,
      progress: (p, d) => `${p}% of the goal · ${d}`,
      wordsTitle: "Talk like a local", wordsSub: "Words you'll hear on the street, at the table and on the bus.",
      langLabel: "Language", navLabel: "Sections", sosLabel: "Emergencies", sectorLabel: "Area", topicsLabel: "Topics", call_: "Call",
      today: "Today", tomorrow: "Tomorrow", dayDate: "Other date", dayDateLabel: "Which day?",
      nPlans: (n) => `${n} ready-made plans`, nBusinesses: (n) => `${n} business${n === 1 ? "" : "es"}`, nPlaces: (n) => `${n} places`,
      viewLabel: "View", viewList: "List", viewMap: "Map", mapLabel: "Map of places", nearMe: "Near me",
      mapError: "We couldn't load the map. Check your connection.", mapSome: (a, b) => `${a} of ${b} places on the map. The rest are in the list.`,
      geoNo: "Your browser can't share your location.", geoAsk: "Finding your location…", youAreHere: "You are here",
      geoFar: "You're far from Valdivia. Here are the places anyway.", geoDenied: "No location permission. You can turn it on in your browser.",
      donateTag: "Join the cause", donateTitle: "Support the Las Ánimas U13 team",
      donateBody: "Your voluntary contribution helps families who pay for their kids' sports. Every handover to the club is published under Transparency.",
      donateAmounts: "Suggested amount", donateCopy: "Copy details", donateNotify: "Let us know", donateCta: "I want to contribute",
      donateNote: "Bank transfer (Chile) to the account used only for this campaign. Write “U13” and your name in the comment. Not tax-deductible.",
      bHolder: "Account holder", bBank: "Bank", bType: "Account type", bNumber: "Number", bEmail: "Email", bAmount: "Amount", bComment: "Comment", yourName: "your name",
      notifySubject: (m) => `U13 voluntary contribution · ${m}`, notifyBody: (m) => `Hi, I transferred ${m} for the Las Ánimas U13 team.\nName: \nDate: `,
      bCopied: "Details copied. Paste them in your banking app.", bCopyFail: "Couldn't copy. Press and hold to copy.",
      installTitle: "Use Remada full screen", installBtn: "Install",
      installAndroid: "Add it to your home screen: it opens without the browser bar.", installIOS: "Tap Share, then “Add to Home Screen”. It opens without the browser bar."
    },
    pt: {
      skip: "Pular para o conteúdo", sos: "SOS", offline: "Sem conexão. Mostrando as últimas informações salvas.",
      todayTitle: "Descubra Valdivia", todaySub: "Comer, passear e montar seu dia, tudo num só lugar.",
      campaignTitle: "Sua visita apoia o time sub-13 do Las Ánimas",
      of: (m) => `de ${m}`, campaignFoot: (n, d) => `${n ? n + " negócios contribuindo · " : ""}Meta até ${d}`,
      plansTitle: "Monte seu dia em 1 toque", featuredTitle: "Destaques", ideasTitle: "Imperdíveis", ideasRain: "Programas em lugar coberto", seeAll: "Ver tudo",
      tipTitle: "Dica do dia", eatTitle: "Comer e beber", doTitle: "O que fazer", dayTitle: "Meu dia", helpTitle: "Ajuda",
      moveTitle: "Como se locomover", tipsTitle: "Dicas", moveNote: "Preços e horários podem mudar. Confirme antes de ir.",
      tsunamiTitle: "Terremoto ou tsunami no litoral",
      tsunamiBody: "Se o tremor não deixar você ficar de pé ou a sirene tocar: suba a pé para um lugar alto. Não espere o aviso oficial.",
      source: "Fonte", search: "Buscar", searchPh: "Busque um lugar ou prato", searchPh2: "Busque um lugar ou atividade",
      footerBusiness: "Tem um negócio em Valdivia?", footerCta: "Participe e apoie o sub-13",
      footerNote: "“Aliado” e “Destaque” indicam uma contribuição maior para a campanha. Informação de referência: confirme os horários antes de ir.",
      photoCredits: "Fotos: Wikimedia Commons, com licenças livres. Toque no crédito de cada foto para ver autor e licença.",
      tabToday: "Hoje", tabEat: "Comer", tabDo: "Fazer", tabDay: "Meu dia", tabHelp: "Ajuda",
      all: "Tudo", directions: "Como chegar", call: "Ligar", web: "Site", whatsapp: "WhatsApp",
      featured: "Destaque", main: "Aliado", supports: "Apoia o sub-13", indoor: "Lugar coberto",
      byBusiness: "Informação fornecida pelo estabelecimento", photo: "Foto",
      results: (n) => `${n} resultado${n === 1 ? "" : "s"}`,
      empty: "Nenhum resultado. Tente outra busca.", noBusiness: "Em breve você verá aqui os negócios da campanha.",
      open: (n) => `Ver ${n}`, add: (n) => `Adicionar ${n} ao Meu dia`, remove: (n) => `Tirar ${n} do Meu dia`,
      added: "Adicionado ao Meu dia", removed: "Retirado do Meu dia", planAdded: (n) => `${n} paradas no Meu dia`,
      addDay: "Adicionar ao Meu dia", inDay: "No Meu dia", close: "Fechar",
      min: (m) => (m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? " " + (m % 60) + " min" : ""}` : `${m} min`),
      startAt: "Começo às", dayEmptyT: "Seu dia está vazio", dayEmpty: "Toque em “+” em qualquer lugar ou escolha um roteiro pronto.",
      openRoute: "Ver rota no mapa", share: "Compartilhar", clear: "Limpar", copied: "Roteiro copiado",
      dayNote: "Os tempos são aproximados e incluem 20 min de deslocamento entre as paradas.",
      daySummary: (n, fin) => `${n} parada${n === 1 ? "" : "s"} · termina ~${fin}`,
      up: "Subir", down: "Descer", less: "Menos tempo", more: "Mais tempo", del: "Tirar",
      stops: (n) => `${n} paradas`, myDayShare: "Meu dia em Valdivia",
      weather: (t, p) => `${t}°${p >= 40 ? ` · ${p}% de chuva` : ""}`,
      eventMore: "Ver agenda e dicas", eventLess: "Ocultar detalhes",
      eventTag: "Destaque da semana", eventPlan: "Montar meu domingo", eventSite: "Site oficial", eventBadge: "Ironman",
      countdown: (d, h) => (d > 0 ? `Falta${d === 1 ? "" : "m"} ${d} dia${d === 1 ? "" : "s"}` : h > 0 ? `Faltam ${h} h` : "É hoje!"), live: "Prova em andamento",
      seeReport: "Ver relatório de transparência", back: "Voltar", transpTitle: "Transparência", transpSub: "Cada contribuição e cada repasse ao clube, à vista de todos.",
      kRecv: "Recebido", kSent: "Repassado ao clube", kHeld: "A repassar", howTitle: "Como funciona", transfersTitle: "Repasses ao clube", donorsTitle: "Negócios que contribuem",
      reglas: ["Os negócios transferem sua contribuição para uma conta usada só para esta campanha, em nome do criador da Remada.", "A cada 15 dias, o valor reunido é repassado à categoria sub-13 do Club de Deportes Las Ánimas.", "Publicamos aqui cada repasse com data e comprovante.", "Até CLP 5.000.000, tudo vai para as famílias. Se a meta for superada, o excedente cobre a operação da Remada e o que sobrar volta para as famílias. A Remada não tem fins lucrativos."],
      noTransfers: "Ainda não há repasses. O primeiro será feito nos próximos 15 dias.", receipt: "Ver comprovante",
      noDonors: "Em breve você verá aqui os negócios que contribuem.", updated: (h) => `Dados ao vivo da planilha da campanha · ${h}`,
      progress: (p, d) => `${p}% da meta · ${d}`,
      wordsTitle: "Fale como um valdiviano", wordsSub: "Palavras chilenas que você vai ouvir na rua, à mesa e no ônibus. O significado vem em português.",
      langLabel: "Idioma", navLabel: "Seções", sosLabel: "Emergências", sectorLabel: "Região", topicsLabel: "Temas", call_: "Ligar para",
      today: "Hoje", tomorrow: "Amanhã", dayDate: "Outra data", dayDateLabel: "Para qual dia?",
      nPlans: (n) => `${n} roteiros prontos`, nBusinesses: (n) => `${n} negócio${n === 1 ? "" : "s"}`, nPlaces: (n) => `${n} lugares`,
      viewLabel: "Visualização", viewList: "Lista", viewMap: "Mapa", mapLabel: "Mapa de lugares", nearMe: "Perto de mim",
      mapError: "Não conseguimos carregar o mapa. Verifique sua conexão.", mapSome: (a, b) => `${a} de ${b} lugares no mapa. O resto está na lista.`,
      geoNo: "Seu navegador não permite localizar você.", geoAsk: "Buscando sua localização…", youAreHere: "Você está aqui",
      geoFar: "Você está longe de Valdivia. Mostramos os lugares mesmo assim.", geoDenied: "Sem permissão de localização. Ative no seu navegador.",
      donateTag: "Junte-se à causa", donateTitle: "Apoie o sub-13 do Las Ánimas",
      donateBody: "Sua contribuição voluntária ajuda as famílias que pagam o esporte dos filhos. Cada repasse ao clube é publicado em Transparência.",
      donateAmounts: "Valor sugerido", donateCopy: "Copiar dados", donateNotify: "Avisar minha contribuição", donateCta: "Quero contribuir",
      donateNote: "Transferência (Chile) para a conta usada só nesta campanha. No comentário escreva “U13” e seu nome. Sem benefício fiscal.",
      bHolder: "Titular", bBank: "Banco", bType: "Tipo de conta", bNumber: "Número", bEmail: "E-mail", bAmount: "Valor", bComment: "Comentário", yourName: "seu nome",
      notifySubject: (m) => `Contribuição voluntária sub-13 · ${m}`, notifyBody: (m) => `Olá, transferi ${m} para o sub-13 do Las Ánimas.\nNome: \nData: `,
      bCopied: "Dados copiados. Cole no app do seu banco.", bCopyFail: "Não foi possível copiar. Mantenha pressionado para copiar.",
      installTitle: "Use a Remada em tela cheia", installBtn: "Instalar",
      installAndroid: "Adicione à tela inicial: abre sem a barra do navegador.", installIOS: "Toque em Compartilhar e depois em “Adicionar à Tela de Início”. Abre sem a barra do navegador."
    }
  };

  const EMERGENCIAS = [
    { n: "131", es: "Ambulancia", en: "Ambulance", pt: "Ambulância" },
    { n: "132", es: "Bomberos", en: "Fire", pt: "Bombeiros" },
    { n: "133", es: "Carabineros", en: "Police", pt: "Polícia (Carabineros)" },
    { n: "137", es: "Emergencia en el mar", en: "Sea rescue", pt: "Resgate no mar" }
  ];
  const MOVERSE = [
    { es: ["A pie", "Centro, costanera e Isla Teja se recorren caminando."], en: ["On foot", "Downtown, the waterfront and Isla Teja are walkable."], pt: ["A pé", "O centro, a Costanera (orla do rio) e a Isla Teja dá para conhecer caminhando."] },
    { es: ["Micro (bus)", "Recorren la ciudad y llegan a Niebla. Lleva monedas por si acaso."], en: ["Micro (city bus)", "They cover the city and go to Niebla. Carry some coins."], pt: ["Micro (ônibus)", "Circulam pela cidade e vão até Niebla. Leve moedas, por via das dúvidas."] },
    { es: ["Colectivo", "Taxi compartido con ruta fija. Rápido y barato, se paga en efectivo."], en: ["Colectivo", "Shared taxi with a fixed route. Fast and cheap, pay in cash."], pt: ["Colectivo", "Táxi compartilhado com rota fixa. Rápido e barato, pago em dinheiro."] },
    { es: ["Taxi y apps", "Lo más cómodo de noche o al aeródromo."], en: ["Taxis and apps", "Easiest at night or to the airport."], pt: ["Táxi e aplicativos", "O mais prático à noite ou para ir ao aeroporto."] },
    { es: ["Niebla – Corral", "Barcaza y lanchas desde el muelle de Niebla. Con mal tiempo se suspenden."], en: ["Niebla – Corral", "Ferry and boats from Niebla pier. They stop in bad weather."], pt: ["Niebla – Corral", "Balsa e lanchas saem do cais de Niebla. Com mau tempo, são suspensas."] },
    { es: ["Llegar y salir", "Aeródromo Pichoy: 30 min al centro. Terminal de buses: a pasos del centro."], en: ["Arriving and leaving", "Pichoy airport: 30 min to downtown. Bus terminal: close to downtown."], pt: ["Chegar e partir", "Aeroporto Pichoy: 30 min até o centro. Rodoviária: pertinho do centro."] }
  ];
  const TIPS = [
    { es: ["Clima", "Llueve seguido, incluso en verano. Lleva chaqueta impermeable."], en: ["Weather", "It rains often, even in summer. Bring a rain jacket."], pt: ["Clima", "Chove com frequência, até no verão. Traga uma jaqueta impermeável."] },
    { es: ["Dinero", "Casi todo acepta tarjeta. Propina sugerida: 10%."], en: ["Money", "Most places take cards. Customary tip: 10%."], pt: ["Dinheiro", "Quase todo lugar aceita cartão. A gorjeta sugerida (propina) é de 10%."] },
    { es: ["Lobos marinos", "Míralos a distancia. No los alimentes: pueden morder."], en: ["Sea lions", "Watch from a distance. Don't feed them: they bite."], pt: ["Lobos-marinhos", "Observe de longe. Não dê comida: eles mordem."] },
    { es: ["Cerveza", "Valdivia es la capital cervecera. Si tomas, no manejes."], en: ["Beer", "Valdivia is the craft beer capital. If you drink, don't drive."], pt: ["Cerveja", "Valdivia é a capital da cerveja artesanal do Chile. Se beber, não dirija."] },
    { es: ["Ironman y eventos", "En días de carrera se cierran calles y la costanera. Mejor camina."], en: ["Ironman and events", "On race days streets and the waterfront close. Walk instead."], pt: ["Ironman e eventos", "Em dia de prova, ruas e a Costanera ficam fechadas. Melhor ir a pé."] },
    { es: ["Costa", "Respeta los cierres de senderos y playas: hay riesgo de derrumbes."], en: ["Coast", "Respect closed trails and beaches: there is landslide risk."], pt: ["Litoral", "Respeite trilhas e praias interditadas: há risco de deslizamentos."] }
  ];
  // Palabras locales: [palabra, significado es, significado en, ejemplo]
  const PALABRAS = {
    charla: { es: "Conversar", en: "Small talk", pt: "Conversa", items: [
      ["¿Cachai?", "¿Entiendes?", "Get it? / You know?", "«Es por allá, ¿cachai?»", "Entendeu? / Sacou?"],
      ["Po", "Muletilla que refuerza: «sí po», «no po»", "Filler word for emphasis: “sí po” = yeah, sure", "«¡Obvio po!»", "Reforço no fim da frase: “sí po” = sim, claro"],
      ["¿Cómo estai?", "¿Cómo estás? (informal)", "How are you? (casual)", "«¡Hola! ¿Cómo estai?»", "Como você está? (informal)"],
      ["Bacán", "Genial, muy bueno", "Awesome", "«El paseo en barco estuvo bacán»", "Muito legal, demais"],
      ["Fome", "Aburrido, sin gracia", "Boring, lame", "«Llovió y el día quedó fome»", "Chato, sem graça (não tem nada a ver com fome!)"],
      ["Cuático", "Impresionante o exagerado", "Wild, intense, unbelievable", "«Correr 42 km es cuático»", "Impressionante ou exagerado"],
      ["Harto", "Mucho, bastante", "A lot, plenty", "«Hay harta gente en la Costanera»", "Muito, bastante"],
      ["Al tiro", "Enseguida, ahora mismo", "Right away", "«Te lo traigo al tiro»", "Na hora, agora mesmo"],
      ["Piola", "Tranquilo, sin llamar la atención", "Chill, low-key", "«Un bar piola junto al río»", "Tranquilo, discreto"],
      ["Pololo / polola", "Novio / novia", "Boyfriend / girlfriend", "«Vine con mi polola»", "Namorado / namorada"],
      ["Cabros", "Chicos, jóvenes", "Kids, young people", "«Los cabros de la U13 juegan el sábado»", "Garotos, jovens"],
      ["Guagua", "Bebé", "Baby", "«¿Hay mudador para la guagua?»", "Bebê"],
      ["Pega", "Trabajo", "Job, work", "«Mañana tengo pega temprano»", "Trabalho"],
      ["Carrete", "Fiesta, salida nocturna", "Party, night out", "«¿Dónde es el carrete?»", "Festa, balada"]
    ]},
    mesa: { es: "En la mesa", en: "Food and drink", pt: "À mesa", items: [
      ["Once", "Merienda de la tarde, con pan, té y algo dulce", "Afternoon tea with bread and something sweet", "«Tomemos once con kuchen»", "Lanche da tarde, com pão, chá e algo doce"],
      ["Kuchen", "Pastel de origen alemán, típico del sur", "German-style cake, a southern classic", "«El kuchen de murta es de aquí»", "Torta de origem alemã, típica do sul"],
      ["Schop", "Cerveza de barril", "Draft beer", "«Un schop de la casa, por favor»", "Chope"],
      ["Chela", "Cerveza (informal)", "Beer (slang)", "«¿Vamos por unas chelas?»", "Cerveja (gíria)"],
      ["Copete", "Trago con alcohol", "Alcoholic drink", "«Sin copete, que mañana corro»", "Bebida alcoólica, drinque"],
      ["Paila marina", "Caldo caliente de mariscos y pescado", "Hot seafood and fish soup", "«Ideal para un día de lluvia»", "Caldo quente de frutos do mar e peixe"],
      ["Curanto", "Mariscos, carnes y papas cocidos juntos", "Shellfish, meat and potatoes cooked together", "«En Niebla sirven curanto en olla»", "Frutos do mar, carnes e batatas cozidos juntos"],
      ["Completo", "Hot dog con palta, tomate y mayo", "Hot dog with avocado, tomato and mayo", "«Un completo italiano»", "Cachorro-quente com abacate, tomate e maionese"],
      ["Palta", "Aguacate", "Avocado", "«¿Le pone palta?»", "Abacate"],
      ["Sopaipilla", "Masa frita de zapallo", "Fried pumpkin dough", "«Sopaipillas con pebre cuando llueve»", "Massa frita de abóbora"],
      ["Pebre", "Salsa de tomate, cebolla, cilantro y ají", "Fresh tomato, onion and chili salsa", "«Pásame el pebre»", "Molho de tomate, cebola, coentro e pimenta"],
      ["Mote con huesillo", "Bebida dulce con trigo y durazno seco", "Sweet drink with wheat and dried peach", "«Refrescante en verano»", "Bebida doce com trigo e pêssego seco"],
      ["Murta", "Fruto silvestre del sur, rojo y aromático", "Wild southern berry", "«Mermelada de murta»", "Fruta silvestre do sul, vermelha e aromática"]
    ]},
    calle: { es: "En la calle", en: "Getting around", pt: "Na rua", items: [
      ["Micro", "Bus urbano", "City bus", "«La micro a Niebla pasa por la Costanera»", "Ônibus urbano"],
      ["Colectivo", "Taxi compartido con ruta fija", "Shared taxi with a fixed route", "«Toma un colectivo a la Isla Teja»", "Táxi compartilhado com rota fixa"],
      ["Paradero", "Parada de bus", "Bus stop", "«Bájate en el paradero del puente»", "Ponto de ônibus"],
      ["Taco", "Atasco de tráfico", "Traffic jam", "«Con el Ironman habrá taco»", "Engarrafamento"],
      ["Luca", "Mil pesos", "1,000 pesos", "«Son cinco lucas»", "Mil pesos"],
      ["Gamba", "Cien pesos", "100 pesos", "«Me faltan dos gambas»", "Cem pesos"],
      ["Cuadra", "Distancia entre esquinas, unos 100 m", "One city block, about 100 m", "«Está a tres cuadras»", "Quarteirão, uns 100 m"],
      ["Achuntar", "Acertar, dar en el blanco", "To get it right, hit the spot", "«¡Achuntamos con el día sin lluvia!»", "Acertar em cheio"]
    ]}
  };
  let temaPalabras = "charla";

  const SECTORES = ["Valdivia centro", "Isla Teja", "Otro sector de Valdivia", "Niebla y Los Molinos", "Corral", "Curiñanco y costa"];
  const SECTOR_TR = {
    en: { "Valdivia centro": "Downtown", "Isla Teja": "Isla Teja", "Otro sector de Valdivia": "Other areas", "Niebla y Los Molinos": "Niebla", "Corral": "Corral", "Curiñanco y costa": "Coast" },
    pt: { "Valdivia centro": "Centro", "Isla Teja": "Isla Teja", "Otro sector de Valdivia": "Outras regiões", "Niebla y Los Molinos": "Niebla", "Corral": "Corral", "Curiñanco y costa": "Litoral" }
  };
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
  const IDIOMAS = ["es", "en", "pt"];
  const LOCALE = { es: "es-CL", en: "en-US", pt: "pt-BR" };
  const idiomaInicial = () => {
    try { const q = new URLSearchParams(location.search).get("lang"); if (IDIOMAS.includes(q)) { guardar("valdi-lang", q); return q; } } catch (e) { /* sin parámetros */ }
    const g = leer("valdi-lang"); if (IDIOMAS.includes(g)) return g;
    const n = (navigator.language || "es").toLowerCase();
    return n.startsWith("es") ? "es" : n.startsWith("pt") ? "pt" : "en";
  };
  let lang = idiomaInicial();
  const estado = {
    lugares: [], planes: [], negocios: [], evento: null, porId: new Map(),
    campana: { recaudado: CFG.recaudado || 0, negocios: CFG.negocios || 0 }, traspasos: [], cargadoEn: null,
    lluvia: null, filtros: { comer: null, hacer: null }, q: { comer: "", hacer: "" },
    dias: (() => { try { return JSON.parse(leer("remada-dias") || "{}"); } catch (e) { return {}; } })(),
    fecha: null, dia: [], inicio: "10:00",
    modo: { comer: "lista", hacer: "lista" }, yo: null
  };
  // Fecha de hoy en Valdivia (AAAA-MM-DD)
  const hoyISO = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago" }).format(new Date());
  const masDias = (iso, n) => { const d = new Date(iso + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
  (function migrarDias() {
    const hoy = hoyISO();
    try { const viejo = JSON.parse(leer("valdi-dia") || "null"); if (Array.isArray(viejo) && viejo.length && !estado.dias[hoy]) estado.dias[hoy] = { inicio: leer("valdi-inicio") || "10:00", paradas: viejo }; } catch (e) { /* nada */ }
    for (const f of Object.keys(estado.dias)) if (f < hoy || !estado.dias[f] || !(estado.dias[f].paradas || []).length) delete estado.dias[f];
    estado.fecha = hoy;
    estado.dia = (estado.dias[hoy] && estado.dias[hoy].paradas) || [];
    estado.inicio = (estado.dias[hoy] && estado.dias[hoy].inicio) || "10:00";
  })();
  const t = (k, ...a) => { const v = (T[lang] || T.es)[k]; return typeof v === "function" ? v(...a) : v; };
  // Texto en el idioma actual; si falta, en español.
  const tr = (o) => (o && (o[lang] || o.es)) || "";
  const loc = () => LOCALE[lang] || "es-CL";

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
  const fmtCLP = (n) => new Intl.NumberFormat(loc(), { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);
  const fotoUrl = (p, w = 800) => !p.foto ? "" : /^https:\/\//.test(p.foto) ? p.foto : `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(p.foto)}?width=${w}`;
  const fotoPagina = (p) => (p.foto && !/^https:\/\//.test(p.foto) ? "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(p.foto.replace(/ /g, "_")) : "");
  const mapaUrl = (p) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(p.mapa || p.nombre + ", Valdivia");
  const corto = (p) => (p.corto && tr(p.corto)) || tr(p);
  const largo = (p) => tr(p);
  const nomSector = (s) => (SECTOR_TR[lang] && SECTOR_TR[lang][s]) || s;
  const sector = (p) => nomSector(p.sector);
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
  const recortar = (d) => { d = d || ""; return d.length > 70 ? d.slice(0, 68).replace(/\s+\S*$/, "") + "…" : d; };
  function aNegocio(f) {
    const nv = sinTildes(f.nivel || "").trim();
    const tipo = /comida|bebida|comer|restaurant|cafe/i.test(f.rubro || "") ? "comer" : "hacer";
    const d = f.descripcion || "";
    return {
      id: "neg-" + slug(f.nombre), negocio: true, tipo, nombre: f.nombre, sector: f.sector || "",
      direccion: f.direccion || "", lat: Number(f.lat) || null, lng: Number(f.lng) || null, horario: f.horario || "", es: d, en: f.descripcion_en || "", pt: f.descripcion_pt || "",
      corto: { es: recortar(d), en: recortar(f.descripcion_en) || undefined, pt: recortar(f.descripcion_pt) || undefined },
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
    b.append(el("strong", { text: tr(plan) }), el("span", { text: `${t("stops", plan.paradas.length)} · ${t("min", Math.round(total / 30) * 30)}` }));
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
  function guardarDia() {
    if (estado.dia.length) estado.dias[estado.fecha] = { inicio: estado.inicio, paradas: estado.dia };
    else delete estado.dias[estado.fecha];
    guardar("remada-dias", JSON.stringify(estado.dias));
  }
  const fmtFecha = (iso, largo) => new Intl.DateTimeFormat(loc(), largo ? { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" } : { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(iso + "T12:00:00Z"));
  const nombreFecha = (iso) => (iso === hoyISO() ? t("today") : iso === masDias(hoyISO(), 1) ? t("tomorrow") : fmtFecha(iso));
  function cambiarFecha(iso) {
    if (!iso || iso === estado.fecha) return;
    guardarDia();
    estado.fecha = iso < hoyISO() ? hoyISO() : iso;
    const d = estado.dias[estado.fecha];
    estado.dia = d ? d.paradas.slice() : [];
    estado.inicio = (d && d.inicio) || "10:00";
    $("#hora-inicio").value = estado.inicio; $("#dia-fecha").value = estado.fecha;
    pintarDia(); pintarTarjetasMas(); actualizarContador(true);
  }
  function pintarFechas() {
    const hoy = hoyISO(), man = masDias(hoy, 1);
    const fechas = [...new Set([hoy, man, estado.fecha, ...Object.keys(estado.dias)])].filter((f) => f >= hoy).sort();
    $("#dia-fechas").replaceChildren(...fechas.map((f) => {
      const n = f === estado.fecha ? estado.dia.length : ((estado.dias[f] && estado.dias[f].paradas.length) || 0);
      return el("button", { type: "button", class: "fecha-chip pressable", "aria-pressed": String(f === estado.fecha), onclick: () => cambiarFecha(f) },
        el("span", { text: nombreFecha(f) }), n ? el("b", { text: String(n) }) : null);
    }));
    const fi = $("#dia-fecha"); fi.min = hoy; fi.value = estado.fecha;
    $("#t-dia").textContent = estado.fecha === hoy ? t("dayTitle") : `${t("dayTitle")} · ${fmtFecha(estado.fecha, true)}`;
  }
  function actualizarContador(pop) {
    const c = $("#contador-dia"); const n = estado.dia.length;
    c.hidden = !n; c.textContent = n;
    if (pop && !reduceMotion) { c.classList.remove("pop"); void c.offsetWidth; c.classList.add("pop"); }
  }
  function alternarDia(id) {
    const p = estado.porId.get(id); if (!p) return;
    if (enDia(id)) { estado.dia = estado.dia.filter((s) => s.id !== id); toast(t("removed")); }
    else { estado.dia.push({ id, dur: p.duracion || 60 }); toast(estado.fecha === hoyISO() ? t("added") : `${t("added")} · ${nombreFecha(estado.fecha)}`); }
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
    if (estado.porId.size) estado.dia = estado.dia.filter((s) => estado.porId.has(s.id));
    pintarFechas();
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
    return `${t("myDayShare")} · ${fmtFecha(estado.fecha, true)}\n${lineas.join("\n")}\n\n${location.href.split("#")[0]}`;
  }

  // ---------- Paneles de Hoy ----------
  function iniciarPaneles() {
    let guardados = {}; try { guardados = JSON.parse(leer("remada-paneles") || "{}"); } catch (e) { /* nada */ }
    document.querySelectorAll(".panel").forEach((p) => {
      const id = p.dataset.panel, b = p.querySelector(".panel-btn");
      const poner = (abierto) => { p.classList.toggle("abierto", abierto); b.setAttribute("aria-expanded", String(abierto)); };
      poner(id in guardados ? guardados[id] : p.dataset.abierto === "1");
      b.addEventListener("click", () => {
        const abierto = b.getAttribute("aria-expanded") !== "true";
        poner(abierto); guardados[id] = abierto; guardar("remada-paneles", JSON.stringify(guardados));
      });
    });
  }

  // ---------- Mapa (Leaflet propio + teselas CARTO/OSM) ----------
  const VALDIVIA = [-39.8142, -73.2459];
  let leafletListo = null;
  function cargarLeaflet() {
    if (window.L) return Promise.resolve();
    if (leafletListo) return leafletListo;
    leafletListo = new Promise((ok, mal) => {
      const css = document.createElement("link"); css.rel = "stylesheet"; css.href = "vendor/leaflet/leaflet.css"; document.head.append(css);
      const s = document.createElement("script"); s.src = "vendor/leaflet/leaflet.js"; s.onload = ok; s.onerror = mal; document.head.append(s);
    });
    return leafletListo;
  }
  const mapas = {};
  let geoCache = {}; try { geoCache = JSON.parse(leer("remada-geo") || "{}"); } catch (e) { /* nada */ }
  let geoCola = Promise.resolve();
  function geocodificar(p) {
    // Para negocios sin lat/lng: Nominatim (OSM), 1 consulta por segundo y con caché en el teléfono.
    const q = [p.direccion, "Valdivia, Chile"].filter(Boolean).join(", ");
    if (geoCache[q]) return Promise.resolve(geoCache[q]);
    geoCola = geoCola.then(() => new Promise((r) => setTimeout(r, 1100))).then(async () => {
      try {
        const u = "https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=cl&viewbox=-73.6,-39.6,-73.0,-40.0&bounded=1&q=" + encodeURIComponent(q);
        const r = await fetch(u, { headers: { "Accept-Language": "es" } }); const d = await r.json();
        if (d && d[0]) { geoCache[q] = [Number(d[0].lat), Number(d[0].lon)]; guardar("remada-geo", JSON.stringify(geoCache)); }
      } catch (e) { /* sin ubicación */ }
      return geoCache[q];
    });
    return geoCola;
  }
  const distKm = (a, b) => { const R = 6371, dLa = (b[0] - a[0]) * Math.PI / 180, dLo = (b[1] - a[1]) * Math.PI / 180; const x = Math.sin(dLa / 2) ** 2 + Math.cos(a[0] * Math.PI / 180) * Math.cos(b[0] * Math.PI / 180) * Math.sin(dLo / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(x)); };
  const fmtDist = (km) => (km < 1 ? `${Math.round(km * 1000 / 50) * 50} m` : `${km.toFixed(km < 10 ? 1 : 0).replace(".", lang === "en" ? "." : ",")} km`);
  function itemsModulo(mod) {
    const q = sinTildes(estado.q[mod]), f = estado.filtros[mod];
    return todos().filter((p) => p.tipo === mod && (!f || p.sector === f) && (!q || sinTildes([p.nombre, p.es, p.en, p.sector, p.direccion].join(" ")).includes(q)));
  }
  async function pintarMapa(mod) {
    const caja = $("#mapa-caja-" + mod); if (caja.hidden) return;
    try { await cargarLeaflet(); } catch (e) { $("#mapa-nota-" + mod).textContent = t("mapError"); return; }
    const L = window.L;
    let m = mapas[mod];
    if (!m) {
      const mapa = L.map("mapa-" + mod, { zoomControl: true, attributionControl: true }).setView(VALDIVIA, 13);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        maxZoom: 19, subdomains: "abcd",
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(mapa);
      m = mapas[mod] = { mapa, capa: L.layerGroup().addTo(mapa), yo: null, marcadores: {} };
    }
    setTimeout(() => m.mapa.invalidateSize(), 50);
    m.capa.clearLayers(); m.marcadores = {};
    const items = itemsModulo(mod);
    const conPos = [];
    const poner = (p, pos) => {
      if (!pos) return;
      const nivel = p.evento ? "evt" : p.negocio ? (p.nivel === 0 ? "aliado" : p.nivel === 1 ? "dest" : "neg") : "lugar";
      const ic = L.divIcon({ className: "pin pin-" + nivel, html: `<span>${p.tipo === "comer" ? I.food : I.mountain}</span>`, iconSize: [36, 36], iconAnchor: [18, 34] });
      const mk = L.marker(pos, { icon: ic, title: p.nombre, alt: p.nombre, keyboard: true }).addTo(m.capa);
      mk.on("click", () => enfocarTarjeta(mod, p.id, true));
      m.marcadores[p.id] = mk; conPos.push(pos); p._pos = pos;
    };
    for (const p of items) {
      const pos = p.lat && p.lng ? [Number(p.lat), Number(p.lng)] : null;
      if (pos) poner(p, pos);
      else if (p.negocio && p.direccion) geocodificar(p).then((g) => { if (g && mapas[mod]) { poner(p, g); pintarCarruselMapa(mod, items); } });
    }
    if (m.yo) conPos.push(m.yo);
    if (conPos.length && !m.ajustado) { m.mapa.fitBounds(L.latLngBounds(conPos).pad(0.15), { maxZoom: 15 }); m.ajustado = true; }
    pintarCarruselMapa(mod, items);
  }
  function pintarCarruselMapa(mod, items) {
    let lista = items.filter((p) => p._pos || (p.lat && p.lng));
    if (estado.yo) lista = lista.map((p) => ((p._km = distKm(estado.yo, p._pos || [p.lat, p.lng])), p)).sort((a, b) => a._km - b._km);
    $("#mapa-lista-" + mod).replaceChildren(...lista.map((p, i) => {
      const c = tarjeta(p, i); c.dataset.id = p.id; c.classList.add("visible");
      if (estado.yo && p._km != null) c.querySelector(".card-meta").prepend(el("span", { class: "dist", text: fmtDist(p._km) }));
      return c;
    }));
    $("#mapa-nota-" + mod).textContent = lista.length < items.length ? t("mapSome", lista.length, items.length) : "";
  }
  function enfocarTarjeta(mod, id, desdeMapa) {
    const c = $(`#mapa-lista-${mod} [data-id="${CSS.escape(id)}"]`);
    if (c) { c.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", inline: "center", block: "nearest" }); c.classList.add("resaltada"); setTimeout(() => c.classList.remove("resaltada"), 1200); }
    const m = mapas[mod]; if (!desdeMapa && m && m.marcadores[id]) m.mapa.panTo(m.marcadores[id].getLatLng());
  }
  function cambiarModo(mod, modo) {
    estado.modo[mod] = modo;
    document.querySelectorAll(`.modo[data-mod="${mod}"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.modo === modo)));
    $("#lista-" + mod).hidden = modo === "mapa"; $("#mapa-caja-" + mod).hidden = modo !== "mapa";
    if (modo === "mapa") pintarMapa(mod);
  }
  function ubicarme(mod) {
    const nota = $("#mapa-nota-" + mod);
    if (!navigator.geolocation) { nota.textContent = t("geoNo"); return; }
    nota.textContent = t("geoAsk");
    navigator.geolocation.getCurrentPosition((pos) => {
      estado.yo = [pos.coords.latitude, pos.coords.longitude];
      const m = mapas[mod]; if (!m) return;
      if (m.yo) m.yo.remove();
      const lejos = distKm(estado.yo, VALDIVIA) > 60;
      m.yo = window.L.circleMarker(estado.yo, { radius: 9, color: "#fff", weight: 3, fillColor: "#1A73E8", fillOpacity: 1 }).addTo(m.mapa).bindTooltip(t("youAreHere"));
      if (lejos) nota.textContent = t("geoFar"); else { nota.textContent = ""; m.mapa.setView(estado.yo, 15); }
      pintarCarruselMapa(mod, itemsModulo(mod));
    }, () => { nota.textContent = t("geoDenied"); }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
  }
  function iniciarMapas() {
    document.querySelectorAll(".modo").forEach((b) => b.addEventListener("click", () => cambiarModo(b.dataset.mod, b.dataset.modo)));
    document.querySelectorAll(".mapa-yo").forEach((b) => b.addEventListener("click", () => ubicarme(b.dataset.mod)));
    ["comer", "hacer"].forEach((mod) => {
      const car = $("#mapa-lista-" + mod); let tm;
      car.addEventListener("scroll", () => { clearTimeout(tm); tm = setTimeout(() => {
        const r = car.getBoundingClientRect(); let mejor = null, d0 = 1e9;
        car.querySelectorAll("[data-id]").forEach((c) => { const cr = c.getBoundingClientRect(); const d = Math.abs(cr.left - r.left - 16); if (d < d0) { d0 = d; mejor = c; } });
        const m = mapas[mod]; if (mejor && m && m.marcadores[mejor.dataset.id]) { m.mapa.panTo(m.marcadores[mejor.dataset.id].getLatLng()); Object.values(m.marcadores).forEach((k) => k.getElement() && k.getElement().classList.remove("activo")); const e = m.marcadores[mejor.dataset.id].getElement(); if (e) e.classList.add("activo"); }
      }, 120); });
    });
  }

  // ---------- Aporte voluntario ----------
  let montoSel = 5000;
  function pintarAporte() {
    const montos = (CFG.aporteMontos || [2000, 5000, 10000, 20000]);
    $("#montos").replaceChildren(...montos.map((m) => el("button", { type: "button", class: "monto pressable", "aria-pressed": String(m === montoSel), text: fmtCLP(m), onclick: () => { montoSel = m; pintarAporte(); } })));
    const b = CFG.banco || {};
    const filas = [[t("bHolder"), b.titular], ["RUT", b.rut], [t("bBank"), b.banco], [t("bType"), b.tipo], [t("bNumber"), b.numero], [t("bEmail"), b.correo], [t("bAmount"), fmtCLP(montoSel)], [t("bComment"), "U13 + " + t("yourName")]].filter((x) => x[1]);
    $("#banco").replaceChildren(...filas.flatMap(([k, v]) => [el("dt", { text: k }), el("dd", { text: v })]));
    const asunto = encodeURIComponent(t("notifySubject", fmtCLP(montoSel)));
    const cuerpo = encodeURIComponent(t("notifyBody", fmtCLP(montoSel)));
    $("#avisar-aporte").href = b.correo ? `mailto:${b.correo}?subject=${asunto}&body=${cuerpo}` : "#transparencia";
  }
  function iniciarAporte() {
    if (!CFG.banco) { $("#aportar").hidden = true; return; }
    pintarAporte();
    document.addEventListener("remada:idioma", pintarAporte);
    $("#copiar-banco").addEventListener("click", async () => {
      const b = CFG.banco;
      const txt = [b.titular, "RUT " + b.rut, b.banco, b.tipo, "N° " + b.numero, b.correo, t("bAmount") + ": " + fmtCLP(montoSel), t("bComment") + ": U13 + " + t("yourName")].filter(Boolean).join("\n");
      try { await navigator.clipboard.writeText(txt); toast(t("bCopied")); } catch (e) { toast(t("bCopyFail")); }
    });
  }

  // ---------- Instalar como app (pantalla completa) ----------
  let promptInstalar = null;
  const instalada = () => matchMedia("(display-mode: standalone)").matches || matchMedia("(display-mode: fullscreen)").matches || navigator.standalone === true;
  function iniciarInstalar() {
    const caja = $("#instalar");
    const esIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
    const pintar = () => { $("#instalar-p").textContent = promptInstalar ? t("installAndroid") : t("installIOS"); $("#btn-instalar").hidden = !promptInstalar; };
    const mostrar = () => { if (instalada() || leer("remada-instalar-cerrado")) return; pintar(); caja.hidden = false; };
    window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); promptInstalar = e; mostrar(); });
    if (esIOS) setTimeout(mostrar, 1500);
    $("#btn-instalar").addEventListener("click", async () => { if (!promptInstalar) return; promptInstalar.prompt(); try { await promptInstalar.userChoice; } catch (e) { /* nada */ } promptInstalar = null; caja.hidden = true; });
    $("#instalar-x").addEventListener("click", () => { guardar("remada-instalar-cerrado", "1"); caja.hidden = true; });
    window.addEventListener("appinstalled", () => { caja.hidden = true; });
    document.addEventListener("remada:idioma", pintar);
  }

  // ---------- Barra superior que se esconde al bajar ----------
  function iniciarBarra() {
    const barra = $(".barra"); let ultimo = window.scrollY, tic = false;
    window.addEventListener("scroll", () => {
      if (tic) return; tic = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 80 && y > ultimo + 6) barra.classList.add("oculta");
        else if (y < ultimo - 6 || y < 80) barra.classList.remove("oculta");
        ultimo = y; tic = false;
      });
    }, { passive: true });
  }

  // ---------- Vistas ----------
  function pintarModulo(mod) {
    setTimeout(() => { if (estado.modo[mod] === "mapa") pintarMapa(mod); }, 0);
    const q = sinTildes(estado.q[mod]); const f = estado.filtros[mod];
    const base = todos().filter((p) => p.tipo === mod);
    const items = base.filter((p) => (!f || p.sector === f) && (!q || sinTildes([p.nombre, p.es, p.en, p.pt, p.sector, nomSector(p.sector), p.direccion].join(" ")).includes(q)));
    pintar($("#lista-" + mod), items, t("empty"));
    $("#n-" + mod).textContent = t("results", items.length);
    const sectores = SECTORES.filter((s) => base.some((p) => p.sector === s));
    $("#filtros-" + mod).replaceChildren(...[null, ...sectores].map((s) =>
      el("button", { type: "button", class: "pressable", "aria-pressed": String(f === s), text: s ? nomSector(s) : t("all"), onclick: () => { estado.filtros[mod] = s; pintarModulo(mod); } })));
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
    const fecha = new Intl.DateTimeFormat(loc(), { day: "numeric", month: "long", timeZone: "America/Santiago" }).format(new Date((CFG.fechaMeta || "2027-01-04") + "T12:00:00-03:00"));
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
    const tip = tr(TIPS[Math.floor(Date.now() / 86400000) % TIPS.length]);
    $("#tip-dia").textContent = `${tip[0]}: ${tip[1]}`;
    $("#res-tip").textContent = tip[0];
    $("#res-planes").textContent = t("nPlans", planes.length);
    $("#res-destacados").textContent = estado.negocios.length ? t("nBusinesses", estado.negocios.length) : "";
    $("#res-imperdibles").textContent = t("nPlaces", Math.min(6, base.length));
    $("#res-campana").textContent = `${fmtCLP(recaudado)} ${t("of", fmtCLP(meta))}`;
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
    const fecha = new Intl.DateTimeFormat(loc(), { day: "numeric", month: "long", timeZone: "America/Santiago" }).format(new Date((CFG.fechaMeta || "2027-01-04") + "T12:00:00-03:00"));
    $("#texto-transp").textContent = t("progress", pct, `${fmtCLP(meta)} · ${fecha}`);
    $("#reglas").replaceChildren(...t("reglas").map((r) => el("li", {}, el("p", { text: r }))));
    const fmtF = (f) => { const d = new Date(f + "T12:00:00-03:00"); return isNaN(d) ? f : new Intl.DateTimeFormat(loc(), { day: "numeric", month: "short", year: "numeric", timeZone: "America/Santiago" }).format(d); };
    const ent = estado.traspasos.slice().sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
    $("#lista-entregas").replaceChildren(...(ent.length ? ent.map((x) => el("li", { class: "entrega" },
      el("span", { class: "f", text: fmtF(x.fecha) }), el("strong", { text: fmtCLP(x.monto) }),
      el("span", { class: "d", text: [x.destino || "U13 Club de Deportes Las Ánimas", x.nota].filter(Boolean).join(" · ") }),
      /^https:\/\//.test(x.comprobante) ? el("a", { href: x.comprobante, target: "_blank", rel: "noopener", text: t("receipt") }) : null))
      : [el("li", { class: "vacio", text: t("noTransfers") })]));
    const ap = estado.negocios.slice().sort((a, b) => a.nivel - b.nivel || a.nombre.localeCompare(b.nombre));
    $("#lista-aportantes").replaceChildren(...(ap.length ? ap.map((p) => el("span", { class: "aportante n" + p.nivel, text: p.nombre })) : [el("p", { class: "vacio", text: t("noDonors") })]));
    const h = estado.cargadoEn ? new Intl.DateTimeFormat(loc(), { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short", timeZone: "America/Santiago" }).format(estado.cargadoEn) : "";
    $("#transp-actualizado").textContent = h ? t("updated", h) : "";
  }
  function pintarEvento() {
    const ev = estado.evento, caja = $("#evento");
    if (!ev || !eventoActivo()) { caja.hidden = true; return; }
    caja.hidden = false;
    const L = tr;
    $("#t-evento").textContent = L(ev.titulo);
    $("#evento-bajada").textContent = L(ev.bajada);
    const falta = new Date(ev.inicio).getTime() - Date.now();
    const dias = Math.floor(falta / 86400000), horas = Math.ceil(falta / 3600000);
    $("#evento-cuenta").textContent = falta > 0 ? t("countdown", dias, horas) : t("live");
    $("#evento-agenda").replaceChildren(...ev.agenda.map((a) => el("li", {},
      el("p", { class: "cuando" }, document.createTextNode(L(a.dia)), a.hora ? el("span", { text: a.hora }) : null),
      el("p", { text: tr(a) }))));
    $("#evento-consejos").replaceChildren(...L(ev.consejos).map((c) => el("li", { text: c })));
    $("#evento-link").href = ev.url;
    $("#evento-nota").textContent = L(ev.nota);
  }
  function pintarPalabras() {
    $("#filtros-palabras").replaceChildren(...Object.entries(PALABRAS).map(([k, g]) =>
      el("button", { type: "button", class: "pressable", "aria-pressed": String(k === temaPalabras), text: tr(g), onclick: () => { temaPalabras = k; pintarPalabras(); } })));
    $("#lista-palabras").replaceChildren(...PALABRAS[temaPalabras].items.map(([w, es, en, ej, pt], i) =>
      el("article", { class: "palabra", style: reduceMotion ? null : `animation-delay:${Math.min(i, 8) * 30}ms` },
        el("p", { class: "palabra-t", lang: "es", text: w }),
        el("p", { class: "palabra-s", text: lang === "en" ? en : lang === "pt" ? (pt || es) : es }),
        el("p", { class: "palabra-e", lang: "es", text: ej }))));
  }
  function pintarEstaticos() {
    pintarPalabras();
    $("#lista-emergencias").replaceChildren(...EMERGENCIAS.map((e) =>
      el("a", { href: "tel:" + e.n, class: "pressable", "aria-label": `${t("call_")} ${e.n}, ${tr(e)}` }, el("strong", { text: e.n }), el("span", { text: tr(e) }))));
    const acordeon = (x) => el("details", { class: "acordeon" }, el("summary", { text: tr(x)[0] }), el("p", { text: tr(x)[1] }));
    $("#lista-moverse").replaceChildren(...MOVERSE.map(acordeon));
    $("#lista-tips").replaceChildren(...TIPS.map(acordeon));
  }
  function aplicarIdioma() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((n) => { const v = t(n.dataset.i18n); if (typeof v === "string") n.textContent = v; });
    document.querySelectorAll("[data-i18n-ph]").forEach((n) => { n.placeholder = t(n.dataset.i18nPh); });
    const sel = $("#sel-idioma"); sel.value = lang; sel.setAttribute("aria-label", t("langLabel")); $("#idioma-cod").textContent = lang.toUpperCase();
    document.querySelectorAll("[data-i18n-aria]").forEach((n) => { n.setAttribute("aria-label", t(n.dataset.i18nAria)); });
    pintarTodo(); pintarClima();
    document.dispatchEvent(new CustomEvent("remada:idioma", { detail: lang }));
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
    if (location.hash === "#aportar") {
      history.replaceState(null, "", "#ayuda"); navegar();
      setTimeout(() => $("#aportar").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }), 300);
      return;
    }
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
    $("#sel-idioma").addEventListener("change", (e) => { if (!IDIOMAS.includes(e.target.value)) return; lang = e.target.value; guardar("valdi-lang", lang); aplicarIdioma(); });
    const hi = $("#hora-inicio"); hi.value = estado.inicio;
    hi.addEventListener("change", () => { if (hi.value) { estado.inicio = hi.value; guardarDia(); pintarDia(); } });
    $("#dia-fecha").addEventListener("change", (e) => cambiarFecha(e.target.value));
    $("#vaciar-dia").addEventListener("click", () => { estado.dia = []; guardarDia(); actualizarContador(true); pintarDia(); pintarTarjetasMas(); });
    $("#compartir-dia").addEventListener("click", async () => {
      const txt = textoDia();
      try { if (navigator.share) { await navigator.share({ title: t("myDayShare"), text: txt }); return; } } catch (e) { return; }
      try { await navigator.clipboard.writeText(txt); toast(t("copied")); } catch (e) { /* sin portapapeles */ }
    });
    const evToggle = $("#evento-toggle");
    const pintarToggle = () => {
      const abierto = leer("remada-evento-abierto") === "1";
      evToggle.setAttribute("aria-expanded", String(abierto));
      $("#evento").classList.toggle("abierto", abierto);
      $("#evento-toggle-txt").textContent = t(abierto ? "eventLess" : "eventMore");
    };
    evToggle.addEventListener("click", () => { guardar("remada-evento-abierto", evToggle.getAttribute("aria-expanded") === "true" ? "0" : "1"); pintarToggle(); });
    pintarToggle();
    document.addEventListener("remada:idioma", pintarToggle);
    $("#evento-plan").addEventListener("click", () => { const pl = estado.planes.find((x) => x.id === "ironman"); if (pl) { cambiarFecha((estado.evento && estado.evento.inicio || "").slice(0, 10) || hoyISO()); estado.inicio = "10:00"; $("#hora-inicio").value = "10:00"; cargarPlan(pl); } });
    iniciarPaneles(); iniciarMapas(); iniciarAporte(); iniciarInstalar(); iniciarBarra();
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
