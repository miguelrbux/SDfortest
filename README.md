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

## Dominio propio (valdi.cl)

El archivo `CNAME` le dice a GitHub Pages que la web vive en `valdi.cl`.
**No unir esta rama a `valdi-web` hasta que el dominio exista y su DNS apunte a GitHub**, o la web dejará de abrir.

DNS necesario (en Cloudflare u otro proveedor DNS, con la nube en gris, "DNS only"):

| Tipo  | Nombre | Valor                 |
|-------|--------|-----------------------|
| A     | @      | 185.199.108.153       |
| A     | @      | 185.199.109.153       |
| A     | @      | 185.199.110.153       |
| A     | @      | 185.199.111.153       |
| CNAME | www    | miguelrbux.github.io  |

Luego en GitHub: Settings > Pages > Custom domain = `valdi.cl`, esperar el check verde y activar "Enforce HTTPS".
Todas las rutas de la web son relativas, así que no hay que cambiar código. La dirección antigua `miguelrbux.github.io/SDfortest/` redirige sola al dominio nuevo.
