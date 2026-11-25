// Configuración de Valdi. Es el único archivo que hay que tocar para actualizar la campaña.
window.VALDI_CONFIG = {
  // URL CSV de la hoja "Publicados" de la planilla de respuestas
  // (Archivo > Compartir > Publicar en la Web > hoja "Publicados" > CSV).
  // Esa hoja NO debe incluir correos, RUT ni datos personales: solo lo que se muestra al turista.
  // Columnas esperadas (fila 1): nombre, rubro, sector, direccion, horario, descripcion,
  // descripcion_en, web, telefono, nivel, foto, promocion, publicar
  // "nivel": Aliado ($75.000+) | Destacado ($25.000+) | Colaborador ($5.000+). "publicar": SI para que aparezca.
  negociosCsv: "",

  // Campaña. Si campanaCsv tiene URL (hoja "Campaña" publicada como CSV, con una fila
  // recaudado,negocios), se usa esa; si no, se usan los valores fijos de abajo.
  campanaCsv: "",
  meta: 5000000,
  recaudado: 0,
  negocios: 0,
  fechaMeta: "2027-01-04",

  // Enlace para que los negocios se sumen (formulario o landing pública).
  paraNegocios: "https://docs.google.com/forms/d/e/1FAIpQLSdZkWJtx6V-nlZaoYKQZ9OuwWrtAkNdfY-YU3qLiQ5IusYVxQ/viewform"
};
