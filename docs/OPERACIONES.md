# Operaciones e incidencias — 21/09/2026

1. Se revisaron los ejemplos de avatar del repositorio DAM2. Se escogió
   `007-bocadillos.php`, un narrador web con expresiones y lectura progresiva.
2. Se creó `RA1-Avatar`, separado de DAM2. Se guardó un primer commit con el
   frontend del profesor y sus imágenes, sustituyendo el backend remoto por una
   muestra JSON ficticia. No se copió la dirección del servicio de IA del aula.
3. Se adaptaron disposición, controles, estados de reproducción y visibilidad.
4. Se detectó que PHP y Chromium estaban disponibles. No se encontraron `adb`,
   `emulator` ni Flutter en el PATH, ni el directorio habitual `~/Android`.
   Estas comprobaciones no descartan instalaciones en otras ubicaciones.
5. La primera ejecución con Playwright del sistema falló: faltaba su controlador
   `/usr/share/nodejs/playwright/cli.js`. Se creó `.venv` y se instaló Playwright
   1.63.0. El navegador usado siguió siendo Chromium del sistema.
6. Se ejecutaron las pruebas en cuatro configuraciones móviles. Se verificaron
   controles táctiles, progreso, imágenes y ausencia de errores JavaScript.
7. Se comprobó movimiento reducido, evento de ocultación sintético y reproducción
   sin red después de la carga. No se midieron batería ni suspensión real del SO.
8. Se revisó la captura del móvil compacto para comprobar la disposición visible.
9. Se preparó la documentación para generar el informe oficial y conservarlo en
   el repositorio local de la tarea.

## Incidencias y límites

| Situación | Acción | Estado |
| --- | --- | --- |
| Backend original requiere un servicio del aula | Usar relato ficticio y emociones preasignadas | Resuelto para la demostración; IA en vivo fuera de alcance |
| Playwright del sistema no inicia | Instalarlo en un entorno virtual del proyecto | Resuelto y probado |
| Emulador de SO móvil no disponible en las rutas comprobadas | Usar emulación del navegador, declarando sus límites | No se acredita prueba de Android/iOS |
| Publicación GitHub | La credencial comprobada en la sesión es inválida | Repositorio local preparado; publicación pendiente |

Revisión posterior: los repositorios locales siguen sin remoto configurado.
La CLI mantiene una credencial inválida y el conector GitHub devuelve HTTP 403
con un aviso de cuenta suspendida. La publicación queda pendiente de recuperar
un acceso válido e indicar la cuenta u organización de destino.
