---
title: Conectar Claude, ChatGPT, Claude Code o Cursor
sidebar_label: Asistentes
description: Da a un asistente la dirección de Video Controls Plus, elige en el sitio web a qué puede acceder y pregúntale por tus notas, marcadores y tarjetas de estudio.
last_update:
  date: 2026-11-21
---

# Asistentes

**Conecta un asistente para preguntarle por tu propia biblioteca:** «¿Qué tarjetas de las clases de la semana pasada me toca repasar?», «Resume mis notas sobre este vídeo» o «Añade esta charla a Ver más tarde». Claude, ChatGPT, Claude Code y Cursor se conectan a una misma dirección:

```text
https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp
```

El asistente te envía al sitio web de Video Controls Plus, donde inicias sesión, eliges a qué puede acceder y apruebas la conexión. No tienes que darle tu contraseña ni una clave. La dirección también está en **Cuenta → [Otras aplicaciones](https://vcpeai.aoneahsan.com/account/apps)**, con un botón para copiarla.

## Conectar un asistente {#connecting}

### Claude {#claude}

1. En Claude, abre **Settings → Connectors** y elige **Add custom connector**.
2. Ponle el nombre Video Controls Plus y pega la dirección anterior.
3. Claude abre nuestro sitio web. Marca a qué puede acceder y aprueba.

### ChatGPT {#chatgpt}

1. En ChatGPT, abre **Settings → Apps and connectors**, luego **Advanced**, y activa el modo de desarrollador.
2. Elige **Create**, ponle el nombre Video Controls Plus y pega la dirección anterior.
3. ChatGPT abre nuestro sitio web. Marca a qué puede acceder y aprueba.

### Claude Code {#claude-code}

1. En una terminal, ejecuta:

   ```bash
   claude mcp add --transport http video-controls-plus https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp
   ```

2. Ejecuta `/mcp` dentro de Claude Code y elige Video Controls Plus para iniciar sesión.
3. El navegador abre nuestro sitio web. Marca a qué puede acceder y aprueba.

### Cursor {#cursor}

1. En Cursor, abre **Settings → Tools & MCP** y elige **New MCP server**.
2. Añade estas líneas al archivo que se abre y guárdalo:

   ```json
   { "mcpServers": { "video-controls-plus": { "url": "https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp" } } }
   ```

3. Cursor muestra **Needs login**. Púlsalo, marca a qué puede acceder en nuestro sitio web y aprueba.

## Qué autorizas {#what-you-approve}

La página de aprobación identifica al asistente y la dirección a la que regresará. Luego muestra las mismas casillas de Leer, Cambiar y Eliminar que una [clave de acceso](./access-keys.md#what-each-tick-reaches). Eliminar empieza desmarcado. Permite leer al menos una parte o pulsa **Denegar**; un asistente rechazado recibe esa respuesta y no accede a nada.

Si tienes [activado el inicio de sesión en dos pasos](./two-step-sign-in.md), introduces tu código para aprobar. Un navegador recordado omite el código solo cuando la conexión permite únicamente leer. Para permitir cambios o eliminaciones también debes haber iniciado sesión en los últimos diez minutos. Te avisamos por correo cuando se conecta un asistente.

El contenido que lee son tus propios datos. Nunca ve tu inicio de sesión, tus claves ni la biblioteca de otra persona.

## Las eliminaciones esperan tu confirmación {#deleting-waits-for-your-yes}

Un asistente nunca elimina nada por sí solo, incluso si marcaste Eliminar. Si le pides que borre una nota, recibe un enlace y la solicitud espera en el sitio web:

1. El asistente te da el enlace; **Otras aplicaciones** muestra la solicitud bajo **Solicitud de eliminación pendiente de tu confirmación**.
2. Abre la solicitud. La página indica qué se borraría, el vídeo al que pertenece, cuándo se pidió y hasta cuándo puedes responder.
3. Pulsa **Eliminar la nota** (o el marcador, la tarjeta, etc.) o **Conservarla**.

La solicitud dura diez minutos. Pasado ese tiempo no se elimina nada; si aún quieres borrarlo, vuelve a pedírselo al asistente. En su próxima consulta, el asistente recibe la respuesta «eliminado».

## Cambiar el nombre o desconectar {#renaming-and-disconnecting}

Cada asistente conectado aparece en **Otras aplicaciones** con las fechas de conexión y último uso. Dale un nombre reconocible o pulsa **Desconectar** dos veces para confirmar. Su próxima solicitud será rechazada.

## Cuántos asistentes puedes conectar {#how-many-you-can-connect}

Free admite 3 conexiones de asistentes, Pro 10 y Team 25 por miembro. Si vuelves a conectar el mismo asistente, reemplaza la autorización anterior y no ocupa otra plaza. Sus solicitudes cuentan dentro del límite diario compartido con tus claves ([límites](./index.md#limits-on-each-plan)).

## El asistente lee lo que tú escribiste {#your-own-writing}

Tus notas, etiquetas y textos de tarjetas llegan al asistente como datos, tal como los escribiste. Si pegaste instrucciones dentro de una nota, el asistente las verá como texto de tu biblioteca. Marca solo las secciones que necesite la conversación.

## Para desarrolladores de clientes MCP {#for-mcp-client-developers}

| | |
|---|---|
| Transporte | Streamable HTTP, sin estado, un solo endpoint |
| Inicio de sesión | OAuth 2.1 con PKCE mediante nuestro servidor de autorización de Supabase en `https://gjajgvsjhdbtrpvfiuwl.supabase.co/auth/v1` |
| Descubrimiento | Metadatos del recurso protegido en `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp/.well-known/oauth-protected-resource` |
| Sin token | `401` con un encabezado `WWW-Authenticate` que apunta a esos metadatos |
| Claves de acceso | Una clave `vcp_pat_` también sirve como token bearer para un cliente que ejecutes tú mismo |
| Límites | 120 solicitudes por minuto y conexión, además del límite diario del plan |

Las herramientas proceden de las mismas secciones que [la API](./api.md#your-library): `list_<part>`, `get_<part>`, `create_<part>`, `update_<part>` y `prepare_delete_<part>`, según lo que permita cada sección. `tools/list` muestra solo las herramientas autorizadas para esa conexión. Las secciones compartidas y tu plan solo tienen herramientas de consulta; no hay herramientas para notas de voz ni historial de IA.
