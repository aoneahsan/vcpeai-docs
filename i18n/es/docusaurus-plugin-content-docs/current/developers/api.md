---
title: La API de Video Controls Plus
sidebar_label: La API
description: "API REST para tu biblioteca de Video Controls Plus: solicitudes, paginación, errores, límites y ejemplos de curl para cada sección."
last_update:
  date: 2026-11-21
---

# La API de Video Controls Plus

**La API lee y modifica tu propia biblioteca por HTTPS mediante una [clave de acceso](./access-keys.md).** Todas las direcciones empiezan por:

```text
https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1
```

La descripción legible por máquinas es el documento OpenAPI 3.1 en <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.json" target="_blank" rel="nofollow noopener noreferrer">`/openapi.json`</a>; también hay una copia en Markdown en <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.md" target="_blank" rel="nofollow noopener noreferrer">`/openapi.md`</a>. Ninguno requiere una clave.

Los ejemplos siguientes guardan la dirección base y la clave en dos variables de shell:

```bash
export VCP_API="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1"
export VCP_KEY="vcp_pat_..."
```

## Autenticar solicitudes {#signing-requests}

Envía la clave como token bearer en cada solicitud y los cuerpos en JSON:

```bash
curl "$VCP_API/notes" \
  -H "Authorization: Bearer $VCP_KEY"
```

También puedes usar aquí el token de un asistente conectado. El inicio de sesión del sitio web no sirve: la API responde `401` y pide una clave de acceso o el token de un asistente.

Cada solicitud actúa en tu nombre. La base de datos aplica tus permisos a cada fila; una clave nunca puede devolver un registro que tú no podrías abrir en el sitio web.

## Formato de las respuestas {#what-comes-back}

Un elemento:

```json
{ "data": { "id": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e", "label": "Proof of the second lemma" } }
```

Una lista:

```json
{ "data": [ { "id": "…" }, { "id": "…" } ], "meta": { "next_cursor": "eyJyIjoi…", "limit": 20 } }
```

Un error:

```json
{ "error": { "code": "scope_required", "message": "This credential needs the notes:write permission.", "details": { "scope": "notes:write" }, "correlation_id": "req_9c41b27d58e0f3a6" } }
```

Las fechas y horas usan ISO 8601. Los identificadores son UUID, salvo que una sección indique lo contrario. Las respuestas que contienen tus datos nunca se almacenan en caché.

## Errores {#errors}

| Estado | `code` | Qué ocurrió |
|---|---|---|
| 400 | `invalid_request` | Un campo, filtro, orden o cursor no es válido. `details.issues` enumera los campos. |
| 401 | `invalid_token` | Falta la clave, es incorrecta, venció o se eliminó. |
| 403 | `scope_required` | La clave no tiene este permiso. `details.scope` lo indica. |
| 404 | `not_found` | No hay nada en esta dirección para esta clave. Un elemento ajeno se ve igual que uno inexistente. |
| 405 | `method_not_allowed` | Esta sección no admite ese método, por ejemplo, modificar el historial. |
| 409 | `conflict` | El elemento ya existe o una de nuestras reglas rechazó la operación. El mensaje indica cuál. |
| 413 | `payload_too_large` | El cuerpo supera 65.536 bytes. |
| 429 | `rate_limited` | Demasiadas solicitudes. Espera hasta la hora de restablecimiento. |
| 500 | `internal` | Ocurrió un error de nuestro lado. Envíanos el `correlation_id`. |

## Páginas de resultados {#pages-of-results}

Una lista devuelve 20 elementos salvo que indiques `limit`, entre 1 y 50. Si hay más, `meta.next_cursor` contiene un cursor; envíalo como `cursor` con los mismos filtros y el mismo orden para obtener la siguiente página. El cursor dura 15 minutos y solo funciona con la consulta que lo generó. Cuando `next_cursor` es `null`, ya recibiste todo.

```bash
curl "$VCP_API/bookmarks?limit=50" -H "Authorization: Bearer $VCP_KEY"
curl "$VCP_API/bookmarks?limit=50&cursor=eyJyIjoi…" -H "Authorization: Bearer $VCP_KEY"
```

Los **filtros** son parámetros de consulta `<field>.<operator>` admitidos por cada sección: `eq` significa igual, `lte` indica menor o igual, y `cs` indica que las etiquetas contienen todos los valores de una lista separada por comas. El **orden** se establece con `sort=<field>`, precedido por `-` para mostrar primero los más recientes o mayores. Cada sección enumera sus campos admitidos; el primero es el predeterminado.

## Límites de solicitudes {#rate-limits}

