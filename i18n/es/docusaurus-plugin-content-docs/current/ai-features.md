---
title: Funciones de IA y datos que envían
sidebar_label: Funciones de IA
description: "Resúmenes, ayuda para escribir en LinkedIn y Speak: usa el cupo compartido, tu clave de OpenAI o Anthropic, o un modelo local; conoce qué envía cada opción."
---

Video Controls Plus tiene tres funciones de IA: resumir un vídeo de YouTube a partir de sus subtítulos, ayudar a escribir en LinkedIn y convertir lo que dictas con Speak en una nota. Solo se ejecutan cuando las inicias. Tu propia clave o un modelo local no requieren cuenta; el cupo compartido y Speak necesitan una [cuenta conectada](/docs/account-and-sync).

Abre el popup mientras ves un vídeo de YouTube y pulsa **Resumir este vídeo**. La ayuda para escribir se inicia en LinkedIn ([página de LinkedIn](/docs/platforms/linkedin)). Los controles de reproducción funcionan sin IA.

## Tres formas de usarla {#three-ways-to-run-it}

Elige una opción en la tarjeta **Proveedor de IA**, en Configuración → **Funciones de IA**.

| Opción | Qué necesitas | Adónde va tu texto |
|---|---|---|
| **Cupo compartido** | Una cuenta conectada | Al servidor de Video Controls Plus, que lo envía a Anthropic. Solo en Pro o Team, si esa ruta no está disponible, se envía a OpenAI. |
| **Tu clave de OpenAI** o **Tu clave de Anthropic** | Tu clave de API, sin cuenta | Directamente desde el navegador al proveedor elegido |
| **Local (Ollama)** | Ollama en tu equipo | A ninguna parte; permanece en tu dispositivo |

Un resumen, una respuesta de escritura para LinkedIn o una propuesta de Speak consume una de las ejecuciones diarias de tu plan en el cupo compartido. La tarjeta de IA del popup muestra las que usaste hoy. Los cupos y niveles Spark, Pulse y Surge de cada plan están en [Planes](https://vcpeai.aoneahsan.com/plans).

En Free, la IA a veces se pausa. La tarjeta indica «La IA descansa hasta…», no consume tus ejecuciones y los demás controles siguen funcionando. En Pro y Team, la solicitud usa otro proveedor; tu propia clave y un modelo local no tienen límite impuesto por el equipo.

## Speak

Dicta y revisa lo escrito antes de guardar nada. Speak aparece en tres lugares:

- **Extensión:** **Dictar una nota** en Herramientas del widget, sobre cualquier vídeo. La nota queda vinculada a ese momento.
- **Sitio web:** Notas, Tarjetas de estudio, Contacto y Solicitudes de funciones.
- **Aplicación de Android:** las mismas cuatro páginas.

Puedes grabar hasta dos minutos. La primera vez, la extensión abre «Permitir el micrófono para Speak» para pedir acceso. Una grabación sin voz detectada o que no se pudo subir no consume ejecuciones. Speak solo funciona con el cupo compartido.

## Qué se envía

| Función | Datos enviados |
|---|---|
| Resumen de vídeo | Texto de subtítulos o transcripción del vídeo |
| Ayuda de escritura en LinkedIn | El texto que estás redactando |
| Speak | La grabación a nuestro servidor, que envía el audio para transcribirlo y después solo la transcripción a la IA (consulta [Tres formas de usarla](#three-ways-to-run-it)) |

Mientras grabas, el reconocimiento de voz de tu navegador puede enviar la voz al fabricante del navegador. Nunca se envía el vídeo en sí.

## Qué se conserva

Tu grabación, sus transcripciones y la propuesta se eliminan en un máximo de 24 horas o inmediatamente al pulsar **Descartar**. Si nuestro almacenamiento no está disponible en ese momento, el audio se elimina en la siguiente comprobación por hora. El equipo no guarda el texto ni la respuesta de los resúmenes o la ayuda para escribir. Por cada ejecución del cupo compartido, el servidor conserva durante 13 meses un registro de uso sin tu texto y el número de ejecuciones de hoy. Una clave que añadas permanece en tu navegador y solo se envía a su proveedor.

Sin IA, el resumen usa el generador integrado de la extensión, sin modelo. Consulta el micrófono y los demás permisos en [Privacidad y permisos](/docs/privacy-and-permissions).
