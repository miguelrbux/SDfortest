# Valdi · guía de Valdivia (MVP web)

Web instalable (PWA) sin build ni dependencias. Se publica tal cual en GitHub Pages.

## Cómo actualizar los negocios
1. En la planilla de respuestas del formulario, crea una hoja **Publicados** con estas columnas en la fila 1:
   `nombre, rubro, sector, direccion, horario, descripcion, descripcion_en, web, telefono, nivel, foto, promocion, publicar`
   (sin correos, RUT ni datos personales).
2. `nivel`: Aliado (desde $75.000), Destacado (desde $25.000) o Colaborador (desde $5.000). `publicar`: SI cuando confirmes la transferencia.
3. Archivo › Compartir › Publicar en la Web › hoja «Publicados» › CSV. Pega la URL en `negociosCsv` de `config.js`.
4. Opcional: hoja **Campaña** con columnas `recaudado, negocios` en una fila, publicada como CSV en `campanaCsv`.

La web lee la planilla cada vez que alguien la abre, así que no hay que volver a publicar para sumar negocios.

## Orden
Aliado del deporte → Destacado → Colaborador → lugares públicos. Dentro de cada nivel el orden rota cada día.

## Fotos
Las fotos de los lugares públicos vienen de Wikimedia Commons (licencias libres). En `data/lugares.json`, el campo `foto` es el nombre del archivo en Commons; cada tarjeta enlaza a su página con autor y licencia. Para un negocio, pon en la columna `foto` una URL https de una imagen suya.

## Mi día
El turista agrega lugares con «+» o carga un plan listo (`planes` en `data/lugares.json`). Puede ordenar, ajustar el tiempo de cada parada, abrir la ruta completa en Google Maps y compartirla. Se guarda solo en su teléfono.

## Informe de transparencia
La sección `#transparencia` muestra lo recibido (hoja Campaña), lo entregado al club y los negocios que aportan.
Para las entregas, crea en la planilla una hoja **Traspasos** con columnas `fecha, monto, destino, comprobante, nota`
(fecha AAAA-MM-DD; comprobante = enlace público a la foto o PDF de la transferencia, sin datos bancarios a la vista).
Publícala como CSV y pega la URL en `traspasosCsv` de `config.js`.