Cada clave admite 120 solicitudes por minuto. Además, el plan limita las solicitudes diarias de todas tus claves y asistentes juntos: 5.000 en Free, 50.000 en Pro y 100.000 por miembro en Team. El contador se restablece a medianoche UTC. Cada respuesta incluye `RateLimit-Limit`, `RateLimit-Remaining` y `RateLimit-Reset` (segundos) para el límite que esté más cerca. Una respuesta `429` añade `Retry-After`.

## Eliminar elementos {#removing}

`DELETE` requiere el permiso Eliminar de esa sección. Con una clave de acceso, elimina el elemento de inmediato y responde `204` sin cuerpo.

Con el token de un asistente todavía no elimina nada: responde `202` con un enlace que la persona abre en el sitio web para confirmar, válido durante diez minutos:

```json
{ "data": { "status": "pending_confirmation", "confirm_url": "https://vcpeai.aoneahsan.com/developers/confirm/4e2b…", "expires_at": "2026-11-21T09:24:03.000Z" } }
```

La extensión lo elimina en cada navegador la próxima vez que se sincroniza, como si lo hubieras borrado allí.

## Tu biblioteca {#your-library}

Cada sección siguiente admite `GET /<part>` para una lista y `GET /<part>/{id}` para un elemento, salvo que se indique otra cosa. `POST /<part>` crea uno; `PATCH /<part>/{id}` modifica los campos enviados; `DELETE /<part>/{id}` lo elimina. Los campos no enumerados como modificables aparecen en la respuesta, pero no pueden escribirse.

Cuatro campos identifican un vídeo: `platform` (el sitio, por ejemplo `youtube`, `netflix` o `linkedin`), `video_id` (su ID en ese sitio), `video_url` (la dirección de su página) y `video_title`.

### Marcadores {#bookmarks}

Momentos guardados dentro de un vídeo, con tiempo, etiqueta, nota y color.

| | |
|---|---|
| Métodos | listar, consultar, crear, modificar, eliminar |
| Puedes establecer | `video_id`, `video_url` y `label` (obligatorios), `position_seconds` (obligatorio, segundos desde el inicio), `platform`, `video_title`, `note`, `color`, `tags`, `folder` |
| Filtros | `platform.eq`, `video_id.eq`, `tags.cs` |
| Orden | `-created_at` |
| Permiso | `bookmarks` |

```bash
curl -X POST "$VCP_API/bookmarks" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk","position_seconds":754,"label":"Where gradient descent starts","tags":["ml","week-3"]}'
```

La posición en el vídeo se establece al guardar el marcador, igual que en la extensión.

### Notas {#notes}

Notas escritas en un momento del vídeo, con categoría y etiquetas.

| | |
|---|---|
| Métodos | listar, consultar, crear, modificar, eliminar |
| Puedes establecer | `video_id`, `video_url` y `content` (obligatorios), `position_seconds`, `platform`, `video_title`, `category` (`important`, `question`, `summary`, `action` o `custom`), `custom_category_name`, `color`, `tags` |
| Filtros | `platform.eq`, `video_id.eq` |
| Orden | `-created_at` |
| Permiso | `notes` |

```bash
curl "$VCP_API/notes?video_id.eq=aircAruvnKk" -H "Authorization: Bearer $VCP_KEY"
```

### Colecciones y sus vídeos {#collections}

`collections` son tus colecciones de vídeos, ordenadas por el cambio más reciente. `collection_videos` son los vídeos incluidos; puedes añadir o quitar uno, pero no modificarlo, como en la extensión.

| | `collections` | `collection_videos` |
|---|---|---|
| Métodos | listar, consultar, crear, modificar, eliminar | listar, consultar, crear, eliminar |
| Puedes establecer | `name` (obligatorio), `description`, `is_public` | `collection_id`, `video_id` y `video_url` (obligatorios), `platform`, `video_title`, `thumbnail`, `duration_seconds` |
| Filtros | | `collection_id.eq` |
| Orden | `-updated_at` | `-added_at` |
| Permiso | `collections` | `collections` |

Cualquiera con el enlace puede abrir una colección pública. `collection_id` debe corresponder a una de tus colecciones.

```bash
curl -X POST "$VCP_API/collection_videos" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"collection_id":"7d1e4c2a-5b3f-4a6e-8c9d-0e1f2a3b4c5d","platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk"}'
```

### Tarjetas de estudio {#flashcards}

Tus tarjetas creadas a partir de vídeos: anverso, reverso, etiquetas y fecha prevista de repaso.

| | |
|---|---|
| Métodos | listar, consultar, crear, modificar, eliminar |
| Puedes establecer | `video_id`, `video_url`, `front` y `back` (obligatorios), `position_seconds`, `platform`, `video_title`, `tags` y calendario de repaso: `ease_factor` (1,3 a 10), `interval_days`, `repetitions`, `next_review_at`, `last_reviewed_at` |
| Filtros | `platform.eq`, `video_id.eq`, `tags.cs`, `next_review_at.lte` |
| Orden | `next_review_at`, `-created_at` |
| Permiso | `flashcards` |

