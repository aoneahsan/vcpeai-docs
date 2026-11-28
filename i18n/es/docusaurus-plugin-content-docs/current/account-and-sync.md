---
title: Cuenta, sincronización, exportación y eliminación
sidebar_label: Cuenta y sincronización
description: Conecta Video Controls Plus a tu cuenta web, conoce qué se habilita, sincroniza, compra Pro y exporta o elimina tus datos.
---

No se inicia sesión dentro de la extensión. Creas tu cuenta en [vcpeai.aoneahsan.com](https://vcpeai.aoneahsan.com), donde entras con Google, y después conectas la extensión. El proceso es el mismo en Chrome, Edge y Firefox.

Una cuenta anterior a 16.0.0 aparecerá vacía hasta que terminemos de trasladar los datos antiguos de la nube, después de esta versión. Lo que guardaste en el navegador no cambia.

## Conectar la extensión a tu cuenta {#connect-the-extension-to-your-account}

1. Pulsa **Conectar con tu cuenta**. El botón está en el popup, en el paso de cuenta de la bienvenida y en **Cuenta y sincronización** de Configuración.
2. Se abre una pestaña en vcpeai.aoneahsan.com. Si pide iniciar sesión, pulsa **Continuar con Google**.
3. Comprueba que la página y la extensión muestren el mismo código. Si son distintos, pulsa **Cancelar**.
4. Pulsa **Conectar este navegador**.

La conexión aparece en pocos segundos si el popup o Configuración siguen abiertos; de otro modo, tarda alrededor de 30 segundos.

El código dura diez minutos. Si cerraste la pestaña, pulsa **Abrir la página de nuevo** en la extensión. [Solución de problemas](/docs/troubleshooting) explica qué hacer si falla.

## Qué se habilita al conectar

| Requiere cuenta conectada hoy | Página |
|---|---|
| Bucle A-B | [Bucle A-B](/docs/user-guide/ab-loop) |
| Imagen en imagen | [Imagen en imagen](/docs/user-guide/picture-in-picture) |
| Amplificación de audio | [Amplificación de audio](/docs/user-guide/audio-boost) |
| Filtros de vídeo | [Filtros de vídeo](/docs/user-guide/video-filters) |
| Capturas de pantalla | [Capturas](/docs/user-guide/screenshots) |
| Salto automático | [Salto automático](/docs/user-guide/auto-skip) |
| Notas con marca de tiempo y marcadores sincronizados | [Notas y marcadores](/docs/user-guide/notes-and-bookmarks) |
| Sincronización en la nube | Esta página |
| Pestañas Funciones nuevas, YouTube, Netflix y LinkedIn de Configuración | [YouTube](/docs/platforms/youtube), [Netflix](/docs/platforms/netflix), [LinkedIn](/docs/platforms/linkedin) |
| Cupo compartido de IA | [Funciones de IA](/docs/ai-features) |

Sin cuenta tienes velocidad, valores predefinidos, avance fotograma a fotograma, enlaces con marca de tiempo, modo cine, marcadores guardados en este navegador y el widget.

Las funciones adicionales de YouTube y LinkedIn activadas al instalar funcionan sin cuenta. Solo sus pestañas de Configuración requieren conexión para cambiar los interruptores.

## Qué registra una cuenta conectada

La extensión guarda tus datos de cuenta y ajustes. Mientras el interruptor Estadísticas de uso está activado, registra qué sitios, funciones y velocidades utilizaste. La lista completa está en [Privacidad y permisos](/docs/privacy-and-permissions).

## Sincronización

1. Conecta la extensión a tu cuenta.
2. Entra en Cuenta y sincronización de Configuración y activa **Sincronización en la nube**.

Tus ajustes se suben al activarla. Se sincronizan velocidades, atajos y ajustes por sitio. La pestaña muestra la hora de la última sincronización. Los marcadores nuevos guardados con la cuenta conectada se sincronizan aparte de este interruptor; los anteriores, creados sin iniciar sesión, permanecen en este navegador.

| Botón | Acción |
|---|---|
| Subir a la nube | Guarda los ajustes de este dispositivo en tu cuenta |
| Cargar desde la nube | Reemplaza los ajustes de este dispositivo por la copia de tu cuenta |

Prevalece la configuración más reciente: cuando dos navegadores guardan en la misma cuenta, esta conserva la copia nueva. **Cargar desde la nube** sobrescribe los cambios locales que no hayas subido.

Otro dispositivo recibe tus atajos la próxima vez que abras Configuración allí. La lista de sitios en pausa no se sincroniza; permanece en el dispositivo donde los pausaste.

## Cerrar sesión

**Cerrar sesión**, en el popup o en Cuenta y sincronización, desconecta solo este navegador. Tu cuenta y los demás navegadores conectados permanecen. Para volver a conectarlo, pulsa **Conectar con tu cuenta**.

## ¿Cómo elimino mis datos?

Abre Configuración → **Privacidad y datos** y pulsa **Eliminar todos los datos** en la tarjeta **Tus datos**. Se eliminan la cuenta, sus archivos y todo lo guardado en ella. La acción no se puede deshacer. El botón exige una cuenta conectada porque elimina los datos asociados a ella.

**Exportar mis datos**, en la misma tarjeta, descarga un archivo JSON y también requiere una cuenta conectada.

También puedes eliminar la cuenta desde la [página de eliminación de datos](https://vcpeai.aoneahsan.com/data-deletion) del sitio web cuando hayas iniciado sesión allí.

## Exportar e importar ajustes

Abre **Gestión de datos** en Configuración.

- **Exportar ajustes** descarga un JSON. Puedes incluir o excluir la memoria de vídeos y los filtros predefinidos.
- **Importar ajustes** restaura un archivo exportado: **Reemplazar todo** sustituye tus ajustes actuales; **Combinar** conserva los valores actuales cuando el archivo no incluye uno.

## Inicio de sesión en dos pasos y otras aplicaciones

En el sitio web, **Cuenta → Seguridad** añade un código del teléfono después de Google. Con esta opción activada, una extensión conectada se considera de confianza durante siete días y luego pide reconectarse. Si eliminas allí un navegador, se cierra su sesión de extensión. Consulta [Inicio de sesión en dos pasos](/docs/developers/two-step-sign-in).

**Cuenta → Otras aplicaciones** permite conectar herramientas propias a tu biblioteca: claves de acceso para scripts, Claude o ChatGPT y webhooks para tu servidor. Consulta [Video Controls Plus para desarrolladores](/docs/developers).

## Planes y pago

Todas las funciones están disponibles en Free. Pro aumenta las ejecuciones diarias de IA y su nivel para una persona; Team hace lo mismo por miembro. Los precios están en [Planes](https://vcpeai.aoneahsan.com/plans).

Para obtener Pro, inicia sesión en el sitio web, abre Planes y pulsa **Mejorar a Pro**, con pago mensual o anual. Pagas en la página de Polar y Pro comienza en tu cuenta cuando Polar confirma el pago.

Polar te envía por correo un enlace a su portal de clientes, donde puedes cancelar, cambiar la tarjeta y descargar facturas. Puedes cancelar cuando quieras; el plan sigue activo hasta terminar el período pagado.

Team se configura con nosotros: pulsa **Elegir Team** en Planes para abrir la [página de contacto](https://vcpeai.aoneahsan.com/contact).

Los planes solo se compran en el sitio web, nunca dentro de la extensión ni de la aplicación de Android.

Para cualquier otra consulta sobre tu cuenta, usa la [página de contacto](https://vcpeai.aoneahsan.com/contact).
