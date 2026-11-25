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
