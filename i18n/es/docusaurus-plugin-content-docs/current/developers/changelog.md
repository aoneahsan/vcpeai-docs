---
title: Registro de cambios para desarrolladores
description: Cambios en la API, la dirección para asistentes, los webhooks y el inicio de sesión en dos pasos de Video Controls Plus, del más reciente al más antiguo.
last_update:
  date: 2026-11-21
---

# Registro de cambios para desarrolladores

Cambios para quienes integran Video Controls Plus, del más reciente al más antiguo. Las versiones del producto figuran en el [registro general](/changelog).

## 2026-11-21: Otras aplicaciones e inicio de sesión en dos pasos {#2026-11-21}

- **Novedad: [claves de acceso](./access-keys.md)** (`vcp_pat_…`), creadas en **Cuenta → Otras aplicaciones**, cada una con permisos propios de Leer, Cambiar y Eliminar, y fecha de vencimiento salvo que solo permita leer.
- **Novedad: [API](./api.md) versión 1**, para marcadores, notas, colecciones, tarjetas de estudio, rutas de aprendizaje, historial de reproducción, Ver más tarde, transcripciones, capturas, configuración y dispositivos; además de acceso de solo lectura a sesiones compartidas, correcciones de sitios, solicitudes de funciones y tu plan. El documento OpenAPI 3.1 está en `/v1/openapi.json`.
- **Novedad: [dirección para asistentes](./assistants.md)** como Claude, ChatGPT, Claude Code y Cursor. Si un asistente solicita eliminar algo, la acción espera tu confirmación en el sitio web.
- **Novedad: [webhooks](./webhooks.md)** firmados con Standard Webhooks: 32 eventos posibles y un mensaje de prueba. Los mensajes llevan pocos datos de forma predeterminada; puedes activar **Incluir el contenido escrito** para cada dirección.
- **Novedad: [inicio de sesión en dos pasos](./two-step-sign-in.md)** en el sitio web, con diez códigos de recuperación y la opción de recordar el navegador durante 7 días. Una extensión conectada se considera de confianza durante 7 días si esta función está activada.
- **Límites:** Free: 5 claves, 5.000 solicitudes diarias, 3 direcciones de webhook y 3 asistentes; Pro: 25, 50.000, 20 y 10; Team: 50, 100.000, 40 y 25 por miembro.
