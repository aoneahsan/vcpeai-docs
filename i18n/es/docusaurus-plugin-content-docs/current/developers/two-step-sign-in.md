---
title: Inicio de sesión en dos pasos
description: Añade un código de seis dígitos después de Google, guarda diez códigos de recuperación, recuerda un navegador durante 7 días y conecta la extensión.
last_update:
  date: 2026-11-21
---

# Inicio de sesión en dos pasos

**El inicio de sesión en dos pasos pide un código de seis dígitos de una aplicación de autenticación después de Google.** Aunque alguien tenga tu contraseña de Google, no podrá entrar en tu cuenta de Video Controls Plus sin ese código. Es opcional para los usuarios y obligatorio para el personal. Se activa en **Cuenta → [Seguridad](https://vcpeai.aoneahsan.com/account/security)** del sitio web y se aplica también a la extensión: consulta [La extensión](#the-extension).

## Configurarlo {#setting-it-up}

Tardarás unos dos minutos. Necesitas tu teléfono y un lugar seguro para guardar diez códigos de recuperación.

1. Abre **Seguridad** y pulsa **Configurar los dos pasos**.
2. Escanea el código QR con Google Authenticator, Microsoft Authenticator, 1Password, Authy o cualquier aplicación compatible. Si no puedes escanearlo, introduce la clave de configuración como clave basada en tiempo.
3. Introduce el código que la aplicación muestra para Video Controls Plus y pulsa **Activar los dos pasos**. El código cambia cada 30 segundos; usa el que ves en ese momento.
4. Guarda los diez códigos de recuperación con **Copiar todos** o **Descargar .txt** y pulsa **Ya los guardé**.

## Códigos de recuperación {#recovery-codes}

Un código de recuperación te permite entrar si no tienes el teléfono. Cada uno sirve una sola vez y tiene un formato como `k7m2p-x9qr4`; puedes escribirlo con o sin guion. Solo guardamos una versión irreconocible, así que la pantalla de configuración es el único momento en que puedes verlos.

**Seguridad** indica cuántos te quedan y te avisa al llegar a tres. **Crear códigos nuevos** reemplaza todo el conjunto: los diez anteriores dejan de funcionar en cuanto aparecen los nuevos. Para hacerlo necesitas un código del autenticador y haber iniciado sesión en los últimos diez minutos.

## Iniciar sesión {#signing-in}

Entra con Google como siempre y luego escribe el código de tu autenticador. Tras varios códigos incorrectos, debes esperar diez minutos o usar un código de recuperación.

### Recordar un navegador {#remembering-a-browser}

Después de introducir el código puedes marcar **Recordar este navegador durante 7 días**. La casilla empieza desmarcada; márcala solo en un navegador tuyo. Así podrás iniciar sesión sin código hasta que transcurran los siete días. Las visitas posteriores no prolongan ese plazo.

Un navegador recordado sigue pidiendo un código antes de mostrar una clave de acceso o un secreto de firma de webhook; las páginas del personal lo piden siempre. **Seguridad** enumera los navegadores recordados y cuándo volverán a pedir el código. Pulsa **Olvidar** en uno o **Olvidar todos los navegadores**. Cerrar sesión en un navegador también hace que se olvide.

## Si pierdes el teléfono {#losing-your-phone}

1. En la pantalla del código, elige **¿Perdiste tu teléfono?** y **Usar un código de recuperación**.
2. Escribe uno de tus códigos. Accederás durante esa sesión y los dos pasos seguirán activados. Te enviamos un correo para avisarte de que se utilizó un código de recuperación.
3. Pulsa **Añadir un teléfono nuevo** enseguida y escanea el nuevo código QR. Mostrar una clave o un secreto requiere un código del autenticador, así que configura el teléfono antes de necesitarlos.

Si perdiste el teléfono y todos los códigos de recuperación, escríbenos desde el correo asociado a tu cuenta mediante la [página de contacto](https://vcpeai.aoneahsan.com/contact). Comprobamos que eres tú con preguntas sobre tu propia biblioteca y desactivamos los dos pasos para que puedas entrar con Google y configurarlos de nuevo. Te avisamos por correo cuando esté hecho. Nunca los desactivamos por un mensaje enviado desde otra dirección.

## Teléfono nuevo o desactivar los dos pasos {#a-new-phone-or-turning-it-off}

- **Teléfono nuevo:** introduce un código del teléfono actual y escanea el nuevo código QR. Los códigos del teléfono anterior dejan de funcionar.
- **Desactivar:** introduce un código de tu autenticador y pulsa **Desactivar**. Volverás a necesitar solo Google para iniciar sesión; también se eliminan los códigos de recuperación y los navegadores recordados.

Los dos pasos permanecen activados en las cuentas del personal.

## Inicios de sesión recientes {#recent-sign-ins}

**Seguridad** muestra cada inicio de sesión en el sitio web o conexión de la extensión, con el método usado: Google, Google y dos pasos, navegador recordado, código de recuperación o conexión de extensión. **Cerrar todas las demás sesiones** finaliza las otras sesiones. También desconecta la extensión de esos navegadores hasta que la conectes otra vez.

## La extensión {#the-extension}

La extensión no tiene contraseña ni inicio de sesión propio. Se conecta a tu cuenta del sitio web: abre el sitio, inicia sesión, compara el código breve y pulsa **Conectar este navegador** ([cómo funciona la conexión](/docs/account-and-sync#connect-the-extension-to-your-account)). Si tienes activados los dos pasos, introduces el código o usas un navegador recordado antes de aprobarla.

- **Siete días.** Con los dos pasos activados, una extensión conectada es de confianza durante 7 días desde la conexión, nunca más. Luego muestra **Conectar de nuevo**; repites el proceso para seguir sincronizando. Mientras tanto, el control de velocidad y las funciones que no necesitan cuenta siguen funcionando.
- **Activación posterior.** Si activas los dos pasos después de conectar la extensión, esa conexión deja de ser de confianza. Vuelve a conectarla.
- **Quitar un navegador.** Elimina un navegador en **La extensión** dentro de **Seguridad**, o mediante [la API](./api.md#devices). La extensión de ese navegador cierra sesión y muestra **Conectar de nuevo**.

Nunca se introduce un código de dos pasos dentro de la extensión. Todos los códigos se escriben en el sitio web.
