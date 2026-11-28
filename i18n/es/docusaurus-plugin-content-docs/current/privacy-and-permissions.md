---
title: Privacidad y permisos
sidebar_label: Privacidad y permisos
description: Qué guarda y registra Video Controls Plus con o sin cuenta, dónde residen los datos y para qué sirve cada permiso del navegador.
---

Video Controls Plus guarda tus ajustes en el navegador. Mientras **Estadísticas de uso** esté activado (la opción predeterminada), se envían eventos de uso al servidor del equipo, tengas o no cuenta. Tu dirección IP se envía a ipapi.co para consultar tu ubicación como máximo una vez al día. Una cuenta conectada también guarda tus datos y, si activas la sincronización, tus ajustes.

Al desactivar el interruptor se detiene todo ese registro de uso.

La extensión no registra los vídeos que ves, sus títulos ni sus direcciones salvo que actives el Historial de reproducción, que empieza desactivado. La otra excepción son los elementos que decides guardar. Una cuenta conectada conserva el título y la dirección del vídeo solo junto con algo que guardas o inicias desde él: nota, marcador o entrada de diario, elemento de Ver más tarde, captura subida, detalles extraídos, transcripción, tarjeta creada a partir del vídeo, vídeo de ruta de aprendizaje, elemento de colección o sesión compartida.

