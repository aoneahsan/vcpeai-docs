---
title: Verificar una licencia de marca blanca
sidebar_label: Verificar una licencia
description: Cómo comprobar por clave o dominio una licencia de marca blanca de Video Controls Plus y dónde encontrar el archivo de licencia de cada instalación.
last_update:
  date: 2026-11-13
---

Cualquiera puede comprobar una licencia en la [página de verificación](https://vcpeai.aoneahsan.com/verify-license). La consulta la realiza nuestro servicio de licencias.

## Por clave de licencia

Elige **Clave de licencia**, pega la clave y pulsa **Comprobar**. La página indica si la licencia está activa, a nombre de quién se emitió, los dominios que cubre, su estado y hasta qué fecha recibe actualizaciones. Nunca muestra el correo, el número de teléfono ni el precio.

## Por dominio

Elige **Dominio**, escribe el host, por ejemplo `videos.example.com`, y pulsa **Comprobar**. Nuestro servicio lee el archivo de licencia que sirve ese dominio y verifica su clave.

| Respuesta | Qué significa |
|---|---|
| Este dominio sirve una licencia válida. | El archivo existe y la clave cubre este dominio. |
| Este dominio sirve una licencia emitida para otro dominio. | La clave es real, pero no corresponde a este dominio. |
| Este dominio no sirve ningún archivo de licencia. | No hay ningún archivo en la dirección indicada abajo. |
| No pudimos acceder a ese dominio. | El dominio no respondió por HTTPS. |

## El archivo de licencia

Cada instalación de marca blanca sirve un archivo en:

```text
/.well-known/vcpeai-white-label-license.json
```

Indica el producto, el cliente, el dominio y la clave de licencia, con un enlace a la página de verificación. Junto a él hay un certificado PDF en la misma ruta, terminada en `.pdf`. Añadimos ambos archivos al publicar tu versión; no tienes que crearlos.

Si una versión usa una clave revocada o funciona en un dominio que su licencia no cubre, muestra una página «Esta licencia no está activa» en lugar de la aplicación. No se borra nada.
