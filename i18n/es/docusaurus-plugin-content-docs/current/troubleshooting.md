---
title: "Cuando Video Controls Plus no está trabajando en un sitio"
sidebar_label: "Solución de problemas"
description: "Qué comprobar cuando Video Controls Plus no aparece en un sitio, una llave no hace nada, la conexión falla, o un ajuste no tiene efecto."
unlisted: true
---

Compruebe que el sitio no se detiene en el popup, a continuación, recargar la página. Eso es lo primero que hay que comprobar, y el resto está abajo, cada uno como lo que ves, por qué, y qué hacer.

## Los controles no aparecen en un sitio {#the-controls-do-not-appear-on-a-site}

**¿Por qué?** el sitio se detiene, la extensión no está habilitada allí, o el widget está oculto.

1. Abre el popup en ese sitio.
2. Si aparece **Pausa**, haga clic **Resumen**.
3. Si aparece **No está permitido**, haga clic **Permitir en este sitio**.
4. Recarga la página.
5. Prensa `Esc` o `Ctrl + Alt + H` en caso de que el widget esté escondido.

Si la página no tiene vídeo HTML5 estándar, no hay nada para la extensión para controlar, y [Otros sitios](/docs/platforms/other-sites) dice en qué sitios funciona.

## Una letra o clave digital no hace nada {#a-letter-or-digit-key-does-nothing}

**¿Por qué?** letras y claves de dígitos necesitan `Ctrl + Alt`Sólo `[`, `]`, `=`, `\`, `'`, `,`, `.` y `Esc` trabajar solo.

1. Presione la tecla con `Ctrl + Alt`Por ejemplo `Ctrl + Alt + P`.
2. Si todavía no hace nada, abra Ajustes, vaya a la pestaña Atajos de teclado, y compruebe que el atajo y su sección están activados.

La mesa completa está en [Atajos predeterminados](/docs/keyboard-shortcuts/defaults).

## Bodas, impulso de audio, filtros o capturas de pantalla no están disponibles {#loop-audio-boost-filters-or-screenshots-are-unavailable}

**¿Por qué?** estos abiertos después de conectar la extensión a su cuenta. También es auto-esquip. La clave del marcador, `Ctrl + Alt + O`, también trabaja sin una cuenta y ahorra localmente.

1. Abrir Configuración e ir a la pestaña Cuenta & Sync.
2. Prensa **Conectarse a su cuenta**, y confirmar en el sitio web.

Esto es lo mismo en Chrome, Edge y Firefox. See [los pasos y lo que la conexión añade](/docs/account-and-sync).

## La pestaña de conexión no abrió {#the-connect-tab-did-not-open}

**¿Por qué?** el navegador no abrió la pestaña, o lo cerró.

1. Vuelve a la extensión. Muestra **Esperando que te conectes...** y tu código.
2. Prensa **Abra la página de nuevo**.

## El código en el sitio web es diferente {#the-code-on-the-website-is-different}

**¿Por qué?** la página pertenece a otra solicitud, no la que este navegador está esperando.

1. Prensa **Cancelar** en la página.
2. Empieza de nuevo desde la extensión con **Conectarse a su cuenta**.

No presione **Conectar este navegador** mientras que los dos códigos difieren.

## La solicitud de conexión se agotó del tiempo {#the-connect-request-ran-out-of-time}

**¿Por qué?** el código dura 10 minutos, y después de que el sitio web muestra **Esta solicitud ya no es válida.** y la extensión dice que la solicitud se quedó sin tiempo.

1. Vuelve a la extensión.
2. Prensa **Inténtalo de nuevo.**, y confirmar en el sitio web dentro de 10 minutos.

## Demasiados intentos {#too-many-attempts}

**¿Por qué?** la extensión pidió conectar demasiadas veces en un corto tiempo.

1. Espera unos minutos.
2. Prensa **Inténtalo de nuevo.**.

## Conectado, pero sus listas están vacías {#connected-but-your-lists-are-empty}

**¿Por qué?** una cuenta que existió antes de que 16.0.0 abra vacío hasta que terminemos de mover los datos de la nube vieja, que sigue este lanzamiento. Nada guardado en su navegador es afectado.

No hay paso para este. [Cuenta y sincronización](/docs/account-and-sync) dice lo que tiene una cuenta.

## En Firefox, una carga o una carrera de IA dice que Firefox necesita su permiso {#on-firefox-an-upload-or-an-ai-run-says-firefox-needs-your-permission}

**¿Por qué?** en Firefox, el contenido de la página (una captura de pantalla que subes, una transcripción que guardas a la cuenta, capciones para una ejecución de AI) se envía sólo después de permitir "contenido web". El add-on pregunta la primera vez que usas uno de esos.

1. Permítelo cuando Firefox pregunte.
2. O abre los permisos del add-on en Firefox y déjalo allí, luego prueba de nuevo.

## La velocidad para en 4x {#the-speed-stops-at-4x}

**¿Por qué?** el deslizador y el `[` y `]` Las llaves paran en 4x.

1. Abra el widget y escriba la velocidad en la entrada personalizada. Toma valores hasta 16x.
2. O abrir Ajustes, ir a la pestaña General, y utilizar la **Velocidad personalizada (0.1x - 16x)** cajas.

## Un interruptor Netflix o LinkedIn no cambió nada {#a-netflix-or-linkedin-switch-changed-nothing}

**¿Por qué?** Los interruptores de encendido / apagado se aplican después de una recarga.

1. Cambiar el interruptor en Ajustes.
2. Recarga la página en ese sitio.

En Netflix, cada extra comienza. See [Netflix](/docs/platforms/netflix).

## La pestaña YouTube, Netflix o LinkedIn en Ajustes le pide que conecte {#the-youtube-netflix-or-linkedin-tab-in-settings-asks-you-to-connect}

**¿Por qué?** esas pestañas necesitan una cuenta conectada, mientras que los extras YouTube y LinkedIn que están en por defecto todavía funcionan sin uno; sólo la pestaña donde los cambia se pregunta.

1. Conéctese en la pestaña Cuenta & Sync.
2. Abre la pestaña otra vez.

## El widget está en inglés y Ajustes no {#the-widget-is-in-english-and-settings-is-not}

**¿Por qué?** el widget está en inglés hoy. Los ajustes y el popup están en inglés, español, francés y alemán.

No hay paso para este. Es un límite de la construcción actual.

## Una nueva clave es rechazada {#a-new-key-is-refused}

**¿Por qué?** una llave puede pertenecer a sólo un atajo.

1. Lee el mensaje. Nombra el atajo que sostiene la llave.
2. Siga su enlace con ese atajo.
3. Dale a ese atajo otra llave, o elige una llave diferente para la tuya.

See [Cambiar un atajo](/docs/keyboard-shortcuts/rebinding).

## Tus atajos son diferentes en otro dispositivo {#your-shortcuts-are-different-on-another-device}

**¿Por qué?** un dispositivo recoge tus llaves la próxima vez que abra Ajustes en él, mientras que está conectado a tu cuenta.

1. Conecta la extensión en ese dispositivo.
2. Abrir configuración.

## Todavía está atrapado {#still-stuck}

Escribe al equipo a través del [página de contacto](https://vcpeai.aoneahsan.com/contact). Di qué sitio, qué navegador y qué clave.