Una tarjeta nueva se debe repasar ahora. Cambiar el calendario registra un repaso, igual que en la extensión. Para obtener las tarjetas que vencen antes de acabar el día:

```bash
curl "$VCP_API/flashcards?next_review_at.lte=2026-11-21T23:59:59Z&sort=next_review_at" \
  -H "Authorization: Bearer $VCP_KEY"
```

### Rutas de aprendizaje y sus vídeos {#learning-paths}

`learning_paths` son tus rutas, ordenadas por el cambio más reciente. `path_videos` contiene sus vídeos en orden e indica cuáles terminaste.

| | `learning_paths` | `path_videos` |
|---|---|---|
| Métodos | listar, consultar, crear, modificar, eliminar | listar, consultar, crear, modificar, eliminar |
| Puedes establecer | `title` (obligatorio), `description`, `is_public`, `estimated_minutes` | `path_id`, `video_id` y `video_url` (obligatorios), `platform`, `video_title`, `video_thumbnail`, `video_duration_seconds`, `position`, `is_completed`, `notes` |
| Solo se muestran | `actual_minutes`, `last_accessed_at` (calculados por la extensión) | |
| Filtros | | `path_id.eq` |
| Orden | `-updated_at` | `position`, `-created_at` |
| Permiso | `paths` | `paths` |

```bash
curl -X PATCH "$VCP_API/path_videos/3c9e1a7b-2d4f-4b8e-a1c6-5f7e9d0b2a4c" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"is_completed":true}'
```

### Historial de reproducción {#watch-history}

Vídeos que viste mientras el historial estaba activado: dónde te detuviste y cuánto tiempo miraste. Solo la extensión añade entradas. La API permite leerlas y eliminarlas, pero nunca modificar una fila.

| | |
|---|---|
| Métodos | listar, consultar, eliminar |
| Se muestran | los campos del vídeo, `video_thumbnail`, `video_duration_seconds`, `channel_name`, `last_position_seconds`, `watch_count`, `total_watch_seconds`, `first_watched_at`, `last_watched_at` |
| Filtros | `platform.eq`, `video_id.eq` |
| Orden | `-last_watched_at` |
| Permiso | `history` (lectura y eliminación) |

```bash
curl -X DELETE "$VCP_API/watch_history/9a2c4e6f-1b3d-4f5a-8c7e-0d2f4a6b8c1e" \
  -H "Authorization: Bearer $VCP_KEY"
```

### Ver más tarde {#watch-later}

Tu lista de vídeos para ver más tarde, en el orden que elegiste, con prioridad y notas.

| | |
|---|---|
| Métodos | listar, consultar, crear, modificar, eliminar |
| Puedes establecer | `video_id` y `video_url` (obligatorios), `platform`, `video_title`, `video_thumbnail`, `video_duration_seconds`, `channel_name`, `position`, `priority` (`high`, `normal` o `low`), `notes` |
| Orden | `position`, `-added_at` |
| Permiso | `later` |

```bash
curl -X POST "$VCP_API/watch_later" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"IHZwWFHWa-w","video_url":"https://www.youtube.com/watch?v=IHZwWFHWa-w","priority":"high"}'
```

### Transcripciones {#transcripts}

`transcripts` enumera las transcripciones guardadas, con idioma y formato, de la más reciente a la más antigua. Omite el texto para que la página sea pequeña. `transcript_texts` lee una transcripción con su texto y líneas temporizadas usando el mismo ID, o guarda una nueva.

| | `transcripts` | `transcript_texts` |
|---|---|---|
| Métodos | listar, consultar, eliminar | consultar, crear |
| Puedes establecer | | `video_id`, `video_url` y `content` (obligatorios), `platform`, `video_title`, `language`, `language_code`, `is_auto_generated`, `format` (`srt`, `vtt`, `txt` o `json`), `segments` |
| Se muestran | los campos del vídeo, `language`, `language_code`, `is_auto_generated`, `format`, `file_size`, `downloaded_at` | los mismos, más `content` y `segments` |
| Orden | `-downloaded_at` | |
| Permiso | `transcripts` | `transcripts` |

```bash
curl "$VCP_API/transcript_texts/5e7a9c1b-3d5f-4a2e-9b8c-1f3a5c7e9d0b" \
  -H "Authorization: Bearer $VCP_KEY"
```

El cuerpo de una solicitud puede tener como máximo 65.536 bytes, así que una transcripción más larga no puede guardarse desde fuera.

