---
title: Webhooks
description: Eventos de webhook de Video Controls Plus, contenido de los mensajes firmados, verificación en Node o Python y reintentos de entrega.
last_update:
  date: 2026-11-21
---

# Webhooks

**Un webhook avisa a tu servidor en cuanto cambia algo en tu biblioteca.** Cuando guardas una nota, enviamos un breve mensaje firmado a una dirección tuya. De forma predeterminada indica qué ocurrió, a qué elemento y cuándo. Lo que escribiste permanece en tu biblioteca salvo que marques **Incluir el contenido escrito**.

Se envía un mensaje por los cambios hechos en cualquier lugar: la extensión, el sitio web, una clave de acceso o un asistente.

## Añadir una dirección {#adding-an-address}

1. En el sitio web, abre **Cuenta → [Otras aplicaciones](https://vcpeai.aoneahsan.com/account/apps)** y pulsa **Añadir una dirección**.
2. Pega una dirección `https://` de tu servidor. Si quieres, añade una descripción como «Bandeja de Obsidian».
3. Marca los eventos que deseas recibir. Cada sección tiene una casilla **Todos los eventos de…** para elegirlos a la vez.
4. Deja desactivada **Incluir el contenido escrito** si otras personas comparten esa dirección.
5. Pulsa **Añadir dirección** y copia el secreto de firma. Empieza por `whsec_`.

Para añadir una dirección debes haber iniciado sesión durante los últimos diez minutos. Si tienes [activado el inicio de sesión en dos pasos](./two-step-sign-in.md), también necesitas tu código. Te avisamos por correo de la nueva dirección, pero el mensaje no incluye el secreto.

Solo enviamos mensajes a direcciones accesibles desde Internet y lo comprobamos antes de cada envío:

- únicamente `https://`, en el puerto 443 u 8443, con un máximo de 2.048 caracteres y sin usuario ni contraseña;
- nunca una dirección de red privada o local ni una de nuestras propias direcciones;
- un nombre de host que se pueda resolver.

## Eventos {#events}

- **Marcadores:** `bookmark.saved`, `bookmark.updated`, `bookmark.removed`
- **Notas:** `note.saved`, `note.updated`, `note.deleted`
- **Colecciones:** `collection.created`, `collection.updated`, `collection.deleted`, `collection.video_added`, `collection.video_removed`
- **Tarjetas de estudio:** `flashcard.created`, `flashcard.updated`, `flashcard.reviewed`, `flashcard.deleted`
- **Rutas de aprendizaje:** `learning_path.created`, `learning_path.updated`, `learning_path.deleted`, `learning_path.video_added`, `learning_path.video_completed`, `learning_path.video_removed`
- **Historial de reproducción:** `watch_history.added`, `watch_history.removed`
- **Ver más tarde:** `watch_later.added`, `watch_later.removed`
- **Transcripciones:** `transcript.saved`, `transcript.deleted`
- **Capturas de pantalla:** `screenshot.saved`, `screenshot.deleted`
- **Configuración y atajos:** `settings.updated`
- **Dispositivos:** `device.added`, `device.removed`
- **Tu dirección:** `webhook.test`, desde **Enviar prueba**

Un evento `updated` indica que cambió algo que escribiste. La actividad por sí sola no cuenta: un repaso cambia el calendario de una tarjeta y envía `flashcard.reviewed`, no `flashcard.updated`. Los minutos vistos de una ruta no envían nada. El historial envía `added` al ver un vídeo por primera vez y `removed` cuando lo eliminas, pero no cuando cambia tu posición. Las sesiones compartidas, correcciones de sitios y solicitudes de funciones no generan eventos.

## Contenido de un mensaje {#what-a-message-carries}

Cada mensaje es un `POST` con cuerpo JSON y tres encabezados:

```http
POST /hooks/vcp HTTP/1.1
Content-Type: application/json
User-Agent: VideoControlsPlus-Webhooks/1.0
webhook-id: msg_3f1c9a7e52b84d0e9a6c41b27d58e0f3
webhook-timestamp: 1795252443
webhook-signature: v1,Sf2fD3s8K3tN/GbULA6VRokN3DtARXbma24DDern6WY=
```

```json
{"type":"note.saved","timestamp":"2026-11-21T09:14:03.512Z","data":{"id":"0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e","video_id":"dQw4w9WgXcQ","platform":"youtube","occurred_at":"2026-11-21T09:14:03.512418+00:00"}}
```

`data` incluye el `id` del elemento, su `video_id` y `platform` si pertenece a un vídeo, y `occurred_at`. En `settings.updated`, `id` es el de tu cuenta. Si necesitas el resto de los datos, consulta el elemento mediante [la API](./api.md).

Al activar **Incluir el contenido escrito**, `data` añade un conjunto breve de campos según la sección:

| Sección | Campos añadidos a `data` |
|---|---|
| Marcadores | `label`, `note`, `color`, `position_seconds` |
| Notas | `content`, `category`, `tags` |
| Colecciones | `name`, `description`; en vídeos, `collection_id` y `video_title` |
| Tarjetas de estudio | `front`, `back`, `tags` |
| Rutas de aprendizaje | `title`, `description`; en vídeos, `path_id`, `video_title`, `notes` |
| Historial de reproducción | `video_title`, `channel_name` |
| Ver más tarde | `video_title`, `priority`, `notes` |
| Transcripciones | `language`, `format` |
| Capturas de pantalla | `position_seconds`, `width`, `height` |
| Configuración y atajos | `changed`: `["settings"]`, `["shortcuts"]` o ambos |
| Dispositivos | `device_name`, `browser` |

El texto de una transcripción nunca se incluye en el mensaje, marques o no la casilla. Léelo desde `transcript_texts` con una clave.

La misma nota con la casilla marcada:

```json
{
  "type": "note.saved",
  "timestamp": "2026-11-21T09:14:03.512Z",
  "data": {
    "id": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e",
    "video_id": "dQw4w9WgXcQ",
    "platform": "youtube",
    "occurred_at": "2026-11-21T09:14:03.512418+00:00",
    "content": "Chorus comes back at 1:43. Use it for the timing exercise.",
    "category": "action",
    "tags": ["music-theory"]
  }
}
```

Un cambio de configuración y el mensaje de prueba:

```json
{"type":"settings.updated","timestamp":"2026-11-21T10:02:41.090Z","data":{"id":"6a1f0c52-3b7d-4e8a-9f21-0c4d5e6b7a89","occurred_at":"2026-11-21T10:02:41.090137+00:00","changed":["shortcuts"]}}
```

```json
{"type":"webhook.test","timestamp":"2026-11-21T10:05:12.334Z","data":{"message":"Test event"}}
```

## Verificar que el mensaje viene de nosotros {#checking-a-message}

Los mensajes se firman con <a href="https://www.standardwebhooks.com/" rel="noopener noreferrer nofollow">Standard Webhooks</a>. Cualquier biblioteca compatible puede leer el secreto sin modificarlo. Para verificarlo manualmente:

1. Une `webhook-id`, `webhook-timestamp` y el **cuerpo sin procesar**, tal como lo recibiste, con un `.` entre cada parte.
2. Quita `whsec_` del secreto, decodifica el resto desde base64 y úsalo para calcular un HMAC-SHA256 del texto anterior.
3. Codifica el resultado en base64. Debe coincidir con uno de los valores `v1,` de `webhook-signature`, separados por espacios.
4. Rechaza una marca de tiempo que difiera más de cinco minutos de tu reloj para evitar reutilizar mensajes antiguos.

Procesa el JSON solo después de verificar la firma. Si analizas y vuelves a serializar el cuerpo antes de hacerlo, la firma ya no coincidirá.

Puedes comprobar los ejemplos con el mensaje anterior y este secreto, creado solo para esta página:

```text
whsec_dmNwLWRvY3Mtc2FtcGxlLXNlY3JldC0zMi1ieXRlcyE=
```

La firma correcta es `v1,Sf2fD3s8K3tN/GbULA6VRokN3DtARXbma24DDern6WY=`. Tu propio secreto está en **Otras aplicaciones**.

### Node {#node}

```js
import { createHmac, timingSafeEqual } from 'node:crypto';
import { createServer } from 'node:http';

/** True when the message was signed with `secret` in the last five minutes. */
export function isFromVideoControlsPlus(secret, headers, rawBody, nowSeconds = Math.floor(Date.now() / 1000)) {
  const id = headers['webhook-id'];
  const timestamp = headers['webhook-timestamp'];
  const signatures = headers['webhook-signature'];
  if (!id || !timestamp || !signatures || !/^\d+$/.test(timestamp)) return false;
  if (Math.abs(nowSeconds - Number(timestamp)) > 300) return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.${rawBody}`).digest();
  return signatures.split(' ').some((entry) => {
    const [version, value] = entry.split(',');
    if (version !== 'v1' || !value) return false;
    const given = Buffer.from(value, 'base64');
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}

createServer((req, res) => {
  const chunks = [];
  req.on('data', (chunk) => chunks.push(chunk));
  req.on('end', () => {
    const rawBody = Buffer.concat(chunks).toString('utf8');
    if (!isFromVideoControlsPlus(process.env.VCP_WEBHOOK_SECRET, req.headers, rawBody)) {
      res.writeHead(400).end();
      return;
    }
    const message = JSON.parse(rawBody);
    res.writeHead(204).end();
    // Handle message.type after answering, so a slow job never runs past the ten-second wait.
  });
}).listen(8443);
```

### Python {#python}

```python
import base64
import hashlib
import hmac
import time


def is_from_video_controls_plus(secret, headers, raw_body, now_seconds=None):
    """True when the message was signed with `secret` in the last five minutes."""
    msg_id = headers.get("webhook-id")
    timestamp = headers.get("webhook-timestamp")
    signatures = headers.get("webhook-signature")
    if not msg_id or not timestamp or not signatures or not timestamp.isdigit():
        return False
    now = int(time.time()) if now_seconds is None else now_seconds
    if abs(now - int(timestamp)) > 300:
        return False

    key = base64.b64decode(secret.removeprefix("whsec_"))
    signed = f"{msg_id}.{timestamp}.".encode() + raw_body
    expected = base64.b64encode(hmac.new(key, signed, hashlib.sha256).digest()).decode()
    for entry in signatures.split(" "):
        version, _, value = entry.partition(",")
        if version == "v1" and hmac.compare_digest(value, expected):
            return True
    return False
```

Envía `raw_body` como los bytes recibidos: `request.get_data()` en Flask o `await request.body()` en FastAPI.

## Respuestas, reintentos y desactivación {#answering-retries-and-turning-off}

Responde con cualquier código `2xx` en un máximo de diez segundos. No seguimos redirecciones, así que un `3xx` cuenta como fallo.

Si falla un mensaje, lo intentamos otra vez a los 5 segundos y después a los 5 minutos, 30 minutos, 2 horas, 5 horas, 10 horas y 10 horas: ocho intentos durante unas 27 horas. Todos los intentos del mismo mensaje conservan el `webhook-id`; guarda los ID ya procesados para omitir repeticiones.

Una dirección se desactiva si responde `410 Gone` o si sus mensajes fallan durante cinco días seguidos. Te avisamos por correo con la última respuesta. Cuando tu servidor esté listo, pulsa **Volver a activar** en **Otras aplicaciones**.

## Administrar una dirección {#managing-an-address}

Cada dirección de **Otras aplicaciones** muestra estas opciones junto con los eventos que envía:

- **Enviar prueba** envía `webhook.test`. Aparece en el registro de entregas cuando tu servidor responde.
- **Pausar** detiene los envíos. No se acumulan mensajes para más tarde; se reanudan desde el momento en que pulsas **Volver a activar**.
- **Registro de entregas** enumera los mensajes recientes, del más nuevo al más antiguo, con el resultado, la duración y el número de intentos. **Enviar de nuevo** reenvía uno con el mismo `webhook-id`.
- **Eliminar** detiene por completo los envíos a esa dirección.

### Mostrar y reemplazar el secreto {#replacing-the-secret}

**Mostrar secreto de firma** funciona durante los diez minutos posteriores al inicio de sesión y, si tienes activados los dos pasos, requiere el código. **Reemplazar secreto** crea uno nuevo. Durante 24 horas cada mensaje lleva ambas firmas, primero la nueva. Cambia el secreto en tu servidor antes de que termine ese plazo para no perder mensajes.

## Cuántas direcciones puedes tener {#how-many-you-can-have}

Free admite 3 direcciones de webhook, Pro 20 y Team 40 por miembro. Al llegar al límite, elimina una o elige un plan con más capacidad en [Planes](https://vcpeai.aoneahsan.com/plans).
