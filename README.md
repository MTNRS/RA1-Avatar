# jocarsa | avatar — RA1

**0489 · Programación multimedia y dispositivos móviles.**

Adaptación del avatar narrador de clase para un navegador móvil. Muestra un relato
ficticio de bienvenida a Integra Tech Consulting, con expresiones, progreso y
controles táctiles de reproducción, pausa, reinicio y velocidad.

Se ha partido de `007-bocadillos.php` del profesor: el primer commit conserva su
frontend con una historia local; el siguiente permite revisar la adaptación.
Las funciones que normalizan las emociones, seleccionan imágenes y mezclan las
expresiones proceden del ejemplo. Véase [procedencia](docs/PROCEDENCIA.md).

## Ejecutar

Requisitos: PHP 8 o posterior y navegador moderno con JavaScript. Desde la raíz:

```bash
php -S 127.0.0.1:8048 -t public
```

Abrir `http://127.0.0.1:8048`. Detener el servidor con Ctrl+C.

1. Pulsar **Reproducir** para iniciar el relato.
2. Pulsar **Pausar** y **Continuar** para controlar la lectura.
3. Elegir ritmo lento, normal o rápido; afecta a las siguientes palabras.
4. Pulsar **Reiniciar** para regresar al principio sin reproducción automática.
5. Al ocultar la página se pausa la lectura; al volver se continúa manualmente.

No requiere cuenta, servidor de IA ni claves. `historia.json` contiene texto
ficticio y emociones preasignadas: no hay generación ni análisis emocional en
vivo. El relato se transmite al navegador en la respuesta PHP inicial.

## Pruebas móviles

Las pruebas utilizan Chromium y Playwright para **emular el navegador móvil**:
tamaño, densidad de píxeles y entrada táctil. No ejecutan Android/iOS ni sustituyen
pruebas en un dispositivo físico.

En Linux, con Python 3 y Chromium instalados:

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements-dev.txt
.venv/bin/python scripts/probar_movil.py
```

El script utiliza `chromium` del PATH, arranca un servidor temporal, prueba cuatro
configuraciones y lo cierra al terminar. Genera `docs/resultados.json` y una
captura en `docs/capturas/movil.png`. No utiliza npm ni descarga un navegador
adicional.

## Archivos

- `public/index.php`: lectura segura del relato y estructura de la página.
- `public/avatar.js`: funciones de expresión adaptadas del ejemplo.
- `public/reproductor.js`: clase `ReproductorAvatar`, estados y controles.
- `public/estilo.css`: disposición adaptable y controles táctiles.
- `public/historia.json`: datos de demostración.
- `public/expresiones/`: imágenes del material del profesor.
- `docs/MEMORIA.md`: análisis y correspondencia con los criterios a–h.
- `docs/VERIFICACION.md`: resultados y límites de las pruebas.
- `docs/OPERACIONES.md`: preparación del entorno e incidencias.

Informe generado por `jocarsa/generador`:
`Programacion-multimedia-y-dispositivos-moviles_RA1_0489.md`.

## Alcance y limitaciones

Es una aplicación web adaptada al móvil, sin APK ni paquete iOS. No es una PWA
instalable: no incluye manifiesto ni service worker. Una vez cargados los recursos
usados puede continuar el relato sin red, pero abrirla por primera vez o recargarla
sin conexión no está garantizado. No se reproduce audio ni se usa micrófono.

Se conserva como demostración académica independiente de Integra Tech Consulting;
no se conecta con sistemas ni datos empresariales reales.

## Informe y repositorio

El informe se genera desde una copia temporal de código y documentación,
excluyendo `.git`, `.venv`, cachés y el propio informe. Se conserva sin editar y
se verifica con la herramienta oficial tras darle el nombre de la tarea.
Los recursos gráficos necesarios y la captura de prueba permanecen en el
repositorio; el informe es textual y no sustituye esos archivos.

## Repositorio de la tarea

[MTNRS/RA1-Avatar](https://github.com/MTNRS/RA1-Avatar).