### Capturas de pantalla {#screenshots}

Fotogramas guardados de vídeos, con su posición temporal y el tamaño de la imagen. Solo lectura: las capturas se eliminan desde la extensión.

| | |
|---|---|
| Métodos | listar, consultar |
| Se muestran | los campos del vídeo, `position_seconds`, `image_url`, `format` (`png`, `jpeg` o `webp`), `width`, `height`, `created_at` |
| Orden | `-created_at` |
| Permiso | `screenshots` (lectura) |

```bash
curl "$VCP_API/screenshots?limit=10" -H "Authorization: Bearer $VCP_KEY"
```

### Configuración y atajos {#settings}

Los ajustes y atajos de teclado sincronizados de la extensión: un solo elemento cuyo ID es el de tu cuenta. `settings` y `keyboard_bindings` son objetos con el formato en que los guarda la extensión.

| | |
|---|---|
| Métodos | listar, consultar, crear, modificar |
| Puedes establecer | `settings`, `keyboard_bindings` |
| Se muestran | `settings_updated_at`, `keyboard_bindings_updated_at`, `updated_at` |
| Permiso | `settings` (lectura y modificación) |

La lista contiene ese único elemento o está vacía antes de la primera sincronización. Al guardar se conserva la versión más reciente, igual que al sincronizar entre navegadores.

```bash
curl "$VCP_API/settings" -H "Authorization: Bearer $VCP_KEY"
```

### Dispositivos {#devices}

Navegadores donde está conectada la extensión. Solo se añaden al conectarla; desde aquí puedes cambiarles el nombre o eliminarlos. Al eliminar uno, la extensión cierra sesión en ese navegador.

| | |
|---|---|
| Métodos | listar, consultar, modificar, eliminar |
| Puedes establecer | `device_name` |
| Se muestran | `device_id`, `browser`, `platform`, `extension_version`, `last_seen_at`, `created_at` |
| Orden | `-last_seen_at` |
| Permiso | `devices` |

```bash
curl -X PATCH "$VCP_API/devices/2b4d6f8a-1c3e-4a5b-9d7f-0e2a4c6e8b1d" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"device_name":"Work laptop, Firefox"}'
```

## Secciones compartidas, solo lectura {#shared-read-only}

Estas secciones incluyen a otras personas. La API permite leerlas, pero nunca escribir en ellas, independientemente de los permisos de la clave. No generan eventos de webhook.

| Sección | Qué contiene | Filtro | Orden | Permiso |
|---|---|---|---|---|
| `watch_parties` | Sesiones compartidas que organizaste o a las que te uniste: vídeo, `is_host`, inicio, vencimiento y finalización. Se omite el código de acceso porque es la invitación. | | `-created_at` | `parties:read` |
| `party_members` | Cuántas personas hay en cada sesión y cuándo se unieron. `is_you` te identifica; no se incluye el nombre, la foto ni la cuenta de nadie. `id` identifica una participación, no una persona. | `party_id.eq` | `joined_at` | `parties:read` |
| `site_fixes` | Correcciones del reproductor compartidas por la comunidad: las aprobadas y las tuyas mientras esperan, marcadas con `is_yours`. No se identifica al colaborador. | `hostname.eq` | `-created_at` | `fixes:read` |
| `feature_requests` | Tablón público con título, descripción, categoría, estado, votos e `is_yours`. No se identifica al autor. | | `-created_at`, `-upvotes` | `requests:read` |
| `request_votes` | Tus propios votos: `1` a favor, `-1` en contra. El `id` del voto corresponde a la solicitud. | | `-created_at` | `requests:read` |

```bash
curl "$VCP_API/site_fixes?hostname.eq=www.coursera.org" -H "Authorization: Bearer $VCP_KEY"
```

## Tu plan y tu uso {#your-plan-and-use}

`GET /account` devuelve un elemento: tu plan, su límite diario de ejecuciones de IA y las realizadas hoy, el espacio de almacenamiento en la nube y su uso, y `other_apps`, con los cuatro límites de la [tabla de planes](./index.md#limits-on-each-plan) y `requestsToday`. Todas las claves pueden leerlo sin marcar ninguna casilla.

```bash
curl "$VCP_API/account" -H "Authorization: Bearer $VCP_KEY"
```

## Qué nunca entrega la API {#what-the-api-never-serves}

Los campos siguen una lista de permitidos: ninguna columna ausente de esta página sale de nuestra base de datos. Además de [lo que nunca puede consultar](./index.md#what-it-never-reaches), quedan fuera las claves de sincronización propias de la extensión, el registro del archivo almacenado detrás de una captura, el dispositivo que guardó por última vez tus ajustes y las sesiones individuales dentro de tu historial de reproducción. No hay feed de calendario.
