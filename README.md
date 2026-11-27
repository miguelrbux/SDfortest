# Remada · guía de Valdivia (MVP web)

Web instalable (PWA) sin build ni dependencias. Se publica tal cual en GitHub Pages.

## Cómo actualizar los negocios
1. En la planilla de respuestas del formulario, crea una hoja **Publicados** con estas columnas en la fila 1:
   `nombre, rubro, sector, direccion, horario, descripcion, descripcion_en, descripcion_pt, web, telefono, nivel, foto, promocion, publicar`
   (sin correos, RUT ni datos personales). `descripcion_en` y `descripcion_pt` son opcionales: si están vacías, la ficha sale en español.
2. `nivel`: Aliado (desde $75.000), Destacado (desde $25.000) o Colaborador (desde $5.000). `publicar`: SI cuando confirmes la transferencia.
3. Archivo › Compartir › Publicar en la Web › hoja «Publicados» › CSV. Pega la URL en `negociosCsv` de `config.js`.
4. Opcional: hoja **Campaña** con columnas `recaudado, negocios` en una fila, publicada como CSV en `campanaCsv`.

La web lee la planilla cada vez que alguien la abre, así que no hay que volver a publicar para sumar negocios.

## Orden
Aliado del deporte → Destacado → Colaborador → lugares públicos. Dentro de cada nivel el orden rota cada día.

## Fotos
Las fotos se cargan desde el panel admin (carpeta `panel-admin` del proyecto), que las guarda en Google Drive ("Remada · fotos", acceso con enlace) y escribe sus URLs `https://lh3.googleusercontent.com/d/ID`. La web pide cada foto al tamaño que necesita (`=w640`, `=w1200`).
- **Negocios**: columna `foto` de Publicados, con varias fotos separadas por ` | `. La primera es la portada; la ficha muestra una galería deslizable. El panel publica hasta 3 fotos para Colaborador y 8 para Destacado y Aliado. Los negocios también pueden mandar fotos con un enlace personal; quedan por revisar en el panel hasta que se aprueban.
- **Atracciones**: en `data/lugares.json`, `foto` es el nombre del archivo en Wikimedia Commons (licencia libre; el crédito enlaza a su página). Si en el panel se eligen otras fotos, quedan en la hoja **Fotos lugares** (`id, fotos, credito`, publicada como CSV en `fotosLugaresCsv`) y reemplazan a la de `lugares.json`. Una entrada sin `https://` se toma como archivo de Commons.

## Mi día
El turista agrega lugares con «+» o carga un plan listo (`planes` en `data/lugares.json`). Puede ordenar, ajustar el tiempo de cada parada, abrir la ruta completa en Google Maps y compartirla. Se guarda solo en su teléfono.

## Informe de transparencia
La sección `#transparencia` muestra lo recibido (hoja Campaña), lo entregado al club y los negocios que aportan.
Para las entregas, crea en la planilla una hoja **Traspasos** con columnas `fecha, monto, destino, comprobante, nota`
(fecha AAAA-MM-DD; comprobante = enlace público a la foto o PDF de la transferencia, sin datos bancarios a la vista).
Publícala como CSV y pega la URL en `traspasosCsv` de `config.js`.

## Idiomas
Español, inglés y portugués (Brasil). El selector está en la barra superior. La web elige sola el idioma del teléfono la primera vez,
y se puede forzar con `?lang=pt`, `?lang=en` o `?lang=es` en el enlace (útil para un QR pensado para turistas brasileños).
Los textos de la interfaz están en `T` de `app.js`; los de lugares, planes y el evento, en los campos `es`, `en` y `pt` de `data/lugares.json`.
