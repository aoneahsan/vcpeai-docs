---
title: Video Controls Plus para desarrolladores
sidebar_label: Descripción general
description: Consulta y modifica tus marcadores, notas y tarjetas de Video Controls Plus desde un script, Claude, ChatGPT o tu propio servidor.
last_update:
  date: 2026-11-21
---

# Video Controls Plus para desarrolladores

**Puedes acceder a tu biblioteca de Video Controls Plus desde fuera de la extensión, con herramientas que conectes tú mismo:** un script con una clave de acceso, un asistente como Claude o ChatGPT, o tu propio servidor que recibe un webhook por cada cambio. Configuras las tres opciones en el sitio web, en **Cuenta → [Otras aplicaciones](https://vcpeai.aoneahsan.com/account/apps)**. Están disponibles en todos los planes, incluido Free.

Cada clave, asistente o webhook solo accede a las partes que autorizas y actúa en tu nombre. No puede ver nada que tú no puedas ver en el sitio web.

## Tres formas de conectarte {#three-ways-in}

| Quieres | Usa | Página |
|---|---|---|
| Que un script, una hoja de cálculo sincronizada o un atajo del teléfono lea o cambie tu biblioteca | Una clave de acceso y la API REST | [Claves de acceso](./access-keys.md), [La API](./api.md) |
| Preguntarle a Claude, ChatGPT, Claude Code o Cursor por tus notas y tarjetas de estudio | La dirección del asistente (MCP) | [Asistentes](./assistants.md) |
| Avisar a tu servidor en cuanto guardes una nota o un marcador | Una dirección de webhook | [Webhooks](./webhooks.md) |

## A qué puede acceder una aplicación externa {#what-an-outside-app-can-reach}

Solo a lo que autorizas y solo dentro de tu cuenta:

- **Leer y modificar** tus marcadores, notas, colecciones y los vídeos que contienen, tarjetas de estudio, rutas de aprendizaje y sus vídeos, Ver más tarde, transcripciones, configuración y navegadores conectados a la extensión.
- **Leer y borrar** tu historial de reproducción. Solo la extensión añade entradas mientras el historial esté activado.
- **Leer** tus capturas de pantalla. Para borrar una, usa la extensión.
- **Eliminar** elementos de cada sección para la que marques Eliminar. Una clave elimina directamente. Si un asistente lo solicita, la acción espera tu confirmación en el sitio web.
- **Solo lectura:** sesiones compartidas que organizaste o a las que te uniste, correcciones de sitios de la comunidad y solicitudes de funciones con tus votos.
- **Siempre legible:** tu plan, sus límites y lo que has usado hoy.

### A qué nunca puede acceder {#what-it-never-reaches}

Independientemente de las casillas que marques, ninguna clave, asistente ni webhook puede:

- acceder a la biblioteca de otra persona ni revelar quién más está en tu sesión compartida;
- organizar o unirse a una sesión compartida, votar, publicar una corrección de sitio o cambiar una solicitud de función;
- ver tu inicio de sesión, códigos de dos pasos, códigos de recuperación, claves o secretos de firma;
- cambiar tu plan, pagos o correo, ni conectar la extensión;
- leer tus notas de voz, historial de IA, pagos, invitaciones ni estadísticas de uso;
- abrir una página del personal.

## Las direcciones {#the-addresses}

| Uso | Dirección |
|---|---|
| API REST | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1` |
| Documento OpenAPI | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.json` |
| El mismo documento en Markdown | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.md` |
| Dirección del asistente (MCP) | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp` |

El documento OpenAPI se genera a partir de la misma lista de secciones y campos que usa la API; por eso no describe rutas inexistentes.

## Límites de cada plan {#limits-on-each-plan}

| | Free | Pro | Team (por miembro) |
|---|---|---|---|
| Claves de acceso | 5 | 25 | 50 |
| Solicitudes diarias a la API y al asistente | 5.000 | 50.000 | 100.000 |
| Direcciones de webhook | 3 | 20 | 40 |
| Conexiones de asistente | 3 | 10 | 25 |

El límite diario suma todas tus claves y asistentes y se restablece a medianoche UTC. Cada clave o asistente tiene además un límite propio de 120 solicitudes por minuto, para detener un script descontrolado. **Otras aplicaciones** muestra tu uso frente al límite de tu plan. Los planes y precios están en [Planes](https://vcpeai.aoneahsan.com/plans).

## Las claves y los secretos permanecen ocultos hasta que vuelvas a iniciar sesión {#keys-and-secrets-stay-hidden}

Una clave o un secreto de firma de webhook se muestra completo una sola vez, al crearlo. Después, solo volvemos a mostrarlo durante los diez minutos posteriores al inicio de sesión y, si tienes [activado el inicio de sesión en dos pasos](./two-step-sign-in.md), tras introducir un código de tu autenticador. Un navegador que haya quedado abierto no puede revelarlo. Te enviamos un correo cuando se crea una clave, se conecta un asistente o se añade una dirección de webhook. El correo nunca contiene la clave ni el secreto.

## En esta sección {#in-this-section}

- [Claves de acceso](./access-keys.md): crear, volver a mostrar, reemplazar y eliminar una clave; permisos de cada casilla.
- [La API](./api.md): solicitudes, paginación, errores, límites y cada sección con un ejemplo de `curl`.
- [Asistentes](./assistants.md): conectar Claude, ChatGPT, Claude Code o Cursor.
- [Webhooks](./webhooks.md): todos los eventos, el contenido de cada mensaje y la verificación de firmas.
- [Inicio de sesión en dos pasos](./two-step-sign-in.md): un código después de Google, en el sitio web y para la extensión.
- [Registro de cambios para desarrolladores](./changelog.md): los cambios más recientes primero.