Esta página explica en términos sencillos la [Política de privacidad](https://vcpeai.aoneahsan.com/privacy). La política es el texto legal; si difieren, prevalece la política.

## Qué permanece en tu navegador

Tus ajustes, atajos, velocidad recordada por vídeo, posición de reproducción, filtros predefinidos y ajustes de audio se guardan en el navegador. Solo llegan a tu cuenta cuando conectas la extensión y activas la sincronización.

Las descargas de audio se procesan en tu dispositivo. Las capturas permanecen allí salvo que elijas subirlas a la nube.

Los límites de visualización cuentan minutos solo en este dispositivo. Su PIN se conserva guardado como hash y nunca se sincroniza. Los contadores del temporizador de estudio y los capítulos creados desde subtítulos permanecen en este navegador. GIF, clips, vídeos acelerados y hojas de contactos se crean en tu dispositivo y se descargan.

## Qué se registra

| Datos | Cuándo | Contenido |
|---|---|---|
| Eventos de uso | Mientras Estadísticas de uso está activado, con o sin cuenta | Nombre del evento, dominio del sitio, navegador, sistema operativo, versión de la extensión e ID de sesión; también tu cuenta si la extensión está conectada |
| Consulta de ubicación | Mientras Estadísticas de uso está activado, como máximo una vez al día | Se envía tu IP a ipapi.co. Si tienes cuenta conectada, el país, la ciudad y la zona horaria devueltos se guardan en tu perfil; la región permanece en el navegador. No se guarda la IP. |
| Sitios, funciones y velocidades | Mientras Estadísticas de uso está activado, con cuenta conectada | Qué sitios, funciones y velocidades utilizaste |
| Cuenta | Con cuenta conectada | Correo, nombre visible, foto de perfil e ID de tu cuenta de Google |
| Este navegador | Con cuenta conectada | Nombre del dispositivo, navegador, sistema operativo, versión de extensión y última actividad |
| Ajustes | Con cuenta conectada y sincronización activada | Tus ajustes sincronizados con la cuenta |
| Elementos guardados | Con cuenta conectada, solo cuando guardas cada elemento | Notas, marcadores, Ver más tarde, capturas subidas, detalles extraídos mediante el menú contextual y transcripciones guardadas, con título y dirección del vídeo. Los marcadores incluyen la marca de tiempo; una entrada de diario añade ánimo y tus palabras. Las tarjetas creadas desde un vídeo, los vídeos de rutas y los elementos de colecciones se guardan del mismo modo. |
| Historial de reproducción | Solo después de activar **Historial de reproducción** en Configuración → **Privacidad y datos** y reproducir un vídeo con la cuenta conectada. Empieza desactivado por cuenta y navegador. | Por cada sesión de al menos 15 segundos: título y dirección del vídeo, tiempo visto, última posición, fragmentos reproducidos, fecha, velocidad y funciones usadas. Al apagarlo no se registran sesiones nuevas. Las anteriores siguen en tu cuenta hasta que las elimines en el sitio web o borres la cuenta. |
| Sesiones compartidas | Al iniciar una sesión o unirte | Dirección y título del vídeo, código de sesión, participantes y hora de entrada. Durante la sesión, reproducción, pausa, saltos y velocidad se envían a los miembros mediante Supabase Realtime y no se almacenan. |
| Informes de errores | Mientras Seguimiento de errores de terceros está activado | Informes de fallos enviados a Sentry |
| Texto de IA | Solo al iniciar una función de IA | Subtítulos del vídeo o texto que redactas. Por cada ejecución del cupo compartido se guarda durante 13 meses un registro de uso sin el texto. Consulta [Funciones de IA](/docs/ai-features). |
| Grabaciones de Speak | Solo al grabar con Speak | Tu voz, hasta dos minutos, sus transcripciones y la nota propuesta. Los tres se eliminan en un máximo de 24 horas o al pulsar **Descartar** ([Política de privacidad](https://vcpeai.aoneahsan.com/privacy), 1.8). |

En los eventos de uso, el sitio es su dominio, por ejemplo youtube.com. No se incluyen direcciones completas, rutas ni títulos de página.

## Interruptor Estadísticas de uso

Abre Configuración → **Privacidad y datos** y busca **Estadísticas de uso**. Funciona con y sin cuenta.

Al desactivarlo se detienen tres cosas:

1. No se envían eventos de uso al servidor del equipo.
2. Una cuenta conectada deja de registrar qué sitios, funciones y velocidades utilizaste.
3. Tu IP deja de enviarse a ipapi.co.

Si el interruptor está apagado en este navegador o en tu cuenta al conectarlos, termina apagado en ambos.

## Otros interruptores

Están en la misma pestaña.

| Interruptor | Estado inicial | Qué controla |
|---|---|---|
| Seguimiento de errores de terceros | Activado | Informes de fallos a Sentry |
| Comunicaciones de marketing | Desactivado | Una notificación ocasional del navegador sobre funciones nuevas u otro producto del equipo. El correo es independiente: los titulares de cuenta reciben novedades y cada mensaje incluye un enlace para darse de baja con un clic. |
| Sincronización de ajustes | Activada | Guardar tus ajustes en la cuenta |

El seguimiento de errores es independiente de las estadísticas de uso; desactivar uno no apaga el otro. En **Tus datos** puedes exportar o eliminar la información. [Cuenta y sincronización](/docs/account-and-sync) explica los pasos.

## Dónde residen tus datos

| Servicio | Qué almacena |
|---|---|
| Supabase | Base de datos e inicio de sesión de tu cuenta, y sincronización en vivo de sesiones compartidas |
| FilesHub | Capturas almacenadas, grabaciones de Speak hasta 24 horas y correos del equipo |
| Sentry | Informes de fallos mientras Seguimiento de errores de terceros está activado |
| ipapi.co | Recibe tu IP para consultar la ubicación mientras Estadísticas de uso está activado |
| Anthropic, OpenAI y Groq | Texto de una ejecución de IA que inicies, y audio o transcripciones de Speak. [Funciones de IA](/docs/ai-features) detalla qué recibe cada uno. |

Cinco funciones contactan con servicios propios solo al usarlas: SponsorBlock (`sponsor.ajay.app`), traducción o subtítulos dobles de Netflix (`api.mymemory.translated.net`), valoraciones de Netflix con tu clave (`www.omdbapi.com`), resúmenes de IA que necesitan obtener subtítulos (`video.google.com/timedtext`) y **Buscar** en **Guardar una palabra** del widget (`en.wiktionary.org`), que recibe únicamente la palabra escrita. La sección 5.9 de la política menciona otro servicio para una función aún no cubierta aquí.

## Qué no se recopila

Según la política, no se recopilan los vídeos que ves (salvo que actives Historial), contenido de vídeo o archivos multimedia excepto capturas que decidas subir, tu navegación en páginas donde la extensión no actúa, contraseñas, datos de pago ni contenido de las páginas visitadas, excepto el texto que envíes tú mismo a una función de IA y los datos que las cinco funciones anteriores envían a sus servicios.

Tus datos no se venden.

## El micrófono

Speak es la única función que sube tu voz. Se solicita el micrófono al usarla por primera vez.

| Dónde | Qué aparece |
|---|---|
| Extensión | **Dictar una nota** muestra «Permitir el micrófono una vez». Pulsa **Abrir la página del micrófono**; en «Permitir el micrófono para Speak», pulsa **Permitir micrófono** y después Permitir en el cuadro del navegador. Solo debes hacerlo una vez. |
| Aplicación de Android | Pide permiso de micrófono la primera vez que pulsas grabar en Speak. |
| Extensión de Firefox | Firefox también pide el permiso opcional «Comunicaciones personales» antes de grabar o enviar nada. |

El micrófono solo se activa durante la grabación. Si lo bloqueas, la página te explica cómo volver a permitirlo. Al desactivar Speak en Configuración → **Funciones de IA**, la extensión deja de ofrecerlo.

## Para qué sirve cada permiso

La extensión solicita siete permisos y acceso a sitios; en Chrome y Edge pide un octavo, `offscreen`. No solicita `identity` porque no se inicia sesión dentro de la extensión. El micrófono no se pide al instalar.

| Permiso | Motivo |
|---|---|
| `storage` | Guardar ajustes, atajos, memoria de velocidad, filtros y tema en el navegador |
| `activeTab` | Permitir al popup leer y modificar el vídeo de la pestaña actual al abrirlo |
| `contextMenus` | Añadir acciones al menú contextual |
| `alarms` | Temporizadores de sueño, envío de lotes pendientes de sincronización y uso, comprobación de conexión de cuenta, actualización de interruptores remotos, fin de pausas por sitio y revisión diaria de avisos |
| `notifications` | Mostrar cambios de velocidad, estado del bucle y avisos del temporizador cuando el widget está oculto o el modo es Solo avisos |
| `clipboardWrite` | Copiar enlaces desde «Copiar URL de la página» y «Copiar URL con marca de tiempo»; nunca leer el portapapeles |
| `scripting` | Llevar los controles a un vídeo incrustado, solo si el marco contiene un vídeo |
| `offscreen` (Chrome y Edge) | Permitir que Speak grabe en una página oculta de la extensión y envíe el audio desde allí mientras continúa la carga. Firefox usa su página de fondo. |
| Acceso a todos los sitios | Encontrar y controlar vídeos en cualquier sitio que abras |

El acceso a todos los sitios es el permiso más amplio. Hace falta porque un vídeo puede aparecer en cualquier sitio. Mientras un sitio está [en pausa](/docs/getting-started/pause-per-site), la extensión no actúa allí.

## En Firefox

Firefox pide tres permisos opcionales de datos; cada uno controla qué se puede enviar.

| Permiso de Firefox | Qué permite |
|---|---|
| Datos técnicos y de interacción | Solo se envían eventos de uso si lo permites. El interruptor Estadísticas de uso lo solicita. |
| Contenido de sitios web | Solo se envía contenido de página después de permitirlo: una captura subida, una transcripción guardada, subtítulos para IA o una palabra con su línea de subtítulos. La extensión lo pide al usar una de esas funciones por primera vez. |
| Comunicaciones personales | Solo se envían grabaciones de Speak y sus transcripciones después de permitirlo. Se pide al usar Speak por primera vez. |

## Claves, asistentes y webhooks que conectas

Nada externo accede a tu biblioteca salvo que tú lo configures en **Cuenta → Otras aplicaciones** del sitio web. Una clave de acceso, un asistente como Claude o ChatGPT, o un webhook solo llega a las secciones que autorizas; nunca a tu inicio de sesión, pagos, notas de voz, historial de IA ni estadísticas de uso. Un mensaje de webhook incluye ID, vídeo y hora; el contenido escrito solo se añade si marcas **Incluir el contenido escrito** para esa dirección. El texto de una transcripción nunca sale en un webhook. Consulta permisos y revocación en [Video Controls Plus para desarrolladores](/docs/developers).

## Otras aplicaciones del equipo

Configuración tiene una pestaña con las otras aplicaciones del equipo. La lista viene incluida en la extensión; no se descarga nada para mostrarla. Los avisos junto a ella se leen del servidor del equipo. La extensión no contiene red ni SDK publicitario.

## Textos legales y contacto

- [Política de privacidad](https://vcpeai.aoneahsan.com/privacy)
- [Términos del servicio](https://vcpeai.aoneahsan.com/terms)
- [Eliminación de datos](https://vcpeai.aoneahsan.com/data-deletion)
- [Contactar al equipo](https://vcpeai.aoneahsan.com/contact)
