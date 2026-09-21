# Reporte de proyecto

## Información de generación

- **Fecha:** 2026-09-21 20:46:01 +0200
- **Usuario:** dlc
- **UID:** 1000
- **Equipo:** kali
- **Sistema operativo:** Linux
- **Versión del kernel:** 6.19.11+kali-amd64
- **Arquitectura:** x86_64
- **Directorio de ejecución:** `/home/dlc/DAM2`
- **Proyecto documentado:** `/tmp/revision-textos-ra1-8j1uzd59/RA1-Avatar`
- **HMAC-SHA-256 de autenticidad:** `38bff73e5ecea598ce6aa18aa11561a73879ad730be599a1ff0aba5cf0c409e3`

> El HMAC-SHA-256 se calcula sobre el documento completo usando un secreto incluido en el programa y 64 ceros en el propio campo del HMAC. El secreto no se escribe en el informe. Este mecanismo permite comprobar integridad y que el documento fue generado con el mismo secreto.

## Estructura del proyecto

```
/tmp/revision-textos-ra1-8j1uzd59/RA1-Avatar
├── README.md
├── docs
│   ├── MEMORIA.md
│   ├── OPERACIONES.md
│   ├── PROCEDENCIA.md
│   ├── VERIFICACION.md
│   ├── capturas
│   │   └── movil.png
│   └── resultados.json
├── public
│   ├── avatar.js
│   ├── estilo.css
│   ├── expresiones
│   │   ├── alegria.png
│   │   ├── amor.png
│   │   ├── ansiedad.png
│   │   ├── asco.png
│   │   ├── calma.png
│   │   ├── enfado.png
│   │   ├── esperanza.png
│   │   ├── miedo.png
│   │   ├── neutral.png
│   │   ├── nostalgia.png
│   │   ├── sorpresa.png
│   │   └── tristeza.png
│   ├── historia.json
│   ├── index.php
│   └── reproductor.js
├── requirements-dev.txt
└── scripts
    └── probar_movil.py
```

## Bases de datos SQLite

Esta sección documenta únicamente el esquema de las bases SQLite detectadas. No se vuelcan registros ni datos de usuario.

No se han encontrado bases SQLite con extensiones .db, .sqlite o .sqlite3.

## Código (intercalado)

