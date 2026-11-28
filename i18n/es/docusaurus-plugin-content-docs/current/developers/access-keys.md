---
title: Claves de acceso
description: Crea una clave de acceso de Video Controls Plus para tus herramientas, elige sus permisos y su vencimiento, y aprende a mostrarla, reemplazarla o eliminarla.
last_update:
  date: 2026-11-21
---

# Claves de acceso

**Una clave de acceso funciona como una contraseña para una herramienta:** una hoja de estudio sincronizada, un script o un atajo del teléfono. La herramienta la envía con cada solicitud a [la API](./api.md). La clave solo permite acceder a las partes de tu biblioteca que marcaste al crearla. Empieza por `vcp_pat_` y continúa con una cadena aleatoria larga. No la incluyas en nada que compartas.

## Crear una clave {#making-a-key}

1. En el sitio web, abre **Cuenta → [Otras aplicaciones](https://vcpeai.aoneahsan.com/account/apps)** y pulsa **Crear una clave**.
2. Ponle un **Nombre** para reconocer la herramienta que la usa, como «Sincronización de hoja de estudio».
3. Marca las partes a las que puede acceder. Cada una tiene tres casillas: **Leer**, **Cambiar** y **Eliminar**. Debes permitir la lectura de al menos una parte.
4. Elige **Deja de funcionar después de**: 30, 90 o 365 días, o **Nunca**. Nunca solo está disponible para claves de lectura; una clave que pueda cambiar o eliminar siempre tiene fecha de vencimiento.
5. Pulsa **Crear clave** y cópiala. Es la única vez que se muestra sin tener que volver a iniciar sesión.

Para crearla debes haber iniciado sesión en los últimos diez minutos. Si tienes [activado el inicio de sesión en dos pasos](./two-step-sign-in.md), también debes introducir tu código. Te enviamos un correo cuando se crea una clave, pero el mensaje nunca la contiene.

## Qué permite cada casilla {#what-each-tick-reaches}

Cada casilla se convierte en un permiso de la clave. Si una clave intenta hacer algo para lo que no tiene permiso, la API responde `403 scope_required` e indica el permiso requerido.

| Parte del sitio web | Leer | Cambiar | Eliminar | Qué cubre en la API |
|---|---|---|---|---|
| Marcadores | `bookmarks:read` | `bookmarks:write` | `bookmarks:delete` | `bookmarks` |
| Notas | `notes:read` | `notes:write` | `notes:delete` | `notes` |
| Colecciones | `collections:read` | `collections:write` | `collections:delete` | `collections`, `collection_videos` |
| Tarjetas de estudio | `flashcards:read` | `flashcards:write` | `flashcards:delete` | `flashcards` |
| Rutas de aprendizaje | `paths:read` | `paths:write` | `paths:delete` | `learning_paths`, `path_videos` |
| Historial de reproducción | `history:read` | | `history:delete` | `watch_history` |
| Ver más tarde | `later:read` | `later:write` | `later:delete` | `watch_later` |
| Transcripciones | `transcripts:read` | `transcripts:write` | `transcripts:delete` | `transcripts`, `transcript_texts` |
| Capturas de pantalla | `screenshots:read` | | | `screenshots` |
| Configuración y atajos | `settings:read` | `settings:write` | | `settings` |
| Dispositivos | `devices:read` | `devices:write` | `devices:delete` | `devices` |
| Sesiones compartidas | `parties:read` | | | `watch_parties`, `party_members` |
| Correcciones de sitios de la comunidad | `fixes:read` | | | `site_fixes` |
| Solicitudes de funciones | `requests:read` | | | `feature_requests`, `request_votes` |

Una casilla vacía indica que el sitio web no ofrece ese permiso: el historial no se puede modificar, las capturas y las secciones compartidas son de solo lectura y la configuración no se puede eliminar. Todas las claves pueden leer tu plan y el uso de hoy (`account:read`, la parte `account` de la API) sin marcar ninguna casilla.

## Volver a mostrar una clave {#showing-a-key-again}

Pulsa **Mostrar de nuevo** en la clave. Solo la mostramos durante los diez minutos posteriores al inicio de sesión, para que un navegador que haya quedado abierto no pueda revelarla. Si tienes activados los dos pasos, también pedimos el código. Incluso un navegador recordado requiere el código en este caso. La clave permanece visible durante poco tiempo; cierra la vista al terminar de copiarla.

## Reemplazar una clave {#replacing-a-key}

Pulsa **Reemplazar** si crees que una clave quedó expuesta o quieres una nueva. Recibirás otra con el mismo nombre y los mismos permisos. La clave reemplazada sigue funcionando durante 24 horas para que puedas cambiarla en tu herramienta; después deja de funcionar.

## Eliminar una clave {#removing-a-key}

Pulsa **Eliminar** y vuelve a pulsarlo para confirmar. La siguiente solicitud con esa clave recibe «no autorizado» (`401 invalid_token`). Tu biblioteca, las demás claves y los asistentes siguen como estaban.

## Comprobar los permisos de una clave {#checking-what-a-key-can-do}

`GET /token` devuelve el tipo de clave y sus permisos ordenados:

```bash
curl https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/token \
  -H "Authorization: Bearer $VCP_KEY"
```

```json
{
  "data": {
    "kind": "pat",
    "user_id": "6a1f0c52-3b7d-4e8a-9f21-0c4d5e6b7a89",
    "client_id": null,
    "scopes": ["account:read", "bookmarks:read", "notes:read", "notes:write"]
  }
}
```

**Otras aplicaciones** también muestra cuándo se creó y se usó por última vez cada clave, y cuándo dejará de funcionar.

## Cuántas claves puedes tener {#how-many-you-can-have}

Free admite 5 claves, Pro 25 y Team 50 por miembro. Las claves eliminadas no cuentan. Al llegar al límite, elimina una o cambia a un plan con mayor capacidad en [Planes](https://vcpeai.aoneahsan.com/plans).
