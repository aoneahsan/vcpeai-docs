---
title: "Características AI y lo que envían"
sidebar_label: "Características AI"
description: "Los resúmenes de vídeo y la ayuda de escritura LinkedIn se ejecutan en el subsidio compartido, su propia tecla OpenAI o Anthropic, o un modelo local. Hablar se ejecuta sólo con el subsidio compartido. Esto es lo que cada uno envía."
unlisted: true
---

Video Controls Plus tiene tres características de AI: un resumen de un video YouTube hecho a partir de sus capciones, escribiendo ayuda en LinkedIn, y Habla, que convierte lo que dices en una nota. Cada uno funciona sólo cuando usted comienza. Su propia clave o un modelo local no necesita ninguna cuenta, y el subsidio compartido y Habla necesita un [cuenta conectada](/docs/account-and-sync).

Abra el popup en una página de reloj YouTube y presione **Summarize este vídeo**. La escritura de ayuda comienza en LinkedIn ([Página de LinkedIn](/docs/platforms/linkedin)). Cada control de reproducción funciona sin AI.

## Tres maneras de ejecutarlo {#three-ways-to-run-it}

Elija uno en el **AI provider** tarjeta, en Ajustes → **Características de la AI**.

| Opción en la tarjeta                         | Lo que necesitas            | Donde va tu texto                                                                                                                           |
| -------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prestaciones compartidas**                 | Una cuenta conectada        | Al servidor Video Controls Plus, que lo envía a Anthropic. Sólo en Pro o Team, cuando esa ruta no está disponible, va a OpenAI en su lugar. |
| **Tu llave OpenAI** o **Tu llave Anthropic** | Tu clave de API, sin cuenta | Directamente desde su navegador a ese proveedor                                                                                             |
| **Local (Ollama)**                           | Ollama en tu máquina        | En ninguna parte. Se queda en tu dispositivo.                                                                                               |

Un resumen, una respuesta por escrito de LinkedIn o una propuesta de Hable usa 1 de las carreras diarias de su plan en el subsidio compartido, y la tarjeta AI del popup muestra cuántos has utilizado hoy. Cada plan funciona diariamente y su nivel de IA (Spark, Pulse o Surge) están en [Planes](https://vcpeai.aoneahsan.com/plans).

Libre, AI a veces pausa. La tarjeta dice "AI está descansando hasta ...", sus carreras están intactas, y todo lo demás funciona. En Pro y Team la carrera va a un segundo proveedor, y su propia clave y un modelo local no tienen límite del equipo.

## Habla. {#speak}

Dilo, entonces compruebe lo que fue escrito antes de que nada se salve. Hablar es en tres lugares:

- **La extensión:** **Habla una nota.** en el widget **Herramientas** tab, en cualquier video. Pinta la nota en ese momento del vídeo.
- **El sitio web:** Notas, vocabulario, solicitudes de contacto y funciones.
- **La aplicación Android:** las mismas cuatro páginas.

Una grabación es de hasta 2 minutos. La primera vez, la extensión abre una página, "Permitir el micrófono para hablar", para preguntar una vez. Una grabación donde no se oyó nada, o que no subió, no utiliza ninguna ejecución. Hable sólo sobre el subsidio compartido.

## Lo que se envía {#what-is-sent}

| Característica             | Lo que se envía                                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Resumen                    | El texto de la capción o transcripción del vídeo                                                                                                                               |
| LinkedIn escribiendo ayuda | El texto que estás redactando                                                                                                                                                  |
| Habla.                     | Su grabación, a nuestro servidor, que envía el audio para una transcripción y luego sólo las transcripciones a la AI (ver [Tres maneras de ejecutarlo](#three-ways-to-run-it)) |

Mientras graba, el propio reconocimiento de voz de su navegador también puede enviar su voz al fabricante de su navegador. El video en sí nunca es enviado.

## Lo que se mantiene {#what-is-kept}

Su grabación, sus transcripciones y la propuesta se eliminan dentro de 24 horas, o a la vez cuando pulsa **Disco**, y si nuestro almacenamiento de archivos no puede ser alcanzado en ese momento, el archivo de audio se retira al siguiente cheque por hora. Para un resumen o ayuda de escritura, el equipo no almacena el texto que envía o la respuesta. Para cada pago compartido, el servidor mantiene un registro de uso durante 13 meses, sin su texto, y un recuento de las carreras de hoy. Una clave que agrega estancias en su navegador y va sólo a su proveedor.

Sin AI, un resumen se remonta al generador incorporado de la extensión, sin modelo. El micrófono y todo lo demás están encendidos [Privacidad y permisos](/docs/privacy-and-permissions).