# RA1-Avatar
**README.md**
```markdown
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
```
## docs
**MEMORIA.md**
```markdown
# Memoria — jocarsa | avatar

## Identificación

0489 · Programación multimedia y dispositivos móviles · RA1: aplicar tecnologías
de desarrollo móvil evaluando características y capacidades.

El enunciado facilitado contiene el título y los criterios a–h. La referencia
práctica encontrada es el avatar web del bloque «Análisis de motores de juegos /
Estudio de juegos existentes» de DAM2. La tarea relaciona ese ejemplo con el
análisis de tecnologías móviles: se modifica la aplicación existente para uso
web táctil y se documentan sus límites. No se presupone un requisito de APK.

## a) Limitaciones de los dispositivos móviles

| Limitación | Efecto en el avatar | Decisión aplicada y alcance |
| --- | --- | --- |
| Pantalla pequeña | Texto y avatar pueden solaparse | Disposición en una columna hasta 560 px, desplazamiento vertical permitido y prueba sin desbordamiento horizontal |
| Entrada táctil | Enlaces pequeños son difíciles de pulsar | Botones y selector de al menos 48 px de alto; pruebas con eventos táctiles |
| CPU y batería | Animación continua y temporizadores consumen recursos | Inicio manual y un único temporizador cancelable; pausa al ocultar la página |
| Memoria | Muchas imágenes decodificadas ocupan más que sus PNG comprimidos | Precarga de las siete expresiones usadas en el relato en vez de las doce del original |
| Red variable | Carga inicial lenta o imposible | Recursos servidos localmente y relato fijo; prueba sin conexión solo después de precargar |
| Preferencias de accesibilidad | Mezclas visuales pueden resultar molestas | `prefers-reduced-motion` evita mezclar dos expresiones |
| Suspensión/cierre del navegador | Los temporizadores se ralentizan o la página se descarta | La ocultación pausa; tras una recarga se vuelve al principio, sin persistencia del avance |

La prueba no mide consumo eléctrico, RAM real ni rendimiento de una CPU ARM.
La carga de imágenes comprimidas tampoco equivale al uso de memoria decodificada.
Los navegadores pueden limitar temporizadores en segundo plano, según la
[documentación de Page Visibility](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API).

## b) Tecnologías de desarrollo móvil

| Enfoque | Tecnologías / entorno | Ventajas | Limitaciones |
| --- | --- | --- | --- |
| Android nativo | Kotlin/Java, Android SDK y Android Studio | Componentes y APIs de plataforma | Versión y distribución específicas de Android |
| Apple nativo | Swift, SwiftUI y Xcode | Integración con las plataformas Apple | Herramientas y plataforma de compilación propias |
| Multiplataforma | Dart/Flutter | Base de código compartida y widgets | Dependencias y requisitos de cada plataforma |
| Híbrido | HTML/CSS/JS con Capacitor | Reutiliza web y permite puentes a funciones nativas | Requiere empaquetado y pruebas de los complementos |
| Web móvil | HTML/CSS/JS en navegador; PHP en el servidor | Acceso por URL y adaptación del ejemplo de clase | Depende de las APIs y políticas del navegador; no es automáticamente instalable |

Fuentes oficiales consultadas el 21/09/2026:
[Android](https://developer.android.com/guide/components/fundamentals),
[SwiftUI](https://developer.apple.com/swiftui/),
[Flutter](https://flutter.dev/development/mobile),
[Capacitor](https://capacitorjs.com/docs).

Se escoge web móvil porque el avatar existente ya utiliza PHP y JavaScript.
PHP se ejecuta en el servidor del laboratorio, no dentro del teléfono. No se
instalan frameworks nativos que el ejemplo no requiere.

## c) Entorno instalado, configurado y utilizado

Se utiliza el Linux disponible, PHP 8.4.20 para servir `public/`, Python 3.13 para
las pruebas y Chromium 147.0.7727.101. PHP, Python y Chromium ya estaban instalados.
Se crea un entorno `.venv` y se instala Playwright 1.63.0 con su controlador,
porque la copia del sistema fallaba al iniciar. No se atribuye como realizada
la instalación de herramientas que ya existían.

Configuración: servidor enlazado a `127.0.0.1`, raíz pública separada, navegador
sin interfaz para pruebas y perfiles táctiles explícitos. El script levanta y
cierra su servidor; el README permite repetir la instalación de dependencias y
el uso interactivo. El entorno de pruebas se ha instalado y utilizado realmente.

## d) Configuraciones de dispositivos

La clasificación combina pantalla, densidad, entrada, capacidad de proceso,
memoria, conectividad y sistema operativo. Las siguientes son configuraciones
web de prueba, no mediciones de teléfonos concretos:

| Configuración | Viewport CSS | DPR | Entrada | Objetivo |
| --- | --- | --- | --- | --- |
| Móvil compacto | 360 × 640 | 2 | Táctil | Texto legible, controles y columna única |
| Móvil amplio | 412 × 915 | 2.625 | Táctil | Aprovechamiento del espacio vertical |
| Tableta | 768 × 1024 | 2 | Táctil | Avatar y texto en columnas |
| Móvil horizontal | 740 × 360 | 2 | Táctil | Poca altura disponible y posibilidad de desplazamiento |

DPR es la relación entre píxeles de dispositivo y píxeles CSS. No indica RAM ni
potencia. Los perfiles utilizan Chromium de escritorio con emulación móvil; no
se les atribuye un modelo de CPU, RAM física o versión real de Android.

## e) Perfiles y relación dispositivo-aplicación

Perfil mínimo funcional: navegador con JavaScript moderno, DOM, temporizadores,
JSON, CSS Grid, eventos de visibilidad y soporte PNG. Se necesita conexión al
servidor para la carga inicial; no requiere GPS, cámara, micrófono ni cuenta.

Perfil de pantalla pequeña: se apilan avatar y bocadillo. Perfil de mayor ancho:
se distribuyen en columnas. Perfil de movimiento reducido: se muestra una sola
expresión sin mezcla. Perfil de uso interrumpido: pausa y reanudación manual.
La selección se hace por capacidades y media queries, no por nombres comerciales.

En la terminología clásica de Java ME, una **configuración** como CLDC establece
una base de ejecución/APIs para una categoría de dispositivos; un **perfil**
como MIDP aporta capacidades de aplicación sobre esa base. Se reconoce esa
clasificación del temario, pero este avatar no es un MIDlet ni utiliza CLDC/MIDP.
Referencia: [documentación Java ME de Oracle](https://docs.oracle.com/javame/mobile/mobile.html)
y [perfil MIDP](https://www.oracle.com/a/tech/docs/java/midp-ds.pdf).

## f) Análisis de la aplicación existente y sus clases

La versión `007-bocadillos.php` combina tres partes en un fichero: PHP solicita
una historia y un análisis emocional a Ollama, HTML/CSS dibuja la escena y
JavaScript muestra palabras y mezcla dos imágenes. Los datos se pasan a JS
mediante JSON. El ejemplo usa funciones, no una jerarquía propia de clases.

| Tipo / interfaz del original | Uso |
| --- | --- |
| `Image` / `HTMLImageElement` | Precargar y mostrar las expresiones PNG |
| `Promise` | Implementar la espera asíncrona con `setTimeout` |
| `Document`, `HTMLElement` y nodos del DOM | Crear palabras, actualizar texto, opacidad y progreso |
| `Array` y objetos JavaScript | Guardar párrafos y sus atributos |

Las clases CSS como `.palabra` no son clases de programación. Tampoco se inventan
clases `Activity` o `MIDlet` que no existen en este código.

En la adaptación se separan PHP, CSS y JS. Se añade `ReproductorAvatar` para
encapsular índices, estado y temporizador. Se conservan funciones del original:
`normalizarEmocion`, `imagenEmocion`, `mezclarEmociones` y `actualizarAvatar`.
La espera con promesas se reemplaza por un temporizador que puede cancelarse.

## g) Modificaciones realizadas

| Antes | Después | Motivo |
| --- | --- | --- |
| Backend dependiente de Ollama | Historia local con emociones preasignadas | Prueba reproducible sin servicio privado |
| Inicio automático y velocidad fija | Reproducir, pausar, continuar, reiniciar y selector de ritmo | Control táctil y ritmo de lectura |
| Escena posicionada con altura fija y overflow oculto | Grid adaptable y desplazamiento vertical | Evitar recortes de contenido en móviles |
| Precarga de doce expresiones | Precarga de las siete usadas por la historia | Reducir recursos iniciales |
| Bucle de esperas asíncronas | Clase con un único temporizador cancelable | Evitar lecturas concurrentes y permitir pausa |
| Sin tratamiento de ocultación | `visibilitychange` y `pagehide` | Detener el avance cuando la página deja de estar activa |
| Mezcla visual constante | Respeto de movimiento reducido | Adaptación a la preferencia del usuario |

La generación automática del relato se sustituye deliberadamente por una muestra;
no se afirma que la adaptación mantenga una función de IA activa. La procedencia
y la secuencia de commits permiten distinguir original y modificaciones.

## h) Comprobación mediante emulación

Se utiliza emulación **de navegador móvil** con Playwright y Chromium: viewport,
DPR, pantalla táctil y preferencia de movimiento. Las cuatro configuraciones
pasan pruebas de reproducción, pausa, continuación, reinicio, finalización,
progreso, imágenes cargadas y ausencia de desbordamiento horizontal y errores JS.

Se prueba además la reacción a `visibilitychange` mediante un evento sintético,
no una suspensión real de Android, y reproducción sin conexión después de haber
cargado los recursos. Se guarda una captura del perfil compacto.

[Playwright](https://playwright.dev/python/docs/emulation) documenta las opciones
usadas. [Chrome](https://developer.chrome.com/docs/devtools/device-mode) explica
que esta simulación es una aproximación: no reproduce el hardware ni todas las
condiciones de un móvil. No se ha ejecutado un AVD Android, un simulador iOS ni
un dispositivo físico. Si el profesor exige emulación del sistema operativo,
ese alcance adicional del criterio h queda pendiente; no se presenta como probado.

## Relación con Integra Tech Consulting

Demostración ficticia de bienvenida que podría inspirar una ayuda visual.
Permanece como prototipo académico; no se ha integrado en una web empresarial ni
se han usado datos de clientes. La integración futura requeriría una revisión
independiente del producto y de los derechos de sus recursos gráficos.
```
**OPERACIONES.md**
```markdown
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
| Acceso a GitHub | Nueva autenticación como MTNRS | Resuelto; repositorio público creado |

Destino del proyecto y del informe: [MTNRS/RA1-Avatar](https://github.com/MTNRS/RA1-Avatar).
```
**PROCEDENCIA.md**
```markdown
# Procedencia de la adaptación

Base: `jocarsa/tame2627dam2`, fichero:

`004-Programación multimedia y dispositivos móviles/001-Análisis de motores de juegos/007-Estudio de juegos existentes/007-bocadillos.php`

SHA-256 del original consultado: `1580fab0dbe87ade0f9cc69d6059e1d9a993ecc0fb80fed929dbec61dd12010b`.

El primer commit conserva su frontend y las imágenes de expresiones de clase.
La generación y clasificación mediante un servidor Ollama del aula se sustituye
por `historia.json`, con una historia ficticia y emociones preasignadas. No se
incluye ni se contacta la dirección del servicio original. Los números de valencia,
intensidad y activación de la muestra no son medidas psicológicas.

El siguiente commit adapta el frontend al móvil y añade controles. La diferencia
entre commits permite revisar las modificaciones sobre la aplicación existente.
Se conserva la atribución a jocarsa; esta adaptación no se presenta como producto
oficial ni cambia la licencia de los materiales del profesor.
```
**VERIFICACION.md**
```markdown
# Verificación real — 21/09/2026

## `php -l public/index.php`

```text
No syntax errors detected in public/index.php
Código de salida: 0
```

## `node --check public/avatar.js`

```text
Código de salida: 0
```

## `node --check public/reproductor.js`

```text
Código de salida: 0
```

## `.venv/bin/python scripts/probar_movil.py`

```text
Playwright: 1.63.0 ; Chromium: 147.0.7727.101
OK: movil-compacto — sin desbordamiento; controles táctiles, pausa, reinicio y finalización
OK: movil-amplio — sin desbordamiento; controles táctiles, pausa, reinicio y finalización
OK: tableta — sin desbordamiento; controles táctiles, pausa, reinicio y finalización
OK: horizontal — sin desbordamiento; controles táctiles, pausa, reinicio y finalización
OK: evento visibilitychange sintético, movimiento reducido y reproducción sin red tras precarga
Código de salida: 0
```

Las pruebas emulan el navegador móvil, no un sistema operativo Android/iOS.
El evento de visibilidad es sintético. La prueba sin red parte de recursos
ya cargados y no acredita una primera carga sin conexión.

Captura del perfil compacto: [movil.png](capturas/movil.png).
```
**resultados.json**
```json
[
  {
    "perfil": "movil-compacto",
    "viewport": "360x640",
    "DPR": 2,
    "resultado": "OK"
  },
  {
    "perfil": "movil-amplio",
    "viewport": "412x915",
    "DPR": 2.625,
    "resultado": "OK"
  },
  {
    "perfil": "tableta",
    "viewport": "768x1024",
    "DPR": 2,
    "resultado": "OK"
  },
  {
    "perfil": "horizontal",
    "viewport": "740x360",
    "DPR": 2,
    "resultado": "OK"
  }
]
```
### capturas
## public
**avatar.js**
```js
const emocionesValidas = ["alegria", "amor", "ansiedad", "asco", "calma", "enfado", "esperanza", "miedo", "neutral", "nostalgia", "sorpresa", "tristeza"];
const avatarA = document.querySelector('#avatarA');
const avatarB = document.querySelector('#avatarB');
const estado = document.querySelector('#estado');
const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)');
// Funciones adaptadas del avatar de jocarsa; véase docs/PROCEDENCIA.md.
function normalizarEmocion(emocion)
{
    if (!emocion) {
        return "neutral";
    }
    emocion =
        emocion
            .toLowerCase()
            .trim();
    if (
        !emocionesValidas.includes(
            emocion
        )
    ) {
        return "neutral";
    }
    return emocion;
}
function imagenEmocion(emocion)
{
    emocion =
        normalizarEmocion(
            emocion
        );
    return (
        "expresiones/" +
        emocion +
        ".png"
    );
}
function mezclarEmociones(
    emocionOrigen,
    emocionDestino,
    factor
)
{
    emocionOrigen =
        normalizarEmocion(
            emocionOrigen
        );
    emocionDestino =
        normalizarEmocion(
            emocionDestino
        );
    if (movimientoReducido.matches) {
        avatarA.src = imagenEmocion(factor < 0.5 ? emocionOrigen : emocionDestino);
        avatarA.style.opacity = 1;
        avatarB.style.opacity = 0;
        return;
    }
    factor =
        Math.max(
            0,
            Math.min(
                1,
                factor
            )
        );
    if (
        emocionOrigen ===
        emocionDestino
    ) {
        avatarA.src =
            imagenEmocion(
                emocionOrigen
            );
        avatarA.style.opacity =
            1;
        avatarB.style.opacity =
            0;
        return;
    }
    avatarA.src =
        imagenEmocion(
            emocionOrigen
        );
    avatarB.src =
        imagenEmocion(
            emocionDestino
        );
    avatarA.style.opacity =
        1 - factor;
    avatarB.style.opacity =
        factor;
}
function actualizarAvatar(
    indiceParrafo,
    indicePalabra,
    totalPalabras
)
{
    let posicion;
    if (totalPalabras <= 1) {
        posicion = 0.5;
    } else {
        posicion =
            indicePalabra /
            (totalPalabras - 1);
    }
    const emocionActual =
        normalizarEmocion(
            parrafos[
                indiceParrafo
            ].emocion
        );
    if (posicion < 0.5) {
        let emocionAnterior;
        if (indiceParrafo > 0) {
            emocionAnterior =
                normalizarEmocion(
                    parrafos[
                        indiceParrafo - 1
                    ].emocion
                );
        } else {
            emocionAnterior =
                "neutral";
        }
        const factor =
            0.5 +
            posicion;
        mezclarEmociones(
            emocionAnterior,
            emocionActual,
            factor
        );
    }
    else {
        let emocionSiguiente;
        if (
            indiceParrafo <
            parrafos.length - 1
        ) {
            emocionSiguiente =
                normalizarEmocion(
                    parrafos[
                        indiceParrafo + 1
                    ].emocion
                );
        } else {
            emocionSiguiente =
                "neutral";
        }
        const factor =
            posicion -
            0.5;
        mezclarEmociones(
            emocionActual,
            emocionSiguiente,
            factor
        );
    }
    const datos =
        parrafos[
            indiceParrafo
        ];
    estado.innerHTML = `
        <div class="emocion">
            ${normalizarEmocion(
                datos.emocion
            ).toUpperCase()}
        </div>
        <div>
            Párrafo:
            ${indiceParrafo + 1}
            /
            ${parrafos.length}
        </div>
        <div>
            Posición:
            ${Math.round(
                posicion * 100
            )}%
        </div>
        <div>
            Valencia:
            ${datos.valencia}
        </div>
        <div>
            Intensidad:
            ${datos.intensidad}
        </div>
        <div>
            Activación:
            ${datos.activacion}
        </div>
    `;
}
```
**estilo.css**
```css
* { box-sizing: border-box; }
body { margin: 0; color: #252c36; background: #f2f4f7; font: 1rem/1.55 system-ui, sans-serif; }
header, main, footer { max-width: 960px; margin: auto; padding: 1rem; }
h1 { margin: 0; font-size: 1.7rem; }
header p { margin: .3rem 0; }
#escena { display: grid; grid-template-columns: minmax(130px, 220px) 1fr; align-items: center; gap: 1rem; }
#avatar { position: relative; width: 100%; aspect-ratio: 258 / 505; max-height: 390px; }
#avatar img { position: absolute; width: 100%; height: 100%; object-fit: contain; }
#avatarB { opacity: 0; }
#bocadillo { background: white; border: 2px solid #657a94; border-radius: 1rem; padding: 1.2rem; overflow-wrap: anywhere; }
#contador { font-weight: bold; margin-top: 0; }
#textoBocadillo { min-height: 7em; }
#barra { background: #dde4ee; height: 8px; border-radius: 4px; overflow: hidden; }
#progreso { background: #31557f; height: 100%; width: 0; }
.controles { display: flex; flex-wrap: wrap; gap: .7rem; align-items: center; margin-top: 1rem; }
button, select { min-height: 48px; padding: .6rem .9rem; font: inherit; border: 1px solid #657a94; border-radius: .4rem; }
button { background: #31557f; color: white; cursor: pointer; }
button:disabled { background: #dae0e7; color: #4c5664; cursor: default; }
:focus-visible { outline: 3px solid #ca700b; outline-offset: 3px; }
#mensaje { min-height: 1.6em; }
footer { font-size: .85rem; color: #526075; }
@media (max-width: 560px) {
  #escena { grid-template-columns: 1fr; gap: .5rem; }
  #avatar { height: 190px; width: 110px; justify-self: center; }
  #bocadillo { padding: 1rem; }
  #textoBocadillo { min-height: 5em; }
}
```
**historia.json**
```json
[
  {
    "texto": "Hoy comienzo una demostración de bienvenida a Integra Tech Consulting. Me alegra aprender junto al equipo.",
    "emocion": "alegria",
    "valencia": 0,
    "intensidad": 0.5,
    "activacion": 0.5
  },
  {
    "texto": "Encuentro una herramienta nueva y observo sus controles. No esperaba que pudiera mostrar tantas posibilidades.",
    "emocion": "sorpresa",
    "valencia": 0,
    "intensidad": 0.5,
    "activacion": 0.5
  },
  {
    "texto": "Antes de continuar me preocupa cometer un error. Decido detenerme y revisar las instrucciones con cuidado.",
    "emocion": "miedo",
    "valencia": 0,
    "intensidad": 0.5,
    "activacion": 0.5
  },
  {
    "texto": "Una prueba no sale como esperaba. Respiro y recuerdo que puedo corregir el paso y volver a intentarlo.",
    "emocion": "tristeza",
    "valencia": 0,
    "intensidad": 0.5,
    "activacion": 0.5
  },
  {
    "texto": "Comprendo lo que ha sucedido y preparo una solución sencilla. Ahora veo una oportunidad para seguir aprendiendo.",
    "emocion": "esperanza",
    "valencia": 0,
    "intensidad": 0.5,
    "activacion": 0.5
  },
  {
    "texto": "Termino la demostración con tranquilidad. Puedo reiniciar el relato o dejarlo en pausa cuando lo necesite.",
    "emocion": "calma",
    "valencia": 0,
    "intensidad": 0.5,
    "activacion": 0.5
  }
]
```
**index.php**
```php
<?php
try {
    $datos = json_decode(file_get_contents(__DIR__ . '/historia.json'), true, 512, JSON_THROW_ON_ERROR);
    if (!is_array($datos) || !$datos) { throw new RuntimeException('Historia vacía'); }
    foreach ($datos as $parrafo) {
        if (!is_array($parrafo) || !is_string($parrafo['texto'] ?? null) || trim($parrafo['texto']) === '') {
            throw new RuntimeException('Párrafo no válido');
        }
    }
    $jsonDatos = json_encode($datos, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_THROW_ON_ERROR);
} catch (Throwable $error) {
    http_response_code(503);
    exit('No se puede cargar el relato de demostración.');
}
?>
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>jocarsa | avatar · RA1</title>
  <link rel="stylesheet" href="estilo.css">
</head>
<body>
<header><h1>jocarsa | avatar</h1><p>Un relato de bienvenida · Demostración con datos ficticios</p></header>
<main>
  <section id="escena" aria-label="Avatar y relato">
    <div id="avatar">
      <img id="avatarA" src="expresiones/neutral.png" alt="Avatar del relato" width="258" height="505">
      <img id="avatarB" src="expresiones/neutral.png" alt="" aria-hidden="true" width="258" height="505">
    </div>
    <div id="bocadillo">
      <p id="contador">Preparado</p>
      <p id="textoBocadillo">Pulsa Reproducir para comenzar.</p>
      <div id="barra" role="progressbar" aria-label="Progreso del relato" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div id="progreso"></div></div>
    </div>
  </section>
  <section class="controles" aria-label="Controles de lectura">
    <button id="reproducir" type="button">Reproducir</button>
    <button id="pausar" type="button" disabled>Pausar</button>
    <button id="reiniciar" type="button">Reiniciar</button>
    <label for="velocidad">Ritmo</label>
    <select id="velocidad"><option value="350">Lento</option><option value="230" selected>Normal</option><option value="100">Rápido</option></select>
  </section>
  <p id="mensaje" role="status">Preparado para reproducir.</p>
  <details><summary>Emoción de la escena</summary><div id="estado">Neutral</div></details>
  <noscript>Activa JavaScript para utilizar los controles del avatar.</noscript>
</main>
<footer>Adaptación académica · Integra Tech Consulting como caso ficticio</footer>
<script>const parrafos = <?= $jsonDatos ?>;</script>
<script src="avatar.js"></script>
<script src="reproductor.js"></script>
</body>
</html>
```
**reproductor.js**
```js
// Un único temporizador controla la lectura y puede cancelarse al pausar.
class ReproductorAvatar {
    constructor(historia) {
        this.historia = historia;
        this.palabras = historia.map(parrafo => parrafo.texto.trim().split(/\s+/));
        this.total = this.palabras.reduce((total, palabras) => total + palabras.length, 0);
        this.texto = document.querySelector('#textoBocadillo');
        this.contador = document.querySelector('#contador');
        this.mensaje = document.querySelector('#mensaje');
        this.botonReproducir = document.querySelector('#reproducir');
        this.botonPausar = document.querySelector('#pausar');
        this.temporizador = null;
        this.reiniciar();
    }

    reiniciar() {
        clearTimeout(this.temporizador);
        this.temporizador = null;
        this.indiceParrafo = 0;
        this.indicePalabra = 0;
        this.leidas = 0;
        this.estado = 'preparado';
        this.texto.textContent = 'Pulsa Reproducir para comenzar.';
        this.contador.textContent = 'Preparado';
        this.mensaje.textContent = 'Preparado para reproducir.';
        mezclarEmociones('neutral', 'neutral', 0);
        estado.textContent = 'Neutral';
        this.actualizarControles();
    }

    actualizarControles() {
        this.botonReproducir.disabled = this.estado === 'reproduciendo' || this.estado === 'finalizado';
        this.botonPausar.disabled = this.estado !== 'reproduciendo';
        this.botonReproducir.textContent = this.estado === 'pausado' ? 'Continuar' : 'Reproducir';
        const porcentaje = Math.round(this.leidas / this.total * 100);
        document.querySelector('#progreso').style.width = porcentaje + '%';
        document.querySelector('#barra').setAttribute('aria-valuenow', porcentaje);
    }

    reproducir() {
        if (this.estado === 'reproduciendo' || this.estado === 'finalizado') return;
        this.estado = 'reproduciendo';
        this.mensaje.textContent = 'Reproduciendo relato.';
        this.actualizarControles();
        this.avanzar();
    }

    pausar(motivo = 'Lectura en pausa.') {
        if (this.estado !== 'reproduciendo') return;
        clearTimeout(this.temporizador);
        this.temporizador = null;
        this.estado = 'pausado';
        this.mensaje.textContent = motivo;
        this.actualizarControles();
    }

    avanzar() {
        if (this.estado !== 'reproduciendo') return;
        if (this.indiceParrafo >= this.historia.length) {
            this.estado = 'finalizado';
            this.temporizador = null;
            this.contador.textContent = 'Historia finalizada';
            this.mensaje.textContent = 'Historia finalizada. Puedes reiniciar el relato.';
            mezclarEmociones('neutral', 'neutral', 0);
            this.actualizarControles();
            return;
        }
        if (this.indicePalabra === 0) this.texto.replaceChildren();
        const palabras = this.palabras[this.indiceParrafo];
        const span = document.createElement('span');
        span.textContent = (this.indicePalabra ? ' ' : '') + palabras[this.indicePalabra];
        this.texto.appendChild(span);
        this.contador.textContent = `Párrafo ${this.indiceParrafo + 1} de ${this.historia.length}`;
        actualizarAvatar(this.indiceParrafo, this.indicePalabra, palabras.length);
        this.indicePalabra++;
        this.leidas++;
        let espera = Number(document.querySelector('#velocidad').value);
        if (this.indicePalabra === palabras.length) {
            this.indicePalabra = 0;
            this.indiceParrafo++;
            espera = 900;
        }
        this.actualizarControles();
        this.temporizador = setTimeout(() => this.avanzar(), espera);
    }
}

const reproductor = new ReproductorAvatar(parrafos);
document.querySelector('#reproducir').addEventListener('click', () => reproductor.reproducir());
document.querySelector('#pausar').addEventListener('click', () => reproductor.pausar());
document.querySelector('#reiniciar').addEventListener('click', () => reproductor.reiniciar());
document.addEventListener('visibilitychange', () => {
    if (document.hidden) reproductor.pausar('Pausa al pasar a segundo plano. Pulsa Continuar al volver.');
});
window.addEventListener('pagehide', () => reproductor.pausar());
// Solo se precargan las expresiones usadas por la historia de demostración.
const imagenes = [...new Set(['neutral', ...parrafos.map(p => normalizarEmocion(p.emocion))])].map(emocion => {
    const imagen = new Image();
    imagen.src = imagenEmocion(emocion);
    return imagen;
});
```
### expresiones
## scripts
**probar_movil.py**
```python
"""Pruebas de emulación web móvil. No ejecutan Android ni iOS."""
from pathlib import Path
from importlib.metadata import version
import json
import shutil
import socket
import subprocess
import tempfile
import time
import urllib.request
from playwright.sync_api import sync_playwright

raiz = Path(__file__).resolve().parent.parent
with socket.socket() as conexion:
    conexion.bind(('127.0.0.1', 0))
    puerto = conexion.getsockname()[1]
url = f'http://127.0.0.1:{puerto}'
perfiles = [
    ('movil-compacto', 360, 640, 2),
    ('movil-amplio', 412, 915, 2.625),
    ('tableta', 768, 1024, 2),
    ('horizontal', 740, 360, 2),
]
resultados = []
with tempfile.TemporaryFile() as log:
    servidor = subprocess.Popen(['php', '-S', f'127.0.0.1:{puerto}', '-t', str(raiz / 'public')], stdout=log, stderr=log)
    try:
        for _ in range(50):
            try:
                urllib.request.urlopen(url, timeout=1).close()
                break
            except OSError:
                time.sleep(.1)
        else:
            raise RuntimeError('No se ha iniciado PHP')
        with sync_playwright() as playwright:
            navegador = playwright.chromium.launch(executable_path=shutil.which('chromium'), headless=True)
            print('Playwright:', version('playwright'), '; Chromium:', navegador.version)
            for nombre, ancho, alto, densidad in perfiles:
                contexto = navegador.new_context(viewport={'width': ancho, 'height': alto}, device_scale_factor=densidad, is_mobile=True, has_touch=True, locale='es-ES')
                pagina = contexto.new_page()
                errores = []
                pagina.on('pageerror', lambda error: errores.append(str(error)))
                pagina.clock.install()
                pagina.goto(url, wait_until='networkidle')
                assert pagina.evaluate('navigator.maxTouchPoints') > 0
                assert pagina.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
                for selector in ('#reproducir', '#pausar', '#reiniciar', '#velocidad'):
                    assert pagina.locator(selector).bounding_box()['height'] >= 48
                pagina.locator('#reproducir').tap()
                pagina.clock.run_for(1000)
                assert pagina.evaluate('reproductor.leidas') > 1
                pagina.locator('#pausar').tap()
                leidas = pagina.evaluate('reproductor.leidas')
                pagina.clock.run_for(1000)
                assert pagina.evaluate('reproductor.leidas') == leidas
                assert pagina.evaluate('reproductor.temporizador') is None
                pagina.locator('#reproducir').tap()
                pagina.clock.run_for(300)
                assert pagina.evaluate('reproductor.leidas') > leidas
                pagina.locator('#reiniciar').tap()
                assert pagina.evaluate('reproductor.leidas') == 0
                pagina.locator('#velocidad').select_option('100')
                pagina.locator('#reproducir').tap()
                pagina.clock.run_for(25000)
                assert pagina.locator('#contador').inner_text() == 'Historia finalizada'
                assert pagina.locator('#barra').get_attribute('aria-valuenow') == '100'
                assert pagina.evaluate('normalizarEmocion("desconocida")') == 'neutral'
                assert pagina.locator('#avatarA').evaluate('(img) => img.complete && img.naturalWidth > 0')
                assert not errores, errores
                if nombre == 'movil-compacto':
                    pagina.locator('#reiniciar').tap()
                    pagina.locator('#reproducir').tap()
                    pagina.clock.run_for(1500)
                    pagina.locator('#pausar').tap()
                    (raiz / 'docs/capturas').mkdir(exist_ok=True)
                    pagina.screenshot(path=str(raiz / 'docs/capturas/movil.png'), full_page=True)
                    # Evento sintético: prueba de la reacción del código, no del SO móvil.
                    pagina.locator('#reproducir').tap()
                    pagina.evaluate("Object.defineProperty(document, 'hidden', {configurable:true, get: () => true}); document.dispatchEvent(new Event('visibilitychange'))")
                    assert pagina.evaluate('reproductor.estado') == 'pausado'
                    assert pagina.evaluate('reproductor.temporizador') is None
                    pagina.emulate_media(reduced_motion='reduce')
                    pagina.evaluate("mezclarEmociones('alegria', 'calma', 0.7)")
                    assert pagina.locator('#avatarB').evaluate('(img) => img.style.opacity') == '0'
                    # Una vez cargados todos los recursos usados, el relato puede continuar sin red.
                    contexto.set_offline(True)
                    pagina.locator('#reiniciar').tap()
                    pagina.locator('#reproducir').tap()
                    pagina.clock.run_for(25000)
                    assert pagina.locator('#contador').inner_text() == 'Historia finalizada'
                    assert not errores, errores
                resultados.append({'perfil': nombre, 'viewport': f'{ancho}x{alto}', 'DPR': densidad, 'resultado': 'OK'})
                print('OK:', nombre, '— sin desbordamiento; controles táctiles, pausa, reinicio y finalización')
                contexto.close()
            navegador.close()
        print('OK: evento visibilitychange sintético, movimiento reducido y reproducción sin red tras precarga')
        (raiz / 'docs/resultados.json').write_text(json.dumps(resultados, ensure_ascii=False, indent=2) + '\n')
    finally:
        servidor.terminate()
        servidor.wait(timeout=5)
```
