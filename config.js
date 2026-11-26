// Configuración de Remada. Es el único archivo que hay que tocar para actualizar la campaña.
window.VALDI_CONFIG = {
  // URL CSV de la hoja "Publicados" de la planilla de respuestas
  // (Archivo > Compartir > Publicar en la Web > hoja "Publicados" > CSV).
  // Esa hoja NO debe incluir correos, RUT ni datos personales: solo lo que se muestra al turista.
  // Columnas esperadas (fila 1): nombre, rubro, sector, direccion, horario, descripcion,
  // descripcion_en, descripcion_pt, web, telefono, nivel, foto, promocion, publicar
  // descripcion_en y descripcion_pt son opcionales: si faltan, la ficha se muestra en español.
  // "nivel": Aliado ($75.000+) | Destacado ($25.000+) | Colaborador ($5.000+). "publicar": SI para que aparezca.
  negociosCsv: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQkwmsgRZonCTa0RcapNSvlVskGuk1dcRcAUg0fLYjutWLAnR2zi_UgoMgCLcgYfJvyjllWhQPTxmIL/pub?single=true&output=csv&gid=487514021",

  // Campaña. Si campanaCsv tiene URL (hoja "Campaña" publicada como CSV, con una fila
  // recaudado,negocios), se usa esa; si no, se usan los valores fijos de abajo.
  campanaCsv: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQkwmsgRZonCTa0RcapNSvlVskGuk1dcRcAUg0fLYjutWLAnR2zi_UgoMgCLcgYfJvyjllWhQPTxmIL/pub?single=true&output=csv&gid=1531113573",
  // Informe de transparencia: hoja "Traspasos" publicada como CSV. Columnas (fila 1):
  // fecha (AAAA-MM-DD), monto, destino, comprobante (URL pública, opcional), nota (opcional)
  traspasosCsv: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQkwmsgRZonCTa0RcapNSvlVskGuk1dcRcAUg0fLYjutWLAnR2zi_UgoMgCLcgYfJvyjllWhQPTxmIL/pub?single=true&output=csv&gid=0",
  meta: 5000000,
  recaudado: 0,
  negocios: 0,
  fechaMeta: "2027-01-04",

  // Google Analytics 4: ID de medición de la propiedad (formato G-XXXXXXXXXX).
  // Vacío = sin medición. Solo mide en remada.cl y solo si la persona acepta el aviso.
  gaId: "G-NV0E87QW82",

  // Aporte voluntario de visitantes (sección Ayuda). Mismos datos publicados en la landing.
  // Si se borra "banco", la sección se oculta. Registrar estos aportes en "Otros aportes" del panel.
  banco: {
    titular: "Miguel Alexis Rebolledo Banda",
    rut: "16.520.237-6",
    banco: "Banco Santander",
    tipo: "Cuenta Vista",
    numero: "0 070 58 08661 9",
    correo: "miguelrebolledobanda@gmail.com"
  },
  aporteMontos: [2000, 5000, 10000, 20000],

  // Enlace para que los negocios se sumen (formulario o landing pública).
  paraNegocios: "https://docs.google.com/forms/d/e/1FAIpQLSdZkWJtx6V-nlZaoYKQZ9OuwWrtAkNdfY-YU3qLiQ5IusYVxQ/viewform"
};
