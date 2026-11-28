---
title: Cuando Video Controls Plus no funciona en un sitio
sidebar_label: Solución de problemas
description: Comprueba por qué no aparecen los controles, no responde un atajo, falla la conexión o un ajuste no tiene efecto.
---

Comprueba primero en el popup que el sitio no esté en pausa y recarga la página. Si eso no lo resuelve, busca a continuación lo que ves, su causa y los pasos para solucionarlo.

## Los controles no aparecen en un sitio

**Causa:** el sitio está en pausa, la extensión no está habilitada allí o el widget está oculto.

1. Abre el popup en ese sitio.
2. Si muestra **En pausa**, pulsa **Reanudar**.
3. Si muestra **No habilitado**, pulsa **Habilitar en este sitio**.
4. Recarga la página.
5. Pulsa `Esc` o `Ctrl + Alt + H` por si el widget estaba oculto.

Si la página no contiene un vídeo HTML5 estándar, la extensión no tiene nada que controlar. [Otros sitios](/docs/platforms/other-sites) explica dónde funciona.

## Una letra o un número no hace nada

**Causa:** las letras y los números requieren `Ctrl + Alt`. Solo `[`, `]`, `=`, `\`, `'`, `,`, `.` y `Esc` funcionan solos.

1. Pulsa la combinación completa, por ejemplo `Ctrl + Alt + P`.
2. Si aún no responde, abre Configuración → Atajos de teclado y comprueba que estén activados tanto el atajo como su sección.

La tabla completa está en [Atajos predeterminados](/docs/keyboard-shortcuts/defaults).

## No están disponibles el bucle, el audio, los filtros o las capturas

**Causa:** se habilitan al conectar la extensión a tu cuenta, al igual que el salto automático. El atajo de marcadores `Ctrl + Alt + O` sí funciona sin cuenta y los guarda en este navegador.

1. Abre Configuración → Cuenta y sincronización.
2. Pulsa **Conectar con tu cuenta** y confirma en el sitio web.

Funciona igual en Chrome, Edge y Firefox. Consulta [los pasos y las funciones de la cuenta](/docs/account-and-sync).

## No se abrió la pestaña de conexión

**Causa:** el navegador no la abrió o la cerraste.

1. Vuelve a la extensión. Muestra **Esperando a que conectes…** y tu código.
2. Pulsa **Abrir la página de nuevo**.

## El código del sitio web es distinto

**Causa:** la página corresponde a otra solicitud, no a la que espera este navegador.

1. Pulsa **Cancelar** en la página.
2. Empieza de nuevo desde **Conectar con tu cuenta** en la extensión.

No pulses **Conectar este navegador** si los códigos son distintos.

## Se agotó el tiempo para conectar

**Causa:** el código dura diez minutos. Después, el sitio muestra **Esta solicitud ya no es válida** y la extensión indica que se agotó el tiempo.

1. Vuelve a la extensión.
2. Pulsa **Intentar de nuevo** y confirma en el sitio dentro de diez minutos.

## Demasiados intentos

**Causa:** la extensión pidió conectarse muchas veces en poco tiempo.

1. Espera unos minutos.
2. Pulsa **Intentar de nuevo**.

## La cuenta está conectada, pero las listas están vacías

**Causa:** una cuenta anterior a 16.0.0 aparece vacía hasta que terminemos de trasladar los datos antiguos de la nube, después de esta versión. Lo guardado en tu navegador no cambia.

No hay ningún paso que puedas realizar ahora. [Cuenta y sincronización](/docs/account-and-sync) explica qué almacena la cuenta.

## En Firefox, una carga o función de IA pide permiso

**Causa:** Firefox solo envía contenido de página (una captura subida, una transcripción guardada o subtítulos para IA) tras permitir «contenido de sitios web». La extensión lo pide al usar una de esas funciones por primera vez.

1. Permítelo cuando Firefox pregunte.
2. O abre los permisos de la extensión en Firefox, actívalo allí y vuelve a intentarlo.

## La velocidad no pasa de 4x

**Causa:** el deslizador y las teclas `[` y `]` llegan hasta 4x.

1. Escribe un valor hasta 16x en el campo personalizado del widget.
2. O usa los campos **Velocidad personalizada (0,1x–16x)** en Configuración → General.

## Cambiaste un interruptor de Netflix o LinkedIn y no pasó nada

**Causa:** los interruptores se aplican al recargar la página.

1. Cambia el ajuste en Configuración.
2. Recarga la página del sitio.

En Netflix todas las funciones especiales empiezan desactivadas. Consulta [Netflix](/docs/platforms/netflix).

## Las pestañas de YouTube, Netflix o LinkedIn piden conectar la cuenta

**Causa:** esas pestañas de Configuración requieren cuenta. Las funciones de YouTube y LinkedIn que vienen activadas siguen funcionando sin ella; solo necesitas conectarte para cambiar sus interruptores.

1. Conecta la cuenta desde Cuenta y sincronización.
2. Vuelve a abrir la pestaña.

## El widget muestra otro idioma que Configuración

**Causa:** el widget sigue el idioma del navegador. Tiene etiquetas en inglés, español, francés y alemán; con otro idioma usa inglés.

Para cambiarlo, cambia el idioma del navegador y vuelve a abrir la página del vídeo.

## Se rechaza un atajo nuevo

**Causa:** cada combinación pertenece a una sola acción.

1. Lee el aviso: identifica la acción que ya usa esa combinación.
2. Sigue el enlace a ese atajo.
3. Cambia su tecla o elige otra para el tuyo.

Consulta [Cambiar un atajo](/docs/keyboard-shortcuts/rebinding).

## Los atajos son distintos en otro dispositivo

**Causa:** un dispositivo recibe los atajos de tu cuenta la próxima vez que abras allí Configuración, siempre que esté conectado.

1. Conecta la extensión en ese dispositivo.
2. Abre Configuración.

## Si sigues sin resolverlo

Escribe al equipo desde la [página de contacto](https://vcpeai.aoneahsan.com/contact). Indica el sitio, el navegador y la tecla.
